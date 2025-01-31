document.getElementById("calculate-average").addEventListener("click", async () => {
    try {
        const response = await fetch("/workouts"); 
        if (!response.ok) throw new Error("Failed to fetch workouts");

        const data = await response.json();
        if (!data.workouts) throw new Error("Unexpected API response format");

        const exerciseWeights = {};

        data.workouts.forEach(workout => {
            workout.exercises.forEach(exercise => {
                if (!exerciseWeights[exercise.title]) {
                    exerciseWeights[exercise.title] = { totalWeight: 0, count: 0 };
                }
                
                exercise.sets.forEach(set => {
                    if (set.weight_kg) {
                        exerciseWeights[exercise.title].totalWeight += set.weight_kg;
                        exerciseWeights[exercise.title].count += 1;
                    }
                });
            });
        });

        const averages = {};
        for (const exercise in exerciseWeights) {
            averages[exercise] = (exerciseWeights[exercise].totalWeight / exerciseWeights[exercise].count).toFixed(2);
        }

        displayAverages(averages);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("average-results").innerText = "Error fetching data.";
    }
});

function displayAverages(averages) {
    const resultsContainer = document.getElementById("average-results");
    resultsContainer.innerHTML = "<h3>Average Weights Per Exercise from latest 10 workouts</h3>";
    
    const list = document.createElement("ul");
    for (const [exercise, avgWeight] of Object.entries(averages)) {
        const listItem = document.createElement("li");
        listItem.classList.add("exercise-item");

        listItem.innerHTML = `<strong>${exercise}:</strong> ${avgWeight} kg`;
        list.appendChild(listItem);
    }

    resultsContainer.appendChild(list);
}
