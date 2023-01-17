import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Link, useLocation } from 'react-router-dom';

import { excerpts } from 'utils';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

import './singleHotel.scss';

const SingleHotel = () => {
  const { state } = useLocation();
  const [readMore, setReadMore] = useState(false);

  return (
    <div className='single'>
      <Sidebar />
      <div className='single-container'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <div className='edit-button'>
              <Link to={`/hotels/${state._id}/update`} className='edit-link'>Edit</Link>
            </div>
            <h1 className='title'>Information</h1>
            <div className='item'>
              <img
                src={state.photos[0]}
                alt=''
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
                  <span className='item-key'>Price:</span>
                  <span className='item-value'>
                    <NumericFormat
                      value={state.cheapestPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Address:</span>
                  <span className='item-value'>{state.address}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Distance:</span>
                  <span className='item-value'>
                    <NumericFormat
                      value={state.distance}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={'m'}
                    />
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Description:</span>
                  <span className='item-value'>
                    {readMore ? state.desc : excerpts(state?.desc, 20)}
                    <button onClick={() => setReadMore(!readMore)}>{readMore ? 'show less' : 'read more'}</button>
                  </span>
                </div>
                {state.rating && (
                  <div className='detail-item'>
                    <span className='item-key'>Rating:</span>
                    <span className='item-value'>{state.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
