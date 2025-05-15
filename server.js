require('dotenv').config();
const fetch = require('node-fetch');
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");
const multer = require('multer');
const fs = require('fs');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
// const redis = require('redis');
const XLSX = require('xlsx');
const { Worker } = require('worker_threads');
const calculate_wqi = require("./controller/wqi_formula");
const calculate_hazard_index = require("./controller/hazardIndex_formula");
const calculate_sar = require("./controller/sar");
const calculate_sodiumpercentage = require("./controller/sodiumpercentage");
const { notDeepEqual } = require('assert');

const port = process.env.PORT || 3000;
let userdata;
const app = express();

// Middleware
// const redisClient = redis.createClient({
//     url: 'redis://localhost:6379'
//   });
  
// redisClient.connect().catch(console.error);
// redisClient.on('error', (err) => {
//     console.error('Redis error:', err);
// });
  
  // Configure Express Session to use RedisStore
// app.use(
//     session({
//       store: new RedisStore({ client: redisClient }),
//       secret: 'your-secret-key',
//       resave: false,
//       saveUninitialized: false,
//       cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }
//     })
// );

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));

app.use((req, res, next) => {
  const route = req.path;
  let currentPage = 'Home';

  // Define custom names for your routes
    switch (route) {
        case '/about_us':
            currentPage = 'About Us';
            break;
        case '/register':
            currentPage = 'Register';
            break;
        case '/login':
            currentPage = 'Login';
            break;
        case '/forgot_password':
            currentPage = 'Forgot Password';
            break;
        case '/reset_password':
            currentPage = 'Reset Password';
            break;
        case '/welcome':
            currentPage = 'Welcome';
            break;
        case '/my_account':
            currentPage = 'My Account';
            break;
        case '/update_profile':
                currentPage = 'My Account';
                break;
        case '/change_password':
                currentPage = 'My Account';
                break;
        case '/input':
            currentPage = 'Input';
            break;
        case '/output':
            currentPage = 'Both';
            break;
        case '/output1':
            currentPage = 'Admin';
            break;
        case '/output2':
            currentPage = 'Water';
            break;
        case '/output3':
            currentPage = 'Irrigation';
            break;
        case '/analyse_excel':
            currentPage = 'Excel Analysis';
            break;
        case '/contact':
            currentPage = 'Contact Us';
            break;
        case '/faq':
            currentPage = "FAQ's";
            break;
        case '/logout':
            currentPage = 'Logout';
            break;
        // Add more cases as needed
    }

  res.locals.currentPage = currentPage;
  res.locals.userdata = req.session.user;
  next();
});
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

require('dotenv').config();    // must be before you create the connection

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect(function (err) {
    if (err) {
      console.error('❌ Error when connecting to DB:', err);
      setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
    } else {
      console.log('✅ Connected to MySQL!');
    }
  });

  connection.on('error', function (err) {
    console.error('⚠️ DB error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();


const upload = multer({ 
    storage: multer.memoryStorage(), 
    limits: { fileSize: 20 * 1024 * 1024 }
});


function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect(function (err) {
    if (err) {
      console.error('❌ Error when connecting to DB:', err);
      setTimeout(handleDisconnect, 2000); // retry after 2 sec
    } else {
      console.log('✅ Connected to MySQL!');
    }
  });

  connection.on('error', function (err) {
    console.error('⚠️ DB error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
      handleDisconnect(); // reconnect on lost connection
    } else {
      throw err;
    }
  });
}

handleDisconnect();


// Utility Functions
let otpStorage = {}; 

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});



function restructure(obj) {
    let item = {};
    let array = [];
    let item1 = {};
    let obj1 = {};
    let i = 0;

    for (var key in obj) {
        array.push(key.charAt(key.length - 1));
    }
    array.forEach((ele) => {
        item[ele] = (item[ele] || 0) + 1;
    });
    for (var key in obj) {
        if (key.slice(0, -1) === "latitude") {
            item1 = {};
            i = 0;
        }
        item1[key.slice(0, -1)] = obj[key];
        if (item[key.charAt(key.length - 1)] - 1 === i) {
            obj1[key.charAt(key.length - 1)] = item1;
        }
        i++;
    }
    return obj1;
}

