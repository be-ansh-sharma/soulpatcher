import { doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase';

export const getUserFromRemote = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot.data();
  } catch (err) {
    console.log('Error getting user from remote', err);
  }
};

export const saveUserToRemote = async (user) => {
  try {
    const userDocRef = doc(db, 'users', user.userId);
    await setDoc(userDocRef, user);
    console.log(`User ${user.userId} saved successfully!`);
  } catch (err) {
    console.log('Error saving user from remote', err);
  }
};

export const uploadQuotesToFirebase = async () => {
  const jsonData = await import('./data/data.json');
  console.log(jsonData);
};
