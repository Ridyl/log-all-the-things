const express = require('express');
const fs = require('fs');
const app = express();
const csvToJson = require('convert-csv-to-json');
const logPath = './log.csv'

// check if log file exists
if(!fs.existsSync(logPath)) {
    // if the file does not exist we create one
    fs.writeFile(logPath,'Agent,Time,Method,Resource,Version,Status\n','utf8', (err) => {
        if (err) console.log(err);
        else {
            console.log('New log file created.');
        }
    });
}

app.use((req, res, next) => {
    // stores all necessary values into an object for readablity and easy access
    const log =
        {
            agent : req.headers['user-agent'],
            time : new Date().toISOString(),
            method : req.method,
            resource : req.originalUrl,
            version : `HTTP/${req.httpVersion}`,
            status : 200
        };

    const logLine = `${log.agent},${log.time},${log.method},${log.resource},${log.version},${log.status}\n`;

    fs.appendFile(logPath, logLine, (err) => {
        if (err) console.error('Error writing to log file', err);
    })

    next();
});

app.get('/', (req, res) => {
// write your code to respond "ok" here
    res.status(200).send('ok');
    console.log('ok');
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(logPath);
    res.status(200).json(json);
});

module.exports = app;