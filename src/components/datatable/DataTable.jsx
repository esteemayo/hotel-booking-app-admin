import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';

import { deleteRoom, getRooms } from 'services/roomService';
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
        switch (path) {
          case 'users':
            const userRes = await getUsers();
            setData(userRes.data.users);
            break;

          case 'hotels':
            const hotelRes = await getHotels();
            setData(hotelRes.data.hotels);
            break;

          case 'rooms':
            const roomRes = await getRooms();
            setData(roomRes.data.rooms);
            break;

          default:
            break;
        };
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

      switch (path) {
        case 'users':
          await deleteUser(id);
          break;

        case 'hotels':
          await deleteHotel(id);
          break;

        case 'rooms':
          await deleteRoom(id);
          break;

        default:
          break;
      };
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
            <Link to={`/${path}/${params.row._id}`} state={params.row}>
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
