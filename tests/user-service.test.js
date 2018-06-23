'use strict';
const chai = require('chai');
const assert = chai.assert;
const UserService = require('../src/utils/user-serice');
const fetch = require('node-fetch');
const uid = require('uid');

describe.only('User Service Testing', () => {
  let username = '';

  it('Should use fetch by default', () => {
    const us = new UserService();
    assert.equal(us.httpMethod, fetch);
  });

  before(() => {
    username = uid();
    console.log(`testing for the username: ${username}`)
  })

  it('Should create a user document with the specified username', () => {
    const us = new UserService();
    return us.createUserDocument(username, username).then((result) => {
      console.log(result.json());
      assert.equal(result.status, 201);
    });
  });

  it('Should delete a user document with the specified username', () => {
    const us = new UserService();
    return us.removeUserDocument(username).then((result) => {
      assert.equal(result.status, 200);
    });
  });
})