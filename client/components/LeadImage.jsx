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
                <h1>Topics</h1>
              </div>
              <div className="lightbar"></div>
            </div>
          </div>
        </Link>
      : <div style={style} className="fullimage">
          {this.props.children}
        </div>
    )
  }

  render() {

    return (
      <div className='leadimage'>
        {this.makeImageComponent()}
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