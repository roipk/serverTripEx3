
const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
    routers = require('./routes/routes.js');

const port = 3001;
const app=express();

app.get('/',(req,res) => {
    fs.readFile('html/main.html',  (err, html) => {
    if (err) {
        throw err;
    }

    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
    })
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});



