import React from 'react'
import Select from 'react-select';
const formOptions = [
  { value: 'documentary', label: 'Documentary' },
  { value: 'flash-fiction', label: 'Flash-Fiction' },
  { value: 'poem', label: 'Poem' }
]
const themeOptions = [
  { value: 'body', label: 'Body' },
  { value: 'climate', label: 'Climate' },
  { value: 'displacement', label: 'Displacement' },
  { value: 'faith', label: 'Faith' },
  { value: 'food', label: 'Food' },
  { value: 'identity', label: 'Identity' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'love', label: 'Love' },
  { value: 'mothers', label: 'Mothers' }
]

const locationOptions = [
  { value: 'minnesota', label: 'Minnesota'},
  { value: 'kenya', label: 'Kenya'}
]

export default class TagSelect extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      form: null,
      theme1: null,
      theme2: null,
      location: null
    }
  }

  handleTagChange(tag, value) {
    this.setState({
      [tag]: value
    })
    this.props.updateTags(tag, value)
  }

  makeTagSelector(tag, options) {
    return (
      <Select
        name={tag}
        className={tag}
        value={this.state[tag]}
        options={options}
        onChange={this.handleTagChange.bind(this, tag)}
        clearable={false}
        searchable={false}
      />
    )
  }

  render() {
    // const { form, about, length, location } = this.props
    return (
      <div className="tags">
        <h3>Tags</h3>
        <h4>Form</h4>
        {this.makeTagSelector('form', formOptions)}
        <h4>About</h4>
        {this.makeTagSelector('theme1', themeOptions)}
        <h4>&</h4>
        {this.makeTagSelector('theme2', themeOptions)}
        <h4>Location</h4>
        {this.makeTagSelector('location', locationOptions)}
      </div>
    )
  }
}

// TagSelect.propTypes = {

// }