const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require("./service-account.json");
const createUser = require("./createUser");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.createUser = functions.https.onRequest(createUser);
