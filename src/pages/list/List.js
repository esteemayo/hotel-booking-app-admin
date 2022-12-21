import { useLocation } from 'react-router-dom';

import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import DataTable from 'components/datatable/DataTable';

import './list.scss';

const List = ({ columns }) => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];

  return (
    <div className='list'>
      <Sidebar />
      <div className='list-container'>
        <Navbar />
        <DataTable path={path} columns={columns} />
      </div>
    </div>
  );
};

export default List;
