var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log('solicitud de pagina principal de la aplicacion');
  //res.sendFile('/public/index.html');
  //res.render('index');
});
module.exports = router;
