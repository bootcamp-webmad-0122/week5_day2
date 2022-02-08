const { isLoggedIn, checkRole } = require("../middleware/route-guard");
const Todo = require("../models/Todo.model");
const { isAdmin, isEditor } = require("../utils");

const router = require("express").Router();

router.get("/", (req, res, next) => res.render("index"))



router.get('/privada1', isLoggedIn, (req, res, next) => {
  res.render('private-view', { user: req.session.currentUser })
})

router.get('/privada2', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
  res.render('private-view', { user: req.session.currentUser })
})

router.get('/privada3', isLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res, next) => {
  res.render('private-view', { user: req.session.currentUser })
})






router.get('/conditional-render', isLoggedIn, (req, res, next) => {

  res.render('role-rendered', {
    user: req.session.currentUser,
    isAdmin: isAdmin(req.session.currentUser),
    isEditor: isEditor(req.session.currentUser),
  })
})






router.get('/todo/create', isLoggedIn, (req, res) => res.render('todo-form'))

router.post('/todo/create', isLoggedIn, (req, res, next) => {

  const { name } = req.body

  Todo
    .create({ name, owner: req.session.currentUser._id })
    .then(() => res.redirect('/todo/all'))
    .catch(err => next(err))
})



router.get('/todo/all', (req, res, next) => {

  Todo
    .find()
    .then(allTodos => res.render('todo-list', { allTodos }))
    .catch(err => next(err))

})

router.get('/todo/my-todos', isLoggedIn, (req, res, next) => {

  Todo
    .find({ owner: req.session.currentUser._id })
    .then(allTodos => res.render('todo-list', { allTodos }))
    .catch(err => next(err))

})

module.exports = router