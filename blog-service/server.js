const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./blog');
const port = process.env.PORT || 3000;

var log4js = require('log4js');
log4js.configure('./config/log4js.json');

var log = log4js.getLogger("startup");

try {
    require('fs').mkdirSync('./log');
} catch (e) {
    if (e.code != 'EEXIST') {
        console.error("Could not set up log directory, error was: ", e);
        process.exit(1);
    }
}

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(cors());
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json({ limit: '5mb', extended: true }));
app.use(router);

var server = app.listen(port, function () {
    log.info('Express server listening on port ', server.address().port, " with pid ", process.pid);
});