// Code for putting data into excel 

// function formatDataForGoogleSheets(obj, userdata) {
//     // const datee = new Date().toISOString();
//     return Object.keys(obj).map(key => [
//         // datee,
//         Date(Date.now()).toString(),
//         userdata.name,
//         userdata.email,
//         userdata.country,
//         userdata.phone,
//         obj[key]['date'],
//         obj[key]['latitude'],
//         obj[key]['longitude'],
//         obj[key]['ph'],
//         obj[key]['temperature'],
//         obj[key]['turbidity'],
//         obj[key]['electrical_conductivity'],
//         obj[key]['hardness'],
//         obj[key]['alkalinity'],
//         obj[key]['total_dissolved_solids'],
//         obj[key]['dissolved_oxygen'],
//         obj[key]['biological_oxygen_demand'],
//         obj[key]['chemical_oxygen_demand'],
//         obj[key]['ammonium'],
//         obj[key]['chloride'],
//         obj[key]['carbonate'],
//         obj[key]['bicarbonate'],
//         obj[key]['sulfate'],
//         obj[key]['nitrate'],
//         obj[key]['nitrite'],
//         obj[key]['fluoride'],
//         obj[key]['phosphate'],
//         obj[key]['sodiumion'],
//         obj[key]['calciumion'],
//         obj[key]['magnesiumion'],
//         obj[key]['potassiumion'],
//         obj[key]['water_quality_index'],
//         obj[key]['hazard_index']['male'],
//         obj[key]['hazard_index']['female'],
//         obj[key]['hazard_index']['child'],
//         obj[key]['sar'],
//         obj[key]['Na_per'],
//     ]);
// }

// async function handlePostRequest(req, res, view) {
//     let err = [];
//     let obj = restructure(req.body);
//     // let objwqi = restructure(req.body);

//     for (var key in obj) {
//         if (Object.keys(obj[key]).length <= 6) {
//             err.push({ msg: 'Number of parameters should be more than 3' });
//         }
//     }

//     if (err.length > 0) {
//         return res.render('input', { err });
//     }

//     obj = processData(obj);

//     const formattedData = formatDataForGoogleSheets(obj, userdata);

//     try {
//         const googleSheets = await authenticateGoogleSheets();
//         await appendToGoogleSheets(googleSheets, formattedData);
//         res.render(view, { data: JSON.stringify(obj), userdata: JSON.stringify(userdata) });
//     } catch (error) {
//         console.error(`Failed to append data to Google Sheets: ${error}`);
//         res.render('error', { error: 'Failed to process and append data to Google Sheets.' });
//     }
// }

// async function handlePostRequestAnalyse(req, res, view) {
//     let err = [];
//     let obj = req.body;
//     // let objwqi = req.body;

//     for (var key in obj) {
//         if (Object.keys(obj[key]).length <= 6) {
//             err.push({ msg: 'Number of parameters should be more than 3' });
//         }
//     }

//     if (err.length > 0) {
//         return res.render('input', { err });
//     }

//     obj = processData(obj);
//     // console.log(obj);

//     const formattedData = formatDataForGoogleSheets(obj, userdata);
//     // console.log(formattedData);

//     try {
//         const googleSheets = await authenticateGoogleSheets();
//         await appendToGoogleSheets(googleSheets, formattedData);
//         res.render(view, { data: JSON.stringify(obj), userdata: JSON.stringify(userdata) });
//     } catch (error) {
//         console.error(`Failed to append data to Google Sheets: ${error}`);
//         res.render('error', { error: 'Failed to process and append data to Google Sheets.' });
//     }
// }


 /* images: [
                {
                    // source:"https://raw.githubusercontent.com/tarun-tej-t/rutag-imgs/main/wilcox-empty.png",
                    source: "https://raw.githubusercontent.com/rushisurya2705/Raw-Images/main/Wilcox%20Diagram.png",
                    xref: "x",
                    yref: "y",
                    x: -850,
                    y: 105,
                    sizex: 5400,
                    sizey: 125,
                    sizing: "stretch",
                    opacity: 0.9,
                    layer: "below",
                },
            ], */

    /* <script>
    async function generatePDF() {
        // Fetch user details and parameters
        const { userDetails, parameters } = await fetchUserData();

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            compress: true
        });

        // Page 1: Cover Page
        doc.setFont('times', 'normal');

        // Header
        const headerImg1 = new Image();
        headerImg1.src = '/img/logo-no-background.png';
        const headerImg2 = new Image();
        headerImg2.src = '/img/IIT_Kharagpur_Logo.png';

        doc.addImage(headerImg1, 'PNG', 8, 8, 18, 18);
        doc.addImage(headerImg2, 'PNG', 136, 8, 17, 17);

        doc.setFontSize(10);
        doc.text('Water', 28, 13);
        doc.text('Quality', 28, 18);
        doc.text('Assessment', 28, 23);

        doc.setFontSize(8.5);
        doc.text('Water Sensing and Simulation Lab', 155, 10);
        doc.text('Agricultural and Food Engineering', 155, 15);
        doc.text('Indian Institute of Technology Kharagpur', 155, 20);
        doc.text('Kharagpur, West Bengal - 721302', 155, 25);

        doc.setFontSize(17);
        doc.text('Water Quality Report', 74, 40);

        doc.line(5, 30, 205, 30, 'S');

        // Title
        doc.setFontSize(14);
        doc.text('Drinking Water & Irrigation Water', 64, 50);

        // User Information
        doc.setFontSize(12);
        doc.setFont('calibri', 'bold');
        doc.text('User Information', 10, 60);
        doc.setFont('times', 'normal');
        doc.text(`Name: ${userDetails.name}`, 10, 67);
        doc.text(`Email: ${userDetails.email}`, 10, 74);
        doc.text(`Country: ${userDetails.country}`, 10, 81);

        doc.setFont('calibri', 'bold');
        doc.text('Interpretation', 10, 90);
        doc.setFont('times', 'normal');

        doc.addPage();

        // Page 2: Drinking Water Analysis
        doc.setFontSize(15);
        doc.text('Drinking Water Analysis', 75, 10);
        doc.line(6, 15, 204, 15, 'S');

        const id_dw = ["mapd", "wq_Risk", "wqi_Status"];
        const id_iw = ["irrigation_Suitability", "sar_Status", "Na_Status"];
        const id_dia = ["wilcox_D", "chadha_D", "gibbs_D"];

        let y_d = 15; // Reduced initial spacing

        for (let i = 0; i < id_dw.length; i++) {
            const content = document.querySelector('#' + id_dw[i]);
            const canvas = await html2canvas(content, { scale: 2, useCORS: true }); // Increased scale for better image quality
            const imgData = canvas.toDataURL('image/jpeg', 0.75); // Set JPEG quality to 0.75 to balance quality and size
            const imgWidth = 190; // A4 width in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;

            doc.addImage(imgData, 'JPEG', 10, y_d, imgWidth, imgHeight);
            y_d += imgHeight + 5; // Reduced spacing between charts/tables
        }

        doc.addPage();

        // Page 3: Irrigation Water Analysis
        doc.setFontSize(15);
        doc.text('Irrigation Water Analysis', 75, 10);
        doc.line(6, 15, 204, 15, 'S');

        let y_i = 15; // Reduced initial spacing

        for (let i = 0; i < id_iw.length; i++) {
            const content = document.querySelector('#' + id_iw[i]);
            const canvas = await html2canvas(content, { scale: 2, useCORS: true }); // Increased scale for better image quality
            const imgData = canvas.toDataURL('image/jpeg', 0.75); // Set JPEG quality to 0.75 to balance quality and size
            const imgWidth = 190; // A4 width in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;

            doc.addImage(imgData, 'JPEG', 10, y_i, imgWidth, imgHeight);
            y_i += imgHeight + 5; // Reduced spacing between charts/tables
        }

        doc.addPage();

        // Page 4: Diagrams
        /* doc.setFontSize(15);
        doc.text('Diagrams', 85, 10);
        doc.line(6, 15, 204, 15, 'S');

        let y_p = 15; // Reduced initial spacing

        for (let i = 0; i < id_dia.length; i++) {
            const content = document.querySelector('#' + id_dia[i]);
            const canvas = await html2canvas(content, { scale: 2, useCORS: true }); // Increased scale for better image quality
            const imgData = canvas.toDataURL('image/jpeg', 0.75); // Set JPEG quality to 0.75 to balance quality and size
            const imgWidth = 190; // A4 width in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;

            doc.addImage(imgData, 'JPEG', 10, y_p, imgWidth, imgHeight);
            y_p += imgHeight + 2; // Reduced spacing between diagrams
        }

        doc.addPage();

        // Page 4: Diagrams
        doc.setFontSize(15);
        doc.text('Diagrams', 85, 10);
        doc.line(6, 15, 204, 15, 'S');

        let y_p = 20; // Initial spacing

        for (let i = 0; i < id_dia.length; i++) {
            const content = document.querySelector('#' + id_dia[i]);
            const canvas = await html2canvas(content, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL('image/jpeg', 0.75);
            const imgWidth = 170; // Reduced width
            const imgHeight = canvas.height * imgWidth / canvas.width;

            const x_centered = (doc.internal.pageSize.width - imgWidth) / 2; // Calculate x to center the image

            doc.addImage(imgData, 'JPEG', x_centered, y_p, imgWidth, imgHeight); // Use x_centered for horizontal centering
            y_p += imgHeight + 10; // Reduced spacing between diagrams
        }

        doc.addPage();

        // Page 5: Appendix
        doc.setFontSize(15);
        doc.text('Appendix', 85, 10);
        doc.line(6, 15, 204, 15, 'S');

        doc.setFontSize(10);
        const transposedData = {};
        parameters.forEach(parameter => {
            for (const [key, value] of Object.entries(parameter)) {
                if (!transposedData[key]) {
                    transposedData[key] = [];
                }
                transposedData[key].push(value);
            }
        });

        // Draw table
        const startY = 20;
        const cellWidth = 40;
        const cellHeight = 10;
        let currentY = startY;

        for (const [header, values] of Object.entries(transposedData)) {
            doc.setFillColor(180, 180, 180);
            doc.rect(10, currentY, cellWidth, cellHeight, 'F');
            doc.setTextColor(0, 0, 0);
            doc.text(header, 10 + cellWidth / 2, currentY + cellHeight / 2, { align: 'center' });

            for (let i = 0; i < values.length; i++) {
                doc.setFillColor(245, 245, 245);
                doc.rect((i + 1) * cellWidth + 10, currentY, cellWidth, cellHeight, 'F');
                doc.setTextColor(0, 0, 0);
                doc.text(values[i].toString(), (i + 1) * cellWidth + 10 + cellWidth / 2, currentY + cellHeight / 2, { align: 'center' });
            }

            currentY += cellHeight;
        }

        // Generate filename based on current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const filename = `${year}-${month}-${day}_${hours}${minutes}${seconds}_document.pdf`;

        // Save PDF with dynamic filename
        doc.save(filename);

        // Convert PDF to Blob and send to server
        const pdfBlob = doc.output('blob');
        const formData = new FormData();
        formData.append('pdf', pdfBlob, filename);
    
        // Send the PDF to the server
        fetch('/upload_pdf', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('PDF uploaded successfully!');
            } else {
                alert(`Failed to upload PDF: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to upload PDF due to a network or server error.');
        });
    }
</script> */

