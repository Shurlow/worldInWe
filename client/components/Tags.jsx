import React from 'react'

export default class Tags extends React.Component {

  makeTag(name, tag) {
    return (
      <div>
        <h4>{name}</h4>
        <span className={name}>{tag}</span>
      </div>
    )
  }

  render() {
    const { tags } = this.props
    return (
      <div className="tags">
        <h3>Tags</h3>
        {this.makeTag('form', tags.form)}
        {this.makeTag('theme', tags.theme1 + ' & ' + tags.theme2)}
        {this.makeTag('length', tags.length)}
        {this.makeTag('location', tags.location)}
      </div>
    )
  }
}

Tags.propTypes = {
  tags: React.PropTypes.object.isRequired
}
