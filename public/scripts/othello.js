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
  enableToSet: function() {
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

    if (board[x][y] === player || board[x][y] === rival) {
      return(false);
    }

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
  isAttackable: function(x, y) {
    var player = this.state.player;
    var rival  = this.state.rival;
    var board  = this.state.board;

    if (board[x][y] === player || board[x][y] === rival) {
      return(false);
    }

    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        if (0 === dx && 0 === dy) {
          continue;
        }

        var _x = x + dx;
        var _y = y + dy;
        var isReversive = false;

        if (board[_x] == null || board[_x][_y] == null) {
          continue;
        }

        while (board[_x] != null && board[_x][_y] != null && board[_x][_y] !== 'empty') {
          if (board[_x][_y] === player) {
            isReversive = true;
          } else if (board[_x][_y] === rival) {
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
    this.state.history.pop();
    var length = this.state.history.length;

    this.turnChange();

    if (Board == null || length === 0) {
      this.setState(
        { board: this.state.initialBoard }
      );
    } else {
      this.setState(
        { board: this.state.history[length - 1] }
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
  start: function() {
    this.setPlayer();
  },
  setPlayer: function() {
    if (this.enableToSet) {
      this.turnChange();
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
