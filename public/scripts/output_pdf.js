// Function to parse RGBA color string and return an array of RGB components
function rgbaToRgbArray(rgba) {
    const match = rgba.match(/^rgba?\((\d+), (\d+), (\d+),? ([\d.]+)?\)$/);
    if (match) {
        // Return the RGB part as an array [r, g, b]
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    return [255, 255, 255];
}

// async function fetchChatGPTInterpretation(parameters) {
//     const apiKey = 'sk-proj-eh2l9qP7COhlrHMPaGvIT3BlbkFJIc1nLo7gscCQbSUyjLMm';
//     const prompt = `Analyze the following water quality parameters and provide a short yet descriptive interpretation of the overall water quality. Your analysis should cover:
//                     Drinking Water Suitability: Assess the Water Quality Index (WQI) values and determine if the water is suitable for drinking or not.
//                     Irrigation Suitability: Based on Sodium Adsorption Ratio (SAR) and Sodium Percentage (Na%), categorize the water as Good, Perfect, or Bad for irrigation.
//                     Groundwater Chemistry: Provide insights based on groundwater chemistry principles for the given parameters.
//                     Wilcox Plot Analysis: Analyze Electrical Conductivity (EC) and Sodium Percent (Na%) to determine where most data points lie in the Wilcox Plot classification and what it implies about water usability for irrigation.
//                     Parameters: ${JSON.stringify(parameters)}
//                     Ensure that the response is concise, yet comprehensive and based on established hydrochemical principles.`;
    
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`
//         },
//         body: JSON.stringify({
//             model: 'gpt-4',
//             messages: [{ role: 'system', content: 'You are an expert in water quality analysis.' }, { role: 'user', content: prompt }],
//             max_tokens: 200
//         })
//     });
    
//     const data = await response.json();
//     console.log(data);
//     return data.choices[0].message.content;
// }

async function fetchChatGPTInterpretation(parameters) {
    const apiKey = 'sk-proj-eh2l9qP7COhlrHMPaGvIT3BlbkFJIc1nLo7gscCQbSUyjLMm';
    const prompt = `Analyze the following water quality parameters and provide a short yet descriptive interpretation of the overall water quality. Your analysis should cover:
                    Drinking Water Suitability: Assess the Water Quality Index (WQI) values and determine if the water is suitable for drinking or not.
                    Health Risks: Identify potential health risks associated with the water quality parameters, especially for vulnerable groups such as children, women, and men.
                    Parameters: ${JSON.stringify(parameters)}
                    Ensure that the response is concise, yet comprehensive and based on established hydrochemical principles.`;
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are an expert in water quality analysis.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 200
            })
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return ""; // Return empty string on API failure
        }
        
        const data = await response.json();
        return data.choices?.[0]?.message?.content || "";
    } catch (error) {
        console.error("API call failed:", error);
        return ""; // Return empty string on error
    }
}

async function generatePDF() {
    const { userDetails, parameters } = await fetchUserData();
    const interpretation = await fetchChatGPTInterpretation(parameters);

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
    doc.text('Drinking Water', 74, 50);

    // User Information
    doc.setFontSize(12);
    //doc.setFont('calibri', 'bold');
    doc.text('User Information', 10, 60);
    doc.setFont('times', 'normal');
    doc.text(`Name: ${userDetails.name}`, 10, 67);
    doc.text(`Email: ${userDetails.email}`, 10, 74);
    doc.text(`Country: ${userDetails.country}`, 10, 81);

    doc.text('Interpretation', 10, 90);
    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    doc.text(interpretation, 10, 97, { maxWidth: 190 });

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
    const headerBgColor = [135, 206, 235];
    const defaultTextColor = [0, 0, 0];
    const borderColor = [255, 255, 255];
    const startY = 20;
    let currentY = startY;
    let rowIndex = 0;
    const maxRowsPerPage = 25;

    // Updated column widths to fit content properly
    const columnWidths = {
        slNo: 10,
        address: 30,
        lat: 23,
        long: 23,
        wqi: 15,
        wqiStatus: 29, // Increase width for WQI status
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

    doc.addPage();
    doc.setFontSize(15);
    doc.text('Irrigation Water Analysis', 75, 10);
    doc.line(6, 15, 204, 15, 'S');

    let y_d2 = 20;

    // Add Map (mapd2)
    const contentMap2 = document.querySelector('#mapd2');
    const canvasMap2 = await html2canvas(contentMap2, { scale: 3, useCORS: true });
    const imgDataMap2 = canvasMap2.toDataURL('image/jpeg', 0.8);
    const imgWidthMap2 = 190;
    const imgHeightMap2 = canvasMap2.height * imgWidthMap2 / canvasMap2.width;

    if (y_d2 + imgHeightMap2 > doc.internal.pageSize.height - 20) {
        doc.addPage();
        y_d2 = 20;
    }

    doc.addImage(imgDataMap2, 'JPEG', 10, y_d2, imgWidthMap2, imgHeightMap2);
    y_d2 += imgHeightMap2 + 5;

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
        lat: 25,
        long: 25,
        sar: 30,
        suitabilitySar: 25,
        naPercent: 30,
        suitabilityNa: 25,
    };

    const tableHeaderiw = [
        { title: "Sl.no", width: columnWidthsiw.slNo },
        { title: "Address", width: columnWidthsiw.address },
        { title: "Latitude", width: columnWidthsiw.lat },
        { title: "Longitude", width: columnWidthsiw.long },
        { title: "SAR", width: columnWidthsiw.sar },
        { title: "Suitability (SAR)", width: columnWidthsiw.suitabilitySar },
        { title: "Na%", width: columnWidthsiw.naPercent },
        { title: "Suitability (Na%)", width: columnWidthsiw.suitabilityNa },
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
    const contentNa = document.querySelector('#Na_Status');
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