/*
<!-- Wilcox Diagram Script -->
<!-- <script>
    const data1 = JSON.parse('<%- data %>');
    var Na_per_array = [];
    var temp1 = [];
    var nth = 0;
    for (var key in data1){
        Na_per_array.push(parseFloat(data1[key]["Na_per"]));
        nth++;
        var st = nth.toString();
        temp1.push(st);
    }
    var EC_array = [];
    for (var key in data1){
        EC_array.push(parseFloat(data1[key]["electrical_conductivity"]));
    }

    TESTER = document.getElementById('wilcox');
    Plotly.newPlot(
        TESTER,
        [
            {
                x: EC_array,
                y: Na_per_array,
                mode: "markers+text",
                type: "scatter",
                text: temp1,
                textposition: "top center",
                textfont: {
                    color: 'Black',
                    family: "Arial Black, sans-serif"
                },
                marker: { size: 8 },
            },
        ],
        {
            images: [
                {
                    source:
                        "https://raw.githubusercontent.com/tarun-tej-t/rutag-imgs/main/wilcox-empty.png",
                    xref: "x",
                    yref: "y",
                    x: -850,
                    y: 105,
                    sizex: 5400,
                    sizey: 125,
                    sizing: "stretch",
                    opacity: 0.9,
                    layer: "below",
                },
            ],
            xaxis: {
                title: "Electrical Conductivity (in μS/cm)",
                range: [0, 4100], 
                showgrid: false  // Hide x-axis grid lines
            },
            yaxis: {
                title: "Sodium Percentage (in Na%)",
                range: [0, 100],
                showgrid: false  // Hide x-axis grid lines
            },
        }
    );
</script> -->

<!-- Chadha's Diagram Script -->
<!-- <script>
    const data2 = JSON.parse('<%- data %>');
    var ansx = [];
    var temp = [];
    var nth = 0;
    for (var key in data2){
        var a = (parseFloat(data2[key].calciumion) + parseFloat(data2[key].magnesiumion)) - (parseFloat(data2[key].sodiumion) + parseFloat(data2[key].potassiumion));
        ansx.push(a);
        nth++;
        var st = nth.toString();
        temp.push("Point:" + st);
    }

    var ansy = [];
    for (var key in data2){
        var b = (parseFloat(data2[key].carbonate) + parseFloat(data2[key].bicarbonate)) - (parseFloat(data2[key].chloride) + parseFloat(data2[key].sulfate));
        ansy.push(b);
    }

    TESTER = document.getElementById('chadha');
    Plotly.newPlot(
        TESTER,
        [
            {
                x: ansx,
                y: ansy,
                mode: "markers+text",
                type: "scatter",
                text: temp,
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
                title:"Milliequivalents/Liter (meq/L) (Ca2+ + Mg2+)-(Na+ + K+)",
                titlefont: { 
                    size: 12 
                },
                range: [-100, 100],
                zeroline: true, 
                showgrid: false  // Hide x-axis grid lines
            },
            yaxis: {
                title:"Milliequivalents/Liter (meq/L) (CO3- + HCO3-)-(Cl- + SO42-)",
                titlefont: { 
                    size: 12 
                },
                range: [-100, 100], 
                zeroline: true, 
                showgrid: false  // Hide x-axis grid lines
            },
            annotations: [
                {
                    x: 75,
                    y: 75,
                    xref: 'x',
                    yref: 'y',
                    text: '(Ca-Mg-HCO3)',
                    showarrow: false,
                },
                {
                    x: -75,
                    y: 75,
                    xref: 'x',
                    yref: 'y',
                    text: '(Na-HCO3)',
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
</script> -->
*/

/* function processData(obj) {
    for (let key in obj) {
        obj[key]['sar'] = calculate_sar([
            parseFloat(obj[key]['sodiumion']),
            parseFloat(obj[key]['calciumion']),
            parseFloat(obj[key]['magnesiumion']),
        ]);

        obj[key]['Na_per'] = calculate_sodiumpercentage([
            parseFloat(obj[key]['sodiumion']),
            parseFloat(obj[key]['calciumion']),
            parseFloat(obj[key]['magnesiumion']),
            parseFloat(obj[key]['potassiumion']),
        ]);

        // obj[key]['water_quality_index'] = calculate_wqi(objwqi[key]);
        obj[key]['water_quality_index'] = calculate_wqi(obj[key]);

        obj[key]['hazard_index'] = calculate_hazard_index([
            parseFloat(obj[key]['nitrate']),
            parseFloat(obj[key]['nitrite']),
            parseFloat(obj[key]['fluoride']),
            parseFloat(obj[key]['ammonium']),
            parseFloat(obj[key]['phosphate']),
        ]);
    }
    return obj;
} */




for (var key in data) {
    url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + data[key].latitude + "&lon=" + data[key].longitude + "";
    mapURLs.push(url);
}

function getAddress(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // console.log('Address data:', data);
            return data.display_name;
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
            return "Address not found";
        });
}

Promise.all(mapURLs.map(getAddress)).then((addresses) => {
    addresses.forEach((address, i) => {
        document.getElementById(`address${i}`).innerHTML = address;
        document.getElementById(`address1${i}`).innerHTML = address;
        const addressParts = address.split(", ");
        barLabels.push(addressParts[0] || `Location ${i + 1}`);
    });

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
                }
                ],
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Address' } },
                    y: { title: { display: true, text: 'Sodium Adsorption Ratio' } }
                }
            }
        }
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
                }
                ],
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Address' } },
                    y: { title: { display: true, text: 'Sodium percentage(%)' } }
                }
            }
        }
        new Chart(canvas2, config2);

    }, 1000);
}).catch(error => {
    console.error("Error in fetching address:", error);
});


app.post('/welcome', (req, res) => {
    userdata = req.body;
    const { name, email, country, phone } = req.body;
    // let errors = [];

    // if (!name || !email || !country) {
    //     errors.push({ msg: "Please fill in all fields" });
    // } else {
    //     if (name.length < 4) {
    //         errors.push({ msg: "Name should be at least 4 characters" });
    //     }

    //     if (!emailVerification(email)) {
    //         errors.push({ msg: "Email is invalid" });
    //     }
    // }

    // if (errors.length > 0) {
    //     res.render("user", { errors, name, email, country, phone });
    // } else {
    //     res.render('welcome', { userdata: JSON.stringify(req.body) });
    // }
    res.render('welcome', { userdata: JSON.stringify(req.body) });
});

/*
<!-- <script>
    async function generatePDF() {
        // Retrieve user details from user input 
        const data5 = JSON.parse('<%- data %>');
        const udata = JSON.parse('<%- userdata %>');
        
        const userDetails = {
            name: udata.name,
            email: udata.email,
            country: udata.country,
            //parameters: JSON.stringify(data4),
        };
        
        // Extract parameters 
        const parameters = Object.values(data5).map(entry => ({
                date: entry.date,
                ph: entry.ph || '-',
                temperature: entry.temperature || '-',
                turbidity: entry.turbidity || '-',
                electrical_conductivity: entry.electrical_conductivity || '-',       
                hardness: entry.hardness || '-',       
                alkalinity: entry.alkalinity || '-',       
                total_dissolved_solids: entry.total_dissolved_solids || '-',       
                dissolved_oxygen: entry.dissolved_oxygen || '-',       
                biological_oxygen_demand: entry.biological_oxygen_demand || '-',       
                chemical_oxygen_demand: entry.chemical_oxygen_demand || '-',
                potassiumion: entry.potassiumion || '-',
                magnesiumion: entry.magnesiumion || '-',
                calciumion: entry.calciumion || '-',
                sodiumion: entry.sodiumion || '-',       
                ammonium: entry.ammonium || '-',       
                chloride: entry.chloride || '-',
                carbonate: entry.carbonate || '-',
                bicarbonate: entry.bicarbonate || '-',
                sulfate: entry.sulfate || '-',
                nitrate: entry.nitrate || '-',
                nitrite: entry.nitrite || '-',
                phosphate: entry.phosphate || '-',
                fluoride: entry.fluoride || '-',
            })); 

        const { jsPDF } = window.jspdf; // Correct reference to jsPDF
        const doc = new jsPDF({
        orientation: 'p', 
        unit: 'mm', 
        compress: true 
        });

        //-----------page1----------------
        doc.setFont('times', 'normal');

        // header
        const headerImg1 = new Image();
        headerImg1.src = '/img/logo-no-background.png'; // Replace 'organization-logo.png' with actual URL or path
        const headerImg2 = new Image();
        headerImg2.src = '/img/IIT_Kharagpur_Logo.png'; // Replace 'IITKGP-logo.png' with actual URL or path

        doc.addImage(headerImg1, 'PNG', 10, 8, 18, 18);
        doc.addImage(headerImg2, 'PNG', 136, 9, 16, 16);
        
        doc.setFontSize(10);
        doc.text('Water', 30,13);
        doc.text('Quality', 30, 18);
        doc.text('Assessment', 30, 23);

        doc.setFontSize(8.5);
        doc.text('Agricultural and Food Engineering', 153,14);
        doc.text('Indian Institute of Technology Kharagpur', 153, 19);
        doc.text('Kharagpur, West Bengal - 721302', 153, 24);

        doc.setFontSize(19);
        doc.text('Water Quality Report ', 67, 18);

        doc.line(8,30,202,30,'S');

        // title
        doc.setFontSize(16);
        doc.text('Report : Drinking Water ', 70, 50);

        doc.setFontSize(12);
        doc.text(`Name: ${userDetails.name}`, 10, 63);
        doc.text(`Email: ${userDetails.email}`, 10, 70);
        doc.text(`Country: ${userDetails.country}`, 10, 77);
        doc.text(`Parameters: ${userDetails.parameters}`, 10, 84);

        // parameters 
        const headers = [
        'Date', 'pH', 'Temperature', 'Turbidity', 'Electrical Conductivity',
        'Hardness', 'Alkalinity', 'TDS', 'Dissolved Oxygen',
        'BOD', 'COD', 'Potassium Ion',
        'Magnesium Ion', 'Calcium Ion', 'Sodium Ion', 'Ammonium', 'Chloride',
        'Carbonate', 'Bicarbonate', 'Sulfate', 'Nitrate', 'Nitrite', 'Phosphate',
        'Fluoride'
        ];
 
        let y = 90; // Parameters initial y position 

        //headers
        headers.forEach(header => {
            doc.text(header, 10, y);
            y += 6;
        });

        let x = 51; // Parameters initial x position

        // content
        parameters.forEach(parameter => {
            y = 90;
            Object.values(parameter).forEach(value => {
                doc.text(value.toString(), x, y);
                y += 6;
            });
            x += 30; // Adjust X position for the next row
        });

        doc.addPage();
        //-----------------------------------------------------

        const id_dw = ["mapd", "wq_Risk", "wqi_Status"];
        const content=[],canvas=[], imgData=[], imgWidth=[], imgHeight=[];

        //-----------page2----------------
        //Drinking
        doc.setFontSize(15);
        doc.text('Drinking Water Analysis', 75, 10);
        doc.line(8,15,202,15,'S');

        
        let y_d=20;

        for (let i = 0; i < id_dw.length; i++) {
        content[i] = document.querySelector('#' + id_dw[i]); 
        canvas[i] = await html2canvas(content[i], { scale: 1, useCORS: true });
        imgData[i] = canvas[i].toDataURL('image/jpeg', 1.0); 
        imgWidth[i] = 190; // A4 width in mm
        imgHeight[i] = canvas[i].height * imgWidth[i] / canvas[i].width;

        doc.addImage(imgData[i], 'JPEG', 10, y_d, imgWidth[i], imgHeight[i]);
        y_d += imgHeight[i] + 10;

        };

        // Generate filename based on current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const filename = `${year}-${month}-${day}_${hours}${minutes}${seconds}_document.pdf`;

        // Save PDF with dynamic filename
        doc.save(filename);

        // Convert PDF to Blob and send to server
        const pdfBlob = doc.output('blob');
        const formData = new FormData();
        formData.append('pdf', pdfBlob, filename);
    
        // Send the PDF to the server
        fetch('/upload_pdf', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('PDF uploaded successfully!');
            } else {
                alert(`Failed to upload PDF: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to upload PDF due to a network or server error.');
        }); 
    }
</script> -->
*/

