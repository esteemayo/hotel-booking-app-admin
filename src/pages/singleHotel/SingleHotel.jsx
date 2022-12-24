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
                <h1 className='item-title'>Jane Doe</h1>
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