// function emailVerification(email) {
//     return (
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ &&
//         /[A-Za-z._]{4,15}[0-9]{0,5}@[A-Za-z]{5,10}[.]{1}[A-Za-z.]{2,6}/.test(email)
//     );
// }

async function authenticateGoogleSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    const authClient = await auth.getClient();
    return google.sheets({ version: 'v4', auth: authClient });
}

// async function appendToGoogleSheets(auth, data) {
//     const spreadsheetsID = '1sAVZkd4xaaDIdiutBRzq51k3GGlcNUv_ZDfxq-JllW0';
//     await auth.spreadsheets.values.append({
//         spreadsheetId: spreadsheetsID,
//         range: 'Sheet6!A:AD',
//         valueInputOption: 'USER_ENTERED',
//         resource: { values: data },
//     });
// }

function processData(obj) {
    for (let key in obj) {
        // Convert necessary ion values to floats for SAR and Sodium Percentage calculations
        const sodium = parseFloat(obj[key]['sodiumion']);
        const calcium = parseFloat(obj[key]['calciumion']);
        const magnesium = parseFloat(obj[key]['magnesiumion']);
        const potassium = parseFloat(obj[key]['potassiumion']);

        // SAR Calculation: Uses Sodium, Calcium, and Magnesium
        obj[key]['sar'] = calculate_sar([sodium, calcium, magnesium]);

        // Sodium Percentage Calculation: Uses Sodium, Calcium, Magnesium, and Potassium
        obj[key]['Na_per'] = calculate_sodiumpercentage([sodium, calcium, magnesium, potassium]);

        // WQI Calculation: Pass all necessary parameters for WQI calculation
        const wqiParams = {
            ph: parseFloat(obj[key]['ph']) || null,
            turbidity: parseFloat(obj[key]['turbidity']) || null,
            temperature: parseFloat(obj[key]['temperature']) || null,
            electrical_conductivity: parseFloat(obj[key]['electrical_conductivity']) || null,
            hardness: parseFloat(obj[key]['hardness']) || null,
            alkalinity: parseFloat(obj[key]['alkalinity']) || null,
            total_dissolved_solids: parseFloat(obj[key]['total_dissolved_solids']) || null,
            dissolved_oxygen: parseFloat(obj[key]['dissolved_oxygen']) || null,
            biological_oxygen_demand: parseFloat(obj[key]['biological_oxygen_demand']) || null,
            chemical_oxygen_demand: parseFloat(obj[key]['chemical_oxygen_demand']) || null,
            ammonium: parseFloat(obj[key]['ammonium']) || null,
            chloride: parseFloat(obj[key]['chloride']) || null,
            carbonate: parseFloat(obj[key]['carbonate']) || null,
            bicarbonate: parseFloat(obj[key]['bicarbonate']) || null,
            sulfate: parseFloat(obj[key]['sulfate']) || null,
            nitrate: parseFloat(obj[key]['nitrate']) || null,
            nitrite: parseFloat(obj[key]['nitrite']) || null,
            fluoride: parseFloat(obj[key]['fluoride']) || null,
            phosphate: parseFloat(obj[key]['phosphate']) || null,
        };

        // Calculate WQI using the constructed wqiParams object
        obj[key]['water_quality_index'] = calculate_wqi(wqiParams);


        // Hazard Index Calculation: Uses Nitrate, Nitrite, Fluoride, Ammonium, and Phosphate
        const nitrate = parseFloat(obj[key]['nitrate']);
        const nitrite = parseFloat(obj[key]['nitrite']);
        const fluoride = parseFloat(obj[key]['fluoride']);
        const ammonium = parseFloat(obj[key]['ammonium']);
        const phosphate = parseFloat(obj[key]['phosphate']);

        obj[key]['hazard_index'] = calculate_hazard_index([nitrate, nitrite, fluoride, ammonium, phosphate]);
    }
    return obj;
}    

