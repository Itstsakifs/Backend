const {Sequelize, DataTypes} = require('sequelize');
const sequilize = require('../config/db');
const bcrypt = require('bcrypt');

const user = sequilize.define('user', {
    id:{
        field           :"id",
        type            :DataTypes.INTEGER,
        primaryKey      : true,
        autoIncrement   : true,
        allowNull       : false
    },
    nama_lengkap:{
        field       :"nama_lengkap",
        type        : DataTypes.STRING,
        allowNull   :false
    },
    email:{
        field       :"email",
        type        : DataTypes.STRING,
        allowNull   : false,
    },
    password:{
        field       :"password",
        type        : DataTypes.STRING,
        allowNull   :false
    },
    no_telepon:{
        field       :"no_telepon",
        type        : DataTypes.INTEGER,
        allowNull   :false
    },
    
},{
    tableName: "user",
    freezeTableName:true,
});

// Hook beforeCreate untuk mengenkripsi password sebelum disimpan ke database
// user.beforeCreate(async (user) => {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//     user.password = hashedPassword;
// });

// Fungsi untuk memvalidasi password
// user.prototype.validatePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

// hook beforUpdate untuk mengenkripsi password baru sebelum di update
// user.beforeUpdate(async (user) => {
//     if (user.changed('password')) {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//     user.password = hashedPassword;
//     }
// });

module.exports= user;
