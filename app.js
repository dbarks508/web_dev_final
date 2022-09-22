const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    
console.log('hello world');


res.setHeader('Content-Type', 'Text/html');

let path = 'index.html';

fs.readFile(path, (err, data) => {
    if (err) {
        console.log(err);
        res.end(data);
    } else {
        res.end(data);
    }
});


});

server.listen(3000, 'localhost', () => {
    console.log('app is working on port 3000');
}); // end server function


