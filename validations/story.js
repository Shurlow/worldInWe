'use strict';

const Joi = require('joi');

module.exports.story = {
  body: {
    id: Joi.required(),
    title: Joi.string().max(100).required(),
    author: Joi.string().max(40).required(),
    author_id: Joi.number().required(),
    content: Joi.string().max(300).required(),
    topic: Joi.string(),
    tags: {
      form: Joi.string().max(30).required(),
      theme1: Joi.string().max(300).required(),
      theme2: Joi.string().max(300).required(),
      length: Joi.string().max(300).required(),
      location: Joi.string().max(300).required()
    },
    image: Joi.string().uri().required().default()
  }
};

module.exports.query = {
  query: {
    type: Joi.string(),
    tag: Joi.string()
  }
}
