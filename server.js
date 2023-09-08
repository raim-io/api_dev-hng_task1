const express = require('express');
const moment = require('moment');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 8080;

// initialize express app
const app = express();

// test api server
app.get('/', (req, res) => {
	res.send('API is running...');
});

// main api endpoint
app.get('/api', (req, res) => {
	const { slack_name, track } = req.query;

	// define the current date and current time using momentjs
	const date = moment();
	const currentDay = date.format('dddd');
	// the utc time will be in the format "2023-09-08T12:19:14Z"
	const utcTime = date.toISOString().slice(0, -5) + 'Z';

	//const date = new Date();
	//const currentDay = date.toLocaleDateString('en-US', { weekday: 'long' });
	//// the utc time will be in the format "2023-09-08T12:01:42.858Z" 
	//const utcTime = date.toISOString();

	try {
		if (!slack_name || !track) {
			console.log('Input your slack_name and track');

			return res.sendStatus(400);
		}

		const status = 200;

		const result = {
			slack_name,
			current_day: currentDay,
			utc_time: utcTime,
			track,
			github_file_url: "https://github.com/raim-io/api_dev-hng_task1/blob/master/server.js",
			github_repo_url: "https://github.com/raim-io/api_dev-hng_task1.git",
			status_code: status,
		};

		res.json(result);
		res.status(200);
	} catch (error) {
		res.status(400);
		console.log(error);
		throw new Error(error.message);
	}
});

app.listen(PORT, console.log(`server is running on port ${PORT}`));
