import React from 'react'

export default class ErrorPage extends React.Component {
  render() {
    return (
      <div className="content mw7-ns mw8-l pa4 center">
        <h1 className="mt0">Error {this.props.code}</h1>
        <p>Sorry about that...</p>
        <p>{this.props.message}</p>
      </div>
    )
  }
}