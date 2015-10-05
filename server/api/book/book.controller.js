'use strict';

var _ = require('lodash');
var Book = require('./book.model');
var Borrow = require('../borrow/borrow.model');

// Get list of books
exports.index = function(req, res) {
  Book.find(function (err, books) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(books);
  });
};

// Get a single book
exports.show = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    return res.json(book);
  });
};

// Creates a new book in the DB.
exports.create = function(req, res) {
  Book.create(req.body, function(err, book) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(book);
  });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Book.findById(req.params.id, function (err, book) {
    if (err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    var updated = _.merge(book, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(book);
    });
  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

//Generic function to return books borrowed by or from a user in the DB.
function findBorrowed(req, res, byOrFrom) {
  var findParam = {};
  if (byOrFrom === 'by') {
    findParam = {borrower: req.params.id};
  } else if (byOrFrom === 'from') {
    findParam = {owner: req.params.id};
  } else {
    throw 'byOrFrom must be "by" or "from".'
  }
  Borrow.find(findParam, function (err, borrows) {
    if(err) { return handleError(res, err); }
    if(borrows.length === 0) { return res.status(404).send('None'); }
    var borrowedBooks = [];
    borrows.forEach(function(borrow) {
      Book.findById(borrow.book, function (err, book) {
        if (err) {
          console.log('book not found: ' + borrow.book +
                      ' in borrow: ' + borrow.id);
        }
        if (book) {
          borrowedBooks.push(book);
        }
      });
    });
    res.json(borrowedBooks);
  });
}

//Finds books borrowed by a user in the DB.
exports.findBorrowedBy = function(req, res) {
  findBorrowed(req, res, 'by');
};

//Finds books borrowed from a user in the DB.
exports.findBorrowedFrom = function(req, res) {
  findBorrowed(req, res, 'from');
};

function handleError(res, err) {
  return res.status(500).send(err);
}
