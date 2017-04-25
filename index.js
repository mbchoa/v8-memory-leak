var http = require('http');

var server = http.createServer(function (req, res) {
    for (let i=0; i<1000; i++) {
        server.on('request', function leakyFunc () {});
    }

    res.end('Hello World\n');
}).listen(3417, 'localhost');
server.setMaxListeners(0);
console.log('Server running at http://localhost:3417. Process PID: ', process.pid);
