// const { request } = require('express');
const Publication = require("./publicationModel");

let savePublication = async (req, res) => {
  let body = req.body;
  let publication = new Publication({
    title: body.title,
    content: body.content,
    author: req.author._id,
    publicationDate: new Date(),
  });

  try {
    let savedPublication = await publication.save();
    res.json(savedPublication);
  } catch (e) {
    res.status(401).json(e);
  }
};

let getAllPublications = async (req, res) => {
  try {
    let allPublications = await Publication.find({});
    res.json(allPublications);
    // console.log(allPublications);
  } catch (e) {
    res.status(401).json(e);
  }
};

let getAuthorPublications = async (req, res) => {
  try {
    let authorPublications = await Publication.find({
      author: req.author._id,
    });
    res.json(authorPublications);
    console.log(authorPublications);
  } catch (e) {
    res.status(401).json(e);
  }
};

let deletePublication = async (req, res) => {
  let publicationId = req.body._id;
  try {
    let deletedItem = await Publication.findOneAndDelete({
      _id: publicationId,
    });
    res.json(deletedItem);
  } catch (err) {
    res.status(404).json(err);
  }
};

let updatePublication = async (req, res) => {
  let publicationId = req.body._id;
  try {
    let updatedPublication = await Publication.findOneAndUpdate({
      _id: publicationId
    }, req.body)
    res.json(updatedPublication)
  } catch (err) {
    res.status(404).json(err)
  }
}

module.exports = {
  savePublication,
  getAllPublications,
  getAuthorPublications,
  deletePublication,
  updatePublication,
};