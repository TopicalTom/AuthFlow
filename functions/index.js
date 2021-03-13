const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require("./service-account.json");
const createUser = require("./createUser");
const requestOTP = require("./requestOTP");
const verifyOTP = require("./verifyOTP");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOTP = functions.https.onRequest(requestOTP);
exports.verifyOTP = functions.https.onRequest(verifyOTP);
