import './RightSidebar.css';
import assets from '../../assets/assets';

const RightSidebar = () => {
  return (
    <div className='rs'>
      <div className='rs-profile'>
        <img src={assets.profile_img} alt='profile img' />
        <h3>
          Ricard Sanford{' '}
          <img src={assets.green_dot} alt='img pic' className='dot' />
        </h3>
        <p>Hey, There i am Ricard Sanford using chat app</p>
      </div>
      <hr />
      <div className='rs-media'>
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt='img pic' />
          <img src={assets.pic2} alt='img pic' />
          <img src={assets.pic3} alt='img pic' />
          <img src={assets.pic4} alt='img pic' />
          <img src={assets.pic5} alt='img pic' />
          <img src={assets.pic6} alt='img pic' />
        </div>
      </div>
      <button>Logout</button>
    </div>
  );
};

export default RightSidebar;
