import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DriveFolderUploadOutlined } from '@mui/icons-material';

import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import { uploadImage } from 'services/imageService';
import { createUser, getUser } from 'services/userService';

import './updateUser.scss';

const UpdateUser = ({ inputs, title }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userId = pathname.split('/')[2];

  const [file, setFile] = useState('');
  const [info, setInfo] = useState({
    name: '',
    username: '',
    email: '',
    country: '',
    phone: '',
    city: '',
  });

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      ...info,
    }

    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'booking');

    try {
      if (file) {
        const { data } = await uploadImage(form);
        const { url } = data;
        credentials.img = url;
      }

      await createUser({ ...credentials });
      navigate('/users');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUser(userId);
        setInfo({ ...data.user });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userId]);

  return (
    <div className='new'>
      <Sidebar />
      <div className='new-container'>
        <Navbar />
        <div className='top'>
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt='avatar'
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              {inputs.map((item) => {
                const { id, name, type, label, placeholder } = item;
                return (
                  <div className='form-input' key={id}>
                    <label htmlFor={id}>{label}</label>
                    <input
                      id={id}
                      name={name}
                      type={type}
                      onChange={handleChange}
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

export default UpdateUser;
