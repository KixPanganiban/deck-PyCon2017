var bodyParser = require('body-parser');
var express = require('express');
var querystring = require('querystring');
var zerorpc = require('zerorpc');

/* Set everything up */
var app = express();
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

var mu2 = require('mu2');
mu2.root = __dirname + '/views';

var dbServer = new zerorpc.Client();
dbServer.connect('tcp://127.0.0.1:8000');

/* Routers and so on */
app.get('/', function(req, res) {
    dbServer.invoke('get_all_potatoes', function(err, zres, more) {
        if (err) {
            console.error(err);
        } else {
            var htmlStream = mu2.compileAndRender('index.html', { 
                potatoes: zres,
                url: function() {return querystring.stringify({type: this.type})}
         });
            htmlStream.pipe(res);
        }
    });
});

app.get('/delete/', function(req, res){
    dbServer.invoke('delete_potato', 'type', req.query['type'], function(err, zres, more) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/update/', function(req, res) {
    dbServer.invoke('search_potato', 'type', req.query['type'], function(err, zres, more) {
        if (err) {
            console.error(err);
        } else {
            var htmlStream = mu2.compileAndRender('update.html', zres);
            htmlStream.pipe(res);
        }
    });
});

app.post('/update/', function(req, res) {
    dbServer.invoke('update_potato', 'type', req.body['type'], req.body, function(err, zres, more) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.post('/add', function(req, res) {
    dbServer.invoke('create_potato', req.body , function(err, zres, more) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
});

app.listen(3000, function() {
    console.log('Potatolist online on 3000...');
});