const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

con={};

con.login = async (req, res) => {
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
            message: 'Password Salah'
            });
        } else {
            // Password cocok

            //  Membuat token JWT
            const token = jwt.sign({ user: users }, 'your_secret_key');

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

};

module.exports = con;