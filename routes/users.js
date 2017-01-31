var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/{id}', function(req, res) {
    console.log('Obteniendo el id de la regla'+req.get('id'));
});
router.post('/', function(req, res) {
    console.log('Obteniendo peticion post');
});

module.exports = router;
