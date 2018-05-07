const {
    expect
} = require('chai');
const faker = require('faker');
const fetch = require('node-fetch');
// const baseUrl = 'https://seprapi.prtl.fyi';
const baseUrl = 'http://localhost:3000';
const password = '123qwe!@#QWE';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const wait = () => {
    return new Promise((res, rej) => setTimeout(() => {
        res();
    }, faker.random.number({
        min: 20,
        max: 250
    })));
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

const prln = () => {
    console.log('----------------------------');
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

const internalRequest = (resource, action, body) => {

    return fetch(`${baseUrl}/internal/${resource}/${action}?accessKey=root&secretAccessKey=password`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
    }).then(r => r.json());
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

    it.only('should test the acl', async function () {

        console.log('Creating user');
        const {
            username
        } = await internalRequest('users', 'create', {
            username: faker.random.uuid()
        });
        console.log(`Created user ${username}`);

        prln();
        console.log('Creating role');
        const createRoleResult = await internalRequest('roles', 'create', {
            roleName: faker.random.uuid(),
            resources: ['test1'],
            actions: ['demo1']
        });
        const roleName = createRoleResult.roleName;
        console.log(`Created role`);
        console.log(createRoleResult);

        prln();
        console.log('Adding permissions to role');
        const updateRoleResult = await internalRequest('roles', 'addPermissions', {
            roleName,
            resources: ['test2'],
            actions: ['demo2']
        });
        console.log(`Updated role`);
        console.log(updateRoleResult);

        prln();
        console.log('Get role permissions');
        const getRolePermissionsResult = await internalRequest('roles', 'getPermissions', {
            roleName,
        });
        console.log(`Got role permissions`);
        console.log(getRolePermissionsResult);

        prln();
        console.log('Attaching role to user');
        const attachRoleToUserResult = await internalRequest('users', 'attachRoles', {
            username,
            roles: [roleName]
        });
        console.log(`Attached role to user`);
        console.log(attachRoleToUserResult);

        prln();
        console.log('Getting attached roles');
        const getAttachedRolesForUserResult = await internalRequest('users', 'getRoles', {
            username
        });
        console.log(`Got attached roles`);
        console.log(getAttachedRolesForUserResult);

        prln();
        console.log('Removing role permissions');
        const removeRolePermissionsResult = await internalRequest('roles', 'removePermissions', {
            roleName,
            resources: ['test1'],
            actions: ['demo1']
        });
        console.log(`Removed role permissions`);
        console.log(removeRolePermissionsResult);

        prln();
        console.log('Get role permissions');
        const getRolePermissionsResult2 = await internalRequest('roles', 'getPermissions', {
            roleName,
        });
        console.log(`Got role permissions`);
        console.log(getRolePermissionsResult2);

        prln();
        console.log('Detach role from user');
        const detachRoleFromUserResult = await internalRequest('users', 'detachRoles', {
            username,
            roles: [roleName],
        });
        console.log(`Detached role from user`);
        console.log(detachRoleFromUserResult);

        prln();
        console.log('Getting attached roles');
        const getAttachedRolesForUserResult2 = await internalRequest('users', 'getRoles', {
            username
        });
        console.log(`Got attached roles`);
        console.log(getAttachedRolesForUserResult2);
        return;
    });
});