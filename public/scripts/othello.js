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

    return(
      {
        board:   board,
        player:  'black',
        rival:   'white',
        history: [],
        initialBoard: board
      }
    );
  },
  enableToSet: function(nowPlayer) {
    return(true);
  },
  reverse: function(x, y) {
    this.start();
    console.log(this.state.player);
    console.log(this.isReversive(x, y));
    console.log([x, y]);

    if (this.isReversive(y, x)) {
      var newBoard = this.doReverse(y, x);
      this.state.history.push(newBoard);

      this.setState(
        {board: this.doReverse(y, x)}
      );
    }
  },
  isReversive: function(x, y) {
    var player = this.state.player;
    var rival  = this.state.rival;
    var board  = this.state.board;

    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        if (0 === dx && 0 === dy) {
          continue;
        }

        var _x = x + dx;
        var _y = y + dy;
        var isReversive = false;

        if (board[_x] == null || board[_x][_y] == null || board[_x][_y] === 'empty') {
          continue;
        }

        while (board[_x] != null && board[_x][_y] != null && board[_x][_y] !== 'empty') {
          if (board[_x][_y] === rival) {
            isReversive = true;
          } else if (board[_x][_y] === player) {
            if (isReversive) {
              return(true);
            } else {
              break;
            }
          }

          _x = _x + dx;
          _y = _y + dy;
        }
      }
    }

    return(false);
  },
  goBack: function() {
    var Board = this.state.history.pop();

    if (Board == null) {
      this.setState(
        { board: this.state.initialBoard }
      );
    } else {
      this.setState(
        { board: this.state.history.pop() }
      );
    }
  },
  doReverse: function(x, y) {
    var newBoard = $.extend(true, [], this.state.board);
    var player   = this.state.player;
    var rival    = this.state.rival;

    // if click then set disc
    newBoard[x][y] = player;

    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        if (0 === dx && 0 === dy) {
          continue;
        }

        var _x = x + dx;
        var _y = y + dy;
        var rivalCells = [];

        if (newBoard[_x] == null || newBoard[_x][_y] == null || newBoard[_x][_y] === 'empty') {
          continue;
        }

        while (newBoard[_x] != null && newBoard[_x][_y] != null && newBoard[_x][_y] !== 'empty') {
          if (newBoard[_x][_y] === rival) {
            rivalCells.push([_x, _y]);
          } else if (newBoard[_x][_y] === player) {
            if (rivalCells.length === 0) {
              break;
            } else {
              for (var i = 0; i < rivalCells.length; i ++) {
                var __x = rivalCells[i][0];
                var __y = rivalCells[i][1];
                newBoard[__x][__y] = player;
              }
              break;
            }
          }

          _x = _x + dx;
          _y = _y + dy;
        }
      }
    }

    return(newBoard);
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
    if (0 === x && 0 === y) {
      // top left corner
      return (
        [
          this.state.board[x][y + 1],
          this.state.board[x + 1][y],
          this.state.board[x + 1][y + 1]
        ]
      );
    } else if (0 === x && 7 === y) {
      // bottom left corner
      return (
        [
          this.state.board[x + 1][y],
          this.state.board[x + 1][y - 1],
          this.state.board[x][y - 1],
        ]
      );
    } else if (7 === x && 0 === y) {
      // top right corner
      return (
        [
          this.state.board[x - 1][y],
          this.state.board[x - 1][y + 1],
          this.state.board[x][y + 1],
        ]
      );
    } else if (7 === x && 7 === y) {
      // bottom right corner
      return (
        [
          this.state.board[x - 1][y],
          this.state.board[x - 1][y - 1],
          this.state.board[x][y - 1],
        ]
      );
    } else if (0 === x) {
      // leftmost line
      return (
        [
          this.state.board[x + 1][y],
          this.state.board[x + 1][y - 1],
          this.state.board[x + 1][y + 1],
          this.state.board[x][y - 1],
          this.state.board[x][y + 1],
        ]
      );
    } else if (7 === x) {
      // rightmost line
      return (
        [
          this.state.board[x - 1][y],
          this.state.board[x - 1][y - 1],
          this.state.board[x - 1][y + 1],
          this.state.board[x][y - 1],
          this.state.board[x][y + 1],
        ]
      );
    } else if (0 === y) {
      // top line
      return (
        [
          this.state.board[x - 1][y],
          this.state.board[x - 1][y + 1],
          this.state.board[x + 1][y],
          this.state.board[x + 1][y + 1],
          this.state.board[x][y + 1],
        ]
      );
    } else if (7 === y) {
      // bottom line
      return (
        [
          this.state.board[x - 1][y],
          this.state.board[x - 1][y - 1],
          this.state.board[x + 1][y],
          this.state.board[x + 1][y - 1],
          this.state.board[x][y - 1],
        ]
      );
    } else {
      // other else cells
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
    }
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
  turnChange: function() {
    if ('black' === this.state.player) {
      this.setState(
        {
          player: 'white',
          rival:  'black'
        }
      );
    } else {
      this.setState(
        {
          player: 'black',
          rival:  'white'
        }
      );
    }
  },
  render: function() {
    var reverse = this.reverse;
    var goBack = this.goBack;
    var board  = this.state.board.map(function(row, y) {
      var rows = row.map(function(disc, x) {
        return(<Cell disc={disc} x={x} y={y} reverse={reverse}/>);
      });

      return(<tr>{rows}</tr>);
    });

    return (
      <div>
        <table>{board}</table>
        <Back id="back" goBack={goBack} />
      </div>
    );
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

var Back = React.createClass({
  onClick: function() {
    this.props.goBack();
  },
  render: function() {
    return (
      <button id="back" onClick={this.onClick}>back</button>
    );
  }
});

React.render(
  <Board />,
  document.getElementById('board')
);
