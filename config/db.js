const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); //tässä tulee connectionstring default.jsonista

const connectDB = async () => { //voidaan käyttää async await koska connect palauttaa promisen
    try {
        await mongoose
            .connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

    console.log('MongoDB connected');

    } catch (err) {
        err => {
            console.error(err.message);
            process.exit(1);
        };
    };
}

module.exports = connectDB;

