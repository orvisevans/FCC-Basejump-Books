'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: String,
  author: String,
  coverUrl: String,
  owner: String,
  borrower: String,
  dateAdded: Date,
  public: Boolean,
  active: Boolean
});

module.exports = mongoose.model('Book', BookSchema);
