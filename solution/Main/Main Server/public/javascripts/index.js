// Adds a scroll event listener to the window.
window.onscroll = function() {scrollFunction()};

// Displays or hides the "Back to Top" button based on the scroll position.
function scrollFunction() {
    const btnScrollToTop = document.getElementById("btnScrollToTop");

    // Checks if the document is scrolled more than 20px, show the button.
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnScrollToTop.style.display = "block";
    } else {
        btnScrollToTop.style.display = "none";
    }
}

// Scrolls the window back to the top when the "Back to Top" button is clicked.
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari.
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera.
}

// This function handles the search action, checks for valid input, and redirects to search results or displays an alert.
function search() {
    const textSearch = document.getElementById('button_search').value;
    if (textSearch.trim() === '') {
        alert("Il campo di ricerca è obbligatorio. Inserisci una parola chiave.");
    } else if (textSearch === 'Torino'){
        window.location.href = 'http://localhost:3000/html/search_results.html';
    } else {
        alert("No search results!");
    }
}

// Open the url appropriate for the selected result
function openResult12() {
    window.location.href='../html/competition.html?country=Italy&competitionName=serie-a%20&competitionId=IT1';
}

// Open the url appropriate for the selected result
function openResult3() {
    window.location.href='../html/club.html?country=Italy&competitionName=serie-a%20&competitionId=IT1&clubName=Torino%20Calcio&clubId=416';
}

// Initializes the homepage, setting up initial UI state and fetching necessary data.
function init_homepage() {
    // Hides additional news and the "Show Less" button initially.
    document.getElementById('additionalNews').style.display = 'none';
    document.getElementById('divShowLessBtn').style.display = 'none';

    // Fetches country information from the URL or defaults to Italy if not provided.
    const urlParams = new URLSearchParams(window.location.search);
    let selectedCountry = urlParams.get('country');

    if(selectedCountry === null) {
        selectedCountry = 'Italy';
    }

    // Fetches country data and populates the country selector.
    // Additionally, fetches competition data based on the selected country.
    axios.get('/get_countries')
        .then(response => {
            populateSelect('selectCountry', response.data.map(country => ({ country: country })), 'country', 'country', selectedCountry);
            get_competitions(document.getElementById('selectCountry').value);

            // Updates competition data when a different country is selected.
            document.getElementById('selectCountry').addEventListener('change', function() {
                const selectedCountry = this.value;
                get_competitions(selectedCountry);
            });
        })
        .catch(error => {
            console.error('Error during countries data recovery:', error);
        });

    // Fetches competition data for a given country and updates the UI accordingly.
    function get_competitions(selectedCountry) {
        axios.get('/get_competitions', { params: { country: selectedCountry } })
            .then(async response => {
                const competitions = response.data;
                populateSelect('selectCompetition', competitions, 'competition_id', 'competition_name');

                const btnCompetition = document.getElementById('btnCompetition');
                btnCompetition.innerHTML = '';

                for (const competition of competitions) {
                    const imgCompetition = document.createElement('img');
                    imgCompetition.src = await get_competitions_images(competition.competition_id);
                    imgCompetition.alt = '';
                    imgCompetition.id = 'btnImgCompetition';

                    const button = document.createElement('button');
                    button.type = 'button';
                    button.value = competition.competition_id;
                    button.textContent = competition.competition_name + ' ';
                    button.classList.add('menu-button');
                    button.appendChild(imgCompetition);
                    btnCompetition.appendChild(button);

                    // Moves to competition page when a competition button is clicked.
                    button.addEventListener('click', function () {
                        const selectedCompetitionId = this.value;
                        const selectedCompetitionName = this.textContent;
                        window.location.href = `../html/competition.html?country=${selectedCountry}&competitionName=${selectedCompetitionName}&competitionId=${selectedCompetitionId}`;
                    });
                }

                // Moves to competition page when a competition is selected.
                document.getElementById('selectCompetition').addEventListener('change', function () {
                    const selectedCompetitionId = this.value;
                    const selectedCompetitionName = this.options[this.selectedIndex].textContent;
                    window.location.href = `../html/competition.html?country=${selectedCountry}&competitionName=${selectedCompetitionName}&competitionId=${selectedCompetitionId}`;
                });
            })
            .catch(error => handleError(error, 'Error during competitions data recovery:'));
    }
}

