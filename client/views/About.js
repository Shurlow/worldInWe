import React from 'react'

export default class StoryBoardItem extends React.Component {

  render() {
    return (
    	<div className="mw6 mw8-l pa4 center">
        <h1 className="f2">What is World In Me?</h1>
        <p className="f3">World In Me is a combined
          effort to strengthen and empower East African immigrant
          communities in the Twin Cities by giving them a voice.
          Commuity workshops lead the creation of 'Flash Stories' aimed at building english
          writing skills while fostering cultural identity and personal reflection.
        </p>

        <h1 className="f2">Who are we?</h1>
        <p className="f3">
          <span className='bold'>Hamse Warfa</span><span>  |  Co-Founder</span><br/>
          <span className='bold'>James Christensen</span><span>  |  Co-Founder</span><br/>
          <span className='bold'>Scott Hurlow</span><span>  |  Developer</span><br/>
        </p>

        <h1 className="f2">Want to get involved?</h1>
        <p className="f3">We are always looking for bright community memebers to help make a difference.
        Interested in volunterring or just want to get in touch? Just Shoot us an
          <a href="mailto:worldinmemn@gmail.com"> email.</a>
        </p>
      </div>
    )
  }

}