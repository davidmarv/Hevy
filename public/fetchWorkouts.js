const fetchAllWorkouts = async () => {
    try {
        const apiUrl = '/workouts'; 
        let page = 1; 
        let allWorkouts = [];
        let pageCount = 2; // Initial assumption update once the response gives the rest of the pages 

        while (page <= pageCount) {
            console.log(`Fetching page: ${page}`);
            
            const response = await axios.get(apiUrl, { params: { page, pageSize: 10 } });
            
            console.log('API Response:', response.data);
            
            if (response.data && response.data.workouts) {
                allWorkouts = allWorkouts.concat(response.data.workouts); // Append workouts
                
                // Update pageCount 
                if (response.data.page_count) {
                    pageCount = response.data.page_count;
                }
                
                console.log(`Fetched ${response.data.workouts.length} workouts from page ${page}`);
            } else {
                console.error('Unexpected API response structure:', response.data);
                break; 
            }

            page++; 
        }

       
        const workoutList = document.getElementById('workout-list');
        workoutList.innerHTML = ''; 
        //crappy way of displaying all of the info in 1 massive block 
        allWorkouts.forEach(workout => {
            const listItem = document.createElement('li');
            listItem.classList.add('workout-item');
            
            listItem.innerHTML = `
                <h3>${workout.title}</h3>
                <p><strong>Description:</strong> ${workout.description}</p>
                <p><strong>Start Time:</strong> ${new Date(workout.start_time).toLocaleString()}</p>
                <p><strong>End Time:</strong> ${new Date(workout.end_time).toLocaleString()}</p>
                <ul>
                    ${workout.exercises.map(exercise => `
                        <li>
                            <strong>${exercise.title}</strong><br>
                            <strong>Weight:</strong> ${exercise.sets.map(set => set.weight_kg ? set.weight_kg.toFixed(2) : 'N/A').join(', ')} kg<br>
                            <strong>Reps:</strong> ${exercise.sets.map(set => set.reps ? set.reps : 'N/A').join(', ')}
                        </li>
                    `).join('')}
                </ul>
            `;
            
            workoutList.appendChild(listItem);
        });
        
    } catch (error) {
        console.error('Error fetching workouts:', error.message);
    }
};

document.getElementById('load-workouts').addEventListener('click', fetchAllWorkouts);
