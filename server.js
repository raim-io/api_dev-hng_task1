const express = require('express');

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.listen(PORT, console.log(`server is running on port ${PORT}`));

const date = new Date();
const currentDay = date.toLocaleDateString('en-US', { weekday: 'long' });
const utcTime = date.toISOString();

app.get('/api/zuri', (req, res) => {
	const { slack_name, track } = req.query;

	const result = {
		slack_name,
		current_day: currentDay,
		utc_time: utcTime,
		track,
		github_file_url,
		github_repo_url,
		status_code
	};
});