function formatDataForDatabase(obj, userdata) {
    return Object.keys(obj).map(key => ({
        user_id: userdata.id,
        name: userdata.name,
        email: userdata.email,
        country: userdata.country,
        phone: userdata.phone,
        date: obj[key]['date'],
        latitude: obj[key]['latitude'],
        longitude: obj[key]['longitude'],
        ph: obj[key]['ph'] || null,
        temperature: obj[key]['temperature'] || null,
        turbidity: obj[key]['turbidity'] || null,
        electrical_conductivity: obj[key]['electrical_conductivity'] || null,
        hardness: obj[key]['hardness'] || null,
        alkalinity: obj[key]['alkalinity'] || null,
        total_dissolved_solids: obj[key]['total_dissolved_solids'] || null,
        dissolved_oxygen: obj[key]['dissolved_oxygen'] || null,
        biological_oxygen_demand: obj[key]['biological_oxygen_demand'] || null,
        chemical_oxygen_demand: obj[key]['chemical_oxygen_demand'] || null,
        ammonium: obj[key]['ammonium'] || null,
        chloride: obj[key]['chloride'] || null,
        carbonate: obj[key]['carbonate'] || null,
        bicarbonate: obj[key]['bicarbonate'] || null,
        sulfate: obj[key]['sulfate'] || null,
        nitrate: obj[key]['nitrate'] || null,
        nitrite: obj[key]['nitrite'] || null,
        fluoride: obj[key]['fluoride'] || null,
        phosphate: obj[key]['phosphate'] || null,
        sodiumion: obj[key]['sodiumion'] || null,
        calciumion: obj[key]['calciumion'] || null,
        magnesiumion: obj[key]['magnesiumion'] || null,
        potassiumion: obj[key]['potassiumion'] || null,
        water_quality_index: obj[key]['water_quality_index'] || null,
        hazard_index_male: obj[key]['hazard_index'] ? obj[key]['hazard_index']['male'] : null,
        hazard_index_female: obj[key]['hazard_index'] ? obj[key]['hazard_index']['female'] : null,
        hazard_index_child: obj[key]['hazard_index'] ? obj[key]['hazard_index']['child'] : null,
        sar: isNaN(obj[key]['sar']) ? null : obj[key]['sar'],
        Na_per: isNaN(obj[key]['Na_per']) ? null : obj[key]['Na_per']
    }));
}

async function handlePostRequest(req, res, view) {
    let err = [];
    let obj = restructure(req.body);

    for (var key in obj) {
        if (Object.keys(obj[key]).length <= 6) {
            err.push({ msg: 'Number of parameters should be more than 3' });
        }
    }

    if (err.length > 0) {
        return res.render('input', { err });
    }

    obj = processData(obj);
    const formattedData = formatDataForDatabase(obj, userdata);

    try {
        const query = `INSERT INTO water_quality_data SET ?`;

        formattedData.forEach((data, index) => {
            connection.query(query, data, (error, results) => {
                if (error) {
                    console.error(`Error inserting data at index ${index}:`, error.message);
                    return res.render('error', { error: `Failed to insert data at index ${index} into MySQL.` });
                }
            });
        });

        res.render(view, { data: JSON.stringify(obj), userdata: JSON.stringify(userdata) });
    } catch (error) {
        res.render('error', { error: 'Failed to process and insert data into MySQL.' });
    }
}

async function handlePostRequestAnalyse(req, res, view) {
    let err = [];
    let obj = req.body;

    for (var key in obj) {
        if (Object.keys(obj[key]).length <= 6) {
            err.push({ msg: 'Number of parameters should be more than 3' });
        }
    }

    if (err.length > 0) {
        return res.render('input', { err });
    }

    obj = processData(obj);
    const formattedData = formatDataForDatabase(obj, userdata);

    try {
        const query = `INSERT INTO water_quality_data SET ?`;

        formattedData.forEach((data, index) => {
            connection.query(query, data, (error, results) => {
                if (error) {
                    console.error(`Error inserting data at index ${index}:`, error.message);
                    return res.render('error', { error: `Failed to insert data at index ${index} into MySQL.` });
                }
            });
        });

        res.render(view, { data: JSON.stringify(obj), userdata: JSON.stringify(userdata) });
    } catch (error) {
        res.render('error', { error: 'Failed to process and insert data into MySQL.' });
    }
}

// Updated code by Rushi
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