/*
<!-- <script>
    async function generatePDF() {
        // Retrieve user details from user input 
        const data6 = JSON.parse('<%- data %>');
        const udata = JSON.parse('<%- userdata %>');
        
        const userDetails = {
            name: udata.name,
            email: udata.email,
            country: udata.country,
        };
        
        // Extract parameters 
        const parameters = Object.values(data6).map(entry => ({
                date: entry.date,
                ph: entry.ph || '-',
                temperature: entry.temperature || '-',
                turbidity: entry.turbidity || '-',
                electrical_conductivity: entry.electrical_conductivity || '-',       
                hardness: entry.hardness || '-',       
                alkalinity: entry.alkalinity || '-',       
                total_dissolved_solids: entry.total_dissolved_solids || '-',       
                dissolved_oxygen: entry.dissolved_oxygen || '-',       
                biological_oxygen_demand: entry.biological_oxygen_demand || '-',       
                chemical_oxygen_demand: entry.chemical_oxygen_demand || '-',
                potassiumion: entry.potassiumion || '-',
                magnesiumion: entry.magnesiumion || '-',
                calciumion: entry.calciumion || '-',
                sodiumion: entry.sodiumion || '-',       
                ammonium: entry.ammonium || '-',       
                chloride: entry.chloride || '-',
                carbonate: entry.carbonate || '-',
                bicarbonate: entry.bicarbonate || '-',
                sulfate: entry.sulfate || '-',
                nitrate: entry.nitrate || '-',
                nitrite: entry.nitrite || '-',
                phosphate: entry.phosphate || '-',
                fluoride: entry.fluoride || '-',
            })); 

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'p', 
            unit: 'mm', 
            compress: true 
        });

        //-----------page1----------------
        doc.setFont('times', 'normal');

        // header
        const headerImg1 = new Image();
        headerImg1.src = '/img/logo-no-background.png'; 
        const headerImg2 = new Image();
        headerImg2.src = '/img/IIT_Kharagpur_Logo.png';

        doc.addImage(headerImg1, 'PNG', 10, 8, 18, 18);
        doc.addImage(headerImg2, 'PNG', 136, 9, 16, 16);
        
        doc.setFontSize(10);
        doc.text('Water', 30, 13);
        doc.text('Quality', 30, 18);
        doc.text('Assessment', 30, 23);

        doc.setFontSize(8.5);
        doc.text('Agricultural and Food Engineering', 153, 14);
        doc.text('Indian Institute of Technology Kharagpur', 153, 19);
        doc.text('Kharagpur, West Bengal - 721302', 153, 24);

        doc.setFontSize(19);
        doc.text('Water Quality Report ', 67, 18);

        doc.line(8, 30, 202, 30, 'S');

        // title
        doc.setFontSize(16);
        doc.text('Report : Irrigation Water', 70, 50);

        doc.setFontSize(12);
        doc.text(`Name: ${userDetails.name}`, 10, 63);
        doc.text(`Email: ${userDetails.email}`, 10, 70);
        doc.text(`Country: ${userDetails.country}`, 10, 77);

        // headers for parameters
        const headers = [
            'Date', 'pH', 'Temperature', 'Turbidity', 'Electrical Conductivity',
            'Hardness', 'Alkalinity', 'TDS', 'Dissolved Oxygen',
            'BOD', 'COD', 'Potassium Ion',
            'Magnesium Ion', 'Calcium Ion', 'Sodium Ion', 'Ammonium', 'Chloride',
            'Carbonate', 'Bicarbonate', 'Sulfate', 'Nitrate', 'Nitrite', 'Phosphate',
            'Fluoride'
        ];

        let y = 90;

        // headers
        doc.setFontSize(10); // Reduced font size for better fit
        headers.forEach(header => {
            doc.text(header, 10, y);
            y += 6;
        });

        let x = 51;

        // content
        parameters.forEach(parameter => {
            y = 90;
            Object.values(parameter).forEach(value => {
                doc.text(value.toString(), x, y);
                y += 6;
            });
            x += 30;
        });

        doc.addPage();
        //-----------------------------------------------------

        const id_iw = ["irrigation_Suitability", "sar_Status", "Na_Status"];
        const id_dia = ["wilcox_D", "chadha_D", "gibbs_D"];
        const content=[], canvas=[], imgData=[], imgWidth=[], imgHeight=[];

        //-----------page2----------------
        // Irrigation
        doc.setFontSize(15);
        doc.text('Irrigation Water Analysis', 75, 10);
        doc.line(8, 15, 202, 15, 'S');
        
        let y_i = 20;

        for (let i = 0; i < id_iw.length; i++) {
            content[i] = document.querySelector('#' + id_iw[i]);
            canvas[i] = await html2canvas(content[i], { scale: 2, useCORS: true }); // Increased scale to 2 for better quality
            imgData[i] = canvas[i].toDataURL('image/jpeg', 0.8); // Set JPEG quality to 0.8 to balance size and quality
            imgWidth[i] = 190; 
            imgHeight[i] = canvas[i].height * imgWidth[i] / canvas[i].width;

            doc.addImage(imgData[i], 'JPEG', 10, y_i, imgWidth[i], imgHeight[i]);
            y_i += imgHeight[i] + 5; // Reduced space between charts/tables
        }

        doc.addPage();

        //--------page4--------
        // Diagrams
        let y_p = 10;

        for (let i = 0; i < id_dia.length; i++) {
            content[i + 3] = document.querySelector('#' + id_dia[i]);
            canvas[i + 3] = await html2canvas(content[i + 3], { scale: 2, useCORS: true }); // Increased scale to 2 for better quality
            imgData[i + 3] = canvas[i + 3].toDataURL('image/jpeg', 0.8); 
            imgWidth[i + 3] = 190;
            imgHeight[i + 3] = canvas[i + 3].height * imgWidth[i + 3] / canvas[i + 3].width;

            doc.addImage(imgData[i + 3], 'JPEG', 10, y_p, imgWidth[i + 3], imgHeight[i + 3]);
            y_p += imgHeight[i + 3] + 5; // Reduced space between diagrams
        }

        // Page 4: Diagrams
        doc.setFontSize(15);
        doc.text('Diagrams', 85, 10);
        doc.line(6, 15, 204, 15, 'S');

        let y_p = 20; // Initial spacing

        for (let i = 0; i < id_dia.length; i++) {
            const content = document.querySelector('#' + id_dia[i]);
            const canvas = await html2canvas(content, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL('image/jpeg', 0.75);
            const imgWidth = 170; // Reduced width
            const imgHeight = canvas.height * imgWidth / canvas.width;

            const x_centered = (doc.internal.pageSize.width - imgWidth) / 2; // Calculate x to center the image

            doc.addImage(imgData, 'JPEG', x_centered, y_p, imgWidth, imgHeight); // Use x_centered for horizontal centering
            y_p += imgHeight + 10; // Reduced spacing between diagrams
        }
        
        // Generate filename based on current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); 
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const filename = `${year}-${month}-${day}_${hours}${minutes}${seconds}_document.pdf`;

        // Save PDF with dynamic filename
        doc.save(filename);

        // Convert PDF to Blob and send to server
        const pdfBlob = doc.output('blob');
        const formData = new FormData();
        formData.append('pdf', pdfBlob, filename);
    
        // Send the PDF to the server
        fetch('/upload_pdf', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('PDF uploaded successfully!');
            } else {
                alert(`Failed to upload PDF: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to upload PDF due to a network or server error.');
        });
    }
</script> -->
*/


/*
<!-- Fetching user data for pdf -->
<!-- <script>
    async function fetchUserData() {
        // Retrieve user details from user input 
        const data4 = JSON.parse('<%- data %>');
        const udata = JSON.parse('<%- userdata %>');
        
        const userDetails = {
            name: udata.name,
            email: udata.email,
            country: udata.country,
            //parameters: JSON.stringify(data4),
        };

        //Location Name

        let urls = [];
        let cities = [];

        // Construct URLs for fetching address using latitude and longitude
        for (let key in data4) {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${data4[key].latitude}&lon=${data4[key].longitude}`;
            urls.push(url);
        }

        // Fetch addresses for each location
        const getAddress = async (url) => {
            const response = await fetch(url);
            const data4 = await response.json();
            return data4.display_name;
        };

        try {
            // Fetch addresses asynchronously
            const addresses = await Promise.all(urls.map(getAddress));
            
            // Extract city names from addresses
            cities = addresses.map(address => {
                const city = address.split(", ")[0];
                return city;
            });
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
        
        // Extract parameters 
        const parameters = Object.values(data4).map((entry, index) => ({
                Location: cities[index] || '-',
                Date: entry.date,
                pH: entry.ph || '-',
                Temperature: entry.temperature || '-',
                Turbidity: entry.turbidity || '-',
                "Electrical Conductivity": entry.electrical_conductivity || '-',       
                Hardness: entry.hardness || '-',       
                Alkalinity: entry.alkalinity || '-',       
                TDS: entry.total_dissolved_solids || '-',       
                "Dissolved Oxygen": entry.dissolved_oxygen || '-',       
                BOD: entry.biological_oxygen_demand || '-',       
                COD: entry.chemical_oxygen_demand || '-',
                "Potassium Ion": entry.potassiumion || '-',
                "Magnesium Ion": entry.magnesiumion || '-',
                "Calcium Ion": entry.calciumion || '-',
                "Sodium Ion": entry.sodiumion || '-',       
                Ammonium: entry.ammonium || '-',       
                Chloride: entry.chloride || '-',
                Carbonate: entry.carbonate || '-',
                Bicarbonate: entry.bicarbonate || '-',
                Sulfate: entry.sulfate || '-',
                Nitrate: entry.nitrate || '-',
                Nitrite: entry.nitrite || '-',
                Phosphate: entry.phosphate || '-',
                Fluoride: entry.fluoride || '-',
            }));

        return { userDetails, parameters };
    }
</script> -->
*/



// server.js old code
// const express = require("express");
// const User = require("./model/userData");
// const expresslayouts = require("express-ejs-layouts");
// const path = require("path");
// const calculate_wqi = require("./controller/wqi_formula");
// const calculate_hazard_index = require("./controller/hazardIndex_formula");
// const calculate_sar = require("./controller/sar");
// const { google } = require("googleapis");
// const calculate_sodiumpercentage = require("./controller/sodiumpercentage");
// const ejs = require('ejs');
// const bodyParser = require("body-parser");
// const mysql = require("mysql2");
// const bcrypt = require("bcrypt");
// const session = require("express-session");

// const port = process.env.PORT || 3000;
// let userdata;
// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'Rishi1718#',
//     database: 'wqa',
//     port: 3306
// });

// connection.connect(err => {
//     if (err) throw err;
//     console.log('Connected to MySQL Database.');
// });

// // app.use(expressLayouts);
// // app.set("view engine", "ejs");
// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());
// // app.use(express.static(path.join(__dirname, "public")));


// function restructure(obj) {
//   let item = {};
//   let array = [];
//   let item1 = {};
//   let obj1 = {};
//   let i = 0;

//   for (var key in obj) {
//     array.push(key.charAt(key.length - 1));
//   }
//   array.forEach((ele) => {
//     item[ele] = (item[ele] || 0) + 1;
//   });
//   for (var key in obj) {
//     if (key.slice(0, -1) === "latitude") {
//       item1 = {};
//       i = 0;
//     }
//     item1[key.slice(0, -1)] = obj[key];
//     if (item[key.charAt(key.length - 1)] - 1 === i) {
//       obj1[key.charAt(key.length - 1)] = item1;
//     }
//     i++;
//   }
//   return obj1;
// }

// function emailVarification(email) {
//   return (
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ &&
//     /[A-Za-z._]{4,15}[0-9]{0,5}@[A-Za-z]{5,10}[.]{1}[A-Za-z.]{2,6}/.test(email)
//   );
// }


// //EJS
// app.use(expresslayouts);
// app.set("view engine", "ejs");

// //BodyParser Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// //Static_Files Middleware
// app.use(express.static(path.join(__dirname, "public")));

// //routes
// app.get("/", (req, res) => res.render("home"));
// // app.get("/user", (req, res) => res.render("user"));
// app.get("/piper", (req, res) => res.render("piper"));
// app.get("/wilcox", (req, res) => res.render("wilcox"));
// app.get("/test", (req, res) => res.render("test"));

