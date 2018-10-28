/* eslint-disable no-use-before-define */

'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = suquelize.define('User', {
        userName: {
            type: DataType.STRING,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataType.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataType.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataType.STRING,
            allowNull: true,
            get() {
                return this.getDataValue('firstName') 
                    + ' ' 
                    + this.getDataValue('lastName');
            }
        },
        email: { // Contant Address
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        service: { // Serive Hours
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        super_user: { // Admin users - TODO: This is dumb role administration, need to implement Role authentication
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

    }, {
        // All autocreated table names will be underscored, not camel case
        underscored: true,
    });

    User.associate = (models) => {
        // Associations are defined here
        models.User.belongsToMany(models.Event, {
            as: 'user_id',
            through: models.Attendance,
        });
    };

    /**
     * Generate password hash - returns promise of hash
     * @param password - the plaintext password to be hashed
     * @return promise function(hash) = password hash
     */
    User.generatePasswordHash = (password) => {
        return bcrypt.hash(password, saltRounds);
    };

    /**
     * Compare password hash - returns promise of result
     * @param password - the plaintext password to be compared
     * @param user - the user to compare the hashed password to
     * @return promise function(res) = true/false
     */
    User.comparePassword = (password, user) => {
        return bcrypt.compare(password, user.password);
    };

  return User;
};