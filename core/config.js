/**
 * Carga de modulos requeridos por la aplicación
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var mongoose = require('mongoose');
global.validate = require("validate.js");
var app = express();

configureConnectionDB();
configureWebServer();
configureControllers();

/**
 * Captura de error 404
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Manejador de error
 * error handler
 */
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Funcion que realiza la configuracion del servidor web
 * y defincion de los modulos y caracteristicas asociadas al servidor
 */
function configureWebServer() {
    var webPath = path.join(__dirname, '../public');
    app.use(express.static(webPath));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
}

/**
 * Funcion que realiza la configuracion de los controladores de la aplciación
 */
function configureControllers() {
    console.log("Realizando la configuración de los controladores y endpoints de la aplciación");
    app.use('/inferenciador/api/v1/rule', require('./controllers/ruleController'));
}

/**
 * Funcion que realiza la configuracion de la conexion con la base de datos
 * MongoDb
 */
function configureConnectionDB() {
    console.log('realizando la conexion con la base de datos');
    //mongodb://<dbuser>:<dbpassword>@ds145039.mlab.com:45039/inferenciador
    mongoose.connect('mongodb://prueba:prueba@ds145039.mlab.com:45039/inferenciador', function (err, res) {
        if (err) {
            console.log('ERROR: connecting to Database. ' + err);
        } else {
            console.log('conexion exitosa con la base de datos');
        }
    });
     var models = require('./models/rule')(app, mongoose);
}

module.exports = app;
