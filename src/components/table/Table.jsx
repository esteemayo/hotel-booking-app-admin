import { format } from 'date-fns'

import useFetch from 'hooks/useFetch';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import './table.scss';

const List = () => {
  const { data } = useFetch('/users?new=true');

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell' style={{ fontSize: '1.6rem' }}>
              User ID
            </TableCell>
            <TableCell className='table-cell' style={{ fontSize: '1.6rem' }}>
              Name
            </TableCell>
            <TableCell className='table-cell' style={{ fontSize: '1.6rem' }}>
              Username
            </TableCell>
            <TableCell className='table-cell' style={{ fontSize: '1.6rem' }}>
              Date
            </TableCell>
            <TableCell className='table-cell' style={{ fontSize: '1.6rem' }}>
              Country
            </TableCell>
            <TableCell className='table-cell' style={{ fontSize: '1.6rem' }}>
              Role
            </TableCell>
            <TableCell className='table-cell' style={{ fontSize: '1.6rem' }}>
              Email Address
            </TableCell>
            <TableCell className='table-cell' style={{ fontSize: '1.6rem' }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className='table-cell' style={{ fontSize: '1.3rem' }}>
                <span className='table-user'>{user._id}</span>
              </TableCell>
              <TableCell className='table-cell' style={{ fontSize: '1.3rem' }}>
                <div className='cell-wrapper'>
                  <img
                    src={user.img ?? 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                    alt={user.username}
                    className='image'
                  />
                  {user.name}
                </div>
              </TableCell>
              <TableCell className='table-cell' style={{ fontSize: '1.3rem' }}>
                {user.username}
              </TableCell>
              <TableCell className='table-cell' style={{ fontSize: '1.3rem' }}>
                {format(new Date(user.createdAt), 'MM/dd/yyyy')}
              </TableCell>
              <TableCell className='table-cell' style={{ fontSize: '1.3rem' }}>
                {user.country}
              </TableCell>
              <TableCell className='table-cell' style={{ fontSize: '1.3rem' }}>
                {user.role}
              </TableCell>
              <TableCell className='table-cell' style={{ fontSize: '1.3rem' }}>
                {user.email}
              </TableCell>
              <TableCell className='table-cell' style={{ fontSize: '1.3rem' }}>
                <span className={`status ${user.active === true ? 'Active' : 'Inactive'}`}>
                  {user.active === true ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
