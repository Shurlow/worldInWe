import React from 'react';

export default class CtrlBar extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className='ctrl-bar'>
        <h1>test</h1>
        <button className='primary save'>Save</button>
      </div>
    )
  }
}
