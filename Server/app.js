const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const buildPath = path.join(__dirname, '..', 'Client', 'build');
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
app.use(express.static(buildPath));

app.get('/', (req, res)=>{
    res.sendFile(path.join(buildPath, 'index.html'));
})

app.get('/notes', (req, res) => {
    noteModel.find((err, notes) => {
        if (!err) {
            res.send(notes);
        } else {
            res.send(err);
        }
    });
});

app.post('/notes/addnote', (req, res) => {
    const data = req.body;

    const note = new noteModel({
        title: data.title,
        content: data.content
    });

    note.save();
    res.redirect('/notes');
});

app.post('/notes/removenote', (req, res) => {
    const id = req.body.id;
    noteModel.deleteOne({ _id: id }, err => {
        if (!err) {
            res.redirect('/notes');
        } else{
            res.send(err);
        }
    });
});

app.listen(port, () => {
    console.log('server is running on port ' + port);
});