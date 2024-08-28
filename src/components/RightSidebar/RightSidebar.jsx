import './RightSidebar.css';
import assets from '../../assets/assets';
import { logout } from '../../config/firebase';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const RightSidebar = () => {
  const { chatUser, messages } = useContext(AppContext);

  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    let temVar = [];

    messages.map((msg) => {
      if (msg.image) {
        temVar.push(msg.image);
      }
    });

    // console.log(temVar);
    setMsgImages(temVar);
  }, [messages]);

  return chatUser ? (
    <div className='rs'>
      <div className='rs-profile'>
        <img src={chatUser.userData.avatar} alt='profile img' />
        <h3>
          {' '}
          {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
            <img src={assets.green_dot} alt='img pic' className='dot' />
          ) : null}
          {chatUser.userData.name}{' '}
        </h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className='rs-media'>
        <p>Media</p>
        <div>
          {msgImages.map((url, index) => (
            <img
              onClick={() => window.open(url)}
              key={index}
              src={url}
              alt='img pic'
            />
          ))}
          {/* <img src={assets.pic1} alt='img pic' />
          <img src={assets.pic2} alt='img pic' />
          <img src={assets.pic3} alt='img pic' />
          <img src={assets.pic4} alt='img pic' />
          <img src={assets.pic5} alt='img pic' />
          <img src={assets.pic6} alt='img pic' /> */}
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  ) : (
    <div className='rs'>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default RightSidebar;
