/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Borrow = require('./borrow.model');

exports.register = function(socket) {
  Borrow.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Borrow.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('borrow:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('borrow:remove', doc);
}