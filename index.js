const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');

http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    let fileName;

    if(q.pathname === '/') {
        fileName = `./index.html`
    } else {
        fileName = `.${q.pathname}.html`
    }

    fs.readFile(fileName, (err, data) => {
        if(err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(fs.readFileSync('./404.html'))
            res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
}).listen(8080);