// Initializes the competition page, setting up the initial UI state and fetching competition-specific data.
function init_competition() {
    // Retrieves competition-specific parameters from the URL.
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCountry = urlParams.get('country');
    const selectedCompetitionName = urlParams.get('competitionName')
    const selectedCompetitionId = urlParams.get('competitionId');

    // Format the competition name to have the first letter capitalized.
    const fixedName = selectedCompetitionName.charAt(0).toUpperCase() + selectedCompetitionName.slice(1);

    const country = document.getElementById('selectedCountry');
    const competition = document.getElementById('selectedCompetition');

    country.innerHTML = 'Selected country: <u>' + selectedCountry + '</u>';
    competition.innerHTML = 'Selected competition: <u>' + selectedCompetitionName + '</u>';
    document.getElementById('compTableName').textContent = 'Identification Details of ' + fixedName;
    document.getElementById('ranksTableName').textContent = fixedName + ' Rankings';
    document.getElementById('gamesTableName').textContent = fixedName + ' Games';

    document.getElementById('selectCountry').style.display = 'none';
    document.getElementById('selectCompetition').style.display = 'none';

    // Make the selects reusable to move between pages freely.
    selectCountry(country, selectedCountry, selectedCompetitionName, null, null);
    selectCompetition(competition, selectedCountry, null, null);

    // Fetch and displays specific data for the selected competition.
    competition_table(selectedCompetitionId);
    competition_rankings(selectedCompetitionId);
    init_games_table(selectedCompetitionId);

    // Fetches and displays clubs participating in the selected competition.
    axios.get('/get_clubs', {
        params: { competition_id: selectedCompetitionId }
    })
        .then(async response => {
            const clubs = response.data;

            if (clubs.length !== 0) {
                // Creates clubs' select if there's data.
                populateSelect('selectClub', clubs, 'club_id', 'club_name');

                const clubsCards = document.getElementById('clubsCards');
                clubsCards.innerHTML = '';

                // Code for creation of clubs' cards.
                for (const club of clubs) {
                    const cardClub = document.createElement('div');
                    cardClub.classList.add('card', 'col-md-4', 'mb-3');

                    const imgClub = document.createElement('img');
                    imgClub.src = await get_clubs_images(club.club_id);
                    imgClub.alt = 'Not found';
                    imgClub.id = 'imgClub';
                    imgClub.classList.add('card-img-top', 'my-auto', 'mx-auto', 'card-img-club');

                    const cardBodyClub = document.createElement('div');
                    cardBodyClub.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-end');

                    const clubName = document.createElement('h5');
                    clubName.classList.add('card-title', 'mb-0', 'card-name-club');
                    clubName.textContent = club.club_name;

                    cardBodyClub.appendChild(imgClub);
                    cardBodyClub.appendChild(clubName);
                    cardClub.appendChild(cardBodyClub);
                    clubsCards.appendChild(cardClub);

                    // Moves to club page when a club's card is clicked.
                    cardClub.addEventListener('click', function () {
                        const selectedClubId = club.club_id;
                        const selectedClubName = club.club_name;
                        window.location.href = `../html/club.html?country=${selectedCountry}&competitionName=${selectedCompetitionName}&competitionId=${selectedCompetitionId}&clubName=${selectedClubName}&clubId=${selectedClubId}`;
                    });
                }

                // Moves to club page when a club is selected.
                document.getElementById('selectClub').addEventListener('change', function () {
                    const selectedIndex = this.selectedIndex;
                    const selectedClub = clubs[selectedIndex];
                    const selectedClubId = selectedClub.club_id;
                    const selectedClubName = selectedClub.club_name;
                    window.location.href = `../html/club.html?country=${selectedCountry}&competitionName=${selectedCompetitionName}&competitionId=${selectedCompetitionId}&clubName=${selectedClubName}&clubId=${selectedClubId}`;
                });
            } else {
                // Alternative view if no clubs are found.
                document.getElementById('clubsTitleLine1').style.backgroundColor = '#808080';
                document.getElementById('clubsTitle').style.color = '#808080';
                document.getElementById('clubsTitle').textContent = 'No clubs available';
                document.getElementById('clubsTitleLine2').style.backgroundColor = '#808080';
                const selectClub = document.getElementById('selectClub');
                const option = document.createElement('option');
                option.textContent = 'No clubs found';
                selectClub.append(option);

                document.getElementById('selectClub').disabled = true;
            }
        })
        .catch(error => handleError(error, 'Error during clubs data recovery:'));
}

