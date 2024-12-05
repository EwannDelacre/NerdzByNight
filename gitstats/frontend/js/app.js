// app.js

let barChartInstance;
let pieChartInstance;

// Palette de couleurs commune pour les graphiques
const colors = [
    'rgba(255, 99, 132, 0.6)',  // Rouge clair
    'rgba(54, 162, 235, 0.6)',  // Bleu clair
    'rgba(255, 206, 86, 0.6)',  // Jaune clair
    'rgba(75, 192, 192, 0.6)',  // Vert clair
    'rgba(153, 102, 255, 0.6)', // Violet clair
    'rgba(255, 159, 64, 0.6)'   // Orange clair
];

const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

// Fonction pour récupérer les données depuis le serveur
async function fetchCommitData() {
    try {
        const response = await fetch('/backend/fetch_data.php');
        const data = await response.json();

        if (data.error) {
            console.error('Erreur :', data.error);
            return;
        }

        // Filtrer les utilisateurs inconnus ("unknown")
        const filteredData = Object.entries(data).filter(([key]) => key.toLowerCase() !== 'unknown');
        const labels = filteredData.map(([key]) => key); // Auteurs valides
        const values = filteredData.map(([_, value]) => value); // Nombre de commits associés

        updateBarChart(labels, values);
        updatePieChart(labels, values);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

function updateBarChart(labels, values) {
    const ctx = document.getElementById('commitBarChart').getContext('2d');

    if (barChartInstance) {
        barChartInstance.destroy(); // Supprime l'ancien graphique
    }

    barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Commits par membre',
                data: values,
                backgroundColor: colors.slice(0, values.length), // Applique une couleur unique à chaque membre
                borderColor: borderColors.slice(0, values.length),
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1, // Graduation par pas de 1
                        callback: function(value) {
                            return Number.isInteger(value) ? value : ''; // Affiche uniquement les nombres entiers
                        }
                    }
                }
            }
        }
    });
}


// Fonction pour mettre à jour le camembert
function updatePieChart(labels, values) {
    const ctx = document.getElementById('commitPieChart').getContext('2d');

    if (pieChartInstance) {
        pieChartInstance.destroy(); // Supprime l'ancien graphique
    }

    pieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Commits par membre',
                data: values,
                backgroundColor: colors.slice(0, values.length), // Même palette de couleurs que l'histogramme
                borderColor: borderColors.slice(0, values.length),
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: { display: true, position: 'top' }
            }
        }
    });
}

// Charger les données au démarrage
fetchCommitData();

// Actualiser les graphiques toutes les 60 secondes
setInterval(fetchCommitData, 60000);
