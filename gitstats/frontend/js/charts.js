// Exemple dans charts.js
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chartData = {
        labels: ['Membre 1', 'Membre 2', 'Membre 3', 'Membre 4'],
        datasets: [{
            label: 'Nombre de commits',
            data: [12, 15, 7, 20],
            backgroundColor: [
                '#F06292', '#42A5F5', '#FF7043', '#66BB6A'
            ],
            borderColor: [
                '#F06292', '#42A5F5', '#FF7043', '#66BB6A'
            ],
            borderWidth: 1
        }]
    };

    const myChart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + ' commits';
                        }
                    }
                }
            }
        });
});
