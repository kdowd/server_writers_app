const mongoose = require('mongoose');
const Comment = require('./comments');

var Schema = mongoose.Schema;

var WritersSchema = new Schema(
	{
		first_name: String,
		last_name: String,
		image_name: String,
		DOB: String,
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
	}
);

WritersSchema.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'writer_id',
	justOne: false,
});

WritersSchema.virtual('replys', {
	ref: 'Reply',
	localField: '_id',
	foreignField: 'writer_id',
	justOne: false,
});

// singular capitalized name for the mongo collection - artists
const Writers = mongoose.model('Writer', WritersSchema);

module.exports = Writers;
