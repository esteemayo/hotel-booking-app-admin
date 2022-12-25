import { Link, useLocation } from 'react-router-dom';

import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

import './singleRoom.scss';

const SingleRoom = () => {
  const { state } = useLocation();
  console.log(state)

  return (
    <div className='single'>
      <Sidebar />
      <div className='single-container'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <div className='edit-button'>
              <Link to={`/rooms/${state._id}/update`} className='edit-link'>Edit</Link>
            </div>
            <h1 className='title'>Information</h1>
            <div className='item'>
              <div className='details'>
                <h1 className='item-title'>{state.title}</h1>
                <div className='detail-item'>
                  <span className='item-key'>Email:</span>
                  <span className='item-value'>janedoe@gmail.com</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Phone:</span>
                  <span className='item-value'>+1 2345 67 89</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Address:</span>
                  <span className='item-value'>
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Country:</span>
                  <span className='item-value'>USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRoom;
