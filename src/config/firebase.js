import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: 'AIzaSyBk7R9Dd9G5XKtFcSxyafZHuWAIyhKMKi0',
  authDomain: 'chat-app-real-time-30145.firebaseapp.com',
  projectId: 'chat-app-real-time-30145',
  storageBucket: 'chat-app-real-time-30145.appspot.com',
  messagingSenderId: '627651211591',
  appId: '1:627651211591:web:f92e4da4b80c9007979c62',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: '',
      avatar: '',
      bio: 'Hey, There i am using chat app',
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, 'chats', user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code);
  }
};

export { signup };
