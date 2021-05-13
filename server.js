const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Task = require('./model/Task.js');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('www'));

var port = 3000;
var dbURL = 'mongodb://localhost:27017/todolist';

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.post('/addTask', (req, res)=>{
    // const title = req.body.title;
    // const body = req.body.body;
    const {title, body} = req.body;
    task = new Task({
        title: title,
        body: body
    });
    task.save();
    res.redirect('/');
});

app.get('/getTasks', (req, res)=>{
    Task.find({}, (err, docs) =>{
        if (err) throw err;
        res.send(docs);
    })
})

app.get('/deleteTask/:id', (req, res)=>{
    var id = req.params.id;
    Task.findOneAndDelete({_id: id }, (err, docs)=>{
        if (err) throw err;
        res.redirect('/');
    })
})

app.get('/completeTask/:id', (req, res)=>{
    var id = req.params.id;
    Task.findOne({_id: id }, (err, doc)=>{
        if (err) throw err;
        doc.completed = true;
        doc.save();
        res.redirect('/');
    })
})

mongoose.connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log('connected to DB');
}).catch((err)=>{
    console.log(err.message);
});

app.listen(port, ()=>{
    console.log(`Connect on Port: ${port}`);
})