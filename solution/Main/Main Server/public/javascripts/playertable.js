// Asynchronously fetches and displays player information and image for a specified player ID.
async function player_table(selectedPlayerId) {
    const playerTableBody = document.querySelector('#playerTable tbody');

    let rowPlayerImage = document.getElementById('playerImage');

    // Fetches the image source for the selected player.
    let playerImage = get_players_images(selectedPlayerId);

    let img = document.createElement('img');

    // Waits for the 'get_players_images' promise to resolve and sets the image source.
    img.src = await playerImage;

    img.alt = 'Not found';
    img.id = 'imgPlayer';
    rowPlayerImage.append(img);

    // Uses axios to make a GET request to '/get_players_infos' endpoint to retrieve player information.
    axios.get('/get_players_infos', {
        params: { player_id: selectedPlayerId }
    })
        .then(response => {
            try {
                // Assumes the response contains comma-separated player information.
                // Splits the response string into an array of player information.
                const playerInfos = response.data[0].split(',');

                const cells = playerTableBody.querySelectorAll('td');

                // Loops through each cell and assigns the corresponding piece of player information.
                cells.forEach((cell, index) => {
                    cell.textContent = playerInfos[index];
                });

            } catch (error) {
                console.error('Error during table population:', error);
            }
        })
        .catch(error => {
            console.error('Error during player infos recovery:', error);
        });
}


