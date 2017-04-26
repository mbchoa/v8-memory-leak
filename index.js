var http = require('http');
var memwatch = require('memwatch-next');
var heapdump = require('heapdump');
var partialRight = require('lodash.partialright');

var LEAK_RATE = 500;

var writeSnapshot = partialRight(heapdump.writeSnapshot, function (err, filename) {
    if (err) console.error(err);
    console.error('Heapdump file written to ', filename);
});

memwatch.on('leak', function (info) {
    console.error('Memory leak detected: ', info);
    writeSnapshot();
});

memwatch.on('stats', function (stats) {
    console.log('Memory stats: ', stats);
});

var server = http.createServer(function (req, res) {
    for (let i=0; i<LEAK_RATE; i++) {
        server.on('request', function leakyFunc () {});
    }

    res.end('Hello World\n');
}).listen(3417, 'localhost');
server.setMaxListeners(0);

console.log('Server running at http://localhost:3417. Process PID: ', process.pid);
