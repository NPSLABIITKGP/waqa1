function plot_charts(data) {
    // Wilcox Diagram Data
    var Na_per_array = [];
    var EC_array = [];
    var hover_texts_wilcox = [];
    var nth = 0;

    for (var key in data){
        var Na_per = parseFloat(data[key]["Na_per"]);
        Na_per_array.push(Na_per);

        var EC = parseFloat(data[key]["electrical_conductivity"]);
        EC_array.push(EC);

        nth++;
        hover_texts_wilcox.push(`Point ${nth}<br>Na% = ${Na_per.toFixed(2)}<br>EC = ${EC.toFixed(2)} μS/cm`);
    }

    // Chadha's Diagram Data
    var ansx = [];
    var ansy = [];
    var hover_texts_chadha = [];
    nth = 0;

    for (var key in data){
        // Handle zero and undefined values by defaulting to 0
        var calcium = parseFloat(data[key].calciumion) || 0;
        var magnesium = parseFloat(data[key].magnesiumion) || 0;
        var sodium = parseFloat(data[key].sodiumion) || 0;
        var potassium = parseFloat(data[key].potassiumion) || 0;

        var carbonate = parseFloat(data[key].carbonate) || 0;
        var bicarbonate = parseFloat(data[key].bicarbonate) || 0;
        var chloride = parseFloat(data[key].chloride) || 0;
        var sulfate = parseFloat(data[key].sulfate) || 0;

        // Calculate x and y coordinates
        var a = (calcium + magnesium) - (sodium + potassium);
        var b = ((carbonate * 0.03333) + (bicarbonate * 0.01639)) - ((chloride * 0.02821) + (sulfate * 0.02082));

        ansx.push(a);
        ansy.push(b);

        nth++;
        hover_texts_chadha.push(`Point ${nth}<br>x = ${a.toFixed(2)} meq/L<br>y = ${b.toFixed(2)} meq/L`);
    }


    // Wilcox Diagram Plot
    var TESTER = document.getElementById('wilcox');
    // var imageURLs = ["https://raw.githubusercontent.com/rushisurya2705/Raw-Images/refs/heads/main/marker.png"];
    var imageURLs = ["https://raw.githubusercontent.com/rushisurya2705/Raw-Images/refs/heads/main/location.png"];
    var imageAnnotations = [];

    for (let i = 0; i < EC_array.length; i++) {
        imageAnnotations.push({
            source: imageURLs[0],
            xref: "x",
            yref: "y",
            x: EC_array[i],
            y: Na_per_array[i],
            sizex: 100,
            sizey: 100,
            xanchor: "center",
            yanchor: "middle",
            layer: "above",
        });
    }

    Plotly.newPlot(
        TESTER,
        [
            {
                x: EC_array,
                y: Na_per_array,
                mode: "markers",
                type: "scatter",
                text: Array.from(Array(Na_per_array.length).keys()).map(i => (i + 1).toString()),
                textposition: "top center",
                textfont: {
                    color: 'Black',
                    family: "Arial Black, sans-serif"
                },
                marker: { size: 2 },
                hovertext: hover_texts_wilcox,
                hoverinfo: "text",
            },
        ],
        {
            images: [
                ...imageAnnotations,
                {
                    source: "https://raw.githubusercontent.com/rushisurya2705/Raw-Images/main/Wilcox%20Diagram.png",
                    xref: "x",
                    yref: "y",
                    x: 0,
                    y: 100,
                    sizex: 4000,
                    sizey: 100,
                    sizing: "stretch",
                    opacity: 0.9,
                    layer: "below",
                },
            ],
            xaxis: {
                title: "Electrical Conductivity (in μS/cm)",
                range: [0, 4000], 
                tickvals: [0, 1000, 2000, 3000, 4000],
                ticktext: ['0', '1000', '2000', '3000', '4000'],
                showgrid: false
            },
            yaxis: {
                title: "Sodium Percentage (in Na%)",
                range: [0, 100],
                tickvals: [0, 20, 40, 60, 80, 100],
                ticktext: ['0', '20', '40', '60', '80', '100'],
                showgrid: false
            },
            width: 500,
        }
    );

    // Chadha's Diagram Plot
    TESTER = document.getElementById('chadha');
    var chadhaImageURLs = ["https://raw.githubusercontent.com/rushisurya2705/Raw-Images/refs/heads/main/location.png"];
    var chadhaImageAnnotations = [];

    for (let i = 0; i < ansx.length; i++) {
        chadhaImageAnnotations.push({
            source: chadhaImageURLs[0],
            xref: "x",
            yref: "y",
            x: ansx[i],
            y: ansy[i],
            sizex: 8,
            sizey: 8,
            xanchor: "center",
            yanchor: "middle",
            layer: "above",
        });
    }
    Plotly.newPlot(
        TESTER,
        [
            {
                x: ansx,
                y: ansy,
                mode: "markers",
                type: "scatter",
                text: Array.from(Array(ansx.length).keys()).map(i => (i + 1).toString()),
                // textposition: "top center",
                textfont: {
                    color: 'black',
                    family: "Arial Black, sans-serif"
                },
                marker: { size: 2 },
                hovertext: hover_texts_chadha,
                hoverinfo: "text",
            },
        ],
        {
            images: chadhaImageAnnotations,
            xaxis: {
                title: "Milliequivalents/Liter (meq/L) (Ca²⁺ + Mg²⁺) - (Na⁺ + K⁺)",
                titlefont: { 
                    size: 12 
                },
                range: [-100, 100],
                zeroline: true, 
                showgrid: false
            },
            yaxis: {
                title: "Milliequivalents/Liter (meq/L) (CO₃²⁻ + HCO₃⁻) - (Cl⁻ + SO₄²⁻)",
                titlefont: { 
                    size: 12 
                },
                range: [-100, 100], 
                zeroline: true, 
                showgrid: false
            },
            annotations: [
                {
                    x: 75,
                    y: 75,
                    xref: 'x',
                    yref: 'y',
                    text: '(Ca-Mg-HCO₃)',
                    showarrow: false,
                },
                {
                    x: -75,
                    y: 75,
                    xref: 'x',
                    yref: 'y',
                    text: '(Na-HCO₃)',
                    showarrow: false,
                },
                {
                    x: -75,
                    y: -75,
                    xref: 'x',
                    yref: 'y',
                    text: '(Na-Cl)',
                    showarrow: false,
                },
                {
                    x: 75,
                    y: -75,
                    xref: 'x',
                    yref: 'y',
                    text: '(Ca-Mg-Cl)',
                    showarrow: false,
                }
            ],
            // width: 500,
        }
    );

    // Gibbs Diagram Data
    var x_values = [];
    var x2_values = [];
    var y_values = [];
    var labels = [];
    var hover_texts1 = [];
    var hover_texts2 = [];
    var nth = 0;

    for (var key in data) {
        var Na_K = parseFloat(data[key]["sodiumion"]) + parseFloat(data[key]["potassiumion"]);
        var Ca = parseFloat(data[key]["calciumion"]);
        var x_value = Na_K / (Na_K + Ca);
        x_values.push(x_value);

        var cl = parseFloat(data[key]["chloride"]);
        var hco3 = parseFloat(data[key]["bicarbonate"]);
        var x2_value = cl / (cl + hco3);
        x2_values.push(x2_value);

        y_values.push(parseFloat(data[key]["total_dissolved_solids"]));

        nth++;
        labels.push(nth.toString()); 

        // Add custom hover text for gibbs1
        hover_texts1.push(`Point ${nth}<br>x=${x_value.toFixed(2)}<br>TDS=${y_values[nth-1]}`);

        // Add custom hover text for gibbs2
        hover_texts2.push(`Point ${nth}<br>x=${x2_value.toFixed(2)}<br>TDS=${y_values[nth-1]}`);
    }

    var TESTER = document.getElementById('gibbs1');
    Plotly.newPlot(
        TESTER,
        [
            {
                x: x_values, 
                y: y_values,  
                mode: "markers",
                type: "scatter",  
                text: labels, 
                textposition: "top center",  
                textfont: {
                    color: 'black',  
                    family: "Arial Black, sans-serif"  
                },
                marker: { size: 5 }, 
                hovertext: hover_texts1,
                hoverinfo: "text",
            },
        ],
        {
            xaxis: {
                title: "(Na⁺ + K⁺) / (Na⁺ + K⁺ + Ca2⁺)", 
                range: [0, 1.1],  
                tickvals: [0, 0.5, 1],
                ticktext: ['0', '0.5', '1'],
                showgrid: false
            },
            yaxis: {
                title: "TDS (mg/L)",
                type: 'log',
                range: [0, 5],
                tickvals: [1, 10, 100, 1000, 10000, 100000],
                ticktext: ['1', '10', '100', '1000', '10000', '100000'],
                showgrid: false
            },
            images: [
                {
                    source: "https://raw.githubusercontent.com/rushisurya2705/Raw-Images/main/Gibbs%20Image%20for%20Plot.png",
                    xref: "x",  
                    yref: "y",
                    x: 0,
                    y: 5,
                    sizex: 1,
                    sizey: 5,
                    sizing: "stretch",  
                    opacity: 1,
                    layer: "below",  
                },
            ],
            // width: 500,
        }
    );

    var TESTER = document.getElementById('gibbs2');
    Plotly.newPlot(
        TESTER,
        [
            {
                x: x2_values, 
                y: y_values,  
                mode: "markers",  
                type: "scatter",  
                text: labels, 
                textposition: "top center",  
                textfont: {
                    color: 'black',  
                    family: "Arial Black, sans-serif"  
                },
                marker: { size: 5 },
                hovertext: hover_texts2,
                hoverinfo: "text",
            },
        ],
        {
            xaxis: {
                title: "(Cl⁻) / (Cl⁻ + HCO3⁻)", 
                range: [0, 1.1],  
                tickvals: [0, 0.5, 1],
                ticktext: ['0', '0.5', '1'],
                showgrid: false
            },
            yaxis: {
                title: "TDS (mg/L)",
                type: 'log',
                range: [0, 5],
                tickvals: [1, 10, 100, 1000, 10000, 100000],
                ticktext: ['1', '10', '100', '1000', '10000', '100000'],
                showgrid: false
            },
            images: [
                {
                    source: "https://raw.githubusercontent.com/rushisurya2705/Raw-Images/main/Gibbs%20Image%20for%20Plot.png",  
                    xref: "x",  
                    yref: "y",
                    x: 0,
                    y: 5,
                    sizex: 1,
                    sizey: 5,
                    sizing: "stretch",  
                    opacity: 1,
                    layer: "below",  
                },
            ],
            // width: 500,
        }
    );
}


