const userModel = require("../models/user.models");
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  try {
    const user = await userModel.create({ pseudo, email, password });
    res.status(201).json({ user });
    //console.log('req.body', req.body)
  } catch (error) {
    res.status(500).send({ error });
    console.log("erreur interne du server");
  }
};
