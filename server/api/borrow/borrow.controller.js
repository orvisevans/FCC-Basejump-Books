'use strict';

var _ = require('lodash');
var Borrow = require('./borrow.model');

// Get list of borrows
exports.index = function(req, res) {
  Borrow.find(function (err, borrows) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(borrows);
  });
};

// Get a single borrow
exports.show = function(req, res) {
  Borrow.findById(req.params.id, function (err, borrow) {
    if(err) { return handleError(res, err); }
    if(!borrow) { return res.status(404).send('Not Found'); }
    return res.json(borrow);
  });
};

// Creates a new borrow in the DB.
exports.create = function(req, res) {
  Borrow.create(req.body, function(err, borrow) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(borrow);
  });
};

// Updates an existing borrow in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Borrow.findById(req.params.id, function (err, borrow) {
    if (err) { return handleError(res, err); }
    if(!borrow) { return res.status(404).send('Not Found'); }
    var updated = _.merge(borrow, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(borrow);
    });
  });
};

// Deletes a borrow from the DB.
exports.destroy = function(req, res) {
  Borrow.findById(req.params.id, function (err, borrow) {
    if(err) { return handleError(res, err); }
    if(!borrow) { return res.status(404).send('Not Found'); }
    borrow.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}