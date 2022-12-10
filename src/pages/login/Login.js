import { useState } from 'react';
import './login.scss';

const Login = () => {
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button type='submit'>Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  );
};

export default Login;
