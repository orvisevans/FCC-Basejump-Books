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
router.put('/request/:id', controller.request);
router.put('/cancel-request/:id', controller.cancelRequest);
router.put('/approve-request/:id', controller.approveRequest);
router.put('/deny-request/:id', controller.denyRequest);
router.put('/return/:id', controller.return);

module.exports = router;
