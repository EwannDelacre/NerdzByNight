let barChartInstance;
let pieChartInstance;
let horizontalBarChartInstance;
let languagesChartInstance;


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
        const response = await fetch('/gitstats/backend/fetch_data.php');
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
        if (data.languages) {
            updateLanguagesChart(data.languages);
        }
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

// Nouvelle fonction pour le graphique des langages
function updateLanguagesChart(languagesData) {
    const ctx = document.getElementById('languagesChart').getContext('2d');

    // Calculer le total des lignes de code
    const total = Object.values(languagesData).reduce((a, b) => a + b, 0);

    // Convertir les nombres en pourcentages et préparer les données
    const labels = Object.keys(languagesData);
    const data = Object.values(languagesData).map(value => ((value / total) * 100).toFixed(1));

    // Générer des couleurs pour chaque langage
    const customColors = {
        JavaScript: '#f1e05a',
        Python: '#3572A5',
        HTML: '#e34c26',
        CSS: '#563d7c',
        PHP: '#4F5D95',
        Java: '#b07219',
        // Ajoutez d'autres langages selon vos besoins
    };

    const backgroundColors = labels.map(language =>
        customColors[language] || '#' + Math.floor(Math.random()*16777215).toString(16)
    );

    if (languagesChartInstance) {
        languagesChartInstance.destroy();
    }

    languagesChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.map(label => `${label} (${data[labels.indexOf(label)]}%)`),
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Permet au graphique de s'adapter à son conteneur
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20, // Augmente l'espace entre les éléments de la légende
                        font: {
                            size: 13, // Légèrement plus grand
                            family: 'Arial'
                        },
                        // Assure que le texte ne soit pas coupé
                        generateLabels: function(chart) {
                            const datasets = chart.data.datasets;
                            return chart.data.labels.map((label, i) => ({
                                text: label,
                                fillStyle: datasets[0].backgroundColor[i],
                                hidden: false,
                                lineCap: 'butt',
                                lineDash: [],
                                lineDashOffset: 0,
                                lineJoin: 'miter',
                                lineWidth: 1,
                                strokeStyle: datasets[0].backgroundColor[i],
                                pointStyle: 'circle',
                                index: i
                            }));
                        },
                        boxWidth: 15, // Réduit la taille du carré de couleur
                        boxHeight: 15
                    },
                    maxWidth: 250 // Définit une largeur maximale pour la légende
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}`;
                        }
                    }
                }
            },
            layout: {
                padding: {
                    right: 10 // Ajoute un peu de padding à droite
                }
            }
        }
    });
}


// Charger les données au démarrage
fetchCommitData();

// Actualiser les graphiques toutes les 120 secondes
setInterval(fetchCommitData, 120000);
