// Asynchronously fetches and displays player statistics for a specified player ID.
async function player_stats(playerId) {
    const tableBody = document.querySelector('#statsTable tbody')

    try {
        // Cleans the table
        tableBody.innerHTML = '';

        // Fetches player statistics from the '/get_players_stats' endpoint using the player ID.
        const stats = await axios.get('/get_players_stats', {
            params: { player_id: playerId }
        });

        // Checks if statistics data is available and populates the table with the data.
        if(stats.data.length !== 0) {
            tableBody.innerHTML = '';

            // Retrieves individual statistics from the fetched data.
            const yellowCards = stats.data[0].total_yellow_cards;
            const redCards = stats.data[0].total_red_cards;
            const goals = stats.data[0].total_goals;
            const assists = stats.data[0].total_assists;
            const minutes = stats.data[0].total_minutes_played;

            const row = tableBody.insertRow();
            const minutesCell = row.insertCell(0);
            const goalsCell = row.insertCell(1);
            const assistsCell = row.insertCell(2);
            const yellowCardsCell = row.insertCell(3);
            const redCardsCell = row.insertCell(4);

            yellowCardsCell.textContent = yellowCards;
            redCardsCell.textContent = redCards;
            goalsCell.textContent = goals;
            assistsCell.textContent = assists;
            minutesCell.textContent = minutes;

            document.getElementById('loaderStatsTable').style.display = 'none';
            document.getElementById('playerStatisticsLine1').style.display = 'block';
            document.getElementById('playerStatistics').style.display = 'block';
            document.getElementById('playerStatisticsLine2').style.display = 'block';
            document.getElementById('statsTable').style.display = 'block';
        }
        else {
            document.getElementById('loaderStatsTable').style.display = 'none';
            document.getElementById('playerStatisticsLine1').style.display = 'block';
            document.getElementById('playerStatistics').style.display = 'block';
            document.getElementById('playerStatisticsLine2').style.display = 'block';
            document.getElementById('playerStatisticsLine1').style.backgroundColor = '#808080';
            document.getElementById('playerStatistics').style.color = '#808080';
            document.getElementById('playerStatistics').textContent = 'Players Statistics not available';
            document.getElementById('playerStatisticsLine2').style.backgroundColor = '#808080';
            document.getElementById('statsTable').style.display = 'none';
        }


    } catch (error) {
        handleError(error, 'Error during players stats recovery:');
    }
}