import './ProfileUpdate.css';
import assets from '../../assets/assets';
import { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [prevImage, setPrevImage] = useState('');
  const [uid, setUid] = useState('');

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error('Upload profile picture');
      }
      const docRef = doc(db, 'users', uid);
      if (image) {
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: bio,
          name: name,
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }

        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        }

        if (docSnap.data().avatar) {
          setPrevImage(docSnap.data().avatar);
        }
      } else {
        navigate('/');
      }
    });
  }, []);
  return (
    <div className='profile'>
      <div className='profile-container'>
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor='avatar'>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type='file'
              id='avatar'
              accept='.png, .jpg, .jpeg'
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt='icon pic'
            />
            upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            placeholder='Your name'
            required
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder='Write profile bio'
            required
          ></textarea>
          <button type='submit'>Save</button>
        </form>
        <img
          className='profile-pic'
          src={image ? URL.createObjectURL(image) : assets.logo_icon}
          alt='icon pic'
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