// Initializes the club page, setting up the initial UI state and fetching club-specific data.
function init_club() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCountry = urlParams.get('country');
    const selectedCompetitionName = urlParams.get('competitionName');
    const selectedCompetitionId = urlParams.get('competitionId');
    const selectedClubName = urlParams.get('clubName');
    const selectedClubId = urlParams.get('clubId');
    const clubTableName = selectedClubName.charAt(0).toUpperCase() + selectedClubName.slice(1);

    // Creates the club's information table.
    club_table(selectedClubId);

    const country = document.getElementById('selectedCountry');
    const competition = document.getElementById('selectedCompetition');
    const club = document.getElementById('selectedClub');

    country.innerHTML = 'Selected country: <u>' + selectedCountry + '</u>';
    competition.innerHTML = 'Selected competition: <u>' + selectedCompetitionName + '</u>';
    club.innerHTML = 'Selected club: <u>' + selectedClubName + '</u>';
    document.getElementById('clubTableName').textContent = 'Identification Details of ' + clubTableName;

    document.getElementById('selectCountry').style.display = 'none';
    document.getElementById('selectCompetition').style.display = 'none';
    document.getElementById('selectClub').style.display = 'none';

    // Make the selects reusable to move between pages freely.
    selectCountry(country, selectedCountry, selectedCompetitionName, selectedClubName, null);
    selectCompetition(competition, selectedCountry, selectedClubName, null);
    selectClub(club, selectedCountry, selectedCompetitionName, selectedCompetitionId, null);

    // Loading spinner.
    const loadingSpinner = document.getElementById('loadingSpinner');
    const titleContainer = document.getElementById('titleContainer');

    loadingSpinner.style.display = 'block';
    titleContainer.style.display = 'none';

    // Fetches and displays players of a selected club.
    axios.get('/get_players', {
        params: { club_id: selectedClubId }
    })
        .then(async response => {
            const players = response.data;
            const midfieldsCol = document.getElementById('midfieldsCol');
            const goalkeepersCol = document.getElementById('goalkeepersCol');
            const defendersCol = document.getElementById('defendersCol');
            const attackersCol = document.getElementById('attackersCol');

            populateSelect('selectPlayer', players, 'player_id', 'player_name');

            // Obtains all images promises inside an array
            const imagePromises = players.map(player => get_players_images(player.player_id));

            // Awaiting the completion of all player's image promises
            const playerImages = await Promise.all(imagePromises);

            loadingSpinner.style.display = 'none';
            titleContainer.style.display = 'block';

            // Creates players' cards.
            function player_card(player, imageUrl) {
                const cardPlayer = document.createElement('div');
                cardPlayer.classList.add('card', 'col-md-4', 'mb-3', 'card-player');

                // Cards' contents creation
                const imgPlayer = document.createElement('img');
                imgPlayer.src = imageUrl;
                imgPlayer.alt = 'Not found';
                imgPlayer.id = 'imgPlayer';
                imgPlayer.classList.add('card-img-top','card-img-player');

                const cardBodyPlayer = document.createElement('div');
                cardBodyPlayer.classList.add('card-body');

                const playerName = document.createElement('h5');
                playerName.classList.add('card-title');
                playerName.textContent = player.player_name;

                const playerPosition = document.createElement('p');
                playerPosition.classList.add('card-text');
                playerPosition.textContent = player.player_position;

                cardBodyPlayer.appendChild(imgPlayer);
                cardBodyPlayer.appendChild(playerName);
                cardBodyPlayer.appendChild(playerPosition);
                cardPlayer.appendChild(cardBodyPlayer);

                // Moves to player page when a player's card is clicked.
                cardPlayer.addEventListener('click', function () {
                    const selectedPlayerId = player.player_id;
                    const selectedPlayerName = player.player_name;
                    window.location.href = `../html/player.html?country=${selectedCountry}&competitionName=${selectedCompetitionName}&competitionId=${selectedCompetitionId}&clubName=${selectedClubName}&clubId=${selectedClubId}&playerName=${selectedPlayerName}&playerId=${selectedPlayerId}`;
                });

                return cardPlayer;
            }

            // Create divisor to show players sorted by their position.
            const midfieldsDiv = document.createElement('div');
            const goalkeepersDiv = document.createElement('div');
            const defendersDiv = document.createElement('div');
            const attackersDiv = document.createElement('div');

            midfieldsDiv.classList.add('position-container', 'card-container', 'text-center', 'p-0', 'vertical-middle');
            goalkeepersDiv.classList.add('position-container', 'card-container', 'text-center', 'p-0', 'vertical-middle');
            defendersDiv.classList.add('position-container', 'card-container', 'text-center', 'p-0', 'vertical-middle');
            attackersDiv.classList.add('position-container', 'card-container', 'text-center', 'p-0', 'vertical-middle');

            midfieldsDiv.id = 'Midfields';
            goalkeepersDiv.id = 'Goalkeepers';
            defendersDiv.id = 'Defenders';
            attackersDiv.id = 'Attackers';

            midfieldsCol.appendChild(midfieldsDiv);
            goalkeepersCol.appendChild(goalkeepersDiv);
            defendersCol.appendChild(defendersDiv);
            attackersCol.appendChild(attackersDiv);

            // Manually insert the cards under the dividers based on the player's position
            const positionDividers = {
                'Midfield': midfieldsDiv,
                'Goalkeeper': goalkeepersDiv,
                'Defender': defendersDiv,
                'Attack': attackersDiv
            };

            // Creates a card for each player.
            for (let i = 0; i < players.length; i++) {
                const player = players[i];
                const cardPlayer = player_card(player, playerImages[i]);
                const playerPosition = player.player_position;

                if (positionDividers[playerPosition]) {
                    positionDividers[playerPosition].appendChild(cardPlayer);
                }
            }

            // Moves to player page when a player is selected.
            document.getElementById('selectPlayer').addEventListener('change', function () {
                const selectedIndex = this.selectedIndex;
                const selectedPlayer = players[selectedIndex];
                const selectedPlayerId = selectedPlayer.player_id;
                const selectedPlayerName = selectedPlayer.player_name;
                window.location.href = `../html/player.html?country=${selectedCountry}&competitionName=${selectedCompetitionName}&competitionId=${selectedCompetitionId}&clubName=${selectedClubName}&clubId=${selectedClubId}&playerName=${selectedPlayerName}&playerId=${selectedPlayerId}`;
            });
        })
        .catch(error => {
            handleError(error, 'Error during players data recovery:');
            loadingSpinner.style.display = 'none';
            titleContainer.style.display = 'block';
        });
}