async function processExcelData(data) {
    const headerRow = data[0]; 
    const rows = data.slice(1); 
    let processedData = {};

    rows.forEach((row, index) => {
        if (row.length < 25) {
            // console.warn(`Row ${index + 1} is missing columns:`, row);
            return; 
        }

        const [
            latitude, longitude, state, district, block, location, ph, temperature, turbidity, electrical_conductivity, hardness,
            alkalinity, total_dissolved_solids, dissolved_oxygen, biological_oxygen_demand, chemical_oxygen_demand, 
            ammonium, chloride, carbonate, bicarbonate, sulfate, nitrate, nitrite, fluoride,
            phosphate, calciumion, magnesiumion, sodiumion, potassiumion
        ] = row;

        let entry = {
            latitude: latitude ? String(latitude) : '',
            longitude: longitude ? String(longitude) : '',
            state: state ? String(state) : '',
            district: district ? String(district) : '',
            block: block ? String(block) : '',
            location: location ? String(location) : '',
            date: new Date().toISOString().split('T')[0], // Current date
            ph: ph ?  String(ph) : undefined,
            temperature: temperature ? String(temperature) : undefined,
            turbidity: turbidity ? String(turbidity) : undefined,
            electrical_conductivity: electrical_conductivity ? String(electrical_conductivity) : undefined,
            hardness: hardness ? String(hardness) : undefined,
            alkalinity: alkalinity ? String(alkalinity) : undefined,
            total_dissolved_solids: total_dissolved_solids ? String(total_dissolved_solids) : undefined,
            dissolved_oxygen: dissolved_oxygen ? String(dissolved_oxygen) : undefined,
            biological_oxygen_demand: biological_oxygen_demand ? String(biological_oxygen_demand) : undefined,
            chemical_oxygen_demand: chemical_oxygen_demand ? String(chemical_oxygen_demand) : undefined,
            ammonium: ammonium ? String(ammonium) : undefined,
            chloride: chloride ? String(chloride) : undefined,
            carbonate: carbonate ? String(carbonate) : undefined,
            bicarbonate: bicarbonate ? String(bicarbonate) : undefined,
            sulfate: sulfate ? String(sulfate) : undefined,
            nitrate: nitrate ? String(nitrate) : undefined,
            nitrite: nitrite ? String(nitrite) : undefined,
            fluoride: fluoride ? String(fluoride) : undefined,
            phosphate: phosphate ? String(phosphate) : undefined,
            sodiumion: sodiumion ? String(sodiumion) : undefined,
            calciumion: calciumion ? String(calciumion) : undefined,
            magnesiumion: magnesiumion ? String(magnesiumion) : undefined,
            potassiumion: potassiumion ? String(potassiumion) : undefined,
        };

        // Remove undefined values
        for (let key in entry) {
            if (entry[key] === undefined) {
                delete entry[key];
            }
        }

        for (let key in entry) {
            if(key !== 'state' && key !== 'district' && key !== 'block' && key !== 'location' && key !== 'date') {
                if (isNaN(Number(entry[key]))) {
                    delete entry[key];
                }
            }
            if(key==='latitude' || key==='longitude') {
                if (isNaN(Number(entry[key]))) {
                    return;
                }
            }
        }

        // Skip entries that are empty after removing undefined values
        if (Object.keys(entry).length === 0) {
            return;
        }

        processedData[index] = entry;
    });
    return processedData;
}

// Routes
//Home
app.get("/", (req, res) => res.render("home"));

//About Us
app.get("/about_us", (req, res) => res.render("about_us"));

//Register
app.get("/register", (req, res) => res.render("register", { title: "Register", errors: [] }));

app.post('/register', (req, res) => {
    const { name, email, country, phone, password } = req.body;
    let errors = [];

    if (!name || !email || !country || !password) {
        errors.push({ msg: 'Please fill all required fields.' });
    }

    if (errors.length > 0) {
        res.render('register', { title: 'Register', errors });
    } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = 'INSERT INTO user_table (name, email, country, phone, password) VALUES (?, ?, ?, ?, ?)';

        connection.query(query, [name, email, country, phone, hashedPassword], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    errors.push({ msg: 'Email already registered.' });
                } else {
                    errors.push({ msg: 'Server error.' });
                }
                return res.render('register', { title: 'Register', errors });
            }
            res.redirect('/login');
        });
    }
});

