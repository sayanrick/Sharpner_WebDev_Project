document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('playerForm');
    const playerData = document.getElementById('playerData');
    const searchInput = document.getElementById('searchInput');

    // Function to display player data
    function displayPlayerData(player) {
        const playerInfo = document.createElement('div');
        playerInfo.classList.add('player-info');
        playerInfo.innerHTML = `
            <h3>${player.name}</h3>
            <p>Date of Birth: ${player.dateOfBirth}</p>
            <p>Birthplace: ${player.birthplace}</p>
            <p>Career: ${player.career}</p>
            <p>Matches: ${player.matches}</p>
            <p>Total Score: ${player.score}</p>
            <p>Fifties: ${player.fifties}</p>
            <p>Centuries: ${player.centuries}</p>
            <p>Wickets: ${player.wickets}</p>
            <p>Batting Average: ${player.average}</p>
            <img src="${player.photoURL}" alt="${player.name}'s Photo">
        `;

        // Create Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            // Populate form fields with player data for editing
            document.getElementById('name').value = player.name;
            document.getElementById('dob').value = player.dateOfBirth;
            document.getElementById('photoUrl').value = player.photoUrl;
            document.getElementById('birthplace').value = player.birthplace;
            document.getElementById('career').value = player.career;
            document.getElementById('matches').value = player.matches;
            document.getElementById('score').value = player.score;
            document.getElementById('fifties').value = player.fifties;
            document.getElementById('centuries').value = player.centuries;
            document.getElementById('wickets').value = player.wickets;
            document.getElementById('average').value = player.average;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            // Send a DELETE request to remove the player from the server
            fetch(`http://localhost:4000/player_details/delete-playerdata/${player.id}`, {
                method: 'DELETE',
            })
            .then(() => {
                // Remove the player's information from the client-side display
                playerInfo.remove();
            })
            .catch((error) => {
                console.error('Error deleting player:', error);
            });
        });

        // Append Edit and Delete buttons to playerInfo
        playerInfo.appendChild(editButton);
        playerInfo.appendChild(deleteButton);

        // Append player info to the playerData section
        playerData.appendChild(playerInfo);
    }

    playerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get player data from the form
        const name = document.getElementById('name').value;
        const dateOfBirth = document.getElementById('dob').value;
        const photoURL = document.getElementById('photoUrl').value;
        const birthplace = document.getElementById('birthplace').value;
        const career = document.getElementById('career').value;
        const matches = document.getElementById('matches').value;
        const score = document.getElementById('score').value;
        const fifties = document.getElementById('fifties').value;
        const centuries = document.getElementById('centuries').value;
        const wickets = document.getElementById('wickets').value;
        const average = document.getElementById('average').value;

        // Create a player object with the collected data
        const player = {
            name,
            dateOfBirth,
            photoURL,
            birthplace,
            career,
            matches,
            score,
            fifties,
            centuries,
            wickets,
            average,
        };

        // Send player data to the server using fetch (POST request)
        fetch('http://localhost:4000/player_details/add-playerdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player),
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle success and display the player data
            displayPlayerData(data.player);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Reset the form
        playerForm.reset();
    });

    // Handle search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        // Clear the player data container
        playerData.innerHTML = '';

        // Fetch player data from the server (GET request)
        fetch(`http://localhost:4000/player_details/get-playerdata?name=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
            data.players.forEach((player) => {
                displayPlayerData(player);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