// Initializes the player page, setting up the initial UI state and fetching player-specific data.
function init_player() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCountry = urlParams.get('country');
    const selectedCompetitionName = urlParams.get('competitionName');
    const selectedCompetitionId = urlParams.get('competitionId');
    const selectedClubName = urlParams.get('clubName');
    const selectedClubId = urlParams.get('clubId');
    const selectedPlayerName = urlParams.get('playerName');
    const selectedPlayerId = urlParams.get('playerId');
    const playerTableName = selectedPlayerName.charAt(0).toUpperCase() + selectedPlayerName.slice(1);

    // Display the loading spinner and hide player statistics elements until the data is loaded.
    document.getElementById('loaderStatsTable').style.display = 'block';
    document.getElementById('playerStatisticsLine1').style.display = 'none';
    document.getElementById('playerStatistics').style.display = 'none';
    document.getElementById('playerStatisticsLine2').style.display = 'none';
    document.getElementById('statsTable').style.display = 'none';

    // Fetch and display specific data for the selected player.
    player_table(selectedPlayerId);
    player_stats(selectedPlayerId);

    const country = document.getElementById('selectedCountry');
    const competition = document.getElementById('selectedCompetition');
    const club = document.getElementById('selectedClub');
    const player = document.getElementById('selectedPlayer');

    country.innerHTML = 'Selected country: <u>' + selectedCountry + '</u>';
    competition.innerHTML = 'Selected competition: <u>' + selectedCompetitionName + '</u>';
    club.innerHTML = 'Selected club: <u>' + selectedClubName + '</u>';
    player.innerHTML = 'Selected player: <u>' + selectedPlayerName + '</u>';
    document.getElementById('playerTableName').textContent = 'Identification Details of ' + playerTableName;

    // Hide selectors as they are not needed on this page.
    document.getElementById('selectCountry').style.display = 'none';
    document.getElementById('selectCompetition').style.display = 'none';
    document.getElementById('selectClub').style.display = 'none';
    document.getElementById('selectPlayer').style.display = 'none';

    // Initialize selectors with the fetched data.
    selectCountry(country, selectedCountry, selectedCompetitionName, selectedClubName, selectedPlayerName);
    selectCompetition(competition, selectedCountry, selectedClubName, selectedPlayerName);
    selectClub(club, selectedCountry, selectedCompetitionName, selectedCompetitionId, selectedPlayerName);
    selectPlayer(player, selectedCountry, selectedCompetitionName, selectedCompetitionId, selectedClubName, selectedClubId);
}

