const app = require('./src/app');
//const { port, dbUrl } = require('./src/config');
const mongoose = require('mongoose');

const dbUrl='mongodb+srv://harrissaif01:harris1234@cluster0.i5ngqeq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbUrl)
    .then(() => app.listen(3000, () => console.log('Server Running on port:', 3000)))
    .catch((error) => console.log(error.message));