let barChartInstance;
let pieChartInstance;
let horizontalBarChartInstance; // Nouveau graphique

// Palette de couleurs
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

        const commitData = data.commits;
        const lineData = data.lines;

        const labels = Object.keys(commitData);
        const values = Object.values(commitData);

        // Préparer les données pour le graphique horizontal
        const authorLabels = Object.keys(lineData);
        const additions = authorLabels.map(author => lineData[author].additions);
        const deletions = authorLabels.map(author => lineData[author].deletions);

        updateBarChart(labels, values);
        updatePieChart(labels, values);
        updateHorizontalBarChart(authorLabels, additions, deletions);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

// Fonction pour mettre à jour l'histogramme
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
                backgroundColor: colors.slice(0, values.length),
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
                        stepSize: 1,
                        callback: function(value) {
                            return Number.isInteger(value) ? value : '';
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
                backgroundColor: colors.slice(0, values.length),
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

// Fonction pour mettre à jour le graphique en barres horizontales
function updateHorizontalBarChart(labels, additions, deletions) {
    const ctx = document.getElementById('commitHorizontalBarChart').getContext('2d');
    if (horizontalBarChartInstance) {
        horizontalBarChartInstance.destroy();
    }

    horizontalBarChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Lignes ajoutées',
                    data: additions,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Lignes supprimées',
                    data: deletions,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: { display: true }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    });
}

// Charger les données au démarrage
fetchCommitData();

// Actualiser les graphiques toutes les 120 secondes
setInterval(fetchCommitData, 120000);
