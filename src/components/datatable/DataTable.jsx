import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { getUsers } from 'services/userService';
import { userColumns, productColumns } from 'data';

import './datatable.scss';

const DataTable = ({ path }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUsers();
        setData(data.users);
      } catch (err) {
        console.log(err);
      }
    })()
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user')) {
      // setData((data) => {
      //   return data.filter((item) => item.id !== id);
      // });
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
            <Link to={`/${path}/${params.row.id}`}>
              <button className='view-button'>View</button>
            </Link>
            <button
              className='delete-button'
              onClick={() => handleDelete(params.row.id)}
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
        {path === 'users' ? 'Add new user' : 'Add new product'}
        <Link to={`/${path}/new`} className='link'>
          Add new
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={
          path === 'users'
            ? userColumns.concat(actionColumn)
            : productColumns.concat(actionColumn)
        }
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
