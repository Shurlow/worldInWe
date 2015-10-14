/** @jsx React.DOM */
console.log(__dirname)

var React = require('react');
var StoryBoard = React.createFactory(require('./components/StoryBoard'));

var mount = document.getElementById('react-app-mount');

React.render(new StoryBoard({cat: 'dog'}), mount);