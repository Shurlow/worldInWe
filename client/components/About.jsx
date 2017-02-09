import React from 'react'
import { randomBgImg } from '../util'
import ImageLoader from 'react-imageloader'

export default class About extends React.Component {

  makeContribCard(contrib) {
    const { name, role, img } = contrib
    return (
      <div key={name}>
        <ImageLoader
          src={`/res/contributors/${img}`}
          preloader={()=> <img className='loader' src='/res/loader.gif'/>}
        />
        <h4>{name}</h4>
        <span>{role}</span>
      </div>
    )
  }

  render() {
    return (
      <div className='page'>
        <div
          className='content'
          style={{backgroundImage: `url(${randomBgImg()})`}}>
          <article>
            <header className="center">
              <h3>World In We illuminates common dreams and disruptive ideas from the perspective of people with something big at stake</h3>
            </header>
            <div className='card full'>
              <div className='measure'>
                <h2>Short Stories Big Ideas</h2>
                <p>World in We is a multimedia anthology that creates connections across cultures, generations, and geographies through original, short form storytelling.

                Each unique series centers around a specific community united by a common theme. Working as a collective, our storytellers use different modes of short form expression to narrate their dynamic individualism within our society. Our pilot series, Rumee, showcases stories of belief, identity, and presence from the Somali diaspora.

                Together, these anthologies drive our mission to reflect and shape our oneness and manyness from the perspective of storytellers and subjects who have something personally at stake in the global issues of our time. Our long-term vision is to champion the dynamic interaction of multiple narratives on one platform.</p>
              </div>
              <div className='right measure space-top'>
                <h2>Uplifting voices that matter</h2>
                <p>As an open access education initiative for all ages, we believe that we can build social cohesion by commissioning original works from storytellers of backgrounds that are ordinarily the objects of media scrutiny rather than producers of their own stories. We assemble our stories via traditional commissions and open call submissions to set our agenda from the bottom up, inside out.</p>
              </div>

              <div className='measure space-top'>
                <h2>The response principle</h2>
                <p>Comments are a drag. But we still want to hear everyone’s voice. That’s why we value user interactivity based on call and response traditions across global cultures. Each of our featured stories ends with a series of follow-up prompts for users to submit, for publication, their own stories directly inspired by our original work. It’s our way of turning that old American motto E pluribus unum on its head and then back again: Out of one story, many. Out of many stories, one community.</p>
              </div>
              <div className='right measure space-top'>
                <h2>The collective question</h2>
                <p>We live in an unevenly globalized era shaped by the exodus of billions from their homelands over the course of centuries. So often we look to the past to understand who we are and can become. What if we also looked to one another, now? Motivated by this core question, World in We is led by a collective of authors, civic leaders, educators, entrepreneurs, filmmakers, and lifelong students united by the common experiences of dislocation and connection across geographies and generations.</p>
              </div>

              <h2>contributors</h2>
              <div className='contributors'>
                { contribs.map(this.makeContribCard) }
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }
}

const contribs = [
  {
    name: 'Hamse Warfa',
    role: 'ExecutiveProducer / Storyteller',
    img: 'Hamse_Warfa_ExecutiveProducer_Storyteller.jpg'
  },
  {
    name: 'Liban Adam',
    role: 'Storyteller',
    img: 'Liban_Adam_Storyteller.jpg'
  },
  {
    name: 'Kama Dage',
    role: 'Director',
    img: 'Kama_Dage_Director.jpg'
  },
  {
    name: 'Halima Aden',
    role: 'Storyteller',
    img: 'Halima_Aden_Storyteller.jpg'
  },
  {
    name: 'Hanan Townshend',
    role: 'Composer',
    img: 'Hanan_Townshend_Composer.jpg'
  },
  {
    name: 'Ikram-Carfon Osman',
    role: 'Storyteller',
    img: 'Ikram-Carfon_Osman_Producer_Storyteller.jpg'
  },
  {
    name: 'James Christenson',
    role: 'Cinematographer / Editor',
    img: 'James_Christenson_Cinematographer_Editor.jpg'
  },
  {
    name: 'Jonathan Camp',
    role: 'SoundEditor / Mixer',
    img: 'Jonathan_Camp_SoundEditorandMixer.jpg'
  },

  {
    name: 'Kali Mohamad',
    role: 'Producer',
    img: 'Kali_Mohamed_Producer.jpg'
  },

  {
    name: 'Mohamad Samatar',
    role: 'Artist / Curator',
    img: 'MohamedSamatar_Artist_Curator.jpg'
  },
]
