var Board = React.createClass({
  getInitialState: function() {
    var board = [];
    for (var i = 1; i <= 8; i++) {
      var row = [];
      for (var j = 1; j <= 8; j++) {
        row.push('empty');
      }
      board.push(row);
    }

    board[3][3] = 'white';
    board[4][4] = 'white';
    board[3][4] = 'black';
    board[4][3] = 'black';

    return({board: board, player: 'black'});
  },
  player: function() {
    if (this.enableToSet(this.state.player)) {
      this.setState({player: 'black'});
    } else {
      this.setState({player: 'white'});
    }

    return(this.state.player);
  },
  enableToSet: function(nowPlayer) {
    var board  = this.state.board;
    var player = nowPlayer;
    var rival  = this.rivalPlayer(player);
    var res    = [];

    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        if (player === board[x][y]) {
          var rivalCells = [
            board[x - 1][y],
            board[x + 1][y],
            board[x][y - 1],
            board[x][y + 1],
            board[x - 1][y - 1],
            board[x - 1][y + 1],
            board[x + 1][y - 1],
            board[x + 1][y + 1]
          ].filter(function(cell) {
            return(rival === cell);
          });

          if (rivalCells.length > 0) {
            res.push(true);
          } else {
            res.push(false);
          }
        }
      }
    }

    for (var i = 0; i <= res.length; i++) {
      if (res[i]) {
        return(true);
      }
    }
    return(false);
  },
  rivalPlayer: function(nowPlayer) {
    var rival = ('black' === nowPlayer) ? 'white' : 'black';
    return(rival);
  },
  render: function() {
    var player = this.player;
    var board  = this.state.board.map(function(row, y) {
      var rows = row.map(function(disc, x) {
        return(<Cell disc={disc} player={player} x={x} y={y}/>);
      });

      return(<tr>{rows}</tr>);
    });

    return (<table>{board}</table>);
  }
});

var Cell = React.createClass({
  getInitialState: function() {
    return({
      x: this.props.x,
      y: this.props.y
    });
  },
  setDisc: function(e) {
    var current = e.currentTarget;

    if (this.props.player == null) {
      $(current).children().addClass(this.props.disc);
    } else {
      $(current).children().addClass(this.props.player);
    }
  },
  render: function() {
    return (
      <td className="cell" onClick={this.setDisc}>
        <span className={this.props.disc}></span>
      </td>
    );
  }
});

React.render(
  <Board />,
  document.getElementById('board')
);
