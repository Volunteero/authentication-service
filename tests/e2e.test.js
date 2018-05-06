const { expect } = require('chai');
const faker = require('faker');
const fetch = require('node-fetch');
const baseUrl = 'https://seprapi.prtl.fyi';
const password = '123qwe!@#QWE';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const wait = () => {
    return new Promise((res,rej) => setTimeout(() => {
        res();
    }, faker.random.number({min: 20, max: 250})));
}
const registerUser = () => {
    const body = {
        password,
        username: faker.internet.email(),
    };
    return fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
    }).then(response => {

        expect(response.status).eql(201);
        return body;
    });
}
const registerAndLogin = async () => {

    const body = await registerUser();
    return fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
    }).then(response => {

        expect(response.status).eql(200);
        return response.headers.get('set-cookie');
    });
}
describe('End to end API testing', function () {

    it('should create a new user', function () {

        return fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({
                username: faker.internet.email(),
            }),
            headers
        }).then(response => {

            expect(response.status).eql(201);
            return response.json();
        }).then(response => {

            expect(response.success).eql(true);
        });

    });

    it('should give bad input on register', function () {

        return fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers
        }).then(response => {

            expect(response.status).eql(400);
            return response.json();
        }).then(response => {

            expect(response.code).eql('BadParameterException');
        });

    });

    it('should login', async function () {

        const body = await registerUser();
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers
        });
        expect(response.status).eql(200);
        const parsed = await response.json(); 
        expect(parsed.success).eql(true);

    });

    it('should logout', async function () {

        await wait();
    });

    it('should check for logged in', async function () {

        await wait();
    });

    it('should create a post', async function () {

        await wait();
    });

    it('should give unauthorized if not logged in and creating new post', async function () {

        await wait();
    });

    it('should validate input', async function () {

        await wait();
    });

    it('should sanitize input', async function () {

        await wait();
    });
    
    it('should delete posts', async function () {

        await wait();
    });

    it('should give unauthorized if not logged in and deleting new post', async function () {

        await wait();
    });

    it('should update posts', async function () {

        await wait();
    });

    it('should list posts', async function () {

        await wait();
    });

    it('should list posts with filter', async function () {

        await wait();
    });

    it('should list posts with admin in query', async function () {

        await wait();
    });

    it('should list posts with username', async function () {

        await wait();
    });

});