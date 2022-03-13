const path = require('path');
const express = require('express')
const router = express.Router()

router.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, '../../public/notes.html'));
 });

router.get('/', (req, res) => {
   console.log("You are in public/index.html")
   res.sendFile(path.join(__dirname, '../../public/index.html'));
 });
 
 // Any route that wasn't previously defined will fall under this request and will receive the homepage as the response
 router.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../../public/index.html'));  
 });

 module.exports = router;