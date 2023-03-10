import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from 'services/authService';
import { RESET } from 'context/auth/AuthTypes';
import { useGlobalAuthContext } from 'context/auth/AuthContext';
import './login.scss';

const initialState = {
  username: '',
  password: '',
};

const Login = ({ inputs }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(initialState);
  const { user, dispatch, isSuccess, isError, isLoading, loginFailure, loginStart, loginSuccess }
    = useGlobalAuthContext();

  const handleChange = ({ target: input }) => {
    const { id, value } = input;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleLogin = async () => {
    loginStart();
    try {
      const { data } = await login({ ...credentials });

      if (data.role === 'admin') {
        loginSuccess({ ...data.details });
      } else {
        loginFailure({ message: 'You are not allowed' });
      }
    } catch (err) {
      loginFailure(err.response.data);
    }
  };

  useEffect(() => {
    user && isSuccess && navigate('/');
    return () => dispatch({ type: RESET });
  }, [user, isSuccess, dispatch, navigate]);

  return (
    <div className='login'>
      <div className='login__container'>
        {inputs.map((input) => {
          const { id, type, placeholder } = input;
          return (
            <input
              id={id}
              key={id}
              type={type}
              placeholder={placeholder}
              onChange={handleChange}
              className='login__input'
            />
          );
        })}
        <button
          type='submit'
          disabled={isLoading}
          onClick={handleSubmit}
          className='login__button'
        >
          Login
        </button>
        {isError && <span className='login__isError'>{isError.message}</span>}
      </div>
    </div>
  );
};

export default Login;