// // Updated by Rushi

// app.get("/register", (req, res) => {
//   res.render("register", { title: "Register", errors: [] });
// });

// app.get('/login', (req, res) => {
//     res.render('login', { errors: [] });
// });

// app.post('/register', (req, res) => {
//   const { name, email, country, phone, password } = req.body;

//   let errors = [];

//   if (!name || !email || !country || !password) {
//       errors.push({ msg: 'Please fill all required fields.' });
//   }

//   if (errors.length > 0) {
//       res.render('register', { title: 'Register', errors });
//   } else {
//       const hashedPassword = bcrypt.hashSync(password, 10);

//       const query = 'INSERT INTO user_table (name, email, country, phone, password) VALUES (?, ?, ?, ?, ?)';
//       connection.query(query, [name, email, country, phone, hashedPassword], (err) => {
//           if (err) {
//               if (err.code === 'ER_DUP_ENTRY') {
//                   errors.push({ msg: 'Email already registered.' });
//               } else {
//                   errors.push({ msg: 'Server error.' });
//               }
//               return res.render('register', { title: 'Register', errors });
//           }
//           res.redirect('/login');
//       });
//   }
// });

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     let errors = [];

//     if (!email || !password) {
//         errors.push({ msg: 'Please fill all required fields.' });
//         return res.render('login', { errors });
//     }

//     const query = 'SELECT * FROM user_table WHERE email = ?';
//     connection.query(query, [email], (err, results) => {
//         if (err) {
//             errors.push({ msg: 'Server error.' });
//             return res.render('login', { errors });
//         }
//         if (results.length === 0) {
//             errors.push({ msg: 'Invalid email or password.' });
//             return res.render('login', { errors });
//         }

//         const user = results[0];
//         if (!bcrypt.compareSync(password, user.password)) {
//             errors.push({ msg: 'Invalid email or password.' });
//             return res.render('login', { errors });
//         }

//         req.session.loggedin = true;
//         req.session.user = user;
//         userdata = user; // Set userdata
//         res.redirect('/welcome');
//     });
// });


// app.get("/input", (req, res) => {
//   // Assuming 'userdata' needs to be available but might not be set yet
//   res.render("input", { userdata: JSON.stringify(userdata) });
// });


// // Updated by Rushi

// // // app.get('/welcome', (req, res) => {
// // //     if (req.session.loggedin) {
// // //         res.render('welcome', { userdata: JSON.stringify(req.session.user) });
// // //     } else {
// // //         res.redirect('/login');
// // //     }
// // // });

// app.get('/welcome', (req, res) => {
//     if (req.session.loggedin) {
//         userdata = req.session.user; // Set userdata
//         res.render('welcome', { userdata: JSON.stringify(userdata) });
//     } else {
//         res.redirect('/login');
//     }
// });


// app.post('/welcome', (req, res) => {
//     userdata = req.body;
//     const { name, email, country, phone } = req.body;
//     let errors = [];

//     if (!name || !email || !country) {
//         errors.push({ msg: "Please fill in all fields" });
//     } else {
//         if (name.length < 4) {
//             errors.push({ msg: "Name should be at least 4 characters" });
//         }

//         if (!emailVerification(email)) {
//             errors.push({ msg: "Email is invalid" });
//         }
//     }

//     if (errors.length > 0) {
//         res.render("user", { errors, name, email, country, phone });
//     } else {
//         const newUser = new User({ name, email, country, phone });
//         res.render('welcome', { userdata: JSON.stringify(req.body) });
//     }
// });


// // app.post('/welcome', (req, res) => {
// // app.post('/welcome', (req, res) => {
// //   userdata = req.body;
// //   const { name, email, country, phone } = req.body;
// //   let errors = [];

// //   if (!name || !email || !country) {
// //     errors.push({ msg: "Please fill in all fields" });
// //   } else {
// //     if (name.length < 4) {
// //       errors.push({ msg: "Name should be at least 4 characters" });
// //     }

// //     if (!emailVarification(email)) {
// //       errors.push({ msg: "Email is invalid" });
// //     }
// //   }

// //   if (errors.length > 0) {
// //     res.render("user", {
// //       errors,
// //       name,
// //       email,
// //       country,
// //       phone,
// //     });
// //   } else {
// //     const newUser = new User({
// //       name,
// //       email,
// //       country,
// //       phone,
// //     });
// //   res.render('welcome', { userdata: JSON.stringify(req.body) });
// //   }
// // });


// // Define a route for the root path of the application
// app.get('/output1',async (req, res) => {
//   //Google sheet as database
//   const auth = new google.auth.GoogleAuth({
//     keyFile: "credentials.json",
//     scopes: "https://www.googleapis.com/auth/spreadsheets",
//   });
//   const client =  auth.getClient();
//   const googleSheets = google.sheets({ version: "v4", auth: client });
//   const spreadsheetsID = "1sAVZkd4xaaDIdiutBRzq51k3GGlcNUv_ZDfxq-JllW0";

//   const range = 'Sheet5!A:AD';

//   // Retrieve the last five rows of the Google Sheet
//   await googleSheets.spreadsheets.values.get({
//     auth,
//     spreadsheetId: spreadsheetsID,
//     range: range,
   
//   }, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.send('Error retrieving data from Google Sheets');
//       return;
//     }

//     const rows = result.data.values;
//     // Render the rows using EJS and send the HTML as the response
//     res.render('output1', { rows });
//   });
// });


// // app.post("/output", async (req, res) => {
// //   let err = [];
// //   let obj = restructure(req.body);
// //   let objwqi=restructure(req.body);
// //   //error handling
// //   for (var key in obj) {
// //     if (Object.keys(obj[key]).length <= 6) {
// //       err.push({ msg: "Number of parameters should be more than 3" });
// //     }
// //   }
// //   if (err.length > 0) {
// //     res.render("input", {
// //       err,
// //     });
// //   } 
// //   else {
// //     try {
// //       const auth = new google.auth.GoogleAuth({
// //         keyFile: "credentials.json",
// //         scopes: "https://www.googleapis.com/auth/spreadsheets",
// //       });
// //       const client = await auth.getClient();
// //       const googleSheets = google.sheets({ version: "v4", auth: client });
// //       const spreadsheetsID = "1sAVZkd4xaaDIdiutBRzq51k3GGlcNUv_ZDfxq-JllW0";
// //     for (let key in obj) {
// //       //SAR calculation
// //       obj[key]["sar"] = calculate_sar([
// //         parseFloat(obj[key]["sodiumion"]),
// //         parseFloat(obj[key]["calciumion"]),
// //         parseFloat(obj[key]["magnesiumion"]),
// //       ]);

// //       //sodium percentage calculation
// //       obj[key]["Na_per"] = calculate_sodiumpercentage([
// //         parseFloat(obj[key]["sodiumion"]),
// //         parseFloat(obj[key]["calciumion"]),
// //         parseFloat(obj[key]["magnesiumion"]),
// //         parseFloat(obj[key]["potassiumion"]),
// //       ]);

// //       //water quality index calculation
// //       let lat = obj[key]["latitude"];
// //       let lng = obj[key]["longitude"];
// //       let date = obj[key]["date"];
// //       obj[key]["water_quality_index"] = calculate_wqi(objwqi[key]);

// //       //hazard index calculation
// //       obj[key]["hazard_index"] = calculate_hazard_index([
// //         parseFloat(obj[key]["nitrate"]),
// //         parseFloat(obj[key]["nitrite"]),
// //         parseFloat(obj[key]["fluoride"]),
// //         parseFloat(obj[key]["ammonium"]),
// //         parseFloat(obj[key]["phosphate"]),
// //       ]);

// //       const datee = Date(Date.now()).toString();
// //       //Google sheet as database
// //       const auth = new google.auth.GoogleAuth({
// //         keyFile: "credentials.json",
// //         scopes: "https://www.googleapis.com/auth/spreadsheets",
// //       });
// //       const client = await auth.getClient();
// //       const googleSheets = google.sheets({ version: "v4", auth: client });
// //       const spreadsheetsID = "1sAVZkd4xaaDIdiutBRzq51k3GGlcNUv_ZDfxq-JllW0";
  
// //       await googleSheets.spreadsheets.values.append({
// //         auth,
// //         spreadsheetId: spreadsheetsID,
// //         range: "Sheet6!A:AD",
// //         valueInputOption: "USER_ENTERED",
// //         resource: {
// //           values: [
// //             [
// //               Date(Date.now()).toString(),
// //               userdata.name,
// //               userdata.email,
// //               userdata.country,
// //               userdata.phone,
// //               date,
// //               lat,
// //               lng,
// //               // obj[key]["ph"],
// //               // obj[key]["temperature"],
// //               // obj[key]["turbidity"],
// //               // obj[key]["electrical_conductivity"],
// //               // obj[key]["hardness"],
// //               // obj[key]["alkalinity"],
// //               // obj[key]["total_dissolved_solids"],
// //               // obj[key]["dissolved_oxygen"],
// //               // obj[key]["biological_oxygen_demand"],
// //               // obj[key]["chemical_oxygen_demand"],
// //               // obj[key]["ammonium"],
// //               // obj[key]["chloride"],
// //               // obj[key]["carbonate"],
// //               // obj[key]["bicarbonate"],
// //               // obj[key]["sulfate"],
// //               // obj[key]["nitrate"],
// //               // obj[key]["nitrite"],
// //               // obj[key]["phosphate"],
// //               // obj[key]["sodiumion"],
// //               // obj[key]["calciumion"],
// //               // obj[key]["magnesiumion"],
// //               // obj[key]["potassiumion"],
// //               // obj[key]["water_quality_index"],
// //               // obj[key]["hazard_index"]["male"],
// //               // obj[key]["hazard_index"]["female"],
// //               // obj[key]["hazard_index"]["child"],
// //               // obj[key]["sar"],
// //               // obj[key]["Na_per"],
// //               obj[key].ph,
// //               obj[key].temperature,
// //               obj[key].turbidity,
// //               obj[key].electrical_conductivity,
// //               obj[key].hardness,
// //               obj[key].alkalinity,
// //               obj[key].total_dissolved_solids,
// //               obj[key].dissolved_oxygen,
// //               obj[key].biological_oxygen_demand,
// //               obj[key].chemical_oxygen_demand,
// //               obj[key].ammonium,
// //               obj[key].chloride,
// //               obj[key].carbonate,
// //               obj[key].bicarbonate,
// //               obj[key].sulfate,
// //               obj[key].nitrate,
// //               obj[key].nitrite,
// //               obj[key].phosphate,
// //               obj[key].sodiumion,
// //               obj[key].calciumion,
// //               obj[key].magnesiumion,
// //               obj[key].potassiumion,
// //               obj[key].water_quality_index,
// //               obj[key].hazard_index.male,
// //               obj[key].hazard_index.female,
// //               obj[key].hazard_index.child,
// //               obj[key].sar,
// //               obj[key].Na_per
// //             ],

// //           ],
// //         },
// //       },(err, res) => {
// //         if (err) return console.log(`The API returned an error: ${err}`);
// //     });

// //     // const range = 'Sheet6!A:AJ';

// //     // Retrieve the last five rows of the Google Sheet
// //     // await googleSheets.spreadsheets.values.get({
// //     //   auth,
// //     //   spreadsheetId: spreadsheetsID,
// //     //   range: range,
    
// //     // }, (err, result) => {
// //     //   if (err) {
// //     //     console.log(err);
// //     //     res.send('Error retrieving data from Google Sheets');
// //     //     return;
// //     //   }
// //     //   const rows = result.data.values;
// //     //   console.log(rows);
// //     //   });
  
// //     //   res.render("output", { rows,data: JSON.stringify(obj)});

// //     }
// //   } catch (error) {
// //     console.error(`Failed to append data to Google Sheets: ${error}`);
// //     res.render("error", { error: "Failed to process and append data to Google Sheets." }); // Render an error page or handle the error appropriately
// //   }
// //     res.render("output", {data: JSON.stringify(obj), userdata: JSON.stringify(userdata)});
// //   }
// // });


