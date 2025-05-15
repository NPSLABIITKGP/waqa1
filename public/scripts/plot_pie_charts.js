function renderChartsOutput2() {
    setTimeout(() => {
        const canvas = document.getElementById("barChart");
        const config = {
            type: "bar",
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Water Quality Index',
                    data: barData,
                    backgroundColor: barBgColors,
                    borderColor: barBorderColors,
                    border: 1,
                    maxBarThickness: 14
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Address' } },
                    y: { title: { display: true, text: 'Water Quality Index' } }
                }
            }
        };
        new Chart(canvas, config);
        
        // Pie chart
        TESTER = document.getElementById("pieChart");
        Plotly.newPlot(TESTER, [{
            values: pieData,
            labels: ['Excellent', 'Good', 'Permissible', 'Doubtful', 'Unsuitable'],
            type: 'pie',
            textinfo: 'label+percent',  // Show label and percentage
            textposition: 'outside',  // Place labels outside the pie
            automargin: true,  // Ensure margin space
            marker: {
                colors: [
                    'rgba(25, 135, 84, 0.8)', 
                    'rgba(22, 193, 114, 0.8)', 
                    'rgba(255, 193, 7, 0.8)', 
                    'rgba(255, 159, 64, 0.8)', 
                    'rgba(220, 53, 69, 0.8)'
                ]
            }
        }]
        );

        // Hazard pie charts 1
        TESTER = document.getElementById("pieChart1");
        Plotly.newPlot(TESTER, [{
            values: hazard_man,
            labels: ['No Risk', 'High Risk'],
            type: 'pie',
            textinfo: 'label+percent',  // Show label and percentage
            textposition: 'outside',  // Place labels outside the pie
            automargin: true,  // Ensure margin space
            marker: {
                colors: [
                    'rgba(25, 135, 84, 0.8)',  
                    'rgba(220, 53, 69, 0.8)'
                ]
            }
        }], 
        {
            // height: 400,  // Chart height
            showlegend: false,  // Hide legend
        });

        // Hazard pie charts 2
        TESTER = document.getElementById("pieChart2");
        Plotly.newPlot(TESTER, [{
            values: hazard_woman,
            labels: ['No Risk', 'High Risk'],
            type: 'pie',
            textinfo: 'label+percent',  // Show label and percentage
            textposition: 'outside',  // Place labels outside the pie
            automargin: true,  // Ensure margin space
            marker: {
                colors: [
                    'rgba(25, 135, 84, 0.8)',  
                    'rgba(220, 53, 69, 0.8)'
                ]
            }
        }], 
        {
            // height: 400,  // Chart height
            showlegend: false,  // Hide legend
        });

        // Hazard pie charts 3
        TESTER = document.getElementById("pieChart3");
        Plotly.newPlot(TESTER, [{
            values: hazard_child,
            labels: ['No Risk', 'High Risk'],
            type: 'pie',
            textinfo: 'label+percent',  // Show label and percentage
            textposition: 'outside',  // Place labels outside the pie
            automargin: true,  // Ensure margin space
            marker: {
                colors: [
                    'rgba(25, 135, 84, 0.8)',  
                    'rgba(220, 53, 69, 0.8)'
                ]
            }
        }], 
        {
            // height: 400,  // Chart height
            showlegend: false,  // Hide legend
        });

    }, 1000);
}


function renderChartsOutput3() {
    setTimeout(() => {
        const canvas1 = document.getElementById("barChart1");
        const config1 = {
            type: "bar",
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Sodium Adsorption Ratio',
                    data: barData1,
                    backgroundColor: barBgColors1,
                    borderColor: barBorderColors1,
                    border: 1,
                    maxBarThickness: 14
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Address' } },
                    y: { title: { display: true, text: 'Sodium Adsorption Ratio' } }
                }
            }
        };
        new Chart(canvas1, config1);

        const canvas2 = document.getElementById("barChart2");
        const config2 = {
            type: "bar",
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Sodium percentage',
                    data: barData2,
                    backgroundColor: barBgColors2,
                    borderColor: barBorderColors2,
                    border: 1,
                    maxBarThickness: 14
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Address' } },
                    y: { title: { display: true, text: 'Sodium percentage(%)' } }
                }
            }
        };
        new Chart(canvas2, config2);

    }, 1000);
}

function renderChartsOutput() {
    setTimeout(() => {
        const canvas = document.getElementById("barChart");
        const config = {
            type: "bar",
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Water Quality Index',
                    data: barData,
                    backgroundColor: barBgColors,
                    borderColor: barBorderColors,
                    border: 1,
                    maxBarThickness: 14
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Address' } },
                    y: { title: { display: true, text: 'Water Quality Index' } }
                }
            }
        };
        new Chart(canvas, config);

        const canvas1 = document.getElementById("barChart1");
        const config1 = {
            type: "bar",
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Sodium Adsorption Ratio',
                    data: barData1,
                    backgroundColor: barBgColors1,
                    borderColor: barBorderColors1,
                    border: 1,
                    maxBarThickness: 14
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Address' } },
                    y: { title: { display: true, text: 'Sodium Adsorption Ratio' } }
                }
            }
        };
        new Chart(canvas1, config1);

        const canvas2 = document.getElementById("barChart2");
        const config2 = {
            type: "bar",
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Sodium percentage',
                    data: barData2,
                    backgroundColor: barBgColors2,
                    borderColor: barBorderColors2,
                    border: 1,
                    maxBarThickness: 14
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Address' } },
                    y: { title: { display: true, text: 'Sodium percentage(%)' } }
                }
            }
        };
        new Chart(canvas2, config2);

    }, 1000);
}