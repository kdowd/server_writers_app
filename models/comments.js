const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema(
	{
		comment: String,
		likes: Number,
		writer_id: Schema.Types.ObjectId,
		user_email: String,
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
	}
);

// singular capitalized name for the mongo collection
var CommentModel = mongoose.model('Comment', CommentsSchema);

module.exports = CommentModel;
