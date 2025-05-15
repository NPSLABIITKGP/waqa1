// Function to parse RGBA color string and return an array of RGB components
function rgbaToRgbArray(rgba) {
    const match = rgba.match(/^rgba?\((\d+), (\d+), (\d+),? ([\d.]+)?\)$/);
    if (match) {
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    return [255, 255, 255];
}

// async function fetchChatGPTInterpretation(parameters) {
//     const apiKey = 'sk-proj-eh2l9qP7COhlrHMPaGvIT3BlbkFJIc1nLo7gscCQbSUyjLMm';
//     const prompt = `Analyze the following water quality parameters and provide a short yet descriptive interpretation of the overall water quality. Your analysis should cover:
//                     Drinking Water Suitability: Assess the Water Quality Index (WQI) values and determine if the water is suitable for drinking or not.
//                     Health Risks: Identify potential health risks associated with the water quality parameters, especially for vulnerable groups such as children, woman, and men.
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
//     // console.log(data);
//     return data.choices[0].message.content;
// }

/*
// Code with retries if required

async function fetchChatGPTInterpretation(parameters, retries = 3, delay = 2000) {
    const apiKey = 'sk-proj-eh2l9qP7COhlrHMPaGvIT3BlbkFJIc1nLo7gscCQbSUyjLMm';
    const prompt = `Analyze the following water quality parameters...`; // keep your existing prompt

    for (let attempt = 0; attempt < retries; attempt++) {
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
                    max_tokens: 300
                })
            });

            if (response.status === 429) {
                console.warn(`Rate limited. Retrying in ${delay}ms...`);
                await new Promise(res => setTimeout(res, delay));
                delay *= 2; // exponential backoff
                continue;
            }

            if (!response.ok) {
                console.error(`Error: ${response.status} ${response.statusText}`);
                return "";
            }

            const data = await response.json();
            return data.choices?.[0]?.message?.content || "";

        } catch (error) {
            console.error("API call failed:", error);
            return "";
        }
    }

    console.error("All retries failed due to rate limiting.");
    return "";
}

*/

async function fetchChatGPTInterpretation(parameters) {
    const apiKey = 'sk-proj-eh2l9qP7COhlrHMPaGvIT3BlbkFJIc1nLo7gscCQbSUyjLMm';
    const prompt = `Analyze the following water quality parameters and provide a short yet descriptive interpretation of the overall water quality. Your analysis should cover:
                    Drinking Water Suitability: Assess the Water Quality Index (WQI) values and determine if the water is suitable for drinking or not.
                    Health Risks: Identify potential health risks associated with the water quality parameters, especially for vulnerable groups such as children, women, and men.
                    Parameters: ${JSON.stringify(parameters)}
                    Ensure that the response is concise in 300 words, yet comprehensive and based on established hydrochemical principles.`;
    
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
                max_tokens: 300
            })
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return ""; // Return empty string on API failure
        }
        
        const data = await response.json();
        console.log(data);
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
    doc.text('Drinking Water', 80, 50);

    // User Information
    doc.setFontSize(12);
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

    let y_d = 20;

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


    // Page 3: Add Risk Assessment Table (wq_Risk) with Pagination for 25 Entries Per Page
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
        wqiStatus: 29,
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
        doc.setDrawColor(...borderColor);
        doc.rect(10, currentY - 8, 190, 10, 'FD');

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

        currentY += 10;
    }

    // Start generating table rows
    doc.addPage();
    doc.setFontSize(15);
    doc.text('Water Quality Risk Assessment', 75, 10);
    drawTableHeader();

    for (const entry of parameters) {
        if (rowIndex % maxRowsPerPage === 0 && rowIndex !== 0) {
            doc.addPage();
            currentY = startY;
            drawTableHeader();
        }

        // Convert the bgColor from string to RGB array
        const bgColor = rgbaToRgbArray(entry.bgColor || 'rgba(245, 245, 245, 1)');
        doc.setFillColor(...bgColor);
        doc.setDrawColor(...borderColor);
        doc.rect(10, currentY - 8, 190, 10, 'FD');

        let currentX = 10;

        // Fill in the table row with data and align text to center
        doc.setFontSize(8);
        doc.setFont('normal');
        doc.setTextColor(...defaultTextColor);

        // Drawing text for each column, centering the text
        doc.text(String(rowIndex + 1), currentX + columnWidths.slNo / 2, currentY, { align: 'center' });
        currentX += columnWidths.slNo;

        doc.text(entry.Location || 'N/A', currentX + columnWidths.address / 2, currentY, { align: 'center' });
        currentX += columnWidths.address;

        doc.text(entry.latitude || 'N/A', currentX + columnWidths.lat / 2, currentY, { align: 'center' });
        currentX += columnWidths.lat;

        doc.text(entry.longitude || 'N/A', currentX + columnWidths.long / 2, currentY, { align: 'center' });
        currentX += columnWidths.long;

        doc.text(String(entry.WQI || 'N/A'), currentX + columnWidths.wqi / 2, currentY, { align: 'center' });
        currentX += columnWidths.wqi;

        doc.text(entry.WQI_status || 'N/A', currentX + columnWidths.wqiStatus / 2, currentY, { align: 'center' });
        currentX += columnWidths.wqiStatus;

        doc.text(entry.hazard_index_male || 'N/A', currentX + columnWidths.males / 2, currentY, { align: 'center' });
        currentX += columnWidths.males;

        doc.text(entry.hazard_index_female || 'N/A', currentX + columnWidths.females / 2, currentY, { align: 'center' });
        currentX += columnWidths.females;

        doc.text(entry.hazard_index_child || 'N/A', currentX + columnWidths.children / 2, currentY, { align: 'center' });

        // Draw vertical white borders
        currentX = 10;
        tableHeader.forEach((header) => {
            doc.line(currentX, currentY - 8, currentX, currentY + 2);
            currentX += header.width;
        });

        // Draw the last vertical border for the last column
        doc.line(currentX, currentY - 8, currentX, currentY + 2);

        currentY += 10;
        rowIndex++;
    }
    
    // Page 4: Add WQI Status Chart (wqi_Status)
    doc.addPage();
    const contentWQI = document.querySelector('#wqi_Status');
    const canvasWQI = await html2canvas(contentWQI, { scale: 2, useCORS: true });
    const imgDataWQI = canvasWQI.toDataURL('image/jpeg', 0.8);
    const imgWidthWQI = 190;
    const imgHeightWQI = canvasWQI.height * imgWidthWQI / canvasWQI.width;

    if (y_d + imgHeightWQI > doc.internal.pageSize.height - 20) {
        doc.addPage();
        y_d = 20;
    }

    doc.addImage(imgDataWQI, 'JPEG', 10, y_d, imgWidthWQI, imgHeightWQI);

    // Page 5: WQI Division and Hazard Division
    const id_dw = ["wqi_division", "hazard_division"];

    doc.addPage();
    doc.setFontSize(15);
    doc.text('Water Quality Data Analysis', 85, 10);
    let y_p = 20;

    for (let i = 0; i < id_dw.length; i++) {
        const content = document.querySelector('#' + id_dw[i]);
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
        y_p += imgHeight + 20;
    }


    //Page 6: Appendix
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

        for (let i = 0; i < Object.keys(transposedData).length - 8; i++) {
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
                colOffset += cellWidth * 1;
            }
        }

        dataIndex += 1;
    }


    // Save and upload PDF
    // Generate filename based on current date and time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
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