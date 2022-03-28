const express = require('express');
const cors = require('cors');
const Writers = require('./models/writers');
const Comments = require('./models/comments');
const Replies = require('./models/replies');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./connection');
app.use(cors());

// app to use api routes

const router = express.Router();

app.use('/api', router);

////////////////////////ALL ROUTES

router.get('/view-writers', function (req, res) {
	Writers.find().then((response) => {
		res.json(response);
	});
});

//	.populate({ path: 'comments', select: 'comment -writer_id -_id', options: { sort: { updatedAt: -1 } } })
//localhost:4000/api/view-writer-by-id/6239949aa776bf9d4212802a
http: router.get('/view-writer-by-id/:id', function (req, res) {
	Writers.findOne({ _id: req.params.id })
		.populate('comments')
		.then((response) => {
			res.json(response);
		});
});

router.get('/view-writer-by-gender/:gender', function (req, res) {
	console.log('>>>>>>>>> ', req.params.gender);

	Writers.find()
		.where('gender')
		.equals(req.params.gender)
		.then((response) => {
			res.json(response);
		});
});

// add like
router.patch('/add-like/:id', function (req, res) {
	let action = req.body.action;
	let counter = action == 'up' ? 1 : -1;

	Comments.findByIdAndUpdate(req.params.id, { $inc: { likes: counter } }, { new: true })
		.then((response) => {
			res.json(response);
		})
		.catch((error) => {
			res.json({ success: false, error: error });
		});
});

// end add like

// CREATE NEW COMMENT

router.post('/add-comment', function (req, res) {
	var newComment = new Comments();
	var theFormData = req.body;

	Object.assign(newComment, theFormData);
	console.log('>>> ', newComment);

	newComment
		.save()
		.then((response) => {
			return res.json(response);
		})
		.catch((err) => {
			return res.json({ error: true, error_type: err });
		});
});

// END NEW COMMENT

// CREATE
router.post('/writer-create', function (req, res) {
	var newWriter = new Writers();
	var theFormData = req.body;
	console.log('>>> ', theFormData);

	Object.assign(newWriter, theFormData);

	newWriter
		.save()
		.then((response) => {
			return res.json(response);
		})
		.catch((err) => {
			// if there was an error return it to the app/user
			return res.json({ error: true, error_type: err });
		});
});

// END CREATE

router.get('/view-writer-by-name/:name', function (req, res) {
	// console.log(req.params.name);
	Writers.findOne({ name: req.params.name }).then((response) => {
		res.json(response);
	});
});

// dev only, remove all comments
router.get('/delete-comments', (req, res) => {
	Comments.deleteMany({}, function (err) {
		res.json({ result: 'comments deleted' });
	});
});

// // start for replies model

router.get('/view-replies', function (req, res) {
	Replies.find().then((response) => {
		res.json(response);
	});
});
router.get('/view-replies-by-comment-id/:comment_id', function (req, res) {
	Replies.find({ comment_id: req.params.comment_id }).then((response) => {
		res.json(response);
	});
});

router.post('/reply-to-comment', function (req, res) {
	console.log(req.body);
	var newReply = new Replies();
	var theFormData = req.body;
	console.log('>>> ', theFormData);

	Object.assign(newReply, theFormData);

	newReply
		.save()
		.then((response) => {
			return res.json(response);
		})
		.catch((err) => {
			// if there was an error return it to the app/user
			return res.json({ error: true, error_type: err });
		});
});

// // end for replies model

// catch bad endpoints on the api route only
router.get('/*', (req, res) => {
	return res.json({ result: 'hey, no hacking please....' });
});

const PORT = 4000;

app.listen(PORT, () => {
	console.log(`Phew!, listening on port ${PORT}`);
});
