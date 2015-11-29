'use strict';

var _ = require('lodash');
var Book = require('./book.model');
var User = require('../user/user.model');

// Get list of public books
exports.index = function(req, res) {
  Book.find({public: true})
      .populate('owner', 'name')
      .populate('requester', 'name')
      .populate('borrower', 'name')
      .exec(function (err, books) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(books);
      });
};

// Get a single book
exports.show = function(req, res) {
  Book.findById(req.params.id)
      .populate('owner', 'name')
      .populate('requester', 'name')
      .populate('borrower', 'name')
      .exec(function (err, book) {
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

//Finds books with search parameters
exports.find = function(req, res) {
  var publicQuery = req.query;
  publicQuery.public = true;
  Book.find(publicQuery)
      .populate('owner', 'name')
      .populate('requester', 'name')
      .populate('borrower', 'name')
      .exec(function (err, books) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(books);
      });
};

exports.requestBook = function(req, res) {
  var conditions = {book: req.params.bookId};
  var update = {requested: true,
                requester: req.params.requesterId,
                requestedDate: new Date()};

  Book.findAndUpdate(conditions, update, function (err, book) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(book);
  });
};

exports.approveRequest = function(req, res) {
  var dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);

  var conditions = {book: req.params.bookId};
  var update = {requested: false,
                requester: undefined,
                requestedDate: undefined,
                onLoan: true,
                borrower: req.params.borrowerId,
                borrowedDate: new Date(),
                dueDate: dueDate};

  Book.findAndUpdate(conditions, update, function (err, book) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(book);
  });
};

exports.denyRequest = function(req, res) {
  var conditions = {book: req.params.bookId};
  var update = {requested: false,
                requester: undefined,
                requestedDate: undefined};

  Book.findAndUpdate(conditions, update, function (err, book) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(book);
  });
};

exports.returnBook = function(req, res) {
  var conditions = {book: req.params.bookId};
  var update = {onLoan: false,
                borrower: undefined,
                borrowedDate: undefined,
                dueDate: undefined,
                };

  Book.findAndUpdate(conditions, update, function (err, book) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(book);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
