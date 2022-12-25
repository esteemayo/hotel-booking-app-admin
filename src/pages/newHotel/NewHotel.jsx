import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DriveFolderUploadOutlined } from '@mui/icons-material';

import useFetch from 'hooks/useFetch';
import { hotelInputs } from 'formData';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import { uploadImage } from 'services/imageService';
import { createHotel, getHotelBySlug, updateHotel } from 'services/hotelService';

import './newHotel.scss';

const NewHotel = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const slug = pathname.split('/')[2];

  const [rooms, setRooms] = useState([]);
  const [files, setFiles] = useState(null);
  const [formData, setFormData] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreate();
  };

  const handleCreate = async () => {
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const form = new FormData();
          form.append('file', file);
          form.append('upload_preset', 'booking');

          const { data } = await uploadImage(form);
          const { url } = data;
          return url;
        }));

      const newHotel = {
        ...formData,
        rooms,
        photos: list,
      };

      if (!slug) {
        await createHotel({ ...newHotel });
        navigate('/hotels');
      } else {
        const hotelId = formData._id;
        await updateHotel(hotelId, newHotel);
        navigate(`/hotels/${hotelId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    slug && (async () => {
      try {
        const { data } = await getHotelBySlug(slug);
        setFormData({ ...data.hotel });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [slug]);

  return (
    <div className='new'>
      <Sidebar />
      <div className='new-container'>
        <Navbar />
        <div className='top'>
          <h1>{slug ? 'Update hotel' : 'Add new hotel'}</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            {!slug ? (
              <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                }
                alt=''
              />
            ) : (
              <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : formData.photos && formData.photos[0]
                }
                alt=''
              />
            )}
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
                  style={{ display: 'none' }}
                  onChange={(e) => setFiles(e.target.files)}
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
                      value={formData[id] || ''}
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
              <button type='submit'>{slug ? 'Update' : 'Send'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
