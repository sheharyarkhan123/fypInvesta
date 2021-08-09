const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'investabackend.firebaseapp.com'
});

const db = admin.firestore();
const auth = admin.auth();
const FieldValue = admin.firestore.FieldValue;



module.exports = {
db, auth, admin, FieldValue
}