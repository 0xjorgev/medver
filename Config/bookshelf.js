var conex = require('./db');
var knex = require('knex')(conex);
var bookshelf = require('bookshelf')(knex);
var checkit  = require('checkit');
var Promise  = require('bluebird');
var bcrypt   = Promise.promisifyAll(require('bcrypt'));

module.exports = bookshelf;