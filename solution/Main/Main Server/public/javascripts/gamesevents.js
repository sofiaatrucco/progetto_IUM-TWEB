// Asynchronously fetches game events data for a specified game ID.
async function get_game_events(gameId) {
    try {
        // Fetches game events from the '/get_games_events' endpoint using the game ID.
        const response = await axios.get('/get_games_events', {
            params: { game_id: gameId }
        });
        return response.data;
    } catch (error) {
        handleError(error, 'Error during game events data recovery:');
    }
}

// Asynchronously displays game events in a modal window.
async function show_game_events(gameEvents, clubIdToInfoMap) {
    const gamesEventsModal = document.getElementById('gamesEventsModal');
    const gamesEventsTable = document.getElementById('gamesEventsTable');
    const gamesEventsTBody = gamesEventsTable.querySelector('tbody');

    // Clear previous game events before showing new ones.
    gamesEventsTBody.innerHTML = '';

    // Shows the modal window.
    $(gamesEventsModal).modal('show');

    try {
        // Collecting promises to get player names for each event.
        const playerNamePromises = gameEvents.map(event => get_player_name(event.player_id));

        // Wait for all requests completion.
        const playerNames = await Promise.all(playerNamePromises);

        gameEvents.forEach((event, index) => {
            // Retrieves club information from the clubIdToInfoMap or uses default values if not found.
            const clubInfo = clubIdToInfoMap[event.club_id] || { name: 'Unknown Club', imageUrl: '../images/alt_logo.png' };
            const playerName = playerNames[index] || 'Unknown Player'; // Fallback to 'Unknown Player' if playerName is not found.

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${event.minute}'</td>
                <td class="th-img"><img src="${clubInfo.imageUrl}" class="img-club" alt=""></td>
                <td>${clubInfo.name}</td>
                <td>${playerName}</td>
                <td>${event.description}</td>
            `;
            gamesEventsTBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching player names:', error);
    }
}

// Asynchronously fetches the name of a player given their player ID.
async function get_player_name(playerId) {
    try {
        // Fetches player information from the '/get_players_infos' endpoint using the player ID.
        const response = await axios.get('/get_players_infos', {
            params: { player_id: playerId }
        });
        const data = response.data;
        let playerName = 'Unknown Player';

        if (Array.isArray(data) && data.length > 0) {
            // Pick the first array's element (a string), then divide that string and pick the first element.
            playerName = data[0].split(',')[0];
        }
        return playerName;
    } catch (error) {
        console.error(`Error fetching player name for ID ${playerId}:`, error);
        return 'Unknown Player';
    }
}

// Closes the game events modal window.
function closeGamesEvents() {
    document.getElementById('gamesEventsModal').style.display='none';
    $('#gamesEventsModal').modal('hide');
}