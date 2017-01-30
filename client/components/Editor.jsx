import React from 'react'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import TagSelect from './TagSelect'
import ArticleWithBg from './ArticleWithBg'
import CtrlBar from './CtrlBar'

class CustomEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    }

    this.focusBody = () => this.refs.body.focus();
    this.focusTitle = () => this.refs.title.focus();
    this.focusAuthor = () => this.refs.author.focus();
    this.updateTags = (tag, value) => { this.props.updateNewStory({ [tag]: value })}
    this.onTitleChange = (e) => this.props.updateNewStory({title: e.target.value});
    this.onProducerChange = (e) => this.props.updateNewStory({
      producer: e.target.value
    });
    this.onDirectorChange = (e) => this.props.updateNewStory({
      director: e.target.value
    });

    //RichUtils
    // this.onChange = (editorState) => this.setState({editorState});
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }


  _onTab(e) {
    const maxDepth = 4;
    this.onBodyChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onBodyChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onBodyChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  uploadContent() {
    this.props.uploadStory()
  }

  onBodyChange(editorState) {
    this.setState({editorState})
    let options = {
      inlineStyles: {
        BOLD: {element: 'b'},
        ITALIC: {
          // Add custom attributes. You can also use React-style `className`.
          attributes: {class: 'foo'},
          // Use camel-case. Units (`px`) will be added where necessary.
          style: {fontSize: 12}
        },
        // Use a custom inline style. Default element is `span`.
        RED: {style: {color: '#900'}},
      },
    };
    const contentState = editorState.getCurrentContent()
    const backup = convertToRaw(contentState)
    const rawText = stateToHTML(contentState, options)
    this.props.updateNewStory({
      backup,
      rawText
    })
  }

  render() {
    const { editorState } = this.state;
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <ArticleWithBg className='editor'>
        <header className="center">
          <h3 onClick={this.focusTitle} className="title">
            <input placeholder="title" ref='title' onChange={this.onTitleChange.bind(this)}/>
          </h3>
          <div onClick={this.focusProducer}>
            <h4 className='nameInput' >Produced by
              <input placeholder="producer" className="name" ref='producer' onChange={this.onProducerChange.bind(this)}/>
            </h4>
          </div>
          <div onClick={this.focusDirector}>
            <h4 className='nameInput' >Directed By
              <input placeholder="director" className="name" ref='director' onChange={this.onDirectorChange.bind(this)}/>
            </h4>
          </div>
        </header>
        <CtrlBar {...this.props}/>
        <div className='RichEditor-root large-card body'>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div onClick={this.focusBody} className={className}>
            <Editor
              editorState={editorState}
              onChange={this.onBodyChange.bind(this)}
              placeholder="Tell your story..."
              ref="body"
              spellCheck={true}
            />
          </div>
        </div>
        <div className='story-sidebar'>
          <TagSelect updateTags={this.updateTags.bind(this)} />
        </div>
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
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
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

CustomEditor.propTypes = {
  // uploadStory: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired
}

export default CustomEditor
