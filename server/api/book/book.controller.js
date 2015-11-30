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
  Book.findById(req.params.id)
      .exec(function (err, book) {
        if (err) { return handleError(res, err); }
        if(!book) { return res.status(404).send('Not Found'); }
        var updated = _.merge(book, req.body);
        book.populate('owner', 'name')
            .populate('requester', 'name')
            .populate('borrower', 'name', function(err, book) {
              updated.save(function (err) {
                if (err) { return handleError(res, err); }
                return res.status(200).json(book);
              });
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

exports.request = function(req, res) {
  req.body = {requested: true,
              requester: req.body.requester,
              requestedDate: new Date()};
  exports.update(req, res);
};

exports.cancelRequest = function(req, res) {
  req.body = {requested: false,
              requester: undefined,
              requestedDate: undefined};
  exports.update(req, res);
}

exports.approveRequest = function(req, res) {
  var dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);

  req.body = {requested: false,
              requester: undefined,
              requestedDate: undefined,
              onLoan: true,
              borrower: req.body.requester,
              borrowedDate: new Date(),
              dueDate: dueDate};

  exports.update(req, res);
};

exports.denyRequest = function(req, res) {
  req.body = {requested: false,
              requester: undefined,
              requestedDate: undefined};

  exports.update(req, res);
};

exports.return = function(req, res) {
  req.body = {onLoan: false,
              borrower: undefined,
              borrowedDate: undefined,
              dueDate: undefined};

  exports.update(req, res);
};

function handleError(res, err) {
  return res.status(500).send(err);
}
