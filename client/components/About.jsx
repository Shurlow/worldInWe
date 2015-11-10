var React = require('react')

var StoryBoardItem = React.createClass({

	handleClick: function(i) {
		console.log('clicked: ', i)

		// page('/stories/' + i)
	},

  render: function() {
		// return React.createElement("div", null, React.createElement("h1", null, "Story Board!"), this.state.stories.map(this.makeStoryItem))
    return (
      <div>
        <div className="biglead yellow">
          <h2>Who are we?</h2>
        </div>
      	<div className="content">
          <h2>About Us</h2>
          <p>Eos ex esse oporteat, ad mel alii patrioque. Sit sonet albucius pertinacia ne, veri mazim periculis mea an. Vim ipsum timeam philosophia ea, cu tale paulo mel. Senserit temporibus complectitur te sed, ad mea altera mnesarchum comprehensam, cu nec impetus perpetua. Mei tota pericula necessitatibus cu, ea harum mucius malorum sea, ea usu novum corpora deterruisset.</p>
        </div>
      </div>
    )
  }

})

module.exports = StoryBoardItem