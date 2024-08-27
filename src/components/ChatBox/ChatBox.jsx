import './ChatBox.css';
import assets from '../../assets/assets';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext);

  const [input, setInput] = useState('');

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, 'messages', messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });

        const userIDs = [chatUser.rId, userData.id];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, 'chats', id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messagesId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();

            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, 'messages', messagesId), (res) => {
        setMessages(res.data().messages.reverse());
        // console.log(res.data().messages.reverse());
      });

      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  return chatUser ? (
    <div className='chat-box'>
      <div className='chat-user'>
        <img src={chatUser.userData.avatar} alt='img pic' />
        <p>
          {chatUser.userData.name}{' '}
          <img className='dot' src={assets.green_dot} alt='img pic' />
        </p>
        <img src={assets.help_icon} alt='help icon' className='help' />
      </div>

      <div className='chat-msg'>
        <div className='s-msg'>
          <p className='msg'>
            Lorem ipsum, dolor sit amet consectetur adipisicing...
          </p>
          <div>
            <img src={assets.profile_img} alt='img pic' />
            <p>2:30 PM</p>
          </div>
        </div>
        <div className='s-msg'>
          <img src={assets.pic1} alt='pic img' className='msg-img' />
          <div>
            <img src={assets.profile_img} alt='img pic' />
            <p>2:30 PM</p>
          </div>
        </div>
        <div className='r-msg'>
          <p className='msg'>
            Lorem ipsum, dolor sit amet consectetur adipisicing...
          </p>
          <div>
            <img src={assets.profile_img} alt='img pic' />
            <p>2:30 PM</p>
          </div>
        </div>
      </div>

      <div className='chat-input'>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type='text'
          placeholder='Send a message'
        />
        <input type='file' id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor='image'>
          <img src={assets.gallery_icon} alt='icon pic' />
        </label>
        <img src={assets.send_button} alt='icon pic' />
      </div>
    </div>
  ) : (
    <div className='chat-welcome'>
      <img src={assets.logo_icon} alt='logo icon' />
      <p>Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatBox;
