const {
    Acl,
    MongoDBStore,
    MemoryStore
} = require('@aclify/aclify');
module.exports = (db) => new Acl(new MongoDBStore(db, 'acl_'));