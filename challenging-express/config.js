const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBVxcXv1_KGuQDK58FKL1of1g4mUgVcFkk",
  authDomain: "challenging-project.firebaseapp.com",
  projectId: "challenging-project",
  storageBucket: "challenging-project.appspot.com",
  messagingSenderId: "392341177944",
  appId: "1:392341177944:web:b9207e5f17df212ac72c2d",
  measurementId: "G-33QPSF6D5D"
};

firebase.initializeApp(firebaseConfig);
  
const db =firebase.firestore();
const PhoneNumber =db.collection('phone_numbers');
const FavoriteGithubUser =db.collection('favorite_github_users');


module.exports= {
  PhoneNumber,
  FavoriteGithubUser
};