import './LeftSidebar.css';
import assets from '../../assets/assets';

const LeftSidebar = () => {
  return (
    <div className='ls'>
      <div className='ls-top'>
        <div className='ls-nav'>
          <img src={assets.logo} alt='logo pic' />
          <div className='menu'>
            <img src={assets.menu_icon} alt='icon pic' />
          </div>
        </div>
        <div className='ls-search'>
          <img src={assets.search_icon} alt='icon pic' />
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
