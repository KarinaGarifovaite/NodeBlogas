const router = require('express').Router();
const AuthorController = require('../author/authorController');
const UserMiddleware = require('../author/authentity');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

//all Author routes
router.post('/author/signup', AuthorController.signUp);
router.post('/author/login', AuthorController.login);
router.get('/author/logout', UserMiddleware, AuthorController.logout);

module.exports = router;
