const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RepliesSchema = new Schema(
	{
		comment: String,
		comment_id: Schema.Types.ObjectId,
		user_email: String,
	},
	{
		timestamps: true,
	}
);

// singular capitalized name for the mongo collection
var ReplyModel = mongoose.model('Reply', RepliesSchema);

module.exports = ReplyModel;
