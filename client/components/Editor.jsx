
import assign from 'object-assign'
import blacklist from 'blacklist'
import React from 'react'
import ReactDom from 'react-dom'
import MediumEditor from 'medium-editor'


export default class Editor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: props.text
    }
  }

  componentDidMount() {
    var toolbarOptions = {
      allowMultiParagraphSelection: true,
      buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'image'],
      diffLeft: 0,
      diffTop: -10,
      firstButtonClass: 'medium-editor-button-first',
      lastButtonClass: 'medium-editor-button-last',
      standardizeSelectionStart: false,
      static: false,
    }
    var dom = ReactDom.findDOMNode(this);
    this.medium = new MediumEditor(dom, {
      toolbar: toolbarOptions,
      imageDragging: true
    });
    this.medium.subscribe('editableInput', (e) => {
      this._updated = true;
      this.change(dom.innerHTML);
    });
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.text !== this.state.text && !this._updated) {
  //     this.setState({text: nextProps.text});
  //   }

  //   if(this._updated) this._updated = false;
  // }

  render() {
    var tag = this.props.tag;
    var props = blacklist(this.props, 'tag', 'contentEditable', 'dangerouslySetInnerHTML');

    assign(props, {
      contentEditable: true,
      dangerouslySetInnerHTML: {__html: this.state.text}
    });
    // console.log(tag, props)
    return React.createElement(tag, props);
  }
  
  //When editor sees change, propogate
  change(text) {
    if(this.props.onChange) this.props.onChange(text, this.medium);
  }
  //When state change from above
  update(text) {
    this.setState({
      text: text
    })
  }
};