'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BorrowSchema = new Schema({
  book: {type: String, required: true},
  owner: {type: String, required: true},
  borrower: {type: String, required: true},
  dateRequested: {type: Date, default: new Date()},
  dateApproved: Date,
  dateDenied: Date,
  active: Boolean
});

module.exports = mongoose.model('Borrow', BorrowSchema);
