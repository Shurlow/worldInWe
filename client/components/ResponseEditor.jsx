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

  render() {
    return (
      <div className='response'>
        <div className='response-left'>
          <p>Title goes here</p>
          <p>{response.username}</p>
        </div>
        <div className='response-right'>
          <div onClick={this.focusBody} className="RichEditor-editor-body">
            <Editor
              editorState={this.state.bodyState}
              onChange={this.onBodyChange}
              placeholder="Tell your story..."
              ref="body"
              spellCheck={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

ResponseEditor.propTypes = {
  story_id: React.PropTypes.string.isRequired
}