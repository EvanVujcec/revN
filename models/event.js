/* event.js - Defines an event with what, where, why, when */

/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */ // Needed for sequelize
/* eslint no-param-reassign: ["error", { "props": false }] */

'use strict';

module.exports = (sequlize, DataTypes) => {
    const Event = sequlize.define('Event'), {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,

        },

    }
}