// app.post("/output", async (req, res) => {
//   let err = [];
//   let obj = restructure(req.body);
//   let objwqi=restructure(req.body);
//   //error handling
//   for (var key in obj) {
//     if (Object.keys(obj[key]).length <= 6) {
//       err.push({ msg: "Number of parameters should be more than 3" });
//     }
//   }
//   if (err.length > 0) {
//     res.render("input", {
//       err,
//     });
//   } 
//   let appendPromises = [];
//   try {
//     const auth = new google.auth.GoogleAuth({
//       keyFile: "credentials.json",
//       scopes: "https://www.googleapis.com/auth/spreadsheets",
//     });
//     const client = await auth.getClient();
//     const googleSheets = google.sheets({ version: "v4", auth: client });
//     const spreadsheetsID = "1sAVZkd4xaaDIdiutBRzq51k3GGlcNUv_ZDfxq-JllW0";
//     for (let key in obj) {
//       //SAR calculation
//       obj[key]["sar"] = calculate_sar([
//         parseFloat(obj[key]["sodiumion"]),
//         parseFloat(obj[key]["calciumion"]),
//         parseFloat(obj[key]["magnesiumion"]),
//       ]);

//       //sodium percentage calculation
//       obj[key]["Na_per"] = calculate_sodiumpercentage([
//         parseFloat(obj[key]["sodiumion"]),
//         parseFloat(obj[key]["calciumion"]),
//         parseFloat(obj[key]["magnesiumion"]),
//         parseFloat(obj[key]["potassiumion"]),
//       ]);

//       //water quality index calculation
//       let lat = obj[key]["latitude"];
//       let lng = obj[key]["longitude"];
//       let date = obj[key]["date"];
//       obj[key]["water_quality_index"] = calculate_wqi(objwqi[key]);

//       //hazard index calculation
//       obj[key]["hazard_index"] = calculate_hazard_index([
//         parseFloat(obj[key]["nitrate"]),
//         parseFloat(obj[key]["nitrite"]),
//         parseFloat(obj[key]["fluoride"]),
//         parseFloat(obj[key]["ammonium"]),
//         parseFloat(obj[key]["phosphate"]),
//       ]);

//       const datee = Date(Date.now()).toString();
  
//       const appendPromise = googleSheets.spreadsheets.values.append({
//         auth,
//         spreadsheetId: spreadsheetsID,
//         range: "Sheet6!A:AD",
//         valueInputOption: "USER_ENTERED",
//         resource: {
//           values: [
//             [
//               Date(Date.now()).toString(),
//               userdata.name,
//               userdata.email,
//               userdata.country,
//               userdata.phone,
//               date,
//               lat,
//               lng,
//               obj[key].ph,
//               obj[key].temperature,
//               obj[key].turbidity,
//               obj[key].electrical_conductivity,
//               obj[key].hardness,
//               obj[key].alkalinity,
//               obj[key].total_dissolved_solids,
//               obj[key].dissolved_oxygen,
//               obj[key].biological_oxygen_demand,
//               obj[key].chemical_oxygen_demand,
//               obj[key].ammonium,
//               obj[key].chloride,
//               obj[key].carbonate,
//               obj[key].bicarbonate,
//               obj[key].sulfate,
//               obj[key].nitrate,
//               obj[key].nitrite,
//               obj[key].phosphate,
//               obj[key].sodiumion,
//               obj[key].calciumion,
//               obj[key].magnesiumion,
//               obj[key].potassiumion,
//               obj[key].water_quality_index,
//               obj[key].hazard_index.male,
//               obj[key].hazard_index.female,
//               obj[key].hazard_index.child,
//               obj[key].sar,
//               obj[key].Na_per
//             ],
//           ],
//         },
//       });
//       appendPromises.push(appendPromise);
//     }
//     await Promise.all(appendPromises);
//     res.render("output", { data: JSON.stringify(obj), userdata: JSON.stringify(userdata) });

//   } catch (error) {
//     console.error(`Failed to append data to Google Sheets: ${error}`);
//     res.render("error", { error: "Failed to process and append data to Google Sheets." });
//   }
// });

// app.post("/output2", async (req, res) => {
//   let err = [];
//   let obj = restructure(req.body);
//   console.log(obj);
//   let objwqi=restructure(req.body);
//   //error handling
//   for (var key in obj) {
//     if (Object.keys(obj[key]).length <= 6) {
//       err.push({ msg: "Number of parameters should be more than 3" });
//     }
//   }
//   if (err.length > 0) {
//     res.render("input", {
//       err,
//     });
//   } 
//   else {
//     for (let key in obj) {

//       //SAR calculation
//       obj[key]["sar"] = calculate_sar([
//         parseFloat(obj[key]["sodiumion"]),
//         parseFloat(obj[key]["calciumion"]),
//         parseFloat(obj[key]["magnesiumion"]),
//       ]);

//       //sodium percentage calculation
//       obj[key]["Na_per"] = calculate_sodiumpercentage([
//         parseFloat(obj[key]["sodiumion"]),
//         parseFloat(obj[key]["calciumion"]),
//         parseFloat(obj[key]["magnesiumion"]),
//         parseFloat(obj[key]["potassiumion"]),
//       ]);

//       //water quality index calculation
//       let lat = obj[key]["latitude"];
//       let lng = obj[key]["longitude"];
//       let date = obj[key]["date"];
//       obj[key]["water_quality_index"] = calculate_wqi(objwqi[key]);

//       //hazard index calculation
//       obj[key]["hazard_index"] = calculate_hazard_index([
//         parseFloat(obj[key]["nitrate"]),
//         parseFloat(obj[key]["nitrite"]),
//         parseFloat(obj[key]["fluoride"]),
//         parseFloat(obj[key]["ammonium"]),
//         parseFloat(obj[key]["phosphate"]),
//       ]);

//       const datee = Date(Date.now()).toString();
//       //Google sheet as database
//       const auth = new google.auth.GoogleAuth({
//         keyFile: "credentials.json",
//         scopes: "https://www.googleapis.com/auth/spreadsheets",
//       });
//       const client = await auth.getClient();
//       const googleSheets = google.sheets({ version: "v4", auth: client });
//       const spreadsheetsID = "1sAVZkd4xaaDIdiutBRzq51k3GGlcNUv_ZDfxq-JllW0";
  
//       await googleSheets.spreadsheets.values.append({
//         auth,
//         spreadsheetId: spreadsheetsID,
//         range: "Sheet6!A:AD",
//         valueInputOption: "USER_ENTERED",
//         resource: {
//           values: [
//             [
//               Date(Date.now()).toString(),
//               userdata.name,
//               userdata.email,
//               userdata.country,
//               userdata.phone,
//               date,
//               lat,
//               lng,
//               obj[key]["ph"],
//               obj[key]["temperature"],
//               obj[key]["turbidity"],
//               obj[key]["electrical_conductivity"],
//               obj[key]["hardness"],
//               obj[key]["alkalinity"],
//               obj[key]["total_dissolved_solids"],
//               obj[key]["dissolved_oxygen"],
//               obj[key]["biological_oxygen_demand"],
//               obj[key]["chemical_oxygen_demand"],
//               obj[key]["ammonium"],
//               obj[key]["chloride"],
//               obj[key]["carbonate"],
//               obj[key]["bicarbonate"],
//               obj[key]["sulfate"],
//               obj[key]["nitrate"],
//               obj[key]["nitrite"],
//               obj[key]["phosphate"],
//               obj[key]["sodiumion"],
//               obj[key]["calciumion"],
//               obj[key]["magnesiumion"],
//               obj[key]["potassiumion"],
//               obj[key]["water_quality_index"],
//               obj[key]["hazard_index"]["male"],
//               obj[key]["hazard_index"]["female"],
//               obj[key]["hazard_index"]["child"],
//               obj[key]["sar"],
//               obj[key]["Na_per"],
//             ],
//           ],
//         },
//       },(err, res) => {
//         if (err) return console.log(`The API returned an error: ${err}`);
//       });
//     }
//     res.render("output2", {data: JSON.stringify(obj), userdata: JSON.stringify(userdata)});
//   }
// });


// app.post("/output3", async (req, res) => {
//   let err = [];
//   let obj = restructure(req.body);
//   console.log(obj);
//   let objwqi=restructure(req.body);
//   //error handling
//   for (var key in obj) {
//     if (Object.keys(obj[key]).length <= 6) {
//       err.push({ msg: "Number of parameters should be more than 3" });
//     }
//   }
//   if (err.length > 0) {
//     res.render("input", {
//       err,
//     });
//   } 
//   else {
//     for (let key in obj) {
//       //SAR calculation
//       obj[key]["sar"] = calculate_sar([
//         parseFloat(obj[key]["sodiumion"]),
//         parseFloat(obj[key]["calciumion"]),
//         parseFloat(obj[key]["magnesiumion"]),
//       ]);

//       //sodium percentage calculation
//       obj[key]["Na_per"] = calculate_sodiumpercentage([
//         parseFloat(obj[key]["sodiumion"]),
//         parseFloat(obj[key]["calciumion"]),
//         parseFloat(obj[key]["magnesiumion"]),
//         parseFloat(obj[key]["potassiumion"]),
//       ]);

//       //water quality index calculation
//       let lat = obj[key]["latitude"];
//       let lng = obj[key]["longitude"];
//       let date = obj[key]["date"];
//       obj[key]["water_quality_index"] = calculate_wqi(objwqi[key]);

//       //hazard index calculation
//       obj[key]["hazard_index"] = calculate_hazard_index([
//         parseFloat(obj[key]["nitrate"]),
//         parseFloat(obj[key]["nitrite"]),
//         parseFloat(obj[key]["fluoride"]),
//         parseFloat(obj[key]["ammonium"]),
//         parseFloat(obj[key]["phosphate"]),
//       ]);

//       const datee = Date(Date.now()).toString();
//       //Google sheet as database
//       const auth = new google.auth.GoogleAuth({
//         keyFile: "credentials.json",
//         scopes: "https://www.googleapis.com/auth/spreadsheets",
//       });
//       const client = await auth.getClient();
//       const googleSheets = google.sheets({ version: "v4", auth: client });
//       const spreadsheetsID = "1sAVZkd4xaaDIdiutBRzq51k3GGlcNUv_ZDfxq-JllW0";
  
//       await googleSheets.spreadsheets.values.append({
//         auth,
//         spreadsheetId: spreadsheetsID,
//         range: "Sheet6!A:AD",
//         valueInputOption: "USER_ENTERED",
//         resource: {
//           values: [
//             [
//               Date(Date.now()).toString(),
//               userdata.name,
//               userdata.email,
//               userdata.country,
//               userdata.phone,
//               date,
//               lat,
//               lng,
//               obj[key]["ph"],
//               obj[key]["temperature"],
//               obj[key]["turbidity"],
//               obj[key]["electrical_conductivity"],
//               obj[key]["hardness"],
//               obj[key]["alkalinity"],
//               obj[key]["total_dissolved_solids"],
//               obj[key]["dissolved_oxygen"],
//               obj[key]["biological_oxygen_demand"],
//               obj[key]["chemical_oxygen_demand"],
//               obj[key]["ammonium"],
//               obj[key]["chloride"],
//               obj[key]["carbonate"],
//               obj[key]["bicarbonate"],
//               obj[key]["sulfate"],
//               obj[key]["nitrate"],
//               obj[key]["nitrite"],
//               obj[key]["phosphate"],
//               obj[key]["sodiumion"],
//               obj[key]["calciumion"],
//               obj[key]["magnesiumion"],
//               obj[key]["potassiumion"],
//               obj[key]["water_quality_index"],
//               obj[key]["hazard_index"]["male"],
//               obj[key]["hazard_index"]["female"],
//               obj[key]["hazard_index"]["child"],
//               obj[key]["sar"],
//               obj[key]["Na_per"],
//             ],
//           ],
//         },
//       },(err, res) => {
//         if (err) return console.log(`The API returned an error: ${err}`);
//       });
//     }
//     res.render("output3", {data: JSON.stringify(obj), userdata: JSON.stringify(userdata)});
//   }
// });