//Login
app.get('/login', (req, res) => res.render('login', { errors: [] }));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    let errors = [];

    if (!email || !password) {
        errors.push({ msg: 'Please fill all required fields.' });
        return res.render('login', { errors });
    }

    const query = 'SELECT * FROM user_table WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            errors.push({ msg: 'Server error.' });
            return res.render('login', { errors });
        }
        if (results.length === 0) {
            errors.push({ msg: 'Invalid email or password.' });
            return res.render('login', { errors });
        }

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            errors.push({ msg: 'Invalid email or password.' });
            return res.render('login', { errors });
        }

        req.session.loggedin = true;
        // req.session.user = user;
        // userdata = user;
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            country: user.country,
            phone: user.phone,
            password: user.password
        };

        userdata = {
            id: user.id,
            name: user.name,
            email: user.email,
            country: user.country,
            phone: user.phone
        };

        res.redirect('/welcome');
    });
});


// Forgot Password - Request OTP
app.get('/forgot_password', (req, res) => {
    res.render('forgot_password', { errors: [] });
});

app.post('/forgot_password', (req, res) => {
    const { email } = req.body;
    const query = 'SELECT * FROM user_table WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.render('forgot_password', { errors: [{ msg: 'Email not found.' }] });
        }

        const user = results[0];
        const otp = generateOTP();
        otpStorage[email] = otp;

        // Send OTP via email
        const mailOptions = {
            from: 'rushformula1@gmail.com',
            to: email,
            subject: 'OTP for Password Reset',
            text: `Your OTP for password reset is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(`Failed to send OTP: ${error}`);
                return res.render('forgot_password', { errors: [{ msg: 'Failed to send OTP.' }] });
            }
            res.render('otp_sent', { email });
        });
    });
});

// Reset Password - Verify OTP and Update Password
app.get('/reset_password', (req, res) => {
    res.render('reset_password', { errors: [], email: req.query.email });
});

app.post('/reset_password', (req, res) => {
    const { email, otp, new_password } = req.body;
    if (otp !== otpStorage[email]) {
        return res.render('reset_password', { errors: [{ msg: 'Invalid OTP.' }], email });
    }

    const hashedPassword = bcrypt.hashSync(new_password, 10);
    const query = 'UPDATE user_table SET password = ? WHERE email = ?';

    connection.query(query, [hashedPassword, email], (err) => {
        if (err) {
            return res.render('reset_password', { errors: [{ msg: 'Failed to reset password.' }], email });
        }
        delete otpStorage[email];
        res.redirect('/login');
    });
});

// Contact Us
app.get('/contact', (req, res) => {
    const successMessage = req.session.successMessage || '';
    req.session.successMessage = ''; // Clear the message after it's displayed
    res.render('contact_us', { successMessage });
});

app.post('/contact', (req, res) => {
    const { name, email, subject, body } = req.body;

    // Email options
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Your email from environment variables
        subject: subject,
        text: `${body}\n\n---\nContacted by:\nName: ${name}\nEmail: ${email}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('An error occurred while sending the email.');
        }
        console.log('Email sent: ' + info.response);

        // Redirect back to the contact page with success message
        req.session.successMessage = 'Your message has been sent successfully!';
        res.redirect('/contact');
    });
});


// FAQ
app.get('/faq', (req, res) => {
    res.render('faq');
});


//Welcome
app.get('/welcome', (req, res) => {
    if (req.session.loggedin) {
        userdata = req.session.user;
        res.render('welcome', { userdata: JSON.stringify(userdata) });
    } else {
        res.redirect('/login');
    }
});

app.post('/welcome', (req, res) => {
    userdata = req.body;
    const { name, email, country, phone } = req.body;
    res.render('welcome', { userdata: JSON.stringify(req.body) });
});


// //Input
// app.get("/input", (req, res) => res.render("input", { userdata: JSON.stringify(userdata) }));

app.get("/input", (req, res) => {
    const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
    res.render("input", { 
        userdata: JSON.stringify(userdata), 
        accessToken: mapboxAccessToken 
    });
});

