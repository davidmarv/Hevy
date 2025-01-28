const fetchWorkouts = async () => {
    try {
        const response = await axios.get('/workouts'); 
        console.log('Response Data:', response.data);  
        
        
        const workouts = response.data.workouts; 
        
        const workoutList = document.getElementById('workout-list');
        
        workoutList.innerHTML = '';

        // Loop through each workout 
        workouts.forEach(workout => {
            // Create a new list item
            const listItem = document.createElement('li');
            listItem.classList.add('workout-item');
            
            // Add workout details to the list item
            listItem.innerHTML = `
                <h3>${workout.title}</h3>
                <p><strong>Description:</strong> ${workout.description}</p>
                <p><strong>Start Time:</strong> ${new Date(workout.start_time).toLocaleString()}</p>
                <p><strong>End Time:</strong> ${new Date(workout.end_time).toLocaleString()}</p>
                <ul>
                    ${workout.exercises.map(exercise => `
                        <li><strong>${exercise.title}</strong> - ${exercise.notes || 'No notes'}</li>
                    `).join('')}
                </ul>
            `;
            
            workoutList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching workouts:', error.message);
    }
};

document.getElementById('load-workouts').addEventListener('click', fetchWorkouts);
