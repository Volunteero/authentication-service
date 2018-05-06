const mongoose = require('mongoose');
const {Acl, MongoDBStore, MemoryStore} = require('@aclify/aclify');
const mongo = new MongoDBStore(mongoose.connection, {
    prefix: 'acl_'
});
const memory = new MemoryStore();
const acl = new Acl(memory);

module.exports = () => acl;