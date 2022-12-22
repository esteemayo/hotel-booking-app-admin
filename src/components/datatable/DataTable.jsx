import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';

import { getRooms } from 'services/roomService';
import { deleteUser, getUsers } from 'services/userService';
import { deleteHotel, getHotels } from 'services/hotelService';

import './datatable.scss';

const DataTable = ({ columns }) => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (path === 'users') {
          const { data } = await getUsers();
          setData(data.users);
        } else if (path === 'hotels') {
          const { data } = await getHotels();
          setData(data.hotels);
        } else {
          const { data } = await getRooms()
          setData(data.rooms);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [path]);

  const handleDelete = async (id) => {
    if (window.confirm(
      `Are you sure you want to delete this ${path === 'users' ? 'user' : 'hotel' ? 'room' : ''}`
    )) {
      await deleteData(id);
    }
  };

  const deleteData = async (id) => {
    try {
      setData((data) => {
        return data.filter((item) => item._id !== id);
      });

      if (path === 'users') {
        await deleteUser(id);
      } else {
        await deleteHotel(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cell-action'>
            <Link to={`/${path}/${params.row._id}`}>
              <button className='view-button'>View</button>
            </Link>
            <button
              className='delete-button'
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className='datatable'>
      <div className='datatable-title'>
        {path}
        <Link to={`/${path}/new`} className='link'>
          Add new
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        className='data-grid'
      />
    </div>
  );
};

export default DataTable;
