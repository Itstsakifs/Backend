const User = require('../models/user');
const bcrypt = require('bcrypt');


controller = {};

controller.getAll = async (req, res) => {
    try {
    const users = await User.findAll();
    res.status(200).json({
        success: true,
        message: 'Berhasil mengambil data user',
        data: users,
});
    } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Gagal mengambil data user',
        error: error.message,
    });
    }
};

controller.getID =  async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User tidak ditemukan',
        });
    }
    res.status(200).json({
        success: true,
        message: 'Berhasil mendapatkan data user',
        data: user,
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Gagal mendapatkan data user',
        error: error.message,
    });
    }
};

controller.create = async (req, res) => {
    try {
        const { nama_lengkap,email, password, no_telepon } = req.body;
        const saltRounds = 10;
        const hashPW = await bcrypt.hash(req.body.password, saltRounds);

      //masukin data ke database
        const newUser = await User.create({
        nama_lengkap: req.body.nama_lengkap,
        email: email,
        password: hashPW,
        no_telepon:no_telepon
    });

    res.status(200).json({
        success: true,
        message: 'User berhasil ditambahkan',
        data: newUser,
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Gagal menambahkan user',
        error: error.message,
    });
    }
};

controller.update = async (req, res) => {
    try {
        const saltRounds = 10;
        const hashPW = await bcrypt.hash(req.body.password, saltRounds);
        const [updatedRows] = await User.update({
            nama_lengkap: req.body.nama_lengkap,
            email: req.body.email,
            password: hashPW,
            no_telepon:req.body.no_telepon
        }, {
        where: {
            id: req.params.id,
        },
        });
        if (updatedRows === 0) {
        return res.status(404).json({
            success: false,
            message: 'User tidak ditemukan',
        });
        }
        
    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).json({
        success: true,
        message: 'User berhasil diupdate',
        data: updatedUser,
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Gagal mengupdate user',
        error: error.message,
    });
    }
};

controller.delete = async (req, res) => {
    try {
            const deletedUser = await User.findByPk(req.params.id);
    if (!deletedUser) {
        return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan',
        });
    }
    await User.destroy({
        where: {
            id: req.params.id,
    },
    });
    res.status(200).json({
        success: true,
        message: 'User berhasil dihapus',
        data: deletedUser,
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: 'Gagal menghapus user',
        error: error.message,
    });
}
}

module.exports = controller;