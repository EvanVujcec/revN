/* eslint-disable no-use-before-define */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */ // Needed for sequelize
/* http://docs.sequelizejs.com/manual/tutorial/associations.html#belongs-to-many-associations */

'use strict'; 

module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
        longitude: {
            type: DataTypes.FLOAT(10,6),
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT(10,6),
            allowNull: false,
        },
    }, {
        // set so that all autocreated table names are underscored instead of camel cased
        underscored: true,
    });

    Location.associate = (/* models */) => {
        // associations can be defined here
    };

    return Location;
};