// Handles the functionality when the 'country' field is interacted with.
function selectCountry(country, selectedCountry, selectedCompetitionName, selectedClubName, selectedPlayerName) {
    // Add an event listener for the 'country' element.
    country.addEventListener('click', function () {
        // Update UI to reflect the selection process for the country.
        document.getElementById('selectedCountry').textContent = 'Select country:';
        document.getElementById('selectCountry').style.display = 'block';

        document.getElementById('selectedCompetition').innerHTML = 'Selected competition: <u>' + selectedCompetitionName + '</u>';
        document.getElementById('selectCompetition').style.display = 'none';

        if(document.getElementById('selectedClub') !== null) {
            document.getElementById('selectedClub').innerHTML = 'Selected club: <u>' + selectedClubName + '</u>';
            document.getElementById('selectClub').style.display = 'none';
        }

        if(document.getElementById('selectedPlayer') !== null) {
            document.getElementById('selectedPlayer').innerHTML = 'Selected player: <u>' + selectedPlayerName + '</u>';
            document.getElementById('selectPlayer').style.display = 'none';
        }

        // Fetches country data and update the 'selectCountry' selector.
        axios.get('/get_countries')
            .then(async response => {
                populateSelect('selectCountry', response.data.map(country => ({ country: country })), 'country', 'country');

                // Add a listener to redirect to the updated URL when a new country is selected.
                document.getElementById('selectCountry').addEventListener('change', function () {
                    const selectedCountry = document.getElementById('selectCountry').value;
                    window.location.href = `..?country=${selectedCountry}`;
                });
            })
            .catch(error => {
                handleError(error, 'Error during competitions data recovery:');
            });
    });
}

