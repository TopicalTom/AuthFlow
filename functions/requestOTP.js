const admin = require("firebase-admin");
const twilio = require("./twilio");

module.exports = (req, res) => {
  // Verify the user provides a phone
  const body = JSON.parse(req.body);
  if (!body.phone) {
    return res.status(422).send({error: "Must provide a phone number"});
  }
  // Formats the phone number to remove dashes and parens
  const phone = String(body.phone).replace(/[^\d]/g, "");
  // Create a new user account using that phone number
  admin.auth().getUser(phone)
      .then((userRecord) => {
        const code = Math.floor(Math.random() * 8999 + 1000);
        // Creates Verify Code with Twilio
        twilio.messages.create({
          body: `Your code is ${code}`,
          messagingServiceSid: "MG6f13c8f633d083232afe1c48da1e327f",
          to: phone,
        }, (err) => {
          if (err) {
            return res.status(422).send(err);
          }
          // Stores Verify Code in User FireStore Db
          admin.firestore().ref(`users/${phone}`)
              .update({code: code, codeValid: true}, () => {
                res.send({success: true});
              });
        });
      })
      .catch((err) => res.status(422).send({error: err}));
};
