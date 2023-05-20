const Sequelize = require("sequelize");

//get data database dari config json
const config = require('./config.json')[process.env.NODE_ENV || 'development'];

//koneksi database
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false
});

//tes koneksi apakah berjalan?
try {
    sequelize.authenticate();
    console.log('koneksi berhasil');
} catch (error) {
    console.log('unble to connect:', error);
}

module.exports = sequelize;
