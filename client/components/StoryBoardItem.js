var StoryBoardItem = React.createClass({

  render: function() {
    return (
      <p>story board item <span>{this.props.text}</span> </p>
    )
  }

})

module.exports = StoryBoardItem