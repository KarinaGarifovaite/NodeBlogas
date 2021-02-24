const Author = require('./authorModel');
const bcrypt = require('bcrypt');
const {response}  = require('express');
const jwt = require('jsonwebtoken');

let signUp = async (req, res) => {
  let author = new Author(req.body);
  try {
    let createdAuthor = await author.save();
    res.json(createdAuthor);
  } catch (e) {
    res.status(400).json(e);
  }
};

let login = async (req, res) => {
  try {
    let author = await Author.findOne({
      username: req.body.username,
    });
    if (!author) throw "User doesn't exist";
    let response = await bcrypt.compare(req.body.password, author.password);
    if (!response) throw 'Incorrect password';
    let token = await jwt
      .sign({ _id: author._id.toHexString() }, 'superDuperSecret')
      .toString();
    author.sessionToken.push({ token });
    await author.save();
    res.header('author-auth', token).json(author);
  } catch (e) {
    res.status(401).json(e);
  }
};

let logout = async (req, res) => {
  let token = req.token;
  let author = req.author;

  try {
    await author.update({
      $pull: {
        sessionToken: {
          token
        }
      }
    })
    res.json('logout')
  }catch(e) {
    res.status(400).json(e)
  }
}

module.exports = {
  signUp,
  login,
  logout
};