// My Account
app.get('/my_account', (req, res) => {
    if (req.session.loggedin) {
        const user = req.session.user;
        const query = 'SELECT id, date_time FROM pdf_records WHERE user_id = ? ORDER BY date_time DESC';
        
        connection.query(query, [user.id], (err, results) => {
            if (err) {
                console.error('Error fetching PDF records:', err);
                return res.render('my_account', { userdata: user, records: [], errors: [{ msg: 'Failed to fetch PDF records.' }] });
            }
            res.render('my_account', { userdata: user, records: results });
        });
    } else {
        res.redirect('/login');
    }
});

// Route to view PDF
app.get('/view_pdf/:id', (req, res) => {
    const pdfId = req.params.id;

    const query = 'SELECT file_data FROM pdf_records WHERE id = ?';
    connection.query(query, [pdfId], (err, result) => {
        if (err || result.length === 0) {
            console.error('Error fetching PDF:', err || 'No PDF found');
            return res.status(404).send('PDF not found');
        }

        const pdfData = result[0].file_data;
        res.contentType("application/pdf");
        res.send(pdfData);
    });
});

// Route to download PDF
app.get('/download_pdf/:id', (req, res) => {
    const pdfId = req.params.id;

    const query = 'SELECT file_data, file_path FROM pdf_records WHERE id = ?';
    connection.query(query, [pdfId], (err, result) => {
        if (err || result.length === 0) {
            console.error('Error fetching PDF:', err || 'No PDF found');
            return res.status(404).send('PDF not found');
        }

        const pdfData = result[0].file_data;
        const fileName = result[0].file_path;
        res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
        res.contentType("application/pdf");
        res.send(pdfData);
    });
});

//Update Profile
app.get('/update_profile', (req, res) => {
    if (req.session.loggedin) {
        const userdata = req.session.user;
        res.render('update_profile', { userdata, errors: [] });
    } else {
        res.redirect('/login');
    }
});

app.post('/update_profile', (req, res) => {
    const { name, email, country, phone } = req.body;
    let errors = [];

    if (!name || !email || !country) {
        errors.push({ msg: "Please fill in all fields" });
    }

    if (errors.length > 0) {
        res.render('update_profile', { errors, userdata: req.session.user });
    } else {
        const query = 'UPDATE user_table SET name = ?, email = ?, country = ?, phone = ? WHERE id = ?';
        connection.query(query, [name, email, country, phone, req.session.user.id], (err) => {
            if (err) {
                errors.push({ msg: "Error updating profile" });
                return res.render('update_profile', { errors, userdata: req.session.user });
            }
            req.session.user.name = name;
            req.session.user.email = email;
            req.session.user.country = country;
            req.session.user.phone = phone;
            res.redirect('/my_account');
        });
    }
});

//Change Password
app.get('/change_password', (req, res) => {
    if (req.session.loggedin) {
        res.render('change_password', { errors: [] });
    } else {
        res.redirect('/login');
    }
});

app.post('/change_password', (req, res) => {
    const { current_password, new_password, confirm_password } = req.body;
    let errors = [];

    if (!current_password || !new_password || !confirm_password) {
        errors.push({ msg: "Please fill in all fields" });
    } else if (new_password !== confirm_password) {
        errors.push({ msg: "New passwords do not match" });
    } else if (!bcrypt.compareSync(current_password, req.session.user.password)) {
        errors.push({ msg: "Current password is incorrect" });
    } else if (new_password == current_password) {
        errors.push({ msg: "New password should not match the old password" });
    }

    if (errors.length > 0) {
        res.render('change_password', { errors, userdata: req.session.user });
    } else {
        const hashedPassword = bcrypt.hashSync(new_password, 10);
        const query = 'UPDATE user_table SET password = ? WHERE id = ?';
        connection.query(query, [hashedPassword, req.session.user.id], (err) => {
            if (err) {
                errors.push({ msg: "Error changing password" });
                return res.render('change_password', { errors, userdata: req.session.user });
            }
            res.redirect('/my_account');
        });
    }
});

//Logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.redirect('/welcome');
      }
      res.redirect('/login');
    });
});

