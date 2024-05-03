// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const { saveRegistration, getRegistrations } = require('./db'); // Import saveRegistration and getRegistrations functions from db.js

// Create an Express application
const app = express();

// Set up middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Generate random ID transaksi
const generateRandomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    let result = 'IDTRX';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Inside the route handler for rendering the index page
app.get('/', (req, res) => {
    res.render('index', { helpers: { generateRandomID: generateRandomID } }); // Pass the function in an object
});

// Serve the admin login page
app.get('/admin/login', (req, res) => {
    res.render('adminLogin');
});

// Handle admin login form submission
app.post('/admin', (req, res) => {
    const { username, password } = req.body;
    // Check if username and password are correct (this is just a placeholder)
    if (username === 'admin' && password === 'adminpassword') {
        // Redirect to admin panel on successful login
        res.redirect('/admin/panel');
    } else {
        // Redirect back to login page with error message
        res.redirect('/admin/login?error=1');
    }
});

// Serve the admin panel page
app.get('/admin/panel', (req, res) => {
    // Fetch the latest registration data from the database
    getRegistrations((err, registrations) => {
        if (err) {
            console.error('Error fetching registrations:', err);
            res.status(500).send('Error fetching registrations');
            return;
        }
        // Render the admin panel page with the fetched registration data
        res.render('adminPanel', { registrations });
    });
});

// Handle admin logout
app.get('/admin/logout', (req, res) => {
    // Redirect to admin login page after logout
    res.redirect('/admin/login');
});

// Handle form submission
app.post('/submit', (req, res) => {
    // Extract form data
    const { id_transaksi, nama, alamat, no_hp, kode_makanan, jumlah_beli, total_bayar, bayar, kembalian } = req.body;

    // Save registration to the database
    saveRegistration(req.body, (err, result) => {
        if (err) {
            console.error('Gagal menyimpan!:', err);
            res.status(500).send('Gagal menyimpan!');
            return;
        }
        // Send success response
        console.log('Form telah terkirim!');
        res.send('Form sukses disimpan!');
    });
});

// Start the server
const PORT = process.env.PORT || 99;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
