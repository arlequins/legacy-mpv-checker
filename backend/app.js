// HTTP listen port
const port = 4000;

// URL for rendering
let url = '';

// Required modules
const path = require('path');
const moment = require('moment');
const phantom = require('phantom');
const express = require('express');
const log4js = require('log4js');
const fs = require('fs');
const logger = log4js.getLogger();
const app = express();

logger.info('Starting app');

/**
 * Initializing Express middleware
 */
app.use(log4js.connectLogger(logger));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get('/phantom', function (req, res, next) {

    url = req.query.url;

    let sitepage = null
    let phInstance = null
    let response = res
    phantom.create()
        .then(instance => {
            phInstance = instance
            return instance.createPage()
        })
        .then(page => {
            sitepage = page
            return page.open(url)
        })
        .then(status => {
            logger.info('status is: ' + status)
            return sitepage.property('content')
        })
        .then(content => {
            sitepage.render('./public/images/screenshot.png')
            var path = './public/data/target.html'
            fs.writeFile(path, content, 'utf8', function(err) {
                logger.info(err)
            })
            logger.info('content is: ' + content)
            sitepage.close()
            phInstance.exit()
        })
        .then(function () {
            setTimeout(function(){
                res.render('index');
            }, 5000);
        })
        .catch(error => {
            logger.info(error)
            console.log(error)
            phInstance.exit()
        })
});

// Return current datetime
app.get('/', function (req, res, next) {
    res.render('index');
});

// Return current datetime
app.get('/now', function (req, res, next) {
    res.render('now', {now: moment().format('MMMM Do YYYY, h:mm:ss a')})
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Starting Express
app.listen(port, function () {
    logger.info('App listening on port ' + port);
});

/**
 * Correctly shutdown PhantomJS process on exit, SIGINT and SIGTERM
 */
process.on('exit', function (code) {
    logger.info('Exiting (' + code + ')');
});

process.on('SIGINT', function () {
    logger.warn('Interrupted (SIGINT)');
    process.exit(2);
});

process.on('SIGTERM', function () {
    logger.warn('Terminated (SIGTERM)');
    process.exit(15);
});
