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
    console.log(this.enableToReverse(x, y));
    console.log([x, y]);

    if (this.enableToReverse(y, x)) {
      var newBoard = this.doReverse(y, x);
      this.state.history.push(newBoard);

      this.setState(
        {board: this.doReverse(y, x)}
      );
    }
  },
  enableToReverse: function(x, y) {
    if ('black' === this.state.board[x][y] || 'white' === this.state.board[x][y]) {
      return(false);
    } else {
      var player = this.state.player;
      var rival  = this.state.rival;
      var lines  = this.lines(x, y);

      for (var i = 0; i < lines.length; i++) {
        var line = this.lines(x, y)[i];

        for (var j = 0; j < line.length; j++) {
          var ele  = line[j];
          var prev = line[j - 1];

          // there is a possibility that can reverse
          if (ele === rival) {
            continue;
          }

          // empty line can not be reverse
          if ('empty' === ele) {
            break;
          }

          if (ele === player) {
            if (prev === rival) {
              return(true);
            } else {
              // it is not possible to reverse own disc
              break;
            }
          }

        }
      }

      return(false);
    }
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

    // left line
    var flipCells = [];
    for (var i = 1; i < 8; i ++) {
      try {
        var ele = this.state.board[x - i][y];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      }

      if ('empty' === ele) {
        break;
      }

      if (ele === rival) {
        flipCells.push([x - i, y]);
      }

      if (ele === player) {
        if (flipCells.length) {
          for (var j = 0; j < flipCells.length; j++) {
            var _x = flipCells[j][0];
            var _y = flipCells[j][1];
            newBoard[_x][_y] = player;
          }
          break;
        }
      }
    }

    // upper left
    var flipCells = [];
    for (var i = 1; i < 8; i ++) {
      try {
        var ele = this.state.board[x - i][y - i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      }

      if ('empty' === ele) {
        break;
      }

      if (ele === rival) {
        flipCells.push([x - i, y - i]);
      }

      if (ele === player) {
        if (flipCells.length) {
          for (var j = 0; j < flipCells.length; j++) {
            var _x = flipCells[j][0];
            var _y = flipCells[j][1];
            newBoard[_x][_y] = player;
          };
          break;
        }
      }
    }

    // upper
    var flipCells = [];
    for (var i = 1; i < 8; i ++) {
      try {
        var ele = this.state.board[x][y - i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      }

      if ('empty' === ele) {
        break;
      }

      if (ele === rival) {
        flipCells.push([x, y - i]);
      }

      if (ele === player) {
        if (flipCells.length) {
          for (var j = 0; j < flipCells.length; j++) {
            var _x = flipCells[j][0];
            var _y = flipCells[j][1];
            newBoard[_x][_y] = player;
          };
          break;
        }
      }
    }

    // upper right
    var flipCells = [];
    for (var i = 1; i < 8; i ++) {
      try {
        var ele = this.state.board[x + i][y - i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      }

      if ('empty' === ele) {
        break;
      }

      if (ele === rival) {
        flipCells.push([x + i, y - i]);
      }

      if (ele === player) {
        if (flipCells.length) {
          for (var j = 0; j < flipCells.length; j++) {
            var _x = flipCells[j][0];
            var _y = flipCells[j][1];
            newBoard[_x][_y] = player;
          };
          break;
        }
      }
    }

    // right
    var flipCells = [];
    for (var i = 1; i < 8; i ++) {
      try {
        var ele = this.state.board[x + i][y];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      }

      if ('empty' === ele) {
        break;
      }

      if (ele === rival) {
        flipCells.push([x + i, y]);
      }

      if (ele === player) {
        if (flipCells.length) {
          for (var j = 0; j < flipCells.length; j++) {
            var _x = flipCells[j][0];
            var _y = flipCells[j][1];
            newBoard[_x][_y] = player;
          };
          break;
        }
      }
    }

    // lower right
    var flipCells = [];
    for (var i = 1; i < 8; i ++) {
      try {
        var ele = this.state.board[x + i][y + i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      }

      if ('empty' === ele) {
        break;
      }

      if (ele === rival) {
        flipCells.push([x + i, y + i]);
      }

      if (ele === player) {
        if (flipCells.length) {
          for (var j = 0; j < flipCells.length; j++) {
            var _x = flipCells[j][0];
            var _y = flipCells[j][1];
            newBoard[_x][_y] = player;
          };
          break;
        }
      }
    }

    // lower
    var flipCells = [];
    for (var i = 1; i < 8; i ++) {
      try {
        var ele = this.state.board[x][y + i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      }

      if ('empty' === ele) {
        break;
      }

      if (ele === rival) {
        flipCells.push([x, y + i]);
      }

      if (ele === player) {
        if (flipCells.length) {
          for (var j = 0; j < flipCells.length; j++) {
            var _x = flipCells[j][0];
            var _y = flipCells[j][1];
            newBoard[_x][_y] = player;
          };
          break;
        }
      }
    }

    // lowerleft
    var flipCells = [];
    for (var i = 1; i < 8; i ++) {
      try {
        var ele = this.state.board[x - i][y + i];
      } catch(e) {
        var ele = undefined;
      }

      if (ele == null) {
        break;
      }

      if ('empty' === ele) {
        break;
      }

      if (ele === rival) {
        flipCells.push([x - i, y + i]);
      }

      if (ele === player) {
        if (flipCells.length) {
          for (var j = 0; j < flipCells.length; j++) {
            var _x = flipCells[j][0];
            var _y = flipCells[j][1];
            newBoard[_x][_y] = player;
          };
          break;
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

var Next = React.createClass({
  onClick: function() {
  },
  render: function() {
    return (
      <button id="next" onClick={this.onClick}>next</button>
    );
  }
});

React.render(
  <Board />,
  document.getElementById('board')
);
