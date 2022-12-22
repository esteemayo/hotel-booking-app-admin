import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const navigate = useNavigate()
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);

    count === 0 && navigate('/login');
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div>
      <h2>Redirecting you in {count} seconds</h2>
    </div>
  );
};

export default LoadingToRedirect;
