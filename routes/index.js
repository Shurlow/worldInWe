var express = require('express');
var router = express.Router();
// var React = require('react')
// var ReactDOMServer = require('react-dom/server')
// var App = React.createFactory(require('../client/main.jsx'))

// var htmlStr = ReactDOMServer.renderToString(App({stories: 'hello'}))

const mode = process.env.NODE_ENV || 'development'
const clientSrc =  mode === 'production' ? "/js/bundle.min.js" : '/js/bundle.js';

/* GET home page. */
router.get('/', function(req, res, next) {
  // var reactHtml = React.renderToString(App({}));
	res.render('index', { reactOutput: 'Loading...', file: clientSrc });
});

router.get('/*', function(req, res, next) {
	res.render('index', { reactOutput: 'Loading...', file: clientSrc });
});

module.exports = router;
