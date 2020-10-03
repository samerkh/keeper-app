const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 9000;
const url = "mongodb://localhost:27017";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url + '/notesDB', options);

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});

const noteModel = mongoose.model("note", noteSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    noteModel.find((err, notes) => {
        if (!err) {
            res.send(notes);
        } else {
            res.send(err);
        }
    });
});

app.post('/addnote', (req, res) => {
    const data = req.body;

    const note = new noteModel({
        title: data.title,
        content: data.content
    });

    note.save();
    res.redirect('/');
});

app.post('/removenote', (req, res) => {
    const id = req.body.id;
    noteModel.deleteOne({ _id: id }, err => {
        if (!err) {
            res.redirect('/');
        } else{
            res.send(err);
        }
    });
});

app.listen(port, () => {
    console.log('server is running on port ' + port);
});