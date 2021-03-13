const admin = require("firebase-admin");

module.exports = (req, res) => {
  // Verify the user provides a phone and code
  const body = JSON.parse(req.body);
  if (!body.phone || !body.code) {
    return res.status(422).send({error: "Phone and code must be provided"});
  }
  // Formats the phone and code
  const phone = String(body.phone).replace(/[^\d]/g, "");
  const code = parseInt(body.code);
  // Gets user from Firebase Auth
  admin.auth().getUser(phone)
      .then(() => {
        // Get Ref to Firebase User Database
        const ref = admin.firestore().ref(`users/${phone}`);
        // Find matching user database
        ref.on("value", (snapshot) => {
          const user = snapshot.val();
          // Check if user code exists or is valid
          if (user.code !== code || !user.codeValid) {
            return res.status(422).send({error: "Code not valid"});
          }
          // Update code boolean to prevent reuse
          ref.update({codeValid: false});
          // Creates JWT Token for verified user
          admin.auth().createCustomToken(phone)
              .then((token) => res.send({token: token}));
        });
      })
      .catch((err) => res.status(422).send({error: err}));
};
