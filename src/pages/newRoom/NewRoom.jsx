import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { roomInputs } from 'formData';
import useFetch from 'hooks/useFetch';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import { createRoom } from 'services/roomService';

import './newRoom.scss';

const NewRoom = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [values, setValues] = useState(null);
  const [hotelId, setHotelId] = useState(null);

  const { data, loading } = useFetch('/hotels');

  const handleChange = ({ target: input }) => {
    const { id, value } = input;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split(',').map((item) => ({ number: item }));
    const newRoom = {
      ...values,
      roomNumbers,
    };

    try {
      await createRoom(hotelId, newRoom);
      navigate('/rooms');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className='new-container'>
        <Navbar />
        <div className='top'>
          <h1>Add new room</h1>
        </div>
        <div className='bottom'>
          <div className='right'>
            <form onSubmit={handleSubmit}>
              {roomInputs.map((item) => {
                const { id, name, type, label, placeholder } = item;
                return (
                  <div className='form-input' key={id}>
                    <label htmlFor={id}>{label}</label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      onChange={handleChange}
                      placeholder={placeholder}
                    />
                  </div>
                );
              })}
              <div className='form-input'>
                <label htmlFor='rooms'>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder='give comma between room numbers.'
                ></textarea>
              </div>
              <div className='form-input'>
                <label htmlFor='hotelId'>Choose a hotel</label>
                <select
                  id='hotelId'
                  name='hotelId'
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? 'loading' : (
                      data?.hotels?.map((item) => {
                        return (
                          <option key={item._id} value={item._id}>{item.name}</option>
                        );
                      })
                    )}
                </select>
              </div>
              <button type='submit'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
