let express = require('express')
let db = require('../models')
let router = express.Router()
​
// GET /comments - display a list of all comments
​
router.get('/', (req, res) => {
    db.comment.findAll()
    .then((comments) => {
        res.render('comments/index', { comments: comments })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})
​
// POST /comments - create a new comment
router.post('/', (req, res) => {
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        articleId: req.body.articleId
    })
    .then((comment) => {
        res.redirect('/')
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
}   )
​
// GET /comments/new - display form for creating a new comment
router.get('/new', (req, res) => {
    db.article.findAll()
    .then((articles) => {
        res.render('comments/new', { articles: articles })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})
​
// GET /comments/:id - display a specific comment
router.get('/:id', (req, res) => {
    db.comment.findOne({
        where: { id: req.params.id },
        include: [db.article]
    })
    .then((comment) => {
        if (!comment) throw Error()
        res.render('comments/show', { comment: comment })
    })
    .catch((error) => {
        console.log(error)
        res.status(400).render('main/404')
    })
}   )
​
module.exports = router