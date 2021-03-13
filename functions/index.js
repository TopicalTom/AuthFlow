const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// // functions.logger.info("Hello logs!", {structuredData: true});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.goodbye = functions.https.onRequest((request, response) => {
  response.send("Goodbye!");
});
