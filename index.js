const express = require('express');                 // requiring express for server functionality
const morgan = require('morgan');                   // requiring morgan as custom middleware

const { mongoose } = require('./config/db');        // requiring mongoose - config/db
const { router } = require('./config/router');      // requiring router(s) - config/router

const app = express();                              // obtaining express returned function
const port = 3000;                                  // setting up the localhost port no.

app.use(morgan('short'));                           // setting up the custom middleware
app.use(express.json());                            // setting up the express provided .json() parser 

app.use('/',router);                                // setting up the routing middlware connectivity

app.get('/',(req,res) => {                          // sample route handler
    res.send({
        message: 'Presenting the MVC Architecture'
    })
})

app.listen(port, () => {                            // setting up the listening on port 3000
    console.log(`Listening on port ${port}`);
})