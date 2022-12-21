export const userColumns = [
  {
    field: '_id',
    headerName: 'ID',
    width: 230,
  },
  {
    field: 'user',
    headerName: 'User',
    width: 230,
    renderCell: (params) => {
      return (
        <div className='cell-with-img'>
          <img
            className='cell-img'
            src={params.row.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
            alt='avatar'
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field:
      'email',
    headerName: 'Email',
    width: 230,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 100,
  },
  {
    field: 'city',
    headerName: 'City',
    width: 120,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
  },
];

export const hotelColumns = [
  {
    field: '_id',
    headerName: 'ID',
    width: 230,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 100,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 100,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 230,
  },
  {
    field: 'city',
    headerName: 'City',
    width: 100,
  },
  {
    field: 'cheapestPrice',
    headerName: 'Price',
    width: 90,
  },
];

export const roomColumns = [
  {
    field: '_id',
    headerName: 'ID',
    width: 230,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 230,
  },
  {
    field: 'desc',
    headerName: 'Description',
    width: 200,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100,
  },
  {
    field: 'maxPeople',
    headerName: 'Max People',
    width: 100,
  },
];
