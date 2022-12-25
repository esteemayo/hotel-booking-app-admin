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
                  <span className='item-key'>Price:</span>
                  <span className='item-value'>{state.price}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Max people:</span>
                  <span className='item-value'>{state.maxPeople}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Description:</span>
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
