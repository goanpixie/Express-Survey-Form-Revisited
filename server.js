// require express
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
 res.render("index");
})

 app.post('/results', function (req, res){
    res.render('results', {user: req.body})//req.body:holds dictionary from the form & user:variable which you correspond to the information
});

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

var io =require('socket.io').listen(server)

io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);

  socket.on('form_submitted', function (data){
    var random = Math.floor((Math.random() * 100) + 1);
    console.log(random);
    socket.emit('info',data,random);
  })




  //all the socket code goes in here!
})
