const http = require('http');
const port = process.env.PORT || 8080;
const app = require('./app')
const server = http.createServer(app);


server.listen(port, function(){
    console.log('Server start on localhost: ' + port)
})