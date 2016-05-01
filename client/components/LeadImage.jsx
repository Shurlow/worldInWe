import React, {PropTypes} from 'react'
import { Link } from 'react-router'

export default class LeadImage extends React.Component {

  makeImageComponent() {
    const style = {
      backgroundImage: 'url(' + this.props.img + ')'
    }

    return (
      this.props.withLink
      ? <Link to='topics/housing'>
          <div style={style} className="fullimage">
            <div className="overlay">
              <div className="darkbar">
                <h1>Topic - HOUSING</h1>
              </div>
            </div>
          </div>
        </Link>
      : <div style={style} className="fullimage"></div>
    )
  }

  render() {

    return (
      <div className='leadimage mw8 mb4 center'>
        <img className='mw-100 mw8-l' src={this.props.img}></img>
      </div>
    )
  }
}

LeadImage.propTypes = {
  img: React.PropTypes.string.isRequired,
}

LeadImage.defaultProps = {
  withLink: false
}