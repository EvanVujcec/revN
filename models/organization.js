/* eslint-disable no-use-before-define */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */ // Needed for sequelize
/* http://docs.sequelizejs.com/manual/tutorial/associations.html#belongs-to-many-associations */

'use strict'; 

module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
        name :{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'example@mail.org',
        },
        link: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: 'https://acmwuc.org',
        },
    }, {
        // set so that all autocreated table names are underscored instead of camel cased
        underscored: true,
    });

    Organization.associate = (models) => {
        // associationsmode can be defined here
        models.Organization.hasMany(models.User, {
            as: 'organization_id',
            through: models.UserOrganization
        })
        
    };

    return Organization;
};