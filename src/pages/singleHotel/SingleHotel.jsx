import { useLocation } from 'react-router-dom';

import { data } from 'data';
import Chart from 'components/chart/Chart';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

import './singleHotel.scss';

const SingleHotel = () => {
  const { state } = useLocation();
  console.log(state)

  return (
    <div className='single'>
      <Sidebar />
      <div className='single-container'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <div className='edit-button'>Edit</div>
            <h1 className='title'>Information</h1>
            <div className='item'>
              <img
                src={state.photos[0]}
                alt={state.name}
                className='item-img'
              />
              <div className='details'>
                <h1 className='item-title'>{state.name}</h1>
                <div className='detail-item'>
                  <span className='item-key'>Title:</span>
                  <span className='item-value'>{state.title}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>City:</span>
                  <span className='item-value'>{state.city}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Address:</span>
                  <span className='item-value'>{state.address}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Distance:</span>
                  <span className='item-value'>{state.distance} km</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Address:</span>
                  <span className='item-value'>
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Rating:</span>
                  <span className='item-value'>{state.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <Chart
              data={data}
              dataKey='Total'
              aspect={3 / 1}
              title='User Spending (Last 6 Months)'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
