/**
 * For the definition of functions used across tests
 */
process.env.NODE_ENV = 'test';
const models = require('../models');

// Clear Database
const clearDatabase = () => {
    return models.sequelize.sync().then(() => {
        return models.Event.destroy({
            where: {},
        }).then(() => {
            return models.User.destroy({
                where: {},
            }).then(() => {
                return models.Organization.destroy({
                    where: {},
                }).then(() => {
                    return models.Attendance.destroy({
                        where: {},
                    }).then(() => {
                        return models.Location.destroy({
                            where: {},
                        });
                    });
                });
            });
        });
    });
};
exports.clearDatabase = clearDatabase;

const getNormalUserEmail = () => {
    return 'normal@uc.mail.edu';
};
exports.getNormalUserEmail = getNormalUserEmail;

const getSuperUserEmail  = () => {
    return 'super@uc.mail.edu';
};
exports.getSuperUserEmail  = getSuperUserEmail;

/**
 * Creates a normal user
 */
const createNormalUser = () => {
    return models.Member.generatePasswordHash('password').then((passwordHash) => {
        return models.Member.create({
        email: getNormalUserEmail(),
        password: passwordHash,
        super_user: false,
        firstName: 'Bobby',
        lastName: 'Bearcat'
        });
    });
};
exports.createNormalUser = createNormalUser;

/**
 * Creates a super user
 */
const createSuperUser = () => {
    return models.Member.generatePasswordHash('password').then((passwordHash) => {
        return models.Member.create({
        email: getSuperUserEmail(),
        password: passwordHash,
        super_user: true,
        firstName: 'Super',
        lastName: 'Bearcat'
        });
    });
};
exports.createSuperUser = createSuperUser;

/**
 * Creates a normal user and signs them in, creating a user session
 * @param {*} member - the member to create a session for
 * @param {*} agent - superagent instance to log in
 */
const createUserSession = (member, agent) => {
    return agent
      .post('/login')
      .send({
        email: member.email,
        password: 'password',
      })
      .redirects(1)
      .expect(200);
};
exports.createUserSession = createUserSession;

/**
 * get standard length of event
 */
const getEventLength = () => {
    // Events are one hour long
    return 3600000;
};
exports.getEventLength = getEventLength;

/**
 * create a location
 */
const getLocation = () => {
    return models.Location.create({
        longitude: 84.51927,
        latitude: 19.11826,
    });
};
exports.getLocation = getLocation;

/**
 * Create an organization
 */
const createOrganization = () => {
    return models.Organization.create({
        name: 'ACM-W',
        email: 'acmw@mail.uc.edu',
        link: 'https://acmwuc.org',
    });
};
exports.createOrganization = createOrganization;

/**
 * Add a user to an organization
 */
const addOrganizationMember = (user, organization) => {
    return models.userOrganization.create({
        user_id: user.id,
        organization_id: organization.id,
    });
};
exports.addOrganizationMember = addOrganizationMember;

/**
 * Add a owner to an organization
 */
const addOrganizationOwner = (user, organization) => {
    return models.userOrganization.create({
        user_id: user.id,
        organization_id: organization.id,
        owner: true,
    });
};
exports.addOrganizationOwner = addOrganizationOwner;


/**
 * Add a officer to an organization
 */
const addOrganizationOfficer = (user, organization) => {
    return models.userOrganization.create({
        user_id: user.id,
        organization_id: organization.id,
        officer: true,
    });
};
exports.addOrganizationOfficer = addOrganizationOfficer;

/**
 * Create an event
 */
const createEvent = () => {
    // create date and set it 1 hour in the future
    const date = Date.now() + getEventLength();
    return models.Event.create({
        title: 'Test Meeting',
        start_time: date,
        end_time: date + getEventLength(),
        location: getLocation(),
        description: 'Describe this test of volunteering.'
    });
};
exports.createEvent = createEvent;


