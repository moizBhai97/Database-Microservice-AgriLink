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
            // Close existing connection if any
            if (mongoose.connection.readyState !== 0) {
                await mongoose.connection.close();
            }

            await mongoose.connect(url);
            this.currentDbUrl = url;
            console.log(`Connected to database: ${url === this.mainDbUrl ? 'Main' : 'Backup'}`);
        } catch (error) {
            console.error(`Failed to connect to database: ${url === this.mainDbUrl ? 'Main' : 'Backup'}`);
            if (url === this.mainDbUrl) {
                console.log('Attempting to connect to backup database...');
                this.currentDbUrl = this.backupDbUrl;
                await this.connectToDatabase(this.backupDbUrl);
            }
        }
    }

    async isMainConnected() {
        return mongoose.connection.readyState === 1 && this.currentDbUrl === this.mainDbUrl;
    }

    async checkAndReconnect() {
        if (await this.isMainConnected()) {
            console.log('Main database is up');
        } else {
            console.log('Main database is down. Attempting to reconnect...');
            this.currentDbUrl = this.mainDbUrl;
            await this.connectToDatabase(this.mainDbUrl);
            if (await this.isMainConnected()) {
                await this.syncDataFromBackupToMain();
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
        } catch (error) {
            console.error('Failed to sync data to main database');
        } finally {
            await backupClient.close();
            await mainClient.close();
        }
    }
}

module.exports = DatabaseManager;