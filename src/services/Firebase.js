import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAxlgGJjp343JQQ8AEG6UO2RGmCd-ZOVKM',
  authDomain: 'soulpatcher-e7a81.firebaseapp.com',
  projectId: 'soulpatcher-e7a81',
  storageBucket: 'soulpatcher-e7a81.appspot.com',
  messagingSenderId: '719331945933',
  appId: '1:719331945933:web:fa43b59deaddd29f9da884',
  measurementId: 'G-22JJRW898T',
};

const Firebase = initializeApp(firebaseConfig);
const Auth = getAuth(Firebase);
const db = getFirestore(Firebase);

module.exports = {
  Auth,
  db,
  Firebase,
};
