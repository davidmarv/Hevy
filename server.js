//http://localhost:3000/displayworkouts.html
//super basic server to run it on 
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files (HTML, JS)

app.get('/workouts', async (req, res) => {
    const apiKey = process.env.HEVY_API_KEY;

    if (!apiKey) {
        res.status(500).send('API Key is missing');
        return;
    }

    try {
        const response = await axios.get('https://api.hevyapp.com/v1/workouts?page=1&pageSize=10', {
            headers: {
                'accept': 'application/json',
                'api-key': apiKey,
            },
        });

        res.json(response.data); // Return workouts data
    } catch (error) {
        res.status(500).send('Error fetching workouts');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