// app.listen(port, () => {
//   console.log(`TTT Running at http://localhost:${port}`);
// });


// Water quality index calculation

/* const data = JSON.parse('<%- data %>');
    // console.log(data);
    let mapURLs = [];
    let barLabels = [];
    let barData = [];
    let barBgColors = [];
    let barBorderColors = [];

    window.addEventListener('load', () => {

        for (var key in data) {
            const lat = data[key].latitude;
            const lon = data[key].longitude;
            mapURLs.push({ lat, lon });
        }

        // Updated getAddress function to hit your backend endpoint instead of external API
        function getAddress(lat, lon) {
            return fetch(`/reverse-geocode?lat=${lat}&lon=${lon}`) // Backend API that you need to create
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => data.display_name)
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                    return "Address not found";
                });
        }

        // Use Promise.all to fetch all addresses
        Promise.all(mapURLs.map(({ lat, lon }) => getAddress(lat, lon))).then((addresses) => {
            addresses.forEach((address, i) => {
                document.getElementById(`address${i}`).innerHTML = address;
                const addressParts = address.split(", ");
                barLabels.push(addressParts[0] || `Location ${i + 1}`);
            });
    
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
            }, 1000);
        }).catch(error => {
            console.error("Error in fetching address:", error);
        });

    }); */


    /* const data = JSON.parse('<%- data %>');
    plot_charts(data);
    // console.log(data);
    let mapURLs = [];
    let barLabels = [];

    let barData1 = [];
    let barBgColors1 = [];
    let barBorderColors1 = [];

    let barData2 = [];
    let barBgColors2 = [];
    let barBorderColors2 = [];

    window.addEventListener('load', () => {

        for (var key in data) {
            url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + data[key].latitude + "&lon=" + data[key].longitude + "";
            mapURLs.push(url);
        }

        function getAddress(url) {
            return fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => data.display_name)
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                    return "Address not found";
                });
        }

        Promise.all(mapURLs.map(getAddress)).then((addresses) => {
            addresses.forEach((address, i) => {
                document.getElementById(`address1${i}`).innerHTML = address;
                const addressParts = address.split(", ");
                barLabels.push(addressParts[0] || `Location ${i + 1}`);
            });
    
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
                        }
                        ],
                    },
                    options: {
                        scales: {
                            x: { title: { display: true, text: 'Address' } },
                            y: { title: { display: true, text: 'Sodium Adsorption Ratio' } }
                        }
                    }
                }
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
                        }
                        ],
                    },
                    options: {
                        scales: {
                            x: { title: { display: true, text: 'Address' } },
                            y: { title: { display: true, text: 'Sodium percentage(%)' } }
                        }
                    }
                }
                new Chart(canvas2, config2);

            }, 1000);
        }).catch(error => {
            console.error("Error in fetching address:", error);
        });

    }); */



/* const data = JSON.parse('<%- data %>');
    plot_charts(data);
    // console.log(data);
    let mapURLs = [];
    let barLabels = [];

    let barData = [];
    let barBgColors = [];
    let barBorderColors = [];

    let barData1 = [];
    let barBgColors1 = [];
    let barBorderColors1 = [];

    let barData2 = [];
    let barBgColors2 = [];
    let barBorderColors2 = [];

    window.addEventListener('load', () => {

        // Loop through data and push reverse geocoding URLs
        for (var key in data) {
            const lat = data[key].latitude;
            const lon = data[key].longitude;
            mapURLs.push({ lat, lon });
        }

        // Updated getAddress function to hit your backend endpoint instead of external API
        function getAddress(lat, lon) {
            return fetch(`/reverse-geocode?lat=${lat}&lon=${lon}`) // Backend API
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => data.display_name)
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                    return "Address not found";
                });
        }

        // Use Promise.all to fetch all addresses
        Promise.all(mapURLs.map(({ lat, lon }) => getAddress(lat, lon))).then((addresses) => {
            addresses.forEach((address, i) => {
                document.getElementById(`address${i}`).innerHTML = address;
                document.getElementById(`address1${i}`).innerHTML = address;
                const addressParts = address.split(", ");
                barLabels.push(addressParts[0] || `Location ${i + 1}`);
            });

            // Chart rendering logic...
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
        }).catch(error => {
            console.error("Error in fetching addresses:", error);
        });

    }); */




   /* <script>
    async function generatePDF() {
        const { userDetails, parameters } = await fetchUserData();
    
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            compress: true
        });

        // Page 1: Cover Page
        doc.setFont('times', 'normal');

        // Header
        const headerImg1 = new Image();
        headerImg1.src = '/img/logo-no-background.png';
        const headerImg2 = new Image();
        headerImg2.src = '/img/IIT_Kharagpur_Logo.png';

        doc.addImage(headerImg1, 'PNG', 8, 8, 18, 18);
        doc.addImage(headerImg2, 'PNG', 136, 8, 17, 17);

        doc.setFontSize(10);
        doc.text('Water', 28, 13);
        doc.text('Quality', 28, 18);
        doc.text('Assessment', 28, 23);

        doc.setFontSize(8.5);
        doc.text('Water Sensing and Simulation Lab', 155, 10);
        doc.text('Agricultural and Food Engineering', 155, 15);
        doc.text('Indian Institute of Technology Kharagpur', 155, 20);
        doc.text('Kharagpur, West Bengal - 721302', 155, 25);

        doc.setFontSize(17);
        doc.text('Water Quality Report', 74, 40);

        doc.line(5, 30, 205, 30, 'S');

        // Title
        doc.setFontSize(14);
        doc.text('Drinking Water & Irrigation Water', 64, 50);

        // User Information
        doc.setFontSize(12);
        doc.setFont('calibri', 'bold');
        doc.text('User Information', 10, 60);
        doc.setFont('times', 'normal');
        doc.text(`Name: ${userDetails.name}`, 10, 67);
        doc.text(`Email: ${userDetails.email}`, 10, 74);
        doc.text(`Country: ${userDetails.country}`, 10, 81);

        doc.setFont('calibri', 'bold');
        doc.text('Interpretation', 10, 90);
        doc.setFont('times', 'normal');
    
        // Drinking Water Analysis
        doc.addPage();
        doc.setFontSize(15);
        doc.text('Drinking Water Analysis', 75, 10);
        doc.line(6, 15, 204, 15, 'S');
    
        const id_dw = ["mapd", "wq_Risk", "wqi_Status"];
        const id_iw = ["irrigation_Suitability", "sar_Status", "Na_Status"];
        const id_dia = ["wilcox_D", "chadha_D", "gibbs_D"];
        let y_d = 20;
    
        for (let i = 0; i < id_dw.length; i++) {
            const content = document.querySelector('#' + id_dw[i]);
            const canvas = await html2canvas(content, { scale: 3, useCORS: true });
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            const imgWidth = 190;
            const imgHeight = canvas.height * imgWidth / canvas.width;
    
            if (y_d + imgHeight > doc.internal.pageSize.height - 20) {
                doc.addPage();
                y_d = 20;
            }
    
            doc.addImage(imgData, 'JPEG', 10, y_d, imgWidth, imgHeight);
            y_d += imgHeight + 5;
        }
    
        // Irrigation Water Analysis
        doc.addPage();
        doc.setFontSize(15);
        doc.text('Irrigation Water Analysis', 75, 10);
        let y_i = 20;
    
        for (let i = 0; i < id_iw.length; i++) {
            const content = document.querySelector('#' + id_iw[i]);
            const canvas = await html2canvas(content, { scale: 3, useCORS: true });
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            const imgWidth = 190;
            const imgHeight = canvas.height * imgWidth / canvas.width;
    
            if (y_i + imgHeight > doc.internal.pageSize.height - 20) {
                doc.addPage();
                y_i = 20;
            }
    
            doc.addImage(imgData, 'JPEG', 10, y_i, imgWidth, imgHeight);
            y_i += imgHeight + 5;
        }
    
        // Diagrams
        doc.addPage();
        doc.setFontSize(15);
        doc.text('Diagrams', 85, 10);
        let y_p = 20;
    
        for (let i = 0; i < id_dia.length; i++) {
            const content = document.querySelector('#' + id_dia[i]);
            const canvas = await html2canvas(content, { scale: 3, useCORS: true });
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            const imgWidth = 170;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const x_centered = (doc.internal.pageSize.width - imgWidth) / 2;
    
            if (y_p + imgHeight > doc.internal.pageSize.height - 20) {
                doc.addPage();
                y_p = 20;
            }
    
            doc.addImage(imgData, 'JPEG', x_centered, y_p, imgWidth, imgHeight);
            y_p += imgHeight + 10;
        }
    
        // Appendix
        doc.addPage();
        doc.setFontSize(15);
        doc.text('Appendix', 85, 10);
        doc.line(6, 15, 204, 15, 'S');

        doc.setFontSize(10);
        const transposedData = {};
        parameters.forEach(parameter => {
            for (const [key, value] of Object.entries(parameter)) {
                if (!transposedData[key]) {
                    transposedData[key] = [];
                }
                transposedData[key].push(value);
            }
        });

        // Variables to manage table formatting and pagination
        const startY = 20;
        const cellWidth = 40;
        const cellHeight = 10;
        const rowsPerPage = 25;
        let currentY = startY;
        let colOffset = 0;
        let dataIndex = 0;

        const numberOfLocations = transposedData['Location'].length;

        while (dataIndex < numberOfLocations) {
            // Add a new page if this is not the first page
            if (dataIndex > 0 && dataIndex % 4 === 0) {
                doc.addPage();
                currentY = startY;
                colOffset = 0;
            }

            for (let i = 0; i < Object.keys(transposedData).length; i++) {
                const header = Object.keys(transposedData)[i];
                const values = transposedData[header];

                if (dataIndex % 4 === 0) {
                    // Draw the header cell in the first column
                    doc.setFillColor(180, 180, 180);
                    doc.rect(10 + colOffset, currentY, cellWidth, cellHeight, 'F');
                    doc.setTextColor(0, 0, 0);
                    doc.text(header, 10 + colOffset + cellWidth / 2, currentY + cellHeight / 2, { align: 'center' });
                }

                // Draw the corresponding data cell
                doc.setFillColor(245, 245, 245);
                doc.rect(10 + colOffset + cellWidth, currentY, cellWidth, cellHeight, 'F');
                doc.setTextColor(0, 0, 0);
                doc.text(values[dataIndex].toString(), 10 + colOffset + cellWidth + cellWidth / 2, currentY + cellHeight / 2, { align: 'center' });

                currentY += cellHeight;

                // Check if we need to move to the next column for the next location data
                if (currentY >= startY + (rowsPerPage * cellHeight)) {
                    currentY = startY;
                    colOffset += cellWidth * 1; // Move to the next column set
                }
            }

            dataIndex += 1;
        }

        // Save and upload PDF
        // Generate filename based on current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const filename = `${year}-${month}-${day}_${hours}${minutes}${seconds}_document.pdf`;

        doc.save(filename);
        const pdfBlob = doc.output('blob');
        const formData = new FormData();
        formData.append('pdf', pdfBlob, filename);
    
        fetch('/upload_pdf', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('PDF uploaded successfully!');
            } else {
                alert(`Failed to upload PDF: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to upload PDF due to a network or server error.');
        });
    }    
</script> */




