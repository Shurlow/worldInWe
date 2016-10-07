import React from 'react'

export default class StoryBoardItem extends React.Component {

  render() {
    return (
    	<div className="content mw7-ns mw8-l pa4 center">
        <h1 className="mt0">What is World In Me?</h1>
        <p className="lh-copy">World In Me is a combined
          effort to strengthen and empower East African immigrant
          communities in the Twin Cities by giving them a voice.
          Commuity workshops lead the creation of 'Flash Stories' aimed at building english
          writing skills while fostering cultural identity and personal reflection.
        </p>

        <h1 className="">Who are we?</h1>
        <p className="lh-copy">
          <span className='b'>Hamse Warfa</span><span className="grey">  |  Co-Founder</span><br/>
          <span className='b'>James Christensen</span><span>  |  Co-Founder</span><br/>
          <span className='b'>Scott Hurlow</span><span>  |  Developer</span><br/>
        </p>

        <h1 className="">Want to get involved?</h1>
        <p className="lh-copy">We're always looking for bright community members to help make a difference.
        Interested in volunterring or just want to get in touch, just send us an
        <a className="ml1 link dim" href="mailto:worldinmemn@gmail.com">email</a>.</p>
      </div>
    )
  }

}