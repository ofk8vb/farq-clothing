import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyAKgt2WDApeRh86ie3WQmXPtZ-ARpAsmWM",
    authDomain: "farq-db.firebaseapp.com",
    databaseURL: "https://farq-db.firebaseio.com",
    projectId: "farq-db",
    storageBucket: "farq-db.appspot.com",
    messagingSenderId: "291368869212",
    appId: "1:291368869212:web:19d9e640c208122cad7599",
    measurementId: "G-8B1F4TSHVV"
  };

  export const createUserProfileDocument= async(userAuth, additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const{displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message)

        }
    }

    return userRef;

  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  //google pop up will come whenever we use google auth service
  provider.setCustomParameters({propmpt:'select_account'});
  //we want to sign up with the provider we created which is GoogleAuthProvider
  export const SignInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;