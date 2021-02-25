const router = require('express').Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // Allowed extentions
  const fileTypes = /jpeg|jpg|png|gif/;
  //check the ext
  const extname = fileTypes.test(file.originalname.toLowerCase());
  //check mime
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only');
  }
}

const AuthorController = require('../author/authorController');
const PublicationController = require('../publication/publicationController');
const UserMiddleware = require('../author/authentity');
const Author = require('../author/authorModel');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

//all Author routes
router.post('/author/signup', AuthorController.signUp);
router.post('/author/login', AuthorController.login);
router.get('/author/logout', UserMiddleware, AuthorController.logout);

router.post(
  '/author/uploadProfilePhoto',
  UserMiddleware,
  upload.single('test'),
  AuthorController.saveAuthorPhoto
);

router.post('/author/bio', UserMiddleware, AuthorController.saveAuthorBio);

router.get('/author', UserMiddleware, AuthorController.getAuthorInfo);

router.patch('/author', UserMiddleware, AuthorController.updateAuthorName)

//all Publication routes

router.post(
  '/publication',
  UserMiddleware,
  PublicationController.savePublication
);
router.get('/publication', PublicationController.getAllPublications);
router.get(
  '/authorPublications',
  UserMiddleware,
  PublicationController.getAuthorPublications
);

router.delete('/publication', PublicationController.deletePublication)
router.patch('/publication', PublicationController.updatePublication)

module.exports = router;