import React from 'react'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import backdraft from 'backdraft-js';
import TagSelect from './TagSelect'
import ArticleWithBg from './ArticleWithBg'

class CustomEditor extends React.Component {
  constructor(props) {
    super(props);
    if (props.backup != null) {
      var blocks = convertFromRaw(props.backup)
      var restoredContent = ContentState.createFromBlockArray(blocks)
      // console.log(props.backup, 'blocks:', blocks, 'content', restoredContent)
      this.state = {
        title: '',
        author: '',
        body: EditorState.createWithContent(restoredContent),
        form: null,
        theme1: null,
        theme2: null,
        location: null,
        error: null
      }; 
    } else {
      this.state = {
        title: null,
        author: null,
        body: EditorState.createEmpty(),
        theme1: null,
        theme2: null,
        location: null,
        error: null
      };
    }

    this.focusBody = () => this.refs.body.focus();
    // this.focusTitle = () => this.refs.title.focus();
    // this.focusAuthor = () => this.refs.author.focus();
    this.onBodyChange = (body) => this.setState({body});
    this.onTitleChange = (e) => this.setState({title: e.target.value});
    this.onAuthorChange = (e) => this.setState({author: e.target.value});
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
}
  _handleKeyCommand(command) {
    const {body} = this.state;
    const newState = RichUtils.handleKeyCommand(body, command);
    if (newState) {
      this.onBodyChange(newState);
      return true;
    }
    return false;
  }

  // _handleKeyTitleCommand(command) {
  //   const {titleState} = this.state;
  //   const newState = RichUtils.handleKeyCommand(titleState, command);
  //   if (newState) {
  //     this.onTitleChange(newState);
  //     return true;
  //   }
  //   return false;
  // }

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

  hasRequiredFields(storyObj) {
    for (var key in storyObj) {
      if (storyObj[key] == null) {
        this.setState({error: `You're story is missing something: ${key}`})
        return false
      }
    }
    for (var t in storyObj.tags) {
      if (storyObj.tags[t] == null) {
        this.setState({error: `You're story is missing something: ${t}`})
        return false
      }
    }
    if (storyObj.content == '') {
      this.setState({error: `You're story is missing something: content`})
      return false
    }
    return true
  }

  countWords(content) {
    let count = 0
    content.forEach( line => {
      count += line.split(' ').length
    })
    return count
  }

  updateTags(tag, value) {
    this.setState({
      [tag]: value
    })
  }

  uploadContent() {
    const markup = {
      'BOLD': ['<strong>', '</strong>'],
      'ITALIC': ['<em>', '</em>'],
      'UNDERLINE': ['<u>', '</u>']
    };
    const contentState = this.state.body.getCurrentContent()
    const raw = convertToRaw(contentState)
    const content = backdraft(raw, markup)

    const storyObj = {
      id: this.props.id,
      title: this.state.title,
      author: this.state.author,
      author_id: this.props.user_id,
      content: content,
      img: this.props.url,
      tags: {
        form: this.state.form,
        theme: [this.state.theme1, this.state.theme2],
        location: this.state.location,
        length: this.countWords(content) + ' words'
      },
      backup: raw
    }
    
    if (this.hasRequiredFields(storyObj)) {
      console.log('upload!')
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
    const { title, author, body } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    // var contentState = editorState.getCurrentContent();
    // if (!contentState.hasText()) {
    //   if (contentState.getBlockMap().first().getType() !== 'unstyled') {
    //     className += ' RichEditor-hidePlaceholder';
    //   }
    // }

    return (
      <ArticleWithBg>
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
        <div className='large-card editor'>
          <div onClick={this.focusBody} className="RichEditor-editor-body">
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={body}
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
      </ArticleWithBg>
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