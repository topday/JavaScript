var fs = require('fs'),
    http = require('http');
var ws = require("nodejs-websocket")

var PORT = 8080;
var WSPORT = PORT + 1;

var server = ws.createServer(function (conn) {

    conn.on("binary", function (inStream) {
        let data = new Buffer(0);

        inStream.on("readable", function () {
            let newData = inStream.read();

            if (newData) {

                data = Buffer.concat([data, newData], data.length + newData.length);
            }
        });

        inStream.on("end", function () {

            server.connections.forEach(function (conn) {
                conn.sendBinary(data);
            });
        });
    });

    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    });
}).listen(WSPORT);

var streamServer = http.createServer( function(request, response) {

  response.connection.setTimeout(0);

  console.log(
    'Stream Connected: ' +
    request.socket.remoteAddress + ':' +
    request.socket.remotePort
  );

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(fs.readFileSync('html.js'));

}).listen(PORT);;
