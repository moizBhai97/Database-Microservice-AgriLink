const mongoose = require('mongoose');
const cron = require('node-cron');
const app = require('./src/app');
const { port, dbUrl, backupDbUrl } = require('./src/config');
const runBackup = require('./src/utils/backup');
const DatabaseManager = require('./src/managers/DatabaseManager');

const dbManager = new DatabaseManager(dbUrl, backupDbUrl);

app.listen(port, () => {
    console.log(`Server Running on port: ${port}`);
    dbManager.connectToDatabase(dbUrl);
});

// Schedule the backup script to run every day at 2 AM
cron.schedule('0 2 * * *', () => {
    console.log('Running backup script...');
    runBackup();
});

// Schedule the script to check main database status every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    console.log('Checking main database status...');
    await dbManager.checkAndReconnect();
});