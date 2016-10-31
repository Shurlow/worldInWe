import React from 'react'
import { randomBgImg } from '../util'

export default class ExploreView extends React.Component {

  makeList(type, items) {
    return (
      <div className='third-card v-list'>
        <h3>{type}</h3>
        <ul>
        { items.map( t => { return <li>{t}</li> }) }
        </ul>
      </div>
    )
  }

  render() {
    const { content, title, author, img } = this.props
    return (
      <div className='page explore'>
        <div className='content' style={{backgroundImage: `url(${randomBgImg()})`}}>
          <article>
            <header className='center'>
              <h3>categories</h3>
            </header>
            <div className='fillwhite'>
              {this.makeList('form', this.props.forms)}
              {this.makeList('theme', this.props.themes)}
              {this.makeList('location', this.props.locations)}
            </div>
          </article>
        </div>
      </div>
    )
  }
}

const themes = ['body', 'climate', 'displacement', 'faith', 'food',
  'identity', 'leadership', 'love', 'mothers']
const forms = ['documentary', 'flash fiction', 'flash non-fiction',
  'narrative', 'photo essay', 'poem', 'sponsored', 'visual poem']
const locations = ['kenya', 'minnesota']

ExploreView.defaultProps = {
  forms: forms,
  themes: themes,
  locations: locations
}