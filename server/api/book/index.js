'use strict';

var express = require('express');
var controller = require('./book.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/find', controller.find);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.put('/request/:bookId/:requesterId', controller.requestBook);
router.put('/approveRequest/:bookId/:borrowerId', controller.approveRequest);
router.put('/denyRequest/:bookId/:borrowerId', controller.denyRequest);
router.put('/returnBook/:bookId', controller.returnBook);

module.exports = router;
