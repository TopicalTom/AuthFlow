const admin = require("firebase-admin");

module.exports = (req, res) => {
  // Verify the user provides a phone
  const body = JSON.parse(req.body);
  if (!body.phone) {
    return res.status(422).send({error: "Bad Input"});
  }
  // Formats the phone number to remove dashes and parens
  const phone = String(body.phone).replace(/[^\d]/g, "");
  // Create a new user account using that phone number
  admin.auth().createUser({uid: phone})
      .then((user) => res.send(user))
      .catch((err) => res.status(422).send({error: err}));
  // Respond to user request with account was made
};
