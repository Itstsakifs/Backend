const bcrypt = require('bcrypt');
const User = require('../models/user');
const express = require('express');
const { error } = require('cli');
const app = express.Router();
const jwt = require('jsonwebtoken');

//Menggunakan Bcrypt
app.post('/', async (req, res) => {
  const body = req.body
    const PW = body.password
    // const PW    = 'passwordToHash';
    // const users = '$2a$10$NpI.KW148NcDRh0V.PkHhu8c.UmKX25T4ah4M5O1eyD8TC.Z.Kutq';
    try {

    const users = await User.findOne({ where: { email: body.email } });
      if(!users){
        // pengguna not found
        return res.status(404).json({
          message: 'User not found' 
        });
      };
          const ValidUsers = await bcrypt.compareSync(PW, users.password);
          const as = users.password
        if (!ValidUsers) {
          // Password tidak cocok
          return res.status(401).json({ 
            message: 'Password Salah',
            PW,
            as
          });
        } else {
          // Password cocok

          //  Membuat token JWT
          const token = jwt.sign({ userId: users.id }, 'your_secret_key');

    // Mengirim respon dengan token JWT
        return res.status(200).json({ 
          msg: 'Berhasil Login',
          token
        });
        };
    } catch (err) {
        // Penanganan kesalahan
        console.error(err);
        res.status(500).send('Terjadi kesalahan');
    }
    // }
});

app.post('/as', async (req, res) => {
  const body = req.body
  const PW = body.password
  // const PW    = 'passwordToHash';
  // const users = '$2a$10$NpI.KW148NcDRh0V.PkHhu8c.UmKX25T4ah4M5O1eyD8TC.Z.Kutq';
  try {

  const users = await User.findOne({ where: { email: req.body.email } });
    if(!users){
      // pengguna not found
      return res.status(404).json({ message: 'User not found' });
    }
      if (users.password !== PW) {
        // Password tidak cocok
        return res.status(401).json({ 
          message: 'Password Salah',
          PW,
          as
        });
      } else {
        // Password cocok

        //  Membuat token JWT
        const token = jwt.sign({ userId: users.id }, 'your_secret_key');
        // jika ingin menambah kadelwarsa
        // const token = jwt.sign({ userId: 123 }, 'your_secret_key', { expiresIn: '1h' }); 
  // Mengirim respon dengan token JWT
      // res.send('Berhasillogin',{token});
      return res.status(200).json({ 
        msg: 'Berhasil Login',
        token
      });
      };
  } catch (err) {
      // Penanganan kesalahan
      console.error(err);
      res.status(500).send('Terjadi kesalahan');
  }
  // }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.findOne({ where: { email: req.body.email } });

    if (!users) {
      // Pengguna tidak ditemukan
      return res.status(404).json({
        success: false,
        message: 'Email tidak ditemukan',
      });
    }

    const passwordMatch = await bcrypt.compare(password, users.password);

    if (passwordMatch) {
      // Password cocok
      return res.status(200).json({
        success: true,
        message: 'Berhasil login',
      });
    } else {
      // Password tidak cocok
      return res.status(401).json({
        success: false,
        message: 'Password salah',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan',
      error: error.message,
    });
  }
});

module.exports = app;
