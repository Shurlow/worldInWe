import React from 'react'

export default class ExploreView extends React.Component {

  makeList(type, items) {
    return (
      <div className='textcard'>
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
      <div className='explore'>
        <div className='content'>
          <div className='center-wrap'>
            <h2>categories</h2>
          </div>
          
          {this.makeList('form', this.props.forms)}
          {this.makeList('theme', this.props.themes)}
          {this.makeList('location', this.props.locations)}
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

// Story.propTypes = {
//   content: React.PropTypes.array.isRequired,
//   title: React.PropTypes.string.isRequired,
//   author: React.PropTypes.string.isRequired,
//   img: React.PropTypes.string.isRequired
// }