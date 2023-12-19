import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCgk3-uB9WQ02IjGR3_RTI8U9vpVHPPMrw',
  projectId: 'chatapp-2ff01',
  storageBucket: 'chatapp-2ff01.appspot.com',
  appId: '1:838359342773:android:c5754b170d07e8447568fc',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
