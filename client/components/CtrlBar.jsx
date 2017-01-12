import React from 'react';

export default class CtrlBar extends React.Component {
  render() {
    const error = this.props.isError
    return (
      <div className='ctrl-bar'>
        <button className='primary save' onClick={() => {this.props.uploadStory()}}>
          Save
        </button>
        { error ? <p className='error'>{error}</p> : null }
      </div>
    )
  }
}
