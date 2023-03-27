var express = require('express');
var router = express.Router();
var cors = require('cors')
const controller = require('../controllers/commande.controller')

var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

router.get('/', cors(corsOptions), controller.findAll);
router.get('/:id', cors(corsOptions), controller.findOne);
router.post('/', cors(corsOptions), controller.create);
router.put('/', cors(corsOptions), controller.update);
router.delete('/:id', cors(corsOptions), controller.deleteOne);

module.exports = router;