const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let fp = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      const ext = path.extname(fp);
      const types = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.css': 'text/css'
      };
      res.writeHead(200, {
        'Content-Type': (types[ext] || 'text/plain') + ';charset=utf-8'
      });
      res.end(data);
    }
  });
});

server.listen(8765, () => {
  console.log('Server running at http://localhost:8765');
});
