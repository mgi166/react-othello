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
  render: function() {
    return (<td className="cell"></td>);
  }
});

React.render(
  <Board />,
  document.getElementById('board')
);
