const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
}


if(url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) =>  {
        console.log("chunk", chunk);
        body.push(chunk);
    }) ; // it will be fired whenever a new chunk is ready to be read
    return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        console.log("parsedBody", parsedBody);
        const message = parsedBody.split('=')[1];
        fs.writeFile('message.txt', message, err => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
        
    }); 
}
}
console.log(req.url, req.method, req.headers);
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>My First Page</title></head>');
res.write('<body><h1>Hello World</h1></body>');
res.write('</html>');
res.end();

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hardcoded text'
// }

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hardcoded text';

exports.handler = requestHandler;
exports.someText = 'Some hardcoded text';