/*
// Script for generating PDF Output.ejs main
<!-- <script>
    // Function to parse RGBA color string and return an array of RGB components
    function rgbaToRgbArray(rgba) {
        const match = rgba.match(/^rgba?\((\d+), (\d+), (\d+),? ([\d.]+)?\)$/);
        if (match) {
            // Return the RGB part as an array [r, g, b]
            return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        }
        return [255, 255, 255]; // Default to white if the color format is invalid
    }
    async function generatePDF() {
        const { userDetails, parameters } = await fetchUserData();
    
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            compress: true
        });
    
        // Page 1: Cover Page
        doc.setFont('times', 'normal');
    
        // Header
        const headerImg1 = new Image();
        headerImg1.src = '/img/logo-no-background.png';
        const headerImg2 = new Image();
        headerImg2.src = '/img/IIT_Kharagpur_Logo.png';
    
        doc.addImage(headerImg1, 'PNG', 8, 8, 18, 18);
        doc.addImage(headerImg2, 'PNG', 136, 8, 17, 17);
    
        doc.setFontSize(10);
        doc.text('Water', 28, 13);
        doc.text('Quality', 28, 18);
        doc.text('Assessment', 28, 23);
    
        doc.setFontSize(8.5);
        doc.text('Water Sensing and Simulation Lab', 155, 10);
        doc.text('Agricultural and Food Engineering', 155, 15);
        doc.text('Indian Institute of Technology Kharagpur', 155, 20);
        doc.text('Kharagpur, West Bengal - 721302', 155, 25);
    
        doc.setFontSize(17);
        doc.text('Water Quality Report', 74, 40);
    
        doc.line(5, 30, 205, 30, 'S');
    
        // Title
        doc.setFontSize(14);
        doc.text('Drinking Water', 64, 50);
    
        // User Information
        doc.setFontSize(12);
        //doc.setFont('calibri', 'bold');
        doc.text('User Information', 10, 60);
        doc.setFont('times', 'normal');
        doc.text(`Name: ${userDetails.name}`, 10, 67);
        doc.text(`Email: ${userDetails.email}`, 10, 74);
        doc.text(`Country: ${userDetails.country}`, 10, 81);
    
        //doc.setFont('calibri', 'bold');
        doc.text('Interpretation', 10, 90);
        doc.setFont('times', 'normal');
    
        // Page 2: Map, Risk Table, and WQI Status
        doc.addPage();
        doc.setFontSize(15);
        doc.text('Drinking Water Analysis', 75, 10);
        doc.line(6, 15, 204, 15, 'S');
    
        // const id_dw = ["mapd", "wqi_Status"];
        let y_d = 20;
    
        // Add Map (mapd)
        const contentMap = document.querySelector('#mapd');
        const canvasMap = await html2canvas(contentMap, { scale: 3, useCORS: true });
        const imgDataMap = canvasMap.toDataURL('image/jpeg', 0.8);
        const imgWidthMap = 190;
        const imgHeightMap = canvasMap.height * imgWidthMap / canvasMap.width;
    
        if (y_d + imgHeightMap > doc.internal.pageSize.height - 20) {
            doc.addPage();
            y_d = 20;
        }
    
        doc.addImage(imgDataMap, 'JPEG', 10, y_d, imgWidthMap, imgHeightMap);
        y_d += imgHeightMap + 5;
    
        // Add Risk Assessment Table (wq_Risk) with Pagination for 25 Entries Per Page
        // Page 3 onwards
        const headerBgColor = [135, 206, 235]; // Sky blue color for header
        const defaultTextColor = [0, 0, 0]; // Black text color
        const borderColor = [255, 255, 255]; // White color for borders
        const startY = 20;
        let currentY = startY;
        let rowIndex = 0;
        const maxRowsPerPage = 25;

        // Updated column widths to fit content properly
        const columnWidths = {
            slNo: 15,
            address: 30,
            lat: 20,
            long: 20,
            wqi: 15,
            wqiStatus: 30, // Increase width for WQI status
            males: 20,
            females: 20,
            children: 20,
        };

        const tableHeader = [
            { title: "Sl.no", width: columnWidths.slNo },
            { title: "Address", width: columnWidths.address },
            { title: "Latitude", width: columnWidths.lat },
            { title: "Longitude", width: columnWidths.long },
            { title: "WQI", width: columnWidths.wqi },
            { title: "Water Quality", width: columnWidths.wqiStatus },
            { title: "Males", width: columnWidths.males },
            { title: "Females", width: columnWidths.females },
            { title: "Children", width: columnWidths.children },
        ];

        // Function to draw table headers with proper column widths and borders
        function drawTableHeader() {
            doc.setFontSize(10);
            doc.setFont('bold');

            // Set sky blue background for the header row
            doc.setFillColor(...headerBgColor);
            doc.setDrawColor(...borderColor); // Set white border color
            doc.rect(10, currentY - 8, 190, 10, 'FD'); // Background and border for header row

            let currentX = 10;
            tableHeader.forEach((header) => {
                doc.setTextColor(...defaultTextColor);
                doc.text(header.title, currentX + header.width / 2, currentY, { align: 'center' });

                // Draw vertical white borders
                doc.setDrawColor(...borderColor);
                doc.line(currentX, currentY - 8, currentX, currentY + 2); // Vertical line

                currentX += header.width;
            });

            // Draw the last vertical border for the last column
            doc.line(currentX, currentY - 8, currentX, currentY + 2);

            currentY += 10; // Move down for the next row
        }

        // Start generating table rows
        doc.addPage();
        doc.setFontSize(15);
        doc.text('Water Quality Risk Assessment', 75, 10);
        drawTableHeader(); // First page header

        for (const entry of parameters) {
            if (rowIndex % maxRowsPerPage === 0 && rowIndex !== 0) {
                doc.addPage();
                currentY = startY;
                drawTableHeader(); // Draw header on each new page
            }

            // Convert the bgColor from string to RGB array
            const bgColor = rgbaToRgbArray(entry.bgColor || 'rgba(245, 245, 245, 1)'); // Default to light gray if no color is provided
            doc.setFillColor(...bgColor);
            doc.setDrawColor(...borderColor); // Set white border color
            doc.rect(10, currentY - 8, 190, 10, 'FD'); // Background and border for the row

            let currentX = 10;

            // Fill in the table row with data and align text to center
            doc.setFontSize(8);
            doc.setFont('normal');
            doc.setTextColor(...defaultTextColor); // Set text color to default black

            // Drawing text for each column, centering the text
            doc.text(String(rowIndex + 1), currentX + columnWidths.slNo / 2, currentY, { align: 'center' }); // Sl.no
            currentX += columnWidths.slNo;

            doc.text(entry.Location || 'N/A', currentX + columnWidths.address / 2, currentY, { align: 'center' }); // Address
            currentX += columnWidths.address;

            doc.text(entry.latitude || 'N/A', currentX + columnWidths.lat / 2, currentY, { align: 'center' }); // Latitude
            currentX += columnWidths.lat;

            doc.text(entry.longitude || 'N/A', currentX + columnWidths.long / 2, currentY, { align: 'center' }); // Longitude
            currentX += columnWidths.long;

            doc.text(String(entry.WQI || 'N/A'), currentX + columnWidths.wqi / 2, currentY, { align: 'center' }); // WQI
            currentX += columnWidths.wqi;

            doc.text(entry.WQI_status || 'N/A', currentX + columnWidths.wqiStatus / 2, currentY, { align: 'center' }); // Water Quality
            currentX += columnWidths.wqiStatus;

            doc.text(entry.hazard_index_male || 'N/A', currentX + columnWidths.males / 2, currentY, { align: 'center' }); // Males
            currentX += columnWidths.males;

            doc.text(entry.hazard_index_female || 'N/A', currentX + columnWidths.females / 2, currentY, { align: 'center' }); // Females
            currentX += columnWidths.females;

            doc.text(entry.hazard_index_child || 'N/A', currentX + columnWidths.children / 2, currentY, { align: 'center' }); // Children

            // Draw vertical white borders
            currentX = 10;
            tableHeader.forEach((header) => {
                doc.line(currentX, currentY - 8, currentX, currentY + 2); // Vertical line for each column
                currentX += header.width;
            });

            // Draw the last vertical border for the last column
            doc.line(currentX, currentY - 8, currentX, currentY + 2);

            currentY += 10; // Move down for the next row
            rowIndex++;
        }
    
        // Page 4: Add WQI Status Chart (wqi_Status)
        doc.addPage();
        const contentWQI = document.querySelector('#wqi_Status');
        const canvasWQI = await html2canvas(contentWQI, { scale: 3, useCORS: true });
        const imgDataWQI = canvasWQI.toDataURL('image/jpeg', 0.8);
        const imgWidthWQI = 190;
        const imgHeightWQI = canvasWQI.height * imgWidthWQI / canvasWQI.width;
    
        if (y_d + imgHeightWQI > doc.internal.pageSize.height - 20) {
            doc.addPage();
            y_d = 20;
        }
    
        doc.addImage(imgDataWQI, 'JPEG', 10, y_d, imgWidthWQI, imgHeightWQI);

        // Page 5: Irrigation Water Analysis
        // Add Risk Assessment Table for SAR and Na% with Pagination for 25 Entries Per Page
        const headerBgColoriw = [135, 206, 235]; // Sky blue color for header
        const defaultTextColoriw = [0, 0, 0]; // Black text color
        const borderColoriw = [255, 255, 255]; // White color for borders
        const startYiw = 20;
        let currentYiw = startYiw;
        let rowIndexiw = 0;
        const maxRowsPerPageiw = 25;

        // Updated column widths for the new table structure
        const columnWidthsiw = {
            slNo: 10,
            address: 25,
            lat: 17,
            long: 17,
            sar: 26,
            suitabilitySar: 35,
            naPercent: 26,
            suitabilityNa: 35,
        };

        const tableHeaderiw = [
            { title: "Sl.no", width: columnWidthsiw.slNo },
            { title: "Address", width: columnWidthsiw.address },
            { title: "Latitude", width: columnWidthsiw.lat },
            { title: "Longitude", width: columnWidthsiw.long },
            { title: "SAR", width: columnWidthsiw.sar },
            { title: "Suitability based on SAR", width: columnWidthsiw.suitabilitySar },
            { title: "Na%", width: columnWidthsiw.naPercent },
            { title: "Suitability based on Na%", width: columnWidthsiw.suitabilityNa },
        ];

        // Function to draw table headers
        function drawTableHeaderiw() {
            doc.setFontSize(10);
            doc.setFont('bold');

            // Set sky blue background for the header row
            doc.setFillColor(...headerBgColoriw);
            doc.setDrawColor(...borderColoriw); // Set white border color
            doc.rect(10, currentYiw - 8, 190, 10, 'FD'); // Background and border for header row

            let currentX = 10;
            tableHeaderiw.forEach((header) => {
                doc.setTextColor(...defaultTextColoriw);
                doc.text(header.title, currentX + header.width / 2, currentYiw, { align: 'center' });

                // Draw vertical white borders
                doc.setDrawColor(...borderColoriw);
                doc.line(currentX, currentYiw - 8, currentX, currentYiw + 2); // Vertical line

                currentX += header.width;
            });

            // Draw the last vertical border for the last column
            doc.line(currentX, currentYiw - 8, currentX, currentYiw + 2);

            currentYiw += 10; // Move down for the next row
        }

        // Start generating table rows
        doc.addPage();
        doc.setFontSize(15);
        doc.text('Irrigation Suitability', 75, 10);
        drawTableHeaderiw(); // First page header

        for (const entry of parameters) {
            if (rowIndexiw % maxRowsPerPageiw === 0 && rowIndexiw !== 0) {
                doc.addPage();
                currentYiw = startYiw;
                drawTableHeaderiw(); // Draw header on each new page
            }

            // Convert the bgColor from string to RGB array
            const bgColor1 = rgbaToRgbArray(entry.bgColor1 || 'rgba(245, 245, 245, 1)'); // Default to light gray if no color is provided
            doc.setFillColor(...bgColor1);
            doc.setDrawColor(...borderColoriw); // Set white border color
            doc.rect(10, currentYiw - 8, 190, 10, 'FD'); // Background and border for the row

            let currentX = 10;

            // Fill in the table row with data and align text to center
            doc.setFontSize(8);
            doc.setFont('normal');
            doc.setTextColor(...defaultTextColoriw); // Set text color to default black

            // Drawing text for each column, centering the text
            doc.text(String(rowIndexiw + 1), currentX + columnWidthsiw.slNo / 2, currentYiw, { align: 'center' }); // Sl.no
            currentX += columnWidthsiw.slNo;

            doc.text(entry.Location || 'N/A', currentX + columnWidthsiw.address / 2, currentYiw, { align: 'center' }); // Address
            currentX += columnWidthsiw.address;

            doc.text(entry.latitude || 'N/A', currentX + columnWidthsiw.lat / 2, currentYiw, { align: 'center' }); // Latitude
            currentX += columnWidthsiw.lat;

            doc.text(entry.longitude || 'N/A', currentX + columnWidthsiw.long / 2, currentYiw, { align: 'center' }); // Longitude
            currentX += columnWidthsiw.long;

            doc.text(String(entry.sar || 'N/A'), currentX + columnWidthsiw.sar / 2, currentYiw, { align: 'center' }); // SAR
            currentX += columnWidthsiw.sar;

            doc.text(entry.purpose_SAR || 'N/A', currentX + columnWidthsiw.suitabilitySar / 2, currentYiw, { align: 'center' }); // Irrigation suitability based on SAR
            currentX += columnWidthsiw.suitabilitySar;

            doc.text(String(entry.Na_per || 'N/A'), currentX + columnWidthsiw.naPercent / 2, currentYiw, { align: 'center' }); // Na%
            currentX += columnWidthsiw.naPercent;

            doc.text(entry.purpose_Na || 'N/A', currentX + columnWidthsiw.suitabilityNa / 2, currentYiw, { align: 'center' }); // Irrigation suitability based on Na%

            // Draw vertical white borders
            currentX = 10;
            tableHeaderiw.forEach((header) => {
                doc.line(currentX, currentYiw - 8, currentX, currentYiw + 2); // Vertical line for each column
                currentX += header.width;
            });

            // Draw the last vertical border for the last column
            doc.line(currentX, currentYiw - 8, currentX, currentYiw + 2);

            currentYiw += 10; // Move down for the next row
            rowIndexiw++;
        }
    
        // Add SAR Status Chart (sar_Status)
        doc.addPage();
        const contentSAR = document.querySelector('#sar_Status');
        const canvasSAR = await html2canvas(contentSAR, { scale: 3, useCORS: true });
        const imgDataSAR = canvasSAR.toDataURL('image/jpeg', 0.8);
        const imgWidthSAR = 190;
        const imgHeightSAR = canvasSAR.height * imgWidthSAR / canvasSAR.width;
    
        if (y_d + imgHeightSAR > doc.internal.pageSize.height - 20) {
            doc.addPage();
            y_d = 20;
        }
    
        doc.addImage(imgDataSAR, 'JPEG', 10, y_d, imgWidthSAR, imgHeightSAR);

        // Add Na Status Chart (Na_Status)
        doc.addPage();
        const contentNa = document.querySelector('#sar_Status');
        const canvasNa = await html2canvas(contentNa, { scale: 3, useCORS: true });
        const imgDataNa = canvasNa.toDataURL('image/jpeg', 0.8);
        const imgWidthNa = 190;
        const imgHeightNa = canvasNa.height * imgWidthNa / canvasNa.width;
    
        if (y_d + imgHeightNa > doc.internal.pageSize.height - 20) {
            doc.addPage();
            y_d = 20;
        }
    
        doc.addImage(imgDataNa, 'JPEG', 10, y_d, imgWidthNa, imgHeightNa);

        // Diagrams
        const id_dia = ["wilcox_D", "chadha_D", "gibbs_D"];

        doc.addPage();
        doc.setFontSize(15);
        doc.text('Diagrams', 85, 10);
        let y_p = 20;
    
        for (let i = 0; i < id_dia.length; i++) {
            const content = document.querySelector('#' + id_dia[i]);
            const canvas = await html2canvas(content, { scale: 3, useCORS: true });
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            const imgWidth = 170;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const x_centered = (doc.internal.pageSize.width - imgWidth) / 2;
    
            if (y_p + imgHeight > doc.internal.pageSize.height - 20) {
                doc.addPage();
                y_p = 20;
            }
    
            doc.addImage(imgData, 'JPEG', x_centered, y_p, imgWidth, imgHeight);
            y_p += imgHeight + 10;
        }
    
        // Appendix
        doc.addPage();
        doc.setFontSize(15);
        doc.text('Appendix', 85, 10);
        doc.line(6, 15, 204, 15, 'S');

        doc.setFontSize(10);
        const transposedData = {};
        parameters.forEach(parameter => {
            for (const [key, value] of Object.entries(parameter)) {
                if (!transposedData[key]) {
                    transposedData[key] = [];
                }
                transposedData[key].push(value);
            }
        });

        // Variables to manage table formatting and pagination
        const startYA = 20;
        const cellWidth = 40;
        const cellHeight = 10;
        const rowsPerPage = 25;
        let currentYA = startYA;
        let colOffset = 0;
        let dataIndex = 0;

        const numberOfLocations = transposedData['Location'].length;

        while (dataIndex < numberOfLocations) {
            // Add a new page if this is not the first page
            if (dataIndex > 0 && dataIndex % 4 === 0) {
                doc.addPage();
                currentYA = startYA;
                colOffset = 0;
            }

            for (let i = 0; i < Object.keys(transposedData).length - 13; i++) {
                const header = Object.keys(transposedData)[i];
                const values = transposedData[header];

                if (dataIndex % 4 === 0) {
                    // Draw the header cell in the first column
                    doc.setFillColor(180, 180, 180);
                    doc.rect(10 + colOffset, currentYA, cellWidth, cellHeight, 'F');
                    doc.setTextColor(0, 0, 0);
                    doc.text(header, 10 + colOffset + cellWidth / 2, currentYA + cellHeight / 2, { align: 'center' });
                }

                // Draw the corresponding data cell
                doc.setFillColor(245, 245, 245);
                doc.rect(10 + colOffset + cellWidth, currentYA, cellWidth, cellHeight, 'F');
                doc.setTextColor(0, 0, 0);
                doc.text(values[dataIndex].toString(), 10 + colOffset + cellWidth + cellWidth / 2, currentYA + cellHeight / 2, { align: 'center' });

                currentYA += cellHeight;

                // Check if we need to move to the next column for the next location data
                if (currentYA >= startYA + (rowsPerPage * cellHeight)) {
                    currentYA = startYA;
                    colOffset += cellWidth * 1; // Move to the next column set
                }
            }

            dataIndex += 1;
        }
    
    
        // Save and upload PDF
        // Generate filename based on current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const filename = `${year}-${month}-${day}_${hours}${minutes}${seconds}_document.pdf`;

        doc.save(filename);
        const pdfBlob = doc.output('blob');
        const formData = new FormData();
        formData.append('pdf', pdfBlob, filename);
    
        fetch('/upload_pdf', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('PDF uploaded successfully!');
            } else {
                alert(`Failed to upload PDF: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to upload PDF due to a network or server error.');
        });
    }
</script> -->

*/




