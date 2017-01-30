'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    id: Joi.string().required(),
    title: Joi.string().required().min(3).max(30).label('Title'),
    author: Joi.string(),
    author_id: Joi.string().required(),
    rawText: Joi.required().label('Content'),
    tags: Joi.object().keys({
      form: Joi.string().required(),
      theme1: Joi.string().required(),
      theme2: Joi.string().required(),
      length: Joi.string().required(),
      location: Joi.string().required()
    }).required()
  }
};

// email: Joi.string()
//   .label('Email')
//   .required()
//   .email()
//   .trim(),
//
// password: Joi.string()
//   .label('Password')
//   .required()
//   .trim()
//   .min(8)

// module.exports = {
//   'id': {
//     notEmpty: true,
//   },
//   'password': {
//     notEmpty: true,
//     isLength: {
//       options: {min: 8},
//       errorMessage: 'Must be between at least 8 chars long'
//     },
//     errorMessage: 'Invalid Password' // Error message for the parameter
//   },
//   'title': {
//     notEmpty: true
//   },
//   'author': {
//     notEmpty: true
//   },
//   'author_id': {
//     notEmpty: true
//   },
//   'content': {
//     notEmpty: true,
//
//   },
// };
