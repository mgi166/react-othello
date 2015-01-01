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

    return({board: board, player: 'black', rival: 'white'});
  },
  enableToSet: function(nowPlayer) {
    var board  = this.state.board;
    var rival  = this.state.rival;
    var player = nowPlayer;
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
  reverse: function(x, y) {
    this.start();
    console.log(this.state.player);
    console.log(this.enableToReverse(x, y));
    console.log([x, y]);
  },
  enableToReverse: function(x, y) {
    if ('black' === this.state.board[x][y] || 'white' === this.state.board[x][y]) {
      return(false);
    } else {
      // TODO
    }
  },
  lines: function(x, y) {
    return (
      [
        this.leftLine(x, y),
        this.leftUpperLine(x, y),
        this.upperLine(x, y),
        this.rightUpperLine(x, y),
        this.rightLine(x, y),
        this.rightLowerLine(x, y),
        this.lowerLine(x, y),
        this.leftLowerLine(x, y)
      ]
    );
  },
  leftLine: function(x, y) {
    var line = [];
    for (var i = 1; i < 8; i++) {
      try {
        var ele = this.state.board[x - i][y];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      } else {
        line.push(ele);
      }
    }
    return(line);
  },
  leftUpperLine: function(x, y) {
    var line = [];
    for (var i = 1; i < 8; i++) {
      try {
        var ele = this.state.board[x - i][y - i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      } else {
        line.push(ele);
      }
    }
    return(line);
  },
  upperLine: function(x, y) {
    var line = [];
    for (var i = 1; i < 8; i++) {
      try {
        var ele = this.state.board[x][y - i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      } else {
        line.push(ele);
      }
    }
    return(line);
  },
  rightUpperLine: function(x, y) {
    var line = [];
    for (var i = 1; i < 8; i++) {
      try {
        var ele = this.state.board[x + i][y - i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      } else {
        line.push(ele);
      }
    }
    return(line);
  },
  rightLine: function(x, y) {
    var line = [];
    for (var i = 1; i < 8; i++) {
      try {
        var ele = this.state.board[x + i][y];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      } else {
        line.push(ele);
      }
    }
    return(line);
  },
  rightLowerLine: function(x, y) {
    var line = [];
    for (var i = 1; i < 8; i++) {
      try {
        var ele = this.state.board[x + i][y + i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      } else {
        line.push(ele);
      }
    }
    return(line);
  },
  lowerLine: function(x, y) {
    var line = [];
    for (var i = 1; i < 8; i++) {
      try {
        var ele = this.state.board[x][y + i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      } else {
        line.push(ele);
      }
    }
    return(line);
  },
  leftLowerLine: function(x, y) {
    var line = [];
    for (var i = 1; i < 8; i++) {
      try {
        var ele = this.state.board[x - i][y + i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      } else {
        line.push(ele);
      }
    }
    return(line);
  },
  aroundTheCell: function(x, y) {
    return (
      [
        this.state.board[x - 1][y],
        this.state.board[x - 1][y - 1],
        this.state.board[x - 1][y + 1],
        this.state.board[x + 1][y],
        this.state.board[x + 1][y - 1],
        this.state.board[x + 1][y + 1],
        this.state.board[x][y - 1],
        this.state.board[x][y + 1],
      ]
    );
  },
  start: function() {
    this.setPlayer();
  },
  setPlayer: function() {
    if (this.enableToSet(this.state.player)) {
      if ('black' === this.state.player) {
        this.setState({player: 'white', rival:  'black'});
      } else {
        this.setState({player: 'black', rival:  'white'});
      }
    } else {
      // TODO
    }
  },
  render: function() {
    var reverse = this.reverse;
    var board  = this.state.board.map(function(row, y) {
      var rows = row.map(function(disc, x) {
        return(<Cell disc={disc} x={x} y={y} reverse={reverse}/>);
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
  onClick: function() {
    this.props.reverse(this.state.x, this.state.y);
  },
  render: function() {
    return (
      <td className="cell" onClick={this.onClick}>
        <span className={this.props.disc}></span>
      </td>
    );
  }
});

React.render(
  <Board />,
  document.getElementById('board')
);
