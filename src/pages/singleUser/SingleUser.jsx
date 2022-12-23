import { Link, useLocation } from 'react-router-dom';

import { data } from 'data';
import List from 'components/table/Table';
import Chart from 'components/chart/Chart';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

import './singleUser.scss';

const SingleUser = () => {
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
              <Link to={`/users/${state._id}/update`}>Edit</Link>
            </div>
            <h1 className='title'>Information</h1>
            <div className='item'>
              <img
                src={state.img ?? 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                alt='avatar'
                className='item-img'
              />
              <div className='details'>
                <h1 className='item-title'>{state.name}</h1>
                <div className='detail-item'>
                  <span className='item-key'>Email:</span>
                  <span className='item-value'>{state.email}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Phone:</span>
                  <span className='item-value'>{state.phone}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>City:</span>
                  <span className='item-value'>{state.city}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Country:</span>
                  <span className='item-value'>{state.country}</span>
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
        <div className='bottom'>
          <h1 className='title'>Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
