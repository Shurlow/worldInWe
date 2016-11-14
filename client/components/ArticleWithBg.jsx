import React from 'react'
import { randomBgImg } from '../util'
var bg = randomBgImg()

export default class ArticleWithBg extends React.Component {
  render() {
    return (
      <div className='content' style={{backgroundImage: `url(${bg})`}}>
        <article className={this.props.className}>
          {this.props.children}
        </article>
      </div>
    )
  }
}