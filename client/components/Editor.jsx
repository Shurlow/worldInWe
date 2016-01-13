
import assign from 'object-assign'
import blacklist from 'blacklist'
import React from 'react'
import ReactDom from 'react-dom'
import MediumEditor from 'medium-editor'
// import AlloyEditor from 'alloyeditor/dist/alloy-editor/alloy-editor-all-min.js'


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
      imageDragging: true,
      disableEditing: false,
      placeholder: { text: this.props.placeholder }
    });
    console.log(dom.innerHTML)
    this.medium.subscribe('editableInput', (e) => {
      this._updated = true;
      this.change(dom.innerText);
    });
  }

  componentWillUnmount() {
    this.medium.destroy();
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

  render() {
    let tag = this.props.tag;
    let props = blacklist(this.props, 'tag', 'contentEditable', 'dangerouslySetInnerHTML', 'isEditing', 'onChange');

    assign(props, {
      contentEditable: this.props.isEditing,
      dangerouslySetInnerHTML: {__html: this.state.text}
    });

    return React.createElement(tag, props);
  }
}