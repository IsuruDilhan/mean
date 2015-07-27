var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

// configuration =================

mongoose.connect('mongodb://localhost:27017/mean');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.use(bodyParser.json());

app.use('/js', express.static(__dirname + '/public/js'));

var User = mongoose.model(
	'Users', 
	{ name: String, email: String, age: Number, address: String}
);

// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
	app.get('/api/users', function (req, res) {
		User.find(function (err, users) {
			res.json(users);
		})
	});

	// get all todos
	app.get('/api/users/:id', function (req, res) {
		User.findById(req.params.id, function (err, obj) {
			res.send(obj);
		})
	});

	app.post('/api/users/', function (req, res) {
		var user = new User(req.body);
		res.status(200).send(user);
		user.save();
	});

	// Remove single post by id
	app.delete('/api/users/:id', function (req, res) {
		User.findById(req.params.id, function (err, obj) {
			if (!err) {
				res.status(200).send(obj);
				obj.remove();
			}
		})
	});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});