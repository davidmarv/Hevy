require('dotenv').config(); // Load environment variables from .env
const axios = require('axios');

const fetchWorkouts = async () => {
    const apiKey = process.env.HEVY_API_KEY; // Access the API key from .env

    if (!apiKey) {
        console.error('API Key is missing');
        return;
    }

    try {
        const response = await axios.get('https://api.hevyapp.com/v1/workouts?page=1&pageSize=5', {
            headers: {
                'accept': 'application/json',
                'api-key': apiKey, // Use 'api-key' header instead of 'Authorization'
            },
        });

        console.log('Workouts:', response.data);
    } catch (error) {
        console.error('Error fetching workouts:', error.response?.data || error.message);
    }
};

fetchWorkouts();
