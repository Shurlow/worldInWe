import React from 'react'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
// import backdraft from 'backdraft-js';
import RaisedButton from 'material-ui/lib/raised-button';
import backdraft from 'backdraft-js';

class CustomEditor extends React.Component {
  constructor(props) {
    super(props);
    if (props.backup != null) {
      var blocks = convertFromRaw(props.backup)
      var restoredContent = ContentState.createFromBlockArray(blocks)
      // console.log(props.backup, 'blocks:', blocks, 'content', restoredContent)
      this.state = {
        titleState: EditorState.createWithContent(ContentState.createFromText(props.title)),
        editorState: EditorState.createWithContent(restoredContent)
      }; 
    } else {
      this.state = {
        titleState: EditorState.createEmpty(),
        editorState: EditorState.createEmpty()
      };
    }

    this.focus = () => this.refs.editor.focus();
    this.focusTitle = () => this.refs.title.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.onChangeTitle = (titleState) => this.setState({titleState});

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _handleKeyTitleCommand(command) {
    const {titleState} = this.state;
    const newState = RichUtils.handleKeyCommand(titleState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  uploadContent() {
    const markup = {
      'BOLD': ['<strong>', '</strong>'],
      'ITALIC': ['<em>', '</em>'],
      'UNDERLINE': ['<u>', '</u>']
    };
    const contentState = this.state.editorState.getCurrentContent()
    const title = this.state.titleState.getCurrentContent().getPlainText()
    const raw = convertToRaw(contentState)
    const img_url = "https://s3-us-west-2.amazonaws.com/worldinme-full/" + this.props.id + ".jpg"
    this.props.pushStoryUpload(this.props.id, title, img_url, backdraft(raw, markup), raw)
  }

  render() {
    const {editorState, titleState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div>
        <RaisedButton className="story-button" label="Save" onClick={this.uploadContent.bind(this)}/>
        <div className="RichEditor-root">

          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className}>
            <div onClick={this.focusTitle} className="RichEditor-editor-title">
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={titleState}
                onChange={this.onChangeTitle}
                placeholder="Title"
                ref="title"
                spellCheck={true}
              />
            </div>
            <div onClick={this.focus} className="RichEditor-editor-body">
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                placeholder="Tell a story..."
                ref="editor"
                spellCheck={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

Editor.propTypes = {
  pushStoryUpload: React.PropTypes.func.isRequired,
}

export default CustomEditor