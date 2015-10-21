var React = require('react');
var ReactDOM = require('react-dom');
var component = require('./components/StoryBoard.jsx')
var ReactApp = React.createFactory(component)

var mount = document.getElementById('react-app-mount');
console.log('In main')

ReactDOM.render(ReactApp({cat: ['Cat', 'Dog']}), mount);