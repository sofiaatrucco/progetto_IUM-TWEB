// Asynchronous function to populate a table with information about a selected club.
async function club_table(selectedClubId) {
    const clubTableBody = document.querySelector('#clubTable tbody');

    let rowClubImage = document.getElementById('clubImage');

    // Fetches the image source for the selected club.
    // 'get_clubs_images' is assumed to be a function returning a promise.
    let clubImage = get_clubs_images(selectedClubId);

    let img = document.createElement('img');

    // Waits for the 'get_clubs_images' promise to resolve and sets the image source.
    img.src = await clubImage;

    img.alt = 'Not found';
    img.id = 'imgClub';
    rowClubImage.append(img);

    // Uses axios to make a GET request to '/get_clubs_infos' endpoint to retrieve information about the club.
    axios.get('/get_clubs_infos', {
        params: { club_id: selectedClubId }
    })
        .then(response => {
            try {
                // Assumes the response contains comma-separated club information.
                // Splits the response string into an array of club information.
                const clubInfos = response.data[0].split(',');

                const cells = clubTableBody.querySelectorAll('td');

                // Loops through each cell and assigns the corresponding piece of club information.
                cells.forEach((cell, index) => {
                    cell.textContent = clubInfos[index];
                });

            } catch (error) {
                console.error('Error during table population:', error);
            }
        })
        .catch(error => {
            console.error('Error during club infos recovery:', error);
        });
}
