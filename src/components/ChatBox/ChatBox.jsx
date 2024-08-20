import './ChatBox.css';
import assets from '../../assets/assets';

const ChatBox = () => {
  return (
    <div className='chat-box'>
      <div className='chat-user'>
        <img src={assets.profile_img} alt='img pic' />
        <p>
          Richard Sanford <img src={assets.green_dot} alt='img pic' />
        </p>
        <img src={assets.help_icon} alt='help icon' className='help' />
      </div>
    </div>
  );
};

export default ChatBox;
