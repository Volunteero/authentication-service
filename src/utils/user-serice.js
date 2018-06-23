
const fetch = require('node-fetch');

module.exports = class UserService {
  constructor(http = fetch) {
    this.httpMethod = http;
    this.baseUrl = 'https://volunteero-altar.herokuapp.com/altar/v1/users';
  }

  createUserDocument(username) {
    const body = {
      username,
      points: 0
    };
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    return this.httpMethod(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    });
  }

  removeUserDocument(username) {
    const body = {
      username
    };
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const route = `${this.baseUrl}/delete`;
    return this.httpMethod(route, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers
    });
  }
}