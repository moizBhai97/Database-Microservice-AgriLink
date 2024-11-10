const app = require('./src/app');
const { port, dbUrl } = require('./src/config');
const mongoose = require('mongoose');

mongoose.connect(dbUrl)
    .then(() => app.listen(3000, () => console.log('Server Running on port:', 3000)))
    .catch((error) => console.log(error.message));