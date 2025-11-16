// Asynchronously fetches and displays the rankings for a selected competition.
async function competition_rankings(selectedCompetition) {
    try {
        // Fetches seasons associated with the selected competition.
        const response = await axios.get('/get_seasons', {
            params: { competition_id: selectedCompetition }
        });
        // Populates the 'selectSeasonRanks' dropdown with the seasons fetched.
        populateSelect('selectSeasonRanks', response.data.map(season => ({ season: season })), 'season', 'season', '2022');

        // Populates the rankings table with data for the selected competition and season.
        await populateRanksTable(selectedCompetition, document.getElementById('selectSeasonRanks').value);

        // Adds an event listener to update the rankings table when a different season is selected.
        document.getElementById('selectSeasonRanks').addEventListener('change', function () {
            populateRanksTable(selectedCompetition, this.value);
        });

    } catch (error) {
        handleError(error, 'Error during seasons data recovery:');
    }
}

// Asynchronously populates the rankings table with data for the selected competition and season.
async function populateRanksTable(selectedCompetitionId, season) {
    startLoading(); // Displays a loading animation while data is being fetched.
    const tableBody = document.querySelector('#ranksTable tbody');
    const compTableBody = document.querySelector('#compTable tbody');

    try {
        tableBody.innerHTML = ''; // Clears the table body before populating with new data.

        // Fetches the final club positions for the selected competition and season.
        const positionsResponse = await axios.get('/get_final_clubs_positions', {
            params: {
                competition_id: selectedCompetitionId,
                season: season,
            }
        });
        let clubPositions = positionsResponse.data.positions;

        tableBody.innerHTML = '';

        // Iterates over each club position and populates the table rows with club data.
        for (const clubPosition of clubPositions) {
            const position = clubPosition.position;
            const clubId = clubPosition.clubId;
            let clubName = clubPosition.clubName;
            const points = clubPosition.points;
            const goalsScored = clubPosition.goalsScored;
            const goalsConceded = clubPosition.goalsConceded;

            // If the club is the champion (position 1), its name is displayed in a special cell.
            if (position === 1) {
                let champCell = compTableBody.querySelector('#cellChampion');
                if (champCell) {
                    champCell.textContent = clubName;
                }
            }

            const row = tableBody.insertRow();
            const positionCell = row.insertCell(0);
            const clubImageCell = row.insertCell(1);
            const clubNameCell = row.insertCell(2);
            const clubPointsCell = row.insertCell(3);
            const clubGoalsCell = row.insertCell(4);
            const clubGoalsSubCell = row.insertCell(5);

            positionCell.textContent = position;

            const imgUrl = await get_clubs_images(clubId);
            const imgElement = document.createElement('img');
            imgElement.classList.add('img-club');

            // Code to set the image source and handle missing images.
            if (imgUrl !== null && imgUrl !== '') {
                imgElement.src = imgUrl;
            } else {
                imgElement.src = '../images/alt_logo.png';
                imgElement.id = 'altLogo';

                clubName = 'No Name Club'
            }

            clubImageCell.appendChild(imgElement);
            clubNameCell.textContent = clubName;
            clubPointsCell.textContent = points;
            clubGoalsCell.textContent = goalsScored;
            clubGoalsSubCell.textContent = goalsConceded;
        }
        stopLoading(); // Hides the loading animation after the data has been fetched and displayed.
    } catch (error) {
        console.error('Error during club positions retrieval:', error);
    }
}

// Hides the ranking table and related elements and displays a loading animation.
function startLoading() {
    document.getElementById('ranksTableName').style.display ='none';
    document.getElementById('ranksline1').style.display ='none';
    document.getElementById('ranksline2').style.display ='none';
    document.getElementById('ranksTable').style.display ='none';
    document.getElementById('ranksSelect').style.display ='none';
    document.getElementById('loader').style.display = 'block';
    document.getElementById('cellChampion').style.display = 'none';
    document.getElementById('loaderTable').style.display = 'block';
}

// Displays the ranking table and related elements and hides the loading animation.
function stopLoading() {
    document.getElementById('ranksTableName').style.display ='block';
    document.getElementById('ranksline1').style.display ='block';
    document.getElementById('ranksline2').style.display ='block';
    document.getElementById('ranksTable').style.display ='block';
    document.getElementById('ranksSelect').style.display ='block';
    document.getElementById('cellChampion').style.display = 'block';
    document.getElementById('loader').style.display = 'none';
    document.getElementById('loaderTable').style.display = 'none';
}
