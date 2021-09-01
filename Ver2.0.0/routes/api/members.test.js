'use strict';

const request = require('supertest');
const members = require('./members');

describe('Test the members service', () => {
    test('GET /members succeeds', () => {
        return request(members)
        .get('/')
        .expect(200);
    });

    test('GET /members returns JSON', () => {
        return request(members)
        .get('/')
        .expect('Content-type', /json/);
    });

    test('GET /members includes Timmy', () => {
        return request(members)
        .get('/')
        .expect(/Timmy/);
    });

    test('GET /members/1 succeeds', () => {
        return request(members)
        .get('/1')
        .expect(200);
    });

    test('GET /members/12 fails', () => {
        return request(members)
        .get('/12')
        .expect(404);
    });

    test('GET /members/1 returns JSON', () => {
        return request(members)
        .get('/')
        .expect('Content-type', /json/);
    });

    test('GET /members/1 Timmy', () => {
        return request(members)
        .get('/')
        .expect(/Timmy/);
    });

    test('GET /members/name/Timmy succeeds', () => {
        return request(members)
        .get('/name/Timmy')
        .expect(200);
    });

    test('GET /members/name/Tmmy fails', () => {
        return request(members)
        .get('/name/Tmmy')
        .expect(404);
    });

    test('GET /members/email/timmy@gmail.com succeeds', () => {
        return request(members)
        .get('/email/timmy@gmail.com')
        .expect(200);
    });

    test('GET /members/email/timmy@yahoo.com fails', () => {
        return request(members)
        .get('/email/timmy@yahoo.com')
        .expect(404);
    });

    test('POST /members succeeds', () => {
        const newMember = {
            id: 11,
            name: 'Fred',
            email: 'fred@gmail.com',
            favRocket: 'Falcon 9'
        };
        return request(members)
        .post('/')
        .send(newMember)
        .expect(201);
    });

    test('POST /members fails', () => {
        const newMember = {
            name: 'Jim',
            email: 'jim@gmail.com',
            favRocket: 'Falcon 9'
        };
        return request(members)
        .post('/')
        .send(newMember)
        .expect(400);
    });

    test('DELETE /members/1 succeeds', () => {
        return request(members)
        .delete('/1')
        .expect(201);
    });

    test('GET /members/fav/Falcon 9 succeed', () => {
        return request(members)
        .get('/fav/Falcon 9')
        .expect(200);
    });

    test('GET /members/fav/Falcon 8 fails successfully', () => {
        return request(members)
        .get('/fav/Falcon 8')
        .expect(200);
    });

    test('PATCH /members/1 succeeds', () => {
        const newMember = {
            id: 1,
            name: 'Timothy',
            email: 'Timothy@gmail.com',
            favRocket: 'Falcon 9'
        };
        return request(members)
        .post('/')
        .send(newMember)
        .expect(200);
    });
});
