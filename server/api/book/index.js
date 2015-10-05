'use strict';

var express = require('express');
var controller = require('./book.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/borrowedBy/:borrowerId', controller.findBorrowedBy);
router.get('/borrowedFrom/:ownerId', controller.findBorrowedFrom);
router.put('/request/:bookId/:requesterId', controller.requestBook);
router.put('/approveRequest/:bookId/:borrowerId', controller.approveRequest);
router.put('/returnBook/:bookId', controller.returnBook);

module.exports = router;
