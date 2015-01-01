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
  render: function() {
    var player = this.state.player;
    var board  = this.state.board.map(function(row) {
      var rows = row.map(function(disc) {
        return(<Cell disc={disc} player={player}/>);
      });

      return(<tr>{rows}</tr>);
    });

    return (<table>{board}</table>);
  }
});

var Cell = React.createClass({
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
