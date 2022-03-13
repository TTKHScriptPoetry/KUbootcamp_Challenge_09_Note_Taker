const express = require('express');
const fs = require('fs');
const path = require('path');

const apiRoutes = require('./routes/apiRoutes'); // will read the index.js files in each of the directories indicated
const htmlRoutes = require('./routes/htmlRoutes'); // the index.js file will be the default file read if no other file is provided
 
const MYPORT = process.env.PORT || 3002;
const app = express(); // To instantiate the server
app.use(express.urlencoded({ extended: true })); // parse incoming string or array data
app.use(express.json()); // parse incoming JSON data
app.use(express.static('public')); // must go before define routing seen below:

app.use('/api', apiRoutes);  
app.use('/', htmlRoutes);

// need to use listen() method onto our server to make our server listen

app.listen(MYPORT, () => {
  console.log(`API server now on port ${MYPORT}`);
  console.log(`Example app listening at http://localhost:${MYPORT}/`); // index pages
  console.log(`Example app listening at http://localhost:${MYPORT}/api/notes`);
  console.log ('---------------');
 });