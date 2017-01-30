import React from 'react'
import { randomBgImg } from '../util'
const pickedImg = randomBgImg()
export default class ErrorPage extends React.Component {
  render() {
    return (
      <div className="page">
        <div className='content' style={{backgroundImage: `url(${pickedImg})`}}>
          <article>
            <div className='small-card center'>
              <h2>Error {this.props.code}</h2>
              <p>{this.props.message || 'Sorry about that...'}</p>
            </div>
          </article>
        </div>
      </div>
    )
  }
}
