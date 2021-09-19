const express = require('express'); //same as import
const connectDB = require('./config/db');
const path = require('path')

const app = express();

//connect DB
connectDB();

//Init Middleware
//nykyisin expressiin integroitu
//tarvitaan bodyssä tulevan datan validointiin ja jsontokeniin
app.use(express.json({extended: false}));

//tässä määritetään endpoint/routet
//postmanissa get näytää hello world.
// app.get('/', (req, res) => res.json({ msg: 'Welcome to the contact keeper API' }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//serve static assets in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

//tuotannossa katsotaan portti environment variablesta
//muuten 50000
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));