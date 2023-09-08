const express = require('express');
const moment = require('moment');

const PORT = 8080;

// initialize express app
const app = express();

// define the current date and current time
const date = moment();
const currentDay = date.format('dddd');
const utcTime = date.toISOString();

//const date = new Date();
//const currentDay = date.toLocaleDateString('en-US', { weekday: 'long' });
//const utcTime = date.toISOString();

// test api server
app.get('/', (req, res) => {
	res.send('API is running...');
});

// main api endpoint
app.get('/api/zuri', (req, res) => {
	const { slack_name, track } = req.query;

	try {
		if (!slack_name || !track) {
			console.log('Input your slack_name and track');

			return res.sendStatus(400);
		}

		const result = {
			slack_name,
			current_day: currentDay,
			utc_time: utcTime,
			track,
			"github_file_url": "",
			"github_repo_url": "",
			status_code: "200"
		};

		res.json(result);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});


app.listen(PORT, console.log(`server is running on port ${PORT}`));