const { MongoClient } = require('mongodb');
const { dbUrl, backupDbUrl } = require('../config');

async function runBackup() {
    try {
        const backupMessage = await syncData();
        console.log(backupMessage);
    } catch (error) {
        // console.error(error);
        console.error('Failed to sync data from main to backup database');
    }
}

async function syncData() {
    const backupClient = new MongoClient(backupDbUrl);
    const mainClient = new MongoClient(dbUrl);

    try {
        await backupClient.connect();
        await mainClient.connect();

        const backupDb = backupClient.db();
        const mainDb = mainClient.db();

        const collections = await mainDb.collections();
        for (const collection of collections) {
            const data = await collection.find().toArray();
            const backupCollection = backupDb.collection(collection.collectionName);
            await backupCollection.deleteMany({});
            if (data.length > 0) {
                await backupCollection.insertMany(data);
            }
        }

        return 'Data synced from main to backup database';
    } finally {
        await backupClient.close();
        await mainClient.close();
    }
}

module.exports = runBackup;