const bcrypt = require('bcrypt');
const User = require('../models/user');
const express = require('express');
const { error } = require('cli');
const app = express.Router();


app.post('/', async (req, res) => {
    // const PW = req.body.password; // Ganti dengan password sebenarnya yang ingin dibandingkan
    const PW = "as"; // Ganti dengan password sebenarnya yang ingin dibandingkan
    // const users = await User.findOne({ where: { email: req.body.email } });
    const users = "$2b$10$NmWKMWZ/QZWspSO4RDg.hu6GiGY8aK08fItEUvlth0k";

    // if (!users) {
    //   // Pengguna tidak ditemukan
    // res.send('Email Tidak di temukan');
    // } else {
    try {
        const result = await bcrypt.compare(PW, users);
        if (result) {
          // Password cocok
        res.send('Berhasil login');
        } else {
          // Password tidak cocok
        res.send('Password salah');
        }
    } catch (err) {
        // Penanganan kesalahan
        console.error(err);
        res.status(500).send('Terjadi kesalahan');
    }
    // }
});

app.post('/as', async (req, res) => {
    const userPassword = req.body.password ; // Ganti dengan password sebenarnya yang ingin dibandingkan
    const pengguna = await User.findOne({ where: {email: req.body.email}});
    res.json(pengguna)
    
});

app.get('/as2', (req, res) => {
    const userPassword = 'as' ; // Ganti dengan password sebenarnya yang ingin dibandingkan
    const hash = '$2b$10$5BT5snl2RWJcAcZuUu.OVeQhy1UzMeljaJJog6ZfZmH';

bcrypt.compare(userPassword, hash, (err, result) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      if (result) {
        // Password cocok
        res.send('Berhasil login');
      } else {
        // Password tidak cocok
        res.send('Gagal login');
      }
    }
  });
});

module.exports = app;
