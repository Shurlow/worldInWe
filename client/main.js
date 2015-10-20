var React = require('react');
var ReactDOM = require('react-dom');
// var babel = require('babel')
// console.log('Babel')
// var code = babel.transform(require('./components/ReactApp.jsx'))
// console.log('babel done', code)
// var StoryBoard = React.createFactory(code);
var component = require('./components/ReactApp.js')
var ReactApp = React.createFactory(component)

var mount = document.getElementById('react-app-mount');
console.log('In main')

ReactDOM.render(ReactApp({cat: ['Cat', 'Dog']}), mount);