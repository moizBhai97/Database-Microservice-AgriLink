require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    dbUrl: "mongodb+srv://i211209:Xg5lmHfaQt0GN7tW@agrilink.8s85i.mongodb.net/Agrilink",
    jwtSecret: process.env.JWT_SECRET,
};