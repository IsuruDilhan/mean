var mongoose = require('mongoose');

var PostsSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Posts', PostsSchema);