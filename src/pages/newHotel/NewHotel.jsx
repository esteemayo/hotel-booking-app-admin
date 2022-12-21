import { useState } from 'react';
import { DriveFolderUploadOutlined } from '@mui/icons-material';

import useFetch from 'hooks/useFetch';
import { hotelInputs } from 'formData';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

import './newHotel.scss';

const NewHotel = () => {
  const [rooms, setRooms] = useState([]);
  const [files, setFiles] = useState(null);
  const [formData, setFormData] = useState(null);

  const { data, loading } = useFetch('/rooms');

  const handleChange = ({ target: input }) => {
    const { id, value } = input;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelect = ({ target: input }) => {
    const { selectedOptions } = input;
    const value = Array.from(selectedOptions, (option) => option.value);

    setRooms(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className='new-container'>
        <Navbar />
        <div className='top'>
          <h1>Add new hotel</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=''
            />
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit}>
              <div className='form-input'>
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlined className='icon' />
                </label>
                <input
                  type='file'
                  id='file'
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: 'none' }}
                />
              </div>
              {hotelInputs.map((item) => {
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
                <label htmlFor='featured'>Featured</label>
                <select id='featured' name='featured' onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className='select-rooms'>
                <label htmlFor='rooms'>Rooms</label>
                <select id='rooms' name='rooms' multiple onChange={handleSelect}>
                  {loading ? 'loading' : (
                    data?.rooms?.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>{item.title}</option>
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

export default NewHotel;
