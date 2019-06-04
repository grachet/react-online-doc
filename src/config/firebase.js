import firebase from 'firebase/app';
import {auth,database,initializeApp} from 'firebase';

export const FirebaseConfig = {
  apiKey: "AIzaSyCNGXMLcj0IeA1Le-iRMsxJT55q7b8SXgE",
  authDomain: "react-online-doc.firebaseapp.com",
  databaseURL: "https://react-online-doc.firebaseio.com/"
};

initializeApp(FirebaseConfig);

export const databaseRef = database().ref();
export const documentationRef = databaseRef.child("documentation");
export const authRef = auth();
export const GoogleProvider = new auth.GoogleAuthProvider();
export const GithubProvider = new auth.GithubAuthProvider();
export const FacebookProvider = new auth.FacebookAuthProvider();
export const usersRef = databaseRef.child("users");

