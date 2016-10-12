import React from 'react'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import backdraft from 'backdraft-js';
import TagSelect from './TagSelect'

class CustomEditor extends React.Component {
  constructor(props) {
    super(props);
    if (props.backup != null) {
      var blocks = convertFromRaw(props.backup)
      var restoredContent = ContentState.createFromBlockArray(blocks)
      // console.log(props.backup, 'blocks:', blocks, 'content', restoredContent)
      this.state = {
        titleState: '',
        authorState: '',
        bodyState: EditorState.createWithContent(restoredContent),
        tags: null,
        error: null
      }; 
    } else {
      this.state = {
        titleState: null,
        authorState: null,
        bodyState: EditorState.createEmpty(),
        tags: null,
        error: null
      };
    }

    this.focusBody = () => this.refs.body.focus();
    // this.focusTitle = () => this.refs.title.focus();
    // this.focusAuthor = () => this.refs.author.focus();
    this.onBodyChange = (bodyState) => this.setState({bodyState});
    this.onTitleChange = (e) => this.setState({titleState: e.target.value});
    this.onAuthorChange = (e) => this.setState({authorState: e.target.value});
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
}
  _handleKeyCommand(command) {
    const {bodyState} = this.state;
    const newState = RichUtils.handleKeyCommand(bodyState, command);
    if (newState) {
      this.onBodyChange(newState);
      return true;
    }
    return false;
  }

  _handleKeyTitleCommand(command) {
    const {titleState} = this.state;
    const newState = RichUtils.handleKeyCommand(titleState, command);
    if (newState) {
      this.onTitleChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onBodyChange(
      RichUtils.toggleBlockType(
        this.state.bodyState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onBodyChange(
      RichUtils.toggleInlineStyle(
        this.state.bodyState,
        inlineStyle
      )
    );
  }

  hasRequiredField(storyObj) {
    for (var key in storyObj) {
      if (storyObj[key] == null) {
        this.setState({
          error: `You're story is missing something: ${key}`
        })
        return false
      }
    }
    return true
  }

  updateTags(tag, value) {
    this.setState({
      tags: Object.assign({}, this.state.tags, {[tag]: value})
    })
  }

  uploadContent() {
    const markup = {
      'BOLD': ['<strong>', '</strong>'],
      'ITALIC': ['<em>', '</em>'],
      'UNDERLINE': ['<u>', '</u>']
    };
    const contentState = this.state.bodyState.getCurrentContent()
    const raw = convertToRaw(contentState)
    console.log('CS:', contentState, 'raw',raw)

    const storyObj = {
      id: this.props.id,
      title: this.state.titleState,
      author: this.state.authorState,
      author_id: this.props.user_id,
      content: backdraft(raw, markup),
      img: this.props.url,
      tags: this.state.tags,
      backup: raw
    }
    
    if (this.hasRequiredField(storyObj)) {
      this.props.uploadStory(storyObj)
    }
  }

          // <BlockStyleControls
          //   editorState={this.state.bodyState}
          //   onToggle={this.toggleBlockType}
          // />
          // <InlineStyleControls
          //   editorState={this.state.bodyState}
          //   onToggle={this.toggleInlineStyle}
          // />
  render() {
    const { titleState, authorState, bodyState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    // var contentState = editorState.getCurrentContent();
    // if (!contentState.hasText()) {
    //   if (contentState.getBlockMap().first().getType() !== 'unstyled') {
    //     className += ' RichEditor-hidePlaceholder';
    //   }
    // }

    return (
      <article>
        <header className="story-header">
          <div onClick={this.focusTitle} className="title">
            <input placeholder="title" onChange={this.onTitleChange.bind(this)}/>
          </div>
          <div onClick={this.focusAuthor} className="name">
            <h3> Produced by
              <input placeholder="author" onChange={this.onAuthorChange.bind(this)}/>
            </h3>
          </div>
          <h3>Directed by <span className='name'>{this.props.author}</span></h3>
        </header>
        <span className='error-text'>{this.state.error}</span>
        <div className='story-text editor'>
          <div onClick={this.focusBody} className="RichEditor-editor-body">
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={bodyState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onBodyChange}
              placeholder="Tell your story..."
              ref="body"
              spellCheck={true}
            />
          </div>
        </div>
        <div className='story-sidebar'>
          <TagSelect updateTags={this.updateTags.bind(this)} />
        </div>
        <button onClick={this.uploadContent.bind(this)}>Save</button>
      </article>
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
    return (
      <span className="pa2" onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'Blockquote', style: 'blockquote'},
  // {label: 'UL', style: 'unordered-list-item'},
  // {label: 'OL', style: 'ordered-list-item'},
  // {label: 'Code Block', style: 'code-block'},
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

CustomEditor.propTypes = {
  uploadStory: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired
}

export default CustomEditor