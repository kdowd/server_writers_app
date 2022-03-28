const mongoose = require('mongoose');
const dbname = 'artists';
const username = 'kdowd';
const password = 'ursulaNiamh';

// with backticks
const url = `mongodb+srv://${username}:${password}@yoobee2020.vhp1l.gcp.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// end editable

// connection start

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// feedback to let us know we succeeded

mongoose.connection.on('connected', (err, res) => {
	console.log('Success! Connected to MongoDB');
});

// let us know if we failed

mongoose.connection.on('error', (err) => {
	console.log('Error connecting to MongoDB ', err);
});

// end connection code
