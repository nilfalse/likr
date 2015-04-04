var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.User = mongoose.model('User', {
	name: {type: String, unique: true}
});

exports.Question = mongoose.model('Question', {
	available_answers: [{_id: Number, pic_url: String}]
});

exports.Game = mongoose.model('Game', {
	name: String,
	answers: [{answer_id: Number, user_id: Schema.Types.ObjectId, question_id: Schema.Types.ObjectId}]
});

