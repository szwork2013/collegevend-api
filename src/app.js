'use strict';

var restify = require('restify');
var config = require('config');

var server = restify.createServer({
  name: 'collegevend-api',
  version: '1.0.0',
  formatters: require('./formatters'),
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.jsonp());
server.use(restify.CORS(config.cors));
server.use(restify.fullResponse());

require('./routes')(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
