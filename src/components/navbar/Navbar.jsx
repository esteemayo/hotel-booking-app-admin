import {
  ChatBubbleOutlineOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  LanguageOutlined,
  LightModeOutlined,
  ListOutlined,
  NotificationsNoneOutlined,
  SearchOutlined,
} from '@mui/icons-material';

import { useGlobalAuthContext } from 'context/auth/AuthContext';
import { useGlobalContext } from 'context/darkmode/DarkModeContext';

import './navbar.scss';

const Navbar = () => {
  const { user } = useGlobalAuthContext();
  const { darkMode, toggle } = useGlobalContext();

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='Search...' />
          <SearchOutlined />
        </div>
        <div className='items'>
          <div className='item'>
            <LanguageOutlined className='icon' />
            English
          </div>
          <div className='item'>
            {darkMode === 'dark' ? (
              <LightModeOutlined className='icon' onClick={() => toggle('dark')} />
            ) : (
              <DarkModeOutlined className='icon' onClick={() => toggle('light')} />
            )}
          </div>
          <div className='item'>
            <FullscreenExitOutlined className='icon' />
          </div>
          <div className='item'>
            <NotificationsNoneOutlined className='icon' />
            <div className='counter'>1</div>
          </div>
          <div className='item'>
            <ChatBubbleOutlineOutlined className='icon' />
            <div className='counter'>2</div>
          </div>
          <div className='item'>
            <ListOutlined className='icon' />
          </div>
          <div className='item'>
            <img
              src={user?.img ?? 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
              alt=''
              className='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
