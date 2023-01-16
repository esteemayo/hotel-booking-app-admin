import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import List from 'components/table/Table';
import Chart from 'components/chart/Chart';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import { getUserStats } from 'services/userService';

import './singleUser.scss';

const SingleUser = () => {
  const { state } = useLocation();
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(() => [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ], []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUserStats();
        const statLists = data.stats.sort((a, b) => a._id - b._id);

        statLists.map((item) =>
          setUserStats((prev) =>
            [...prev, { name: MONTHS[item._id - 1], 'Active User': item.total }]
          ));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [MONTHS]);

  return (
    <div className='single'>
      <Sidebar />
      <div className='single-container'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <div className='edit-button'>
              <Link to={`/users/${state._id}/update`} className='edit-link'>Edit</Link>
            </div>
            <h1 className='title'>Information</h1>
            <div className='item'>
              <img
                src={state.img ?? 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                alt=''
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
              data={userStats}
              dataKey='Active User'
              aspect={3 / 1}
              title='User Statistics'
            />
          </div>
        </div>
        <div className='bottom'>
          <h1 className='title'>Lastest Users</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
