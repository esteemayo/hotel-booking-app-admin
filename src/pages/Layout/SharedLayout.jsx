import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const SharedLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default SharedLayout;
