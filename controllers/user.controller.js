const userModel = require("../models/user.models");
const ObjectID = require("mongoose").Types.ObjectId;
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.userInfo = async (req, res) => {
  //console.log(req.params);
  try {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send(`ID inconnu ${req.params.id}`);
    userModel
      .findById(req.params.id, (err, docs) => {
        if (!err) res.status(200).send(docs);
        else console.log(`ID inconnu ${req.params.id} ${err}`);
        return res.status(500).json({ err });
      })
      .select("-password");
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log("id", id);
    if (!ObjectID.isValid(id))
      return res.status(400).send(`ID inconnu ${req.params.id}`);
    userModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          biographie: req.body.biographie,
          pseudo: req.body.pseudo,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.status(201).send(docs);
        else console.log(`ID inconnu ${req.params.id} ${err}`);
        return res.status(500).json({ err });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log("id", id);
    if (!ObjectID.isValid(id))
      return res.status(400).send(`ID inconnu ${req.params.id}`);
    userModel.findByIdAndDelete({ _id: id }).exec();
    res.status(200).json({ message: "user deleted with success" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.follow = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log("id", id);
    if (!ObjectID.isValid(id))
      return res.status(400).send(`ID inconnu ${req.params.id}`);

    if (!ObjectID.isValid(req.body.idToFollow))
      return res.status(400).send(`ID inconnu ${req.body.idToFollow}`);

    // add to the follower list--ajout dans ma liste ceux que je suis

    userModel.findByIdAndUpdate(
      { _id: id }, //mon id
      { $addToSet: { following: req.body.idToFollow } }, //id des personnes qu je suis
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.status(201).json({ docs });
        else return res.status(400).json({ err });
      }
    );
    // add to the following list-- ajout dans la liste de ceux que je suis
    userModel.findByIdAndUpdate(
      { _id: req.body.idToFollow }, //id de la personne que je suis
      { $addToSet: { followers: id } }, //je suis ajoutee dans la liste des ses followers
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (err) return res.status(400).json({ err });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports.unfollow = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log("id", id);
    if (!ObjectID.isValid(id))
      return res.status(400).send(`ID inconnu ${req.params.id}`);
  } catch (error) {
    res.status(500).json({ error });
  }
};
