import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { roomInputs } from 'formData';
import useFetch from 'hooks/useFetch';
import Navbar from 'components/navbar/Navbar';
import * as roomAPI from 'services/roomService';
import Sidebar from 'components/sidebar/Sidebar';

import './newRoom.scss';

const NewRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [rooms, setRooms] = useState([]);
  const [values, setValues] = useState({});
  const [hotelId, setHotelId] = useState(null);

  const { data, loading } = useFetch('/hotels');

  const handleChange = ({ target: input }) => {
    const { id, value } = input;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreate();
  };

  const handleCreate = async () => {
    const roomNumbers = rooms.split(',').map((item) => ({ number: item }));
    const newRoom = {
      ...values,
      roomNumbers,
    };

    try {
      if (roomId) {
        await roomAPI.updateRoom(roomId, newRoom);
        navigate(-2);
      } else {
        await roomAPI.createRoom(hotelId, newRoom);
        navigate('/rooms');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    roomId && (async () => {
      try {
        const { data } = await roomAPI.getRoom(roomId);
        setValues({ ...data.room });
        setRooms(data.room.roomNumbers.map((room) => room.number));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [roomId]);

  return (
    <div className='new'>
      <Sidebar />
      <div className='new-container'>
        <Navbar />
        <div className='top'>
          <h1>{roomId ? 'Update room' : 'Add new room'}</h1>
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
                      value={values[id] || ''}
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
                  value={rooms || ''}
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
              <div className='form-input'>
                <button type='submit'>{roomId ? 'Update' : 'Send'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
