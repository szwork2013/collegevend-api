'use strict';

var restify = require('restify');

var server = restify.createServer({
    name: 'collegevend-api',
    version: '1.0.0',
    formatters: require('./formatters'),
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

require('./routes')(server);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
