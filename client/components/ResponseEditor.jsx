import React from 'react'
import { Editor, EditorState } from 'draft-js';

export default class ResponseEditor extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      bodyState: EditorState.createEmpty()
    }
    this.focusBody = () => this.refs.body.focus();
    this.onBodyChange = (bodyState) => this.setState({bodyState});
  }

  uploadNewResponse() {
    const { story_id, username, uploadResponse } = this.props
    let responseObj = {
      title: 'No title yet',
      author: username,
      story_id: story_id,
      date: Date.now(),
      content: this.state.bodyState.getCurrentContent().getPlainText()
    }
    uploadResponse(story_id, responseObj)
  }

  render() {
    const isUploading = this.props.isUploading
    return (
      <div className='response'>
        <div className='response-left'>
          <p>Title goes here</p>
          <p>{this.props.username}</p>
        </div>
        <div className='response-right'>
          <div onClick={this.focusBody} className="RichEditor-editor-body">
            <Editor
              editorState={ isUploading ? EditorState.createEmpty() : this.state.bodyState}
              onChange={this.onBodyChange}
              placeholder="Tell your story..."
              ref="body"
              spellCheck={true}
            />
          </div>
        </div>
        <button onClick={this.uploadNewResponse.bind(this)}>Submit</button>
      </div>
    );
  }
}

ResponseEditor.propTypes = {
  story_id: React.PropTypes.string.isRequired,
  uploadResponse: React.PropTypes.func.isRequired
}