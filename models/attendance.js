/* eslint-disable no-use-before-define */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */ // Needed for sequelize
/* http://docs.sequelizejs.com/manual/tutorial/associations.html#belongs-to-many-associations */

'use strict'; 

module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('Attendance', {
        // This also has references to an event and a user - auto added as part of
        // the association process in the event and user model definitions
        // They are:
        // event_id - int(11)
        // user_id - int(11)
    }, {
        // set so that all autocreated table names are underscored instead of camel cased
        underscored: true,
        hooks: {
            afterCreate: (attendance /* , options */) => {
                // afterCreate only cares to add the event to the appropriate columns because there is
                // no previous data to remove
                // this code is very simple to beforeDestroy hook
                if (attendance.status === Attendance.getStatusUnconfirmed()) {
                // No action needed. Resolve with empty promise for consistent return value
                return Promise.resolve();
                }
                const eventPromise = sequelize.models.Event.findById(attendance.event_id);

                const userPromise = sequelize.models.User.findById(attendance.user_id);

                return Promise.all([eventPromise, userPromise]).then((output) => {
                    const event = output[0];
                    const user = output[1];

                    const length = event.end_time - event.start_time;
                    return user.update({
                        service: user.service + length,
                    });
                });
            },
            afterUpdate: (attendance /* , options */) => {
                const eventPromise = sequelize.models.Event.findById(attendance.event_id);

                const userPromise = sequelize.models.User.findById(attendance.user_id);

                return Promise.all([eventPromise, userPromise]).then((output) => {
                    const event = output[0];
                    const user = output[1];

                    const length = event.end_time - event.start_time;
                    return user.update({
                        service: user.service + length,
                    });
                }); 
            },
            beforeDestroy: (attendance /* , options */) => {
                const eventPromise = sequelize.models.Event.findById(attendance.event_id);

                const memberPromise = sequelize.models.Member.findById(attendance.member_id);

                return Promise.all([eventPromise, memberPromise]).then((output) => {
                    const event = output[0];
                    const member = output[1];
                    
                    const length = event.end_time - event.start_time;
                    return member.update({
                        service: member.service - length,
                    });
                });
            },
            beforeBulkCreate: (instances, options) => {
                // call individual hooks for each created record
                options.individualHooks = true;
            },
            beforeBulkUpdate: (options) => {
                // call individual hooks for each record updated
                options.individualHooks = true;
            },
            beforeBulkDestroy: (options) => {
                // call individual hooks for each record destroyed
                options.individualHooks = true;
            },

        },
    });

    Attendance.associate = (/* models */) => {
        // associations can be defined here
    };

    return Attendance;
};