const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // User মডেলে একটি নতুন ফিল্ড
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user' // ডিফল্ট হিসেবে 'user' থাকবে
        }
    });

    return User;
};