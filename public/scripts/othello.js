var Board = React.createClass({
  render: function() {
    var board = [];
    for(var i = 1; i <= 8; i++) {
      var row = [];
      for(var j = 1; j <= 8; j++) {
        row.push(<td className="cell"></td>);
      }
      board.push(<tr>{row}</tr>);
    }

    return (<table>{board}</table>);
  }
});

React.render(
  <Board />,
  document.getElementById('board')
);
