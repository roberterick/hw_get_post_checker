var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function (req, res) {
    //build the query items list
    var queryList=[];
    for (var item in req.query) {
        queryList.push({'name': item, 'value': req.query[item]});
    }
    //build the context object
    var context={};
    context.queryList=queryList;
    context.bodyList=[];
    context.requestType = 'GET';
    res.render('main', context);
});

app.post('/', function (req, res) {    
    //build the query items list
    var queryList=[];
    for (var item in req.query) {
        queryList.push({'name': item, 'value': req.query[item]});
    }
    //build the body items list
    var bodyList=[];
    for (var item in req.body) {
        bodyList.push({'name': item, 'value': req.body[item]});
    }
    //build the context object
    var context={};
    context.queryList=queryList;
    context.bodyList=bodyList;
    context.requestType = 'POST';
    res.render('main', context);
});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});