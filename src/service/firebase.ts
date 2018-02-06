import * as firebase from 'firebase';
import 'firebase/firestore';
import config from './config';

let firebaseApp: firebase.app.App;

export const getFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  } else {
    return firebaseApp = firebase.initializeApp(config);
  }
};

export const getFirestoreDb = () => {
  return getFirebaseApp().firestore();
};
