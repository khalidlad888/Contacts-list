const express = require('express');
const path = require('path');
const port = 9000;


const db = require('./config/mongoose');
//To connect to database
//write a command in terminal to start mongodb services
//brew services start mongodb/brew/mongodb-community@5.0

const Contact = require('./models/contact');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


//Temporory contact list stored in ram i.e., when server restarts it all goes
var contactList = [
    {
        name: 'Khalid Lad',
        phone: '9011786979'
    },
    {
        name: 'Tony Stark',
        phone: '1234567890'
    },
    {
        name: 'Coding Ninjas',
        phone: '2345678910'
    }
]

app.get('/', function (req, res) {
    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log('Error in fetching contacts from database')
        }

        return res.render('home', {
            title: 'Contacts List',
            contact_list: contacts
        });
    });



    //Without database method
    // return res.render('home', {
    //     title: 'Contacts List',
    //     contact_list: contactList
    // });
});

app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: 'Let us play with ejs'
    });
});

app.post('/create-contact', function (req, res) {
    //with database

    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // }, function (err, newContact) {
    //     if (err) {
    //         console.log('Error in creating contact!');
    //         return;
    //     }

    //     console.log('********', newContact);
    //     return res.redirect('back');
    // });


    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
        .then((result) => {
            return res.redirect('back');
        }).catch((err) => {
            console.log('Error in creating contact');
            return;
        });


    //without database method

    // contactList.push(req.body);

    // Optional Methods

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });



    // console.log(req.body)
    // return res.redirect('/practice');

    // return res.redirect('/');

    //OR

    // return req.redirect('back');
});

// for deleting the contact from contactList

// app.get('/delete-contact/:phone', function (req, res) {

//     let id = req.params.id;

//     Contact.findByIdAndDelete(id, function (err) {
//         if (err) {
//             console.log('Error in deleting contact');
//         }

//         return res.redirect('back');
//     })
    // Without using the database    
    // let phone = req.params.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // };

    // return res.redirect('back');
// });

app.get('/delete-contact/:id', function (req, res) {
    let id = req.params.id;
    
    Contact.findByIdAndDelete(id)
        .then(() => {
            return res.redirect('back');
        })
        .catch((err) => {
            console.log('Error in deleting contact:', err);
            return res.redirect('back');
        });
});


app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server', err);
    }
    console.log('Server is up and running on port: ', port);
});