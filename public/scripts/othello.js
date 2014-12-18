var Board = React.createClass({
  render: function() {
    return (
      <table className="commentBox">
        <tr></tr>
      </table>
    );
  }
});

React.render(
  <Board />,
  document.getElementById('board')
);
