import { useState } from 'react';

import { roomInputs } from 'formData';
import useFetch from 'hooks/useFetch';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

import './newRoom.scss';

const NewRoom = () => {
  const [values, setValues] = useState(null);

  const { data, loading } = useFetch('/hotels');

  const handleSubmit = (e) => {
    e.preventDefault();
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
                      placeholder={placeholder}
                    />
                  </div>
                );
              })}

              <button type='submit'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
