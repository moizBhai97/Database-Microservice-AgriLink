const app = require('./src/app');
const { port, dbUrl } = require('./src/config');
const mongoose = require('mongoose');

mongoose.connect(dbUrl)
    .then(() => app.listen( port, () => console.log('Server Running on port:', port)))
    .catch((error) => console.log(error.message));