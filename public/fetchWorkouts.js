let allWorkouts = []; // Stores all fetched workouts
let currentPage = 1;
const itemsPerPage = 5; // Adjust as needed

const fetchAllWorkouts = async () => {
    try {
        const apiUrl = '/workouts'; 
        let page = 1;
        let pageCount = 2; 
        allWorkouts = []; // Reset array on fetch

        while (page <= pageCount) {
            console.log(`Fetching page: ${page}`);
            
            const response = await axios.get(apiUrl, { params: { page, pageSize: 10 } });
            console.log('API Response:', response.data);

            if (response.data && response.data.workouts) {
                allWorkouts = allWorkouts.concat(response.data.workouts); // Append workouts
                
                // Update total page count
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

        currentPage = 1; // Reset to first page
        renderWorkouts(); // Display paginated data
    } catch (error) {
        console.error('Error fetching workouts:', error.message);
    }
};

// Function to display only workouts for the current page
const renderWorkouts = () => {
    const workoutList = document.getElementById('workout-list');
    workoutList.innerHTML = ''; // Clear list before rendering

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedWorkouts = allWorkouts.slice(start, end);

    paginatedWorkouts.forEach(workout => {
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

    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end >= allWorkouts.length;
};

// Add Pagination Buttons
const prevBtn = document.createElement('button');
prevBtn.textContent = "Previous";
prevBtn.disabled = true;
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderWorkouts();
    }
});

const nextBtn = document.createElement('button');
nextBtn.textContent = "Next";
nextBtn.disabled = true;
nextBtn.addEventListener('click', () => {
    if ((currentPage * itemsPerPage) < allWorkouts.length) {
        currentPage++;
        renderWorkouts();
    }
});

// Append buttons below the list
document.getElementById('load-workouts').after(prevBtn, nextBtn);

// Attach event listener to fetch button
document.getElementById('load-workouts').addEventListener('click', fetchAllWorkouts);
