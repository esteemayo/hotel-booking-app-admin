import { NumericFormat } from 'react-number-format';
import { Link, useLocation } from 'react-router-dom';

import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

import './singleRoom.scss';

const SingleRoom = () => {
  const { state } = useLocation();

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
                  <span className='item-value'>
                    <NumericFormat
                      value={state.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Max People:</span>
                  <span className='item-value'>{state.maxPeople}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Description:</span>
                  <span className='item-value'>{state.desc}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Room Numbers:</span>
                  {state.roomNumbers.map((roomNumber, index) => {
                    return <span key={index} className='item-value'>{roomNumber.number}{','}</span>
                  })}
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
