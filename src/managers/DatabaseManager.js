const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

class DatabaseManager {
    constructor(mainDbUrl, backupDbUrl) {
        this.mainDbUrl = mainDbUrl;
        this.backupDbUrl = backupDbUrl;
        this.currentDbUrl = mainDbUrl;
    }

    async connectToDatabase(url) {
        try {
            await mongoose.connect(url);
            this.currentDbUrl = url;
            console.log(`Connected to database: ${url == this.mainDbUrl ? 'Main' : 'Backup'}`)
        } catch (error) {
            console.error(`Failed to connect to database: ${url == this.mainDbUrl ? 'Main' : 'Backup'}`)
            if (url === this.mainDbUrl) {
                console.log('Attempting to connect to backup database...');
                try {
                    await this.connectToDatabase(this.backupDbUrl);
                } catch (error) {
                    console.error('Backup database is also down');
                }
            }
        }
    }

    async checkAndReconnect() {
        try {
            await mongoose.connect(this.mainDbUrl);
            if (this.currentDbUrl === this.backupDbUrl) {
                await this.syncDataFromBackupToMain();
            }
            console.log('Main database is up');
            this.currentDbUrl = this.mainDbUrl;
        } catch (error) {
            console.error('Main database is down');
            if (this.currentDbUrl !== this.backupDbUrl) {
                console.log('Switching to backup database...');
                await this.connectToDatabase(this.backupDbUrl);
            }
        }
    }

    async syncDataFromBackupToMain() {
        const backupClient = new MongoClient(this.backupDbUrl);
        const mainClient = new MongoClient(this.mainDbUrl);

        try {
            await backupClient.connect();
            await mainClient.connect();

            const backupDb = backupClient.db();
            const mainDb = mainClient.db();

            const collections = await backupDb.collections();
            for (const collection of collections) {
                const data = await collection.find().toArray();
                const mainCollection = mainDb.collection(collection.collectionName);
                await mainCollection.deleteMany({});
                if (data.length > 0) {
                    await mainCollection.insertMany(data);
                }
            }

            console.log('Data synced from backup to main database');
        } finally {
            await backupClient.close();
            await mainClient.close();
        }
    }
}

module.exports = DatabaseManager;