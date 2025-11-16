// Asynchronously fetches and displays details for a selected competition.
async function competition_table(selectedCompetitionId) {
    const tableBody = document.querySelector('#compTable tbody');

    let rowCompetitionImage = document.getElementById('competitionImage');

    // Fetches the image source for the selected competition.
    // 'get_competitions_images' is assumed to be a function returning a promise.
    let competitionImage = get_competitions_images(selectedCompetitionId);

    let img = document.createElement('img');

    // Waits for the 'get_competitions_images' promise to resolve and sets the image source.
    img.src = await competitionImage;

    img.alt = 'Not found';
    img.id = 'imgCompetition';
    rowCompetitionImage.append(img);

    // Fetches the number of clubs participating in the selected competition.
    let numberOfClubs = await count_clubs(selectedCompetitionId);

    // Uses axios to make a GET request to '/get_competitions_infos' endpoint to retrieve competition information.
    axios.get('/get_competitions_infos', {
        params: {competition_id: selectedCompetitionId}
    })
        .then(response => {
            try {
                // Assumes the response contains comma-separated competition information.
                // Splits the response string into an array of competition information.
                const competitionInfos = response.data[0].split(',');

                const cells = tableBody.querySelectorAll('td');

                // Loops through each cell and assigns the corresponding piece of competition information.
                cells.forEach((cell, index) => {
                    cell.textContent = competitionInfos[index];
                });

                // Locates and populates the cell for the number of clubs if it exists.
                let clubsNCell = tableBody.querySelector('#cellNumberOfClubs');
                if (clubsNCell) {
                    clubsNCell.textContent = numberOfClubs;
                }

            } catch (error) {
                console.error('Error during table population:', error);
            }
        })
        .catch(error => {
            console.error('Error during competition infos recovery:', error);
        });
}

// Asynchronously counts clubs in a specific competition.
async function count_clubs(selectedCompetitionId) {
    try {
        // Makes a GET request to the server endpoint '/count_clubs' with the specified parameter.
        const response = await axios.get('/count_clubs', {
            params: { competition_id: selectedCompetitionId }
        });
        return response.data;
    } catch (error) {
        handleError(error, 'Error during clubs counting:');
    }
}

