// db.js
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with MySQL connection details
const sequelize = new Sequelize('db_cafe', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Registration model
const Registration = sequelize.define('Registration', {
  id_transaksi: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  no_hp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kode_makanan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jumlah_beli: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_bayar: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false // Disable timestamps
});

// Function to save user registration
const saveRegistration = (registrationData, callback) => {
  Registration.create(registrationData)
    .then((registration) => {
      console.log('Registration saved successfully');
      callback(null, registration);
    })
    .catch((err) => {
      console.error('Error saving registration:', err);
      callback(err);
    });
};

// Function to get all registrations
const getRegistrations = (callback) => {
  Registration.findAll()
    .then((registrations) => {
      callback(null, registrations);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = {
  saveRegistration,
  getRegistrations,
  Registration // Export the Registration model for use in other files
};