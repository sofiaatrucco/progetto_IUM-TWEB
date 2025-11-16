// Initializes the games table by fetching seasons data and populating related selectors.
async function init_games_table(selectedCompetition) {
    try {
        // Fetches seasons data for the selected competition.
        const response = await axios.get('/get_seasons', {
            params: { competition_id: selectedCompetition }
        });
        // Populates the 'selectSeasonGames' selector with fetched seasons data.
        populateSelect('selectSeasonGames', response.data.map(season => ({ season: season })), 'season', 'season', '2022');

        // Fetches dates for the first season and populates the games table.
        await get_dates(selectedCompetition, document.getElementById('selectSeasonGames').value);

        // Adds an event listener to update the games table when a different season is selected.
        document.getElementById('selectSeasonGames').addEventListener('change', function () {
            get_dates(selectedCompetition, this.value);
        });

    } catch (error) {
        handleError(error, 'Error during seasons data recovery:');
    }
}

// Asynchronously fetches dates for games in a selected competition and season, then populates related selectors and the games table.
async function get_dates(selectedCompetition, selectedSeason) {
    try {
        // Fetches dates data for the selected competition and season.
        const response = await axios.get('/get_dates', {
            params: { competition_id: selectedCompetition, season: selectedSeason }
        });
        const dates = response.data;

        // Populates the 'selectDate' selector with fetched dates data.
        populateSelect('selectDate', dates.map(date => ({ date: date })), 'date', 'date');

        // If there are dates available, sets the first date as the default and populates the games table.
        if (dates.length > 0) {
            document.getElementById('selectDate').value = dates[0];
            await populateGamesTable(selectedCompetition, selectedSeason, dates[0]);
        }

        // Adds an event listener to update the games table when a different date is selected.
        document.getElementById('selectDate').addEventListener('change', function() {
            populateGamesTable(selectedCompetition, selectedSeason, this.value);
        });

    } catch (error) {
        handleError(error, 'Error during dates data recovery:');
    }
}

// Asynchronously populates the games table with data for games on a selected date in a selected competition and season.
async function populateGamesTable(selectedCompetition, selectedSeason, selectedDate) {
    const tableBody = document.querySelector('#gamesTable tbody');

    try {
        // Fetches games data for the selected competition, season, and date.
        const games = await get_games(selectedCompetition, selectedSeason, selectedDate);

        // Cleans the table
        tableBody.innerHTML = '';

        // Collects promises to fetch images for clubs participating in the games.
        const imagePromises = games.flatMap(game => [
            get_clubs_images(game.home_club_id),
            get_clubs_images(game.away_club_id)
        ]);

        // Loads all images.
        const images = await Promise.all(imagePromises);

        // Creates a map to associate clubs' ids to names.
        const clubIdToInfoMap = {};

        // Creates table's rows
        games.forEach((game, index) => {
            // Populates the map with clubs' ids, names, and images.
            clubIdToInfoMap[game.home_club_id] = {
                name: game.home_club_name,
                imageUrl: images[index * 2]
            };
            clubIdToInfoMap[game.away_club_id] = {
                name: game.away_club_name,
                imageUrl: images[index * 2 + 1]
            };

            const row = tableBody.insertRow();

            // Adds an event listener to the row to show game events when the row is clicked.
            row.addEventListener('click', async () => {
                const gameEvents = await get_game_events(game.game_id);
                await show_game_events(gameEvents, clubIdToInfoMap);
            });

            // Populates the row cells with game details (club images, names, scores, etc.).
            ['home_club_id', 'home_club_name', 'aggregate', 'away_club_name', 'away_club_id'].forEach((field, i) => {
                const cell = row.insertCell(i);
                const fieldClass = `field-${field.replace('_', '-')}`;
                cell.classList.add(fieldClass);

                if (field.includes('club_id')) {
                    let img = document.createElement('img');
                    img.src = images[index * 2 + (field === 'away_club_id' ? 1 : 0)];
                    img.classList.add('img-club');

                    if (img.src === 'http://localhost:3000/html/null') {
                        img.src = '../images/alt_logo.png';
                        img.id = 'altLogo';
                    }

                    cell.appendChild(img);
                } else if (field === 'home_club_name' || field === 'away_club_name') {
                    const clubName = game[field] || 'No Name Club';
                    cell.textContent = clubName;
                } else if (field === 'aggregate') {
                    cell.classList.add('circle-cell-container');
                    const circleCell = document.createElement('div');
                    circleCell.classList.add('circle-cell');
                    circleCell.textContent = game[field];
                    cell.appendChild(circleCell);
                } else {
                    cell.textContent = game[field];
                }
            });
        });
    } catch (error) {
        handleError(error, 'Error during table population:');
    }
}

// Asynchronously fetches game data for a given competition, season, and date.
async function get_games(selectedCompetition, selectedSeason, selectedDate) {
    try {
        // Makes a GET request to the server endpoint '/get_games' with the specified parameters.
        const response = await axios.get('/get_games', {
            params: { competition_id: selectedCompetition, season: selectedSeason, date: selectedDate }
        });
        return response.data;
    } catch (error) {
        handleError(error, 'Error during games data recovery:');
    }
}