// WQI Calculation: Pass all necessary parameters for WQI calculation
        /* let wqiParams = {};  // Initialize an empty object

        // // Helper function to check if a string can be parsed as a valid number, including zero
        const isValidNumber = (value) => {
            return value !== undefined && value !== '' && value !== null;
        };

        // // Add each parameter to the object only if it is a valid number (including 0)
        if (isValidNumber(obj[key]['ph'])) wqiParams.ph = parseFloat(obj[key]['ph']);
        if (isValidNumber(obj[key]['turbidity'])) wqiParams.turbidity = parseFloat(obj[key]['turbidity']);
        if (isValidNumber(obj[key]['temperature'])) wqiParams.temperature = parseFloat(obj[key]['temperature']);
        if (isValidNumber(obj[key]['electrical_conductivity'])) wqiParams.electrical_conductivity = parseFloat(obj[key]['electrical_conductivity']);
        if (isValidNumber(obj[key]['hardness'])) wqiParams.hardness = parseFloat(obj[key]['hardness']);
        if (isValidNumber(obj[key]['alkalinity'])) wqiParams.alkalinity = parseFloat(obj[key]['alkalinity']);
        if (isValidNumber(obj[key]['total_dissolved_solids'])) wqiParams.total_dissolved_solids = parseFloat(obj[key]['total_dissolved_solids']);
        if (isValidNumber(obj[key]['dissolved_oxygen'])) wqiParams.dissolved_oxygen = parseFloat(obj[key]['dissolved_oxygen']);
        if (isValidNumber(obj[key]['biological_oxygen_demand'])) wqiParams.biological_oxygen_demand = parseFloat(obj[key]['biological_oxygen_demand']);
        if (isValidNumber(obj[key]['chemical_oxygen_demand'])) wqiParams.chemical_oxygen_demand = parseFloat(obj[key]['chemical_oxygen_demand']);
        if (isValidNumber(obj[key]['ammonium'])) wqiParams.ammonium = parseFloat(obj[key]['ammonium']);
        if (isValidNumber(obj[key]['chloride'])) wqiParams.chloride = parseFloat(obj[key]['chloride']);
        if (isValidNumber(obj[key]['carbonate'])) wqiParams.carbonate = parseFloat(obj[key]['carbonate']);
        if (isValidNumber(obj[key]['sulfate'])) wqiParams.sulfate = parseFloat(obj[key]['sulfate']);
        if (isValidNumber(obj[key]['nitrate'])) wqiParams.nitrate = parseFloat(obj[key]['nitrate']);
        if (isValidNumber(obj[key]['nitrite'])) wqiParams.nitrite = parseFloat(obj[key]['nitrite']);
        if (isValidNumber(obj[key]['phosphate'])) wqiParams.phosphate = parseFloat(obj[key]['phosphate']);
        if (isValidNumber(obj[key]['fluoride'])) wqiParams.fluoride = parseFloat(obj[key]['fluoride']);
        */

// 
        /* let entry = {
            latitude: latitude != null ? String(latitude) : '',
            longitude: longitude != null ? String(longitude) : '',
            state: state != null ? String(state) : '',
            district: district != null ? String(district) : '',
            block: block != null ? String(block) : '',
            location: location != null ? String(location) : '',
            date: new Date().toISOString().split('T')[0], // Current date
            ph: ph != null ?  String(ph) : undefined,
            temperature: temperature != null ? String(temperature) : undefined,
            turbidity: turbidity != null ? String(turbidity) : undefined,
            electrical_conductivity: electrical_conductivity != null ? String(electrical_conductivity) : undefined,
            hardness: hardness != null ? String(hardness) : undefined,
            alkalinity: alkalinity != null ? String(alkalinity) : undefined,
            total_dissolved_solids: total_dissolved_solids != null ? String(total_dissolved_solids) : undefined,
            dissolved_oxygen: dissolved_oxygen != null ? String(dissolved_oxygen) : undefined,
            biological_oxygen_demand: biological_oxygen_demand != null ? String(biological_oxygen_demand) : undefined,
            chemical_oxygen_demand: chemical_oxygen_demand != null ? String(chemical_oxygen_demand) : undefined,
            ammonium: ammonium != null ? String(ammonium) : undefined,
            chloride: chloride != null ? String(chloride) : undefined,
            carbonate: carbonate != null ? String(carbonate) : undefined,
            bicarbonate: bicarbonate != null ? String(bicarbonate) : undefined,
            sulfate: sulfate != null ? String(sulfate) : undefined,
            nitrate: nitrate != null ? String(nitrate) : undefined,
            nitrite: nitrite != null ? String(nitrite) : undefined,
            fluoride: fluoride != null ? String(fluoride) : undefined,
            phosphate: phosphate != null ? String(phosphate) : undefined,
            sodiumion: sodiumion != null ? String(sodiumion) : undefined,
            calciumion: calciumion != null ? String(calciumion) : undefined,
            magnesiumion: magnesiumion != null ? String(magnesiumion) : undefined,
            potassiumion: potassiumion != null ? String(potassiumion) : undefined,
        }; */