const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    
    // console.log('Request coming in!');


    res.setHeader('Content-Type', 'Text/html');

    let path = './views/';
    switch (req.url){
        case '/': 
            path += 'index.html';
            break;
        case '/addcourse':
            path += 'addcourse.html';
            break;
        case '/signup':
            path += 'signup.html';
            break;
        case '/courses':
            path += 'courses.html';
            break;
}

    fs.readFile(path, (err, data) => {
        res.end(data);
    });

}); // end server

server.listen(3000, 'localhost', () => {
    console.log('app is working on port 3000');
}); // end server.listen


