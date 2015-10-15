/** @jsx React.DOM */
console.log(__dirname)

var React = require('react');
var babel = require('babel')
var code = babel.transform(require('./components/StoryBoard.jsx'))
var StoryBoard = React.createFactory(code);

var mount = document.getElementById('react-app-mount');

React.render(new StoryBoard({cat: 'dog'}), mount);