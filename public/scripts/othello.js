var Board = React.createClass({
  render: function() {
    var board = [];
    for(var i = 1; i <= 8; i++) {
      var row = [];
      for(var j = 1; j <= 8; j++) {
        row.push(<Cell />);
      }
      board.push(<tr>{row}</tr>);
    }

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
