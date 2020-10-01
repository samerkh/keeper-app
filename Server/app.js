const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;
let notes = [];

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    res.send(notes);
});

app.post('/addnote', (req,res)=>{
    const note = req.body;
    notes.push(note);
    res.redirect('/');
});

app.post('/removenote', (req,res)=>{
    const id = parseInt(req.body.id);
    notes=notes.filter((note,i)=>i !== id);
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log('server is running on port '+port);
});