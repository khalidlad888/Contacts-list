// require the library

const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//aquire connection (to check if its connected to db)
const db = mongoose.connection;

//if error
db.on('error', console.error.bind(console,'error connecting to database'));

//if up and running print the message
db.once('open', function(){
    console.log('connection to the database is successful');
});

