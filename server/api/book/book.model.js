'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: {type: String, required: true},
  author: {type: String, required: true},
  coverUrl: {type: String, required: true},
  owner: {type: String, required: true},
  borrower: String,
  dateAdded: {type: Date, default: Date.now},
  public: {type: Boolean, default: true},
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Book', BookSchema);