// Handles the functionality when the 'competition' field is interacted with.
function selectCompetition(competition, selectedCountry, selectedClubName, selectedPlayerName) {
    // Add an event listener for the 'competition' element.
    competition.addEventListener('click', function () {
        // Update UI to reflect the selection process for the competition.
        document.getElementById('selectedCompetition').textContent = 'Select competition:';
        document.getElementById('selectCompetition').style.display = 'block';

        document.getElementById('selectedCountry').innerHTML = 'Selected country: <u>' + selectedCountry + '</u>';
        document.getElementById('selectCountry').style.display = 'none';

        if(document.getElementById('selectedClub') !== null) {
            document.getElementById('selectedClub').innerHTML = 'Selected club: <u>' + selectedClubName + '</u>';
            document.getElementById('selectClub').style.display = 'none';
        }

        if(document.getElementById('selectedPlayer') !== null) {
            document.getElementById('selectedPlayer').innerHTML = 'Selected player: <u>' + selectedPlayerName + '</u>';
            document.getElementById('selectPlayer').style.display = 'none';
        }

        // Fetch competition data and update the 'selectCompetition' selector.
        axios.get('/get_competitions', {
            params: { country: selectedCountry }
        })
            .then(async response => {
                const competitions = response.data;
                populateSelect('selectCompetition', competitions, 'competition_id', 'competition_name');

                // Add a listener to redirect to the updated URL when a new competition is selected.
                document.getElementById('selectCompetition').addEventListener('change', function () {
                    const selectedCompetitionId = this.value;
                    const selectedCompetitionName = this.options[this.selectedIndex].textContent;
                    window.location.href = `../html/competition.html?country=${selectedCountry}&competitionName=${selectedCompetitionName}&competitionId=${selectedCompetitionId}`;
                });

            })
            .catch(error => {
                handleError(error, 'Error during competitions data recovery:');
            });
    });
}

// Handles the functionality when the 'club' field is interacted with.
function selectClub(club, selectedCountry, selectedCompetitionName, selectedCompetitionId, selectedPlayerName) {
    // Add an event listener for the 'club' element.
    club.addEventListener('click', function () {
        // Update UI to reflect the selection process for the club.
        document.getElementById('selectedClub').textContent = 'Select club:';
        document.getElementById('selectClub').style.display = 'block';

        document.getElementById('selectedCountry').innerHTML = 'Selected country: <u>' + selectedCountry + '</u>';
        document.getElementById('selectedCompetition').innerHTML = 'Selected country: <u>' + selectedCompetitionName + '</u>';
        document.getElementById('selectCountry').style.display = 'none';
        document.getElementById('selectCompetition').style.display = 'none';

        if(document.getElementById('selectedPlayer') !== null) {
            document.getElementById('selectedPlayer').innerHTML = 'Selected player: <u>' + selectedPlayerName + '</u>';
            document.getElementById('selectPlayer').style.display = 'none';
        }

        // Fetches club data and update the 'selectClub' selector.
        axios.get('/get_clubs', {
            params: { competition_id: selectedCompetitionId }
        })
            .then(async response => {
                const clubs = response.data;
                populateSelect('selectClub', clubs, 'club_id', 'club_name');

                // Add a listener to redirect to the updated URL when a new club is selected.
                document.getElementById('selectClub').addEventListener('change', function () {
                    const selectedIndex = this.selectedIndex;
                    const selectedClub = clubs[selectedIndex];
                    const selectedClubId = selectedClub.club_id;
                    const selectedClubName = selectedClub.club_name;
                    window.location.href = `../html/club.html?country=${selectedCountry}&competitionName=${selectedCompetitionName}&competitionId=${selectedCompetitionId}&clubName=${selectedClubName}&clubId=${selectedClubId}`;
                });

            })
            .catch(error => {
                handleError(error, 'Error during clubs data recovery:');
            });
    });
}

