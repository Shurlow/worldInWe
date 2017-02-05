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
                <p>Yolo ipsum dolor sit amet, consectetur adipiscing elit. Ut ac suscipit leo. Carpe diem vulputate est nec commodo rutrum. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum. Curabitur mattis odio at erat viverra lobortis. Poppin’ bottles on the ice, tristique suscipit mauris elementum tempus. Quisque ut felis vitae elit tempor interdum viverra a est. Drop it like it’s hot, at pretium quam. In nec scelerisque purus. Nam dignissim lacus ipsum, a ullamcorper nulla pretium non. Aliquam sed enim faucibus, pulvinar felis at, vulputate augue. Ten, ten, twenties on them fifties, trick, at tempus libero fermentum id. Vivamus ut nisi dignissim, condimentum urna vel, dictum massa. Donec justo yolo, rutrum vitae dui in, dapibus tempor tellus. I do it big. Fusce ut sagittis mi.</p>
              </div>
              <div className='right measure space-top'>
                <h2>Uplifting voices that matter</h2>
                <p>Yolo ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum.</p>
              </div>
              <div className='measure space-top'>
                <h2>The collective question</h2>
                <p>Yolo ipsum dolor sit amet, consectetur adipiscing elit. Ut ac suscipit leo. Carpe diem vulputate est nec commodo rutrum. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum. Curabitur mattis odio at erat viverra lobortis. Poppin’ bottles on the ice, tristique suscipit mauris elementum tempus. Quisque ut felis vitae elit tempor interdum viverra a est. Drop it like it’s hot, at pretium quam. In nec scelerisque purus. Nam dignissim lacus ipsum, a ullamcorper nulla pretium non. Aliquam sed enim faucibus, pulvinar felis at, vulputate augue. Ten, ten, twenties on them fifties, trick, at tempus libero fermentum id. Vivamus ut nisi dignissim, condimentum urna vel, dictum massa. Donec justo yolo, rutrum vitae dui in, dapibus tempor tellus. I do it big. Fusce ut sagittis mi.</p>
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
