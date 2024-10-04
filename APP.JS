// Gestion du choix entre Tennis et Salle de Sport
document.getElementById('tennis-btn').addEventListener('click', function() {
    document.getElementById('choix-sport-section').style.display = 'none';
    document.getElementById('tennis-section').style.display = 'block';
    document.getElementById('salle-section').style.display = 'none';
});

document.getElementById('salle-btn').addEventListener('click', function() {
    document.getElementById('choix-sport-section').style.display = 'none';
    document.getElementById('tennis-section').style.display = 'none';
    document.getElementById('salle-section').style.display = 'block';
});

// Gestion des boutons retour pour revenir à l'écran de sélection du sport
document.getElementById('return-to-sport-selection-tennis').addEventListener('click', function() {
    document.getElementById('choix-sport-section').style.display = 'block';
    document.getElementById('tennis-section').style.display = 'none';
});

document.getElementById('return-to-sport-selection-salle').addEventListener('click', function() {
    document.getElementById('choix-sport-section').style.display = 'block';
    document.getElementById('salle-section').style.display = 'none';
});

// Gestion du bouton retour de la section analyse Tennis
document.getElementById('return-to-tennis').addEventListener('click', function() {
    document.getElementById('tennis-analyse-section').style.display = 'none';
    document.getElementById('tennis-section').style.display = 'block';
});

// Gestion du bouton retour de la section analyse Salle
document.getElementById('return-to-salle').addEventListener('click', function() {
    document.getElementById('salle-analyse-section').style.display = 'none';
    document.getElementById('salle-section').style.display = 'block';
});

// Gestion de la saisie pour le Tennis
document.getElementById('tennis-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('tennis-date').value;
    const player = document.getElementById('tennis-player').value;
    const duration = parseFloat(document.getElementById('tennis-duration').value);

    if (date && player && duration) {
        const data = {
            date: date,
            player: player,
            duration: duration
        };

        let tennisData = JSON.parse(localStorage.getItem('tennisData')) || [];
        tennisData.push(data);
        localStorage.setItem('tennisData', JSON.stringify(tennisData));

        document.getElementById('tennis-status').textContent = "Données enregistrées avec succès !";
    } else {
        document.getElementById('tennis-status').textContent = "Veuillez remplir tous les champs.";
    }
});

// Gestion de la saisie pour la Salle de Sport
document.getElementById('salle-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('salle-date').value;
    const type = document.getElementById('salle-type').value;

    if (date && type) {
        const data = {
            date: date,
            type: type
        };

        let salleData = JSON.parse(localStorage.getItem('salleData')) || [];
        salleData.push(data);
        localStorage.setItem('salleData', JSON.stringify(salleData));

        document.getElementById('salle-status').textContent = "Données enregistrées avec succès !";
    } else {
        document.getElementById('salle-status').textContent = "Veuillez remplir tous les champs.";
    }
});

// Analyse des données Tennis
document.getElementById('tennis-analyse-btn').addEventListener('click', function() {
    document.getElementById('tennis-section').style.display = 'none';
    document.getElementById('tennis-analyse-section').style.display = 'block';

    let tennisData = JSON.parse(localStorage.getItem('tennisData')) || [];
    let totalHours = 0;
    const players = {};

    tennisData.forEach(entry => {
        totalHours += entry.duration;
        players[entry.player] = (players[entry.player] || 0) + entry.duration;
    });

    document.getElementById('total-tennis-hours').textContent = totalHours.toFixed(2);

    const playersList = document.getElementById('tennis-players-list');
    playersList.innerHTML = '';  // Vider la liste
    for (const player in players) {
        const li = document.createElement('li');
        li.textContent = `${player} : ${players[player].toFixed(2)} heures`;
        playersList.appendChild(li);
    }
});

// Analyse des données Salle de Sport
document.getElementById('salle-analyse-btn').addEventListener('click', function() {
    document.getElementById('salle-section').style.display = 'none';
    document.getElementById('salle-analyse-section').style.display = 'block';

    let salleData = JSON.parse(localStorage.getItem('salleData')) || [];
    let totalSessions = salleData.length;
    const types = {};

    salleData.forEach(entry => {
        types[entry.type] = (types[entry.type] || 0) + 1;
    });

    document.getElementById('total-salle-sessions').textContent = totalSessions;

    const typeList = document.getElementById('salle-type-list');
    typeList.innerHTML = '';  // Vider la liste
    for (const type in types) {
        const li = document.createElement('li');
        li.textContent = `${type} : ${types[type]} séances`;
        typeList.appendChild(li);
    }
});