// Handles the functionality when the 'player' field is interacted with.
function selectPlayer(player, selectedCountry, selectedCompetitionName, selectedCompetitionId, selectedClubName, selectedClubId) {
    // Add an event listener for the 'player' element.
    player.addEventListener('click', function () {
        // Update UI to reflect the selection process for the player.
        document.getElementById('selectedPlayer').textContent = 'Select player:';
        document.getElementById('selectPlayer').style.display = 'block';

        document.getElementById('selectedCountry').innerHTML = 'Selected country: <u>' + selectedCountry + '</u>';
        document.getElementById('selectedCompetition').innerHTML = 'Selected country: <u>' + selectedCompetitionName + '</u>';
        document.getElementById('selectedClub').innerHTML = 'Selected club: <u>' + selectedClubName + '</u>';
        document.getElementById('selectCountry').style.display = 'none';
        document.getElementById('selectCompetition').style.display = 'none';
        document.getElementById('selectClub').style.display = 'none';

        // Fetches player data and update the 'selectPlayer' selector.
        axios.get('/get_players', {
            params: { club_id: selectedClubId }
        })
            .then(async response => {
                const players = response.data;
                populateSelect('selectPlayer', players, 'player_id', 'player_name');

                // Add a listener to redirect to the updated URL when a new player is selected.
                document.getElementById('selectPlayer').addEventListener('change', function () {
                    const selectedIndex = this.selectedIndex;
                    const selectedPlayer = players[selectedIndex];
                    const selectedPlayerId = selectedPlayer.player_id;
                    const selectedPlayerName = selectedPlayer.player_name;
                    window.location.href = `../html/player.html?country=${selectedCountry}&competitionName=${selectedCompetitionName}&competitionId=${selectedCompetitionId}&clubName=${selectedClubName}&clubId=${selectedClubId}&playerName=${selectedPlayerName}&playerId=${selectedPlayerId}`;
                });

            })
            .catch(error => {
                handleError(error, 'Error during players data recovery:');
            });
    });
}

// Asynchronously fetches the image for a specific competition.
async function get_competitions_images(competition_id) {
    try {
        const response = await axios.get('/get_competitions_images', {
            params: { competition_id: competition_id }
        });
        return response.data;
    } catch (error) {
        handleError(error, 'Error during competitions images data recovery:');
        return null;
    }
}

// Asynchronously fetches the image for a specific club.
async function get_clubs_images(selectedClub) {
    try {
        const response = await axios.get('/get_clubs_images', {
            params: { club_id: selectedClub }
        });
        // Process and return the fetched data.
        let imageUrl = response.data;
        if (Array.isArray(imageUrl) && imageUrl.length === 0) {
            imageUrl = null;
        }
        return imageUrl;
    } catch (error) {
        handleError(error, 'Error during clubs images data recovery:');
        return null;
    }
}

// Asynchronously fetches the image for a specific player.
async function get_players_images(selectedPlayerId) {
    try {
        const response = await axios.get('/get_players_images', {
            params: { player_id: selectedPlayerId }
        });
        return response.data;
    } catch (error) {
        handleError(error, 'Error during clubs images data recovery:');
    }
}

// Populates a select element with options.
function populateSelect(selectId, options, valueKey, textKey, defaultValue = '') {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    options.forEach(optionData => {
        if(optionData[valueKey] !== null) {
            const option = document.createElement('option');
            option.value = optionData[valueKey]; // real value
            option.textContent = optionData[textKey]; // visible text
            select.appendChild(option);
        }
    });
    // Set the default selected value if provided.
    select.value = defaultValue;
}

// Shows additional content and hides the 'View More' button.
function viewMore() {
    document.getElementById('divViewMoreBtn').style.display = 'none';
    document.getElementById('additionalNews').style.display = 'block';
    document.getElementById('divShowLessBtn').style.display = 'block';
}

// Hides additional content and shows the 'View More' button.
function showLess() {
    document.getElementById('divShowLessBtn').style.display = 'none';
    document.getElementById('additionalNews').style.display = 'none';
    document.getElementById('divViewMoreBtn').style.display = 'block';
    scrollToTop();
}

// Logs the error to the console with a custom message.
function handleError(error, message) {
    console.error(message, error);
}