/**
 * Tests for the event endpoints and functions
 */
/* eslint-disable no-undef */
// Immediately set environment to test
process.env.NODE_ENV = 'test';
const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');
const models = require('../models');
const common = require('./common');

describe('Event Tests', () => {
    before((done) => {
        done();
    });

    after((done) => {
        common.clearDatabase().then(() => {
            done();
        });
    });

    beforeEach((done) => {
        common.clearDatabase().then(() => {
            done();
        });
    });

    // GET create - while not signed in - non-users cannot see
    it('GET create not signed in', (done) => {
        request.agent(app)
            .get('/event/create')
            .redirects(1)
            .expect(401, done);
    });

    // Cannot post to create when not a super user - will redirect to '/'
    it('POST create not signed in', (done) => {
        request.agent(app)
            .post('/event/create')
            .redirects(1)
            .expect(401, done);
    });

    // GET event listing page
    it('GET event list page', () => {
        // Create an event and a meeting, so that we may know there aren't any problems with the queries
        return common.createEvent.then(() => {
            return request.agent(app)
            .get('/event')
            .expect(200);
        });
    });

    // GET event that has just been created
    it('GET event details page', () => {
        return common.createEvent().then((event) => {
            return request.agent(app)
                .get(`/event/${event.id}`)
                .expect(200);
        });
    });

    // GET event page for event that does not exist
    // event ids are numerical, so `fake` should not return an event
    it('GET nonexistent event details', (done) => {
        request.agent(app)
            .get('/event/-1')
            .redirects(1)
            .expect(404, done);
    });
    


});