/*
<!-- <script>
    // Wilcox Diagram Data
    const data1 = JSON.parse('<%- data %>');
    var Na_per_array = [];
    var EC_array = [];
    var hover_texts_wilcox = [];
    var nth = 0;

    for (var key in data1){
        var Na_per = parseFloat(data1[key]["Na_per"]);
        Na_per_array.push(Na_per);

        var EC = parseFloat(data1[key]["electrical_conductivity"]);
        EC_array.push(EC);

        nth++;
        hover_texts_wilcox.push(`Point ${nth}<br>Na% = ${Na_per.toFixed(2)}<br>EC = ${EC.toFixed(2)} μS/cm`);
    }

    // Chadha's Diagram Data
    var ansx = [];
    var ansy = [];
    var hover_texts_chadha = [];
    nth = 0;

    for (var key in data1){
        // Handle zero and undefined values by defaulting to 0
        var calcium = parseFloat(data1[key].calciumion) || 0;
        var magnesium = parseFloat(data1[key].magnesiumion) || 0;
        var sodium = parseFloat(data1[key].sodiumion) || 0;
        var potassium = parseFloat(data1[key].potassiumion) || 0;

        var carbonate = parseFloat(data1[key].carbonate) || 0;
        var bicarbonate = parseFloat(data1[key].bicarbonate) || 0;
        var chloride = parseFloat(data1[key].chloride) || 0;
        var sulfate = parseFloat(data1[key].sulfate) || 0;

        // Calculate x and y coordinates
        var a = (calcium + magnesium) - (sodium + potassium);
        var b = ((carbonate * 0.03333) + (bicarbonate * 0.01639)) - ((chloride * 0.02821) + (sulfate * 0.02082));

        ansx.push(a);
        ansy.push(b);

        nth++;
        hover_texts_chadha.push(`Point ${nth}<br>x = ${a.toFixed(2)} meq/L<br>y = ${b.toFixed(2)} meq/L`);
    }

    // Wilcox Diagram Plot
    var TESTER = document.getElementById('wilcox');
    Plotly.newPlot(
        TESTER,
        [
            {
                x: EC_array,
                y: Na_per_array,
                mode: "markers+text",
                type: "scatter",
                text: Array.from(Array(Na_per_array.length).keys()).map(i => (i + 1).toString()),
                textposition: "top center",
                textfont: {
                    color: 'Black',
                    family: "Arial Black, sans-serif"
                },
                marker: { size: 8 },
                hovertext: hover_texts_wilcox,  // Assign custom hover text
                hoverinfo: "text",  // Display only the custom hover text
            },
        ],
        {
            images: [
                {
                    source: "https://raw.githubusercontent.com/rushisurya2705/Raw-Images/main/Wilcox%20Diagram.png",
                    xref: "x",
                    yref: "y",
                    x: 0,
                    y: 100,
                    sizex: 4000,
                    sizey: 100,
                    sizing: "stretch",
                    opacity: 0.9,
                    layer: "below",
                },
            ],
            xaxis: {
                title: "Electrical Conductivity (in μS/cm)",
                range: [0, 4000], 
                tickvals: [0, 1000, 2000, 3000, 4000],
                ticktext: ['0', '1000', '2000', '3000', '4000'],
                showgrid: false  // Hide x-axis grid lines
            },
            yaxis: {
                title: "Sodium Percentage (in Na%)",
                range: [0, 100],
                tickvals: [0, 20, 40, 60, 80, 100],
                ticktext: ['0', '20', '40', '60', '80', '100'],
                showgrid: false  // Hide y-axis grid lines
            },
            width: 500,
        }
    );

    // Chadha's Diagram Plot
    TESTER = document.getElementById('chadha');
    Plotly.newPlot(
        TESTER,
        [
            {
                x: ansx,
                y: ansy,
                mode: "markers+text",
                type: "scatter",
                text: Array.from(Array(ansx.length).keys()).map(i => (i + 1).toString()),
                textposition: "top center",
                textfont: {
                    color: 'black',
                    family: "Arial Black, sans-serif"
                },
                marker: { size: 8 },
                hovertext: hover_texts_chadha,  // Assign custom hover text
                hoverinfo: "text",  // Display only the custom hover text
            },
        ],
        {
            xaxis: {
                title: "Milliequivalents/Liter (meq/L) (Ca²⁺ + Mg²⁺) - (Na⁺ + K⁺)",
                titlefont: { 
                    size: 12 
                },
                range: [-100, 100],
                zeroline: true, 
                showgrid: false  // Hide x-axis grid lines
            },
            yaxis: {
                title: "Milliequivalents/Liter (meq/L) (CO₃²⁻ + HCO₃⁻) - (Cl⁻ + SO₄²⁻)",
                titlefont: { 
                    size: 12 
                },
                range: [-100, 100], 
                zeroline: true, 
                showgrid: false  // Hide y-axis grid lines
            },
            annotations: [
                {
                    x: 75,
                    y: 75,
                    xref: 'x',
                    yref: 'y',
                    text: '(Ca-Mg-HCO₃)',
                    showarrow: false,
                },
                {
                    x: -75,
                    y: 75,
                    xref: 'x',
                    yref: 'y',
                    text: '(Na-HCO₃)',
                    showarrow: false,
                },
                {
                    x: -75,
                    y: -75,
                    xref: 'x',
                    yref: 'y',
                    text: '(Na-Cl)',
                    showarrow: false,
                },
                {
                    x: 75,
                    y: -75,
                    xref: 'x',
                    yref: 'y',
                    text: '(Ca-Mg-Cl)',
                    showarrow: false,
                }
            ],
        }
    );
</script>

<script>
    // Gibbs Diagram Data
    const data3 = JSON.parse('<%- data %>');

    var x_values = [];
    var x2_values = [];
    var y_values = [];
    var labels = [];
    var nth = 0;

    for (var key in data3) {
        // Calculate x = (Na+ + K+) / (Na+ + K+ + Ca2+)
        var Na_K = parseFloat(data3[key]["sodiumion"]) + parseFloat(data3[key]["potassiumion"]);
        var Ca = parseFloat(data3[key]["calciumion"]);
        var x_value = Na_K / (Na_K + Ca);
        x_values.push(x_value);

        var cl = parseFloat(data3[key]["chloride"]);
        var hco3 = parseFloat(data3[key]["bicarbonate"]);
        var x2_value = cl / (cl + hco3);
        x2_values.push(x2_value);

        // y = TDS (mg/L)
        y_values.push(parseFloat(data3[key]["total_dissolved_solids"]));

        nth++;
        labels.push(nth.toString()); 
    }

    var TESTER = document.getElementById('gibbs1');
    Plotly.newPlot(
        TESTER,
        [
            {
                x: x_values, 
                y: y_values,  
                mode: "markers+text",  
                type: "scatter",  
                text: labels, 
                textposition: "top center",  
                textfont: {
                    color: 'black',  
                    family: "Arial Black, sans-serif"  
                },
                marker: { size: 8 }, 
            },
        ],
        {
            xaxis: {
                title: "(Na+ + K+) / (Na+ + K+ + Ca2+)", 
                range: [0, 1.1],  
                tickvals: [0, 0.5, 1],
                ticktext: ['0', '0.5', '1'],
                showgrid: false  // Hide x-axis grid lines
            },
            yaxis: {
                title: "TDS (mg/L)",
                type: 'log',
                range: [0, 5],
                tickvals: [1, 10, 100, 1000, 10000, 100000],
                ticktext: ['1', '10', '100', '1000', '10000', '100000'],
                showgrid: false  // Hide x-axis grid lines
            },
            images: [
                {
                    source: "https://raw.githubusercontent.com/rushisurya2705/Raw-Images/main/Gibbs%20Image%20for%20Plot.png",  // Path to your image
                    xref: "x",  
                    yref: "y",
                    x: 0,
                    y: 5,
                    sizex: 1,
                    sizey: 5,
                    sizing: "stretch",  
                    opacity: 1,
                    layer: "below",  
                },
            ],
            width: 500,
        }
    );

    var TESTER = document.getElementById('gibbs2');
    Plotly.newPlot(
        TESTER,
        [
            {
                x: x2_values, 
                y: y_values,  
                mode: "markers+text",  
                type: "scatter",  
                text: labels, 
                textposition: "top center",  
                textfont: {
                    color: 'black',  
                    family: "Arial Black, sans-serif"  
                },
                marker: { size: 8 }, 
            },
        ],
        {
            xaxis: {
                title: "(Cl-) / (Cl- + HCO3-)", 
                range: [0, 1.1],  
                tickvals: [0, 0.5, 1],
                ticktext: ['0', '0.5', '1'],
                showgrid: false  // Hide x-axis grid lines
            },
            yaxis: {
                title: "TDS (mg/L)",
                type: 'log',
                range: [0, 5],
                tickvals: [1, 10, 100, 1000, 10000, 100000],
                ticktext: ['1', '10', '100', '1000', '10000', '100000'],
                showgrid: false  // Hide x-axis grid lines
            },
            images: [
                {
                    source: "https://raw.githubusercontent.com/rushisurya2705/Raw-Images/main/Gibbs%20Image%20for%20Plot.png",  // Path to your image
                    xref: "x",  
                    yref: "y",
                    x: 0,
                    y: 5,
                    sizex: 1,
                    sizey: 5,
                    sizing: "stretch",  
                    opacity: 1,
                    layer: "below",  
                },
            ],
            width: 500,
        }
    );
</script> -->
*/