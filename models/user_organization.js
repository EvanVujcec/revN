/* eslint-disable no-use-before-define */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */ // Needed for sequelize
/* http://docs.sequelizejs.com/manual/tutorial/associations.html#belongs-to-many-associations */

'use strict'; 

module.exports = (sequelize, DataTypes) => {
    const UserOrganization = sequelize.define('UserOrganization', {
        owner: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        officer: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        // This also has references to an organization and a user - auto added as part of
        // the association process in the organization and user model definitions
        // They are:
        // organization_id - int(11)
        // user_id - int(11)
    }, {
        // set so that all autocreated table names are underscored instead of camel cased
        underscored: true,
    });

    UserOrganization.associate = (/* models */) => {
        // associations can be defined here
    };

    return UserOrganization;
};