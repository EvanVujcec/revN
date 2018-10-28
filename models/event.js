/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */ // Needed for sequelize
/* eslint no-param-reassign: ["error", { "props": false }] */

'use strict';

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
        },
        // timeGrace: { // Time (in seconds) after endTime that a check-out will still be accepted. NOT IMPLMENTED
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     defaultValue: 900 // 15 minutes
        // },
        qrSalt: {
            type: DataTypes.UUIDV4, //Uato Generated UUID
            allowNull: false,
        },
    } , {
        // All autocreated table names will be underscored, not camelcase
        underscored: true,
        hooks: {
            beforeDestroy: (event) => {
                // Need to destroy all Attendance references if a event is removed
                return sequelize.models.Attendance.findAll({
                    where: {
                        event_id: event.id,
                    },
                }).then((attendances) => {
                    const promises = [];
                    for (let i = 0; i < attendances.length; i += 1) {
                        promises.push(atendances[i].destroy());
                    }
                    return Promise.all(promises);
                });
            },
            afterUpdate: (event) => {
                const lengthChange = (event.endTime - event.startTime)
                    - (event._previousDataValues.endTime - event._previousDataValues.startTime);

                if ( lengthChange === 0) {
                    // no time change, no (need to update
                    return Promise.resolve();
                }
                
                return sequelize.models.Attendance.findAll({
                    where: {
                        event_id: event.id,
                    },
                }).then((attendances) => {
                    const promises = [];
                    for (let i = 0; i < attendances.length; i += 1) {
                        promises.push(sequelize.models.User.findById(attendances[i].user_id));
                    }

                    return Promise.all(promises).then((output) => {
                        const returns = [];
                        // Attendance record verifys that a user did check in.
                        for(let i = 0; i < output.length; i += 1) {
                            returns.push(output[i].update({
                                service: output[i].service + lengthChange,
                            }));
                        }

                        return Promise.all(returns);
                    });
                });
            },
            // beforeDestroy: - this is handled by cascading deletes and ensuring hooks are called
            // see options in Event.associate()
            beforeBulkDestroy: (options) => {
                // make it so that individual hooks are called for each destroyed row
                options.individualHooks = true;
            },
            beforeBulkUpdate: (options) => {
                // call beforeUpdate for each individual record
                options.individualHooks = true;
            },
        },
    });

    Event.associate = (models) => {
        // associations are defined here
        models.Event.belongsToMany(models.User, {
            as: 'event_id',
            through: models.Attendance,
            hooks: true,
        });
        //location_id - id of the location the event is to be held in
        models.Event.hasOne( models.Location, { foreignKey: 'location_id'});
        // created_by - id of the user who created the event
        models.Event.belongsTo(models.User, { foreignKey: 'created_by'});
    };

    return Event;
};