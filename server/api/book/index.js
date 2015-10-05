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
router.get('/requestedBy/:requesterId', controller.findRequestedBy);
router.get('/requestedFrom/:ownerId', controller.findRequestedFrom);
router.put('/request/:bookId/:requesterId', controller.requestBook);
router.put('/approveRequest/:bookId/:borrowerId', controller.approveRequest);
router.put('/denyRequest/:bookId/:borrowerId', controller.denyRequest);
router.put('/returnBook/:bookId', controller.returnBook);

module.exports = router;
