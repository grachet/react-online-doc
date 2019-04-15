import * as firebase from "firebase";

export const FirebaseConfig = {
  apiKey: "AIzaSyCNGXMLcj0IeA1Le-iRMsxJT55q7b8SXgE",
  authDomain: "react-online-doc.firebaseapp.com",
  databaseURL: "https://react-online-doc.firebaseio.com/"
};

firebase.initializeApp(FirebaseConfig);

export const databaseRef = firebase.database().ref();
export const documentationRef = databaseRef.child("documentation");
export const authRef = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const GithubProvider = new firebase.auth.GithubAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const usersRef = databaseRef.child("users");

