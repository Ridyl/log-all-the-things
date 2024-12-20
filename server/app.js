const express = require('express');
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
    const log = {
        agent : req.headers['user-agent'],
        time : new Date().toString(),
        method : req.method,
        resource : req.originalUrl,
        version : `HTTP/${req.httpVersion}`,
        status : 200
    };

    const appendage = Object.values(log).split(',');
    console.log(appendage);

    fs.appendFile('log.csv', appendage, (err) => {
        if (err) {
            res.status(500).send('unable');
        }
        console.log('saved');
    })
    next();
});

app.get('/', (req, res) => {
// write your code to respond "ok" here
    res.status(200).send('ok');
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
    res.send('no');
});

module.exports = app;
