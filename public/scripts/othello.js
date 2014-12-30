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

    return({board: board});
  },
  render: function() {
    var board = this.state.board.map(function(row) {
      var rows = row.map(function(disc) {
        return(<Cell disc={disc}/>);
      });

      return(<tr>{rows}</tr>);
    });

    return (<table>{board}</table>);
  }
});

var Cell = React.createClass({
  putDisc: function(e) {
    var current = e.currentTarget;
    if (current.children.length < 1) {
      $(current).append('<span class="white"></span>');
    }
  },
  render: function() {
    return (<td className="cell" onClick={this.putDisc}></td>);
  }
});

React.render(
  <Board />,
  document.getElementById('board')
);
