//test file to make sure api key is working

require('dotenv').config(); 
const axios = require('axios');

const fetchWorkouts = async () => {
    const apiKey = process.env.HEVY_API_KEY; 

    if (!apiKey) {
        console.error('API Key is missing');
        return;
    }

    try {
        //pre made endpoint
        const response = await axios.get('https://api.hevyapp.com/v1/workouts?page=1&pageSize=5', {
            headers: {
                'accept': 'application/json',
                'api-key': apiKey, 
            },
        });

        console.log('Workouts:', response.data);
    } catch (error) {
        console.error('Error fetching workouts:', error.response?.data || error.message);
    }
};

fetchWorkouts();
