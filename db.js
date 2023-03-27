const { MongoClient } = require('mongodb');

const url = `mongodb://root:root@localhost:27018/?authMechanism=DEFAULT`;

//const url = `mongodb://localhost:27018`;
const client = new MongoClient(url);

(async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('Failed to connect to MongoDB', e);
        process.exit(1);
    }
})();

module.exports = client;