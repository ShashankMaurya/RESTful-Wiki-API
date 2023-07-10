const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://127.0.0.1:27017/WikiDb");

const wikiSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Why no Title?']
    },
    content: {
        type: String,
        required: [true, 'Why no Content?']
    }
});

const article = mongoose.model('article', wikiSchema);


// Chaining Route methods

app.route('/articles')
    .get(function (req, res) {

        article.find()
            .then((foundArticles) => res.send(foundArticles))
            .catch((err) => res.send(err));

    })

    .post(function (req, res) {

        new article(req.body)
            .save()
            .then(() => res.send('Article Posted successfully'))
            .catch((err) => res.send(err));

    })

    .delete(function (req, res) {

        article.deleteMany()
            .then(() => res.send('All Articles Deleted successfully'))
            .catch((err) => res.send(err));

    });





// GET requests

// app.get('/articles', function (req, res) {

//     article.find()
//         .then((foundArticles) => res.send(foundArticles))
//         .catch((err) => res.send(err));

// });




// POST requests

// app.post('/articles', function (req, res) {

//     new article(req.body)
//         .save()
//         .then(() => res.send('Article Posted successfully'))
//         .catch((err) => res.send(err));

// });




// DELETE requests

// app.delete('/articles', function (req, res) {

//     article.deleteMany()
//         .then(() => res.send('All Articles Deleted successfully'))
//         .catch((err) => res.send(err));

// });




// LISTENER set-up

app.listen(3000, function () {
    console.log('server started on port 3000...');
});