db.refreshtokens.createIndex({ expires: 1 }, { expireAfterSeconds: 0 });
db.refreshtokens.createIndex({ refreshToken: 1 }, { unique: true });

db.users.createIndex({ username: 1 }, { unique: true });

db.clients.createIndex({ clientId: 1 }, { unique: true });
