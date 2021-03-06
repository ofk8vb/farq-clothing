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

  export const getUserCartRef = async userId => {
    const cartsRef = firestore.collection('carts').where('userId', '==', userId);
    const snapShot = await cartsRef.get();
  
    if (snapShot.empty) {
      const cartDocRef = firestore.collection('carts').doc();
      await cartDocRef.set({ userId, cartItems: [] });
      return cartDocRef;
    } else {
      return snapShot.docs[0].ref;
    }
  };

  export const addCollectionAndDocuments=async (collectionKey, objectsToAdd)=>{
      const collectionRef = firestore.collection(collectionKey);
      console.log(collectionRef)

      const batch = firestore.batch();
      objectsToAdd.forEach(obj => {
          const newDocRef = collectionRef.doc();
          batch.set(newDocRef, obj);
      })

      return await batch.commit();
  }


  export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();
  
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
  
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };

  export const getCurrentUser = () =>{
    return new Promise((resolve,reject)=>{
      const unsubscribe = auth.onAuthStateChanged(userAuth=>{
        unsubscribe();
        resolve(userAuth)
      },reject)
    })
  }




  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();

  //google pop up will come whenever we use google auth service
  googleProvider.setCustomParameters({propmpt:'select_account'});
  //we want to sign up with the provider we created which is GoogleAuthProvider
  export const SignInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;