// Output Routes
app.get('/output1', async (req, res) => {
    const auth = await authenticateGoogleSheets();
    const spreadsheetsID = "1sAVZkd4xaaDIdiutBRzq51k3GGlcNUv_ZDfxq-JllW0";
    const range = 'Sheet5!A:AD';

    try {
        const result = await auth.spreadsheets.values.get({
            spreadsheetId: spreadsheetsID,
            range: range,
        });

        const rows = result.data.values;
        res.render('output1', { rows });
    } catch (error) {
        console.error('Error retrieving data from Google Sheets:', error);
        res.send('Error retrieving data from Google Sheets');
    }
});

// Updated code by Rushi
function runWorker(locations) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, 'worker.js'), { workerData: locations });
        worker.on('message', resolve);
        worker.on('error', (err) => {
            console.error('Worker error:', err);
            reject(err);
        });
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

// Function to process large datasets
async function processLargeDataset(locations) {
    const chunkSize = 200;
    const chunks = [];
    
    for (let i = 0; i < locations.length; i++) {
        chunks.push({ lat: locations[i].lat, lon: locations[i].lon, key: locations[i].key });
        if ((i + 1) % chunkSize === 0 || i === locations.length - 1) {
            // Process each chunk in parallel with workers
        }
    }

    const workers = [];
    for (let i = 0; i < locations.length; i += chunkSize) {
        const chunk = locations.slice(i, i + chunkSize).map((loc, index) => ({
            lat: loc.lat,
            lon: loc.lon,
            key: loc.key || i + index
        }));
        workers.push(runWorker(chunk));
    }

    const results = await Promise.all(workers);

    return results.flat();
}

// Batch reverse geocoding endpoint
app.post('/reverse-geocode', async (req, res) => {
    const locations = req.body.locations; // Expecting an array of { lat, lon, key }

    if (!locations || !Array.isArray(locations)) {
        return res.status(400).json({ error: 'Invalid locations format' });
    }

    try {
        const addresses = await processLargeDataset(locations);
        res.json({ addresses });
    } catch (error) {
        console.error('Error processing reverse geocode:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/reverse-geocode', async (req, res) => {
//     const { lat, lon } = req.query;
//     try {
//         const data = await fetchWithRetry(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`, { timeout: 20000 }, 3);
//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching reverse geocode:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


app.post('/output', async (req, res) => {
    await handlePostRequest(req, res, 'output');
});

app.post('/output2', async (req, res) => {
    await handlePostRequest(req, res, 'output2');
});

app.post('/output3', async (req, res) => {
    await handlePostRequest(req, res, 'output3');
});

app.post('/upload_pdf', upload.single('pdf'), (req, res) => {
    if (!req.session.loggedin) {
        console.log('Unauthorized access attempt');
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = req.session.user;
    const { originalname, buffer } = req.file;
    const date = new Date();

    const query = 'INSERT INTO pdf_records (user_id, file_path, date_time, file_data) VALUES (?, ?, ?, ?)';

    connection.query(query, [user.id, originalname, date, buffer], (err, result) => {
        if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).json({ success: false, message: 'Database insertion error' });
        }

        console.log('PDF uploaded and stored in database successfully');
        res.status(200).json({ success: true, message: 'PDF uploaded successfully' });
    });
});

app.post('/analyse_excel', upload.single('excelFile'), async (req, res) => {
    const { analysisType } = req.body;
    const excelBuffer = req.file.buffer;

    try {
        const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        const data = await processExcelData(sheet);
        // console.log('Processed Data:', data); // Debugging log

        req.body = data;
        // console.log(data);
        if (analysisType === 'water') {
            return await handlePostRequestAnalyse(req, res, 'output2');
        } else if (analysisType === 'irrigation') {
            return await handlePostRequestAnalyse(req, res, 'output3');
        } else if (analysisType === 'both') {
            return await handlePostRequestAnalyse(req, res, 'output');
        } else {
            return res.status(400).send('Invalid analysis type');
        }
    } catch (error) {
        console.error('Failed to process the Excel file:', error);
        res.status(500).send('Server error processing the Excel file.');
    }
});


// Start Server
app.listen(port, () => {
    console.log(`TTT Running at http://localhost:${port}`);
});
