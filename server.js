var express = 		require('express');
var app = 			express();
var bodyParser = 	require('body-parser');
var mongoose = 		require('mongoose');
var apiController = require('./server/controllers/apiController');

app.use(bodyParser());
mongoose.connect('mongodb://localhost:27017/starterApp')

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/api/findAllUsers', apiController.findAll);
app.post('/api/saveUser', apiController.save);
app.post('/api/updateUser', apiController.update);
app.post('/api/deleteUser', apiController.delete);



app.listen(3000, function(){
	console.log("Listening to port : 3000");
});