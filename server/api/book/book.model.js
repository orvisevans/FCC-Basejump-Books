'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: {type: String, required: true},
  author: {type: String, required: true},
  coverUrl: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  requested: {type: Boolean, default: false},
  requester: {type: Schema.Types.ObjectId, ref: 'User'},
  requestedDate: Date,
  onLoan: {type: Boolean, default: false},
  borrower: {type: Schema.Types.ObjectId, ref: 'User'},
  borrowedDate: Date,
  dueDate: Date,
  dateAdded: {type: Date, default: Date.now},
  public: {type: Boolean, default: true},
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Book', BookSchema);
