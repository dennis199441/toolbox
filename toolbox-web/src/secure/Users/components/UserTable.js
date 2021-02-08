import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Title from './Title';

// Generate Order Data
function createData(id, name, email, roles, activate, createAt, lastLogin) {
  return { id, name, email, roles, activate, createAt, lastLogin };
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'roles', headerName: 'Roles', width: 150 },
  { field: 'activate', headerName: 'Activate', width: 150 },
  {
    field: 'createAt',
    headerName: 'Create At',
    sortable: true,
    width: 135,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    sortable: true,
    width: 135,
  },
];

const rows = [
  createData(0, 'Elvis Presley', 'elvis@codingdaily.dev', "Admin", true, '16 Mar, 2020', '8 Feb, 2021'),
  createData(1, 'Paul McCartney', 'paul@codingdaily.dev', "Operator", true, '16 Sep, 2020', '8 Feb, 2021'),
  createData(2, 'Tom Scholz', 'tom@codingdaily.dev', "Tester", true, '16 Oct, 2020', '8 Feb, 2021'),
  createData(3, 'Michael Jackson', 'michael@codingdaily.dev', "Operator", false, '16 Nov, 2020', '8 Feb, 2021'),
  createData(4, 'Bruce Springsteen', 'bruce@codingdaily.dev', "Admin", false, '16 Dec, 2020', '8 Feb, 2021'),
  createData(5, 'Mary Pearson', 'mary@codingdaily.dev', "Operator", false, '16 Dec, 2020', '8 Feb, 2021'),
  createData(6, 'Harry Potter', 'harry@codingdaily.dev', "Monitor", false, '16 Dec, 2020', '8 Feb, 2021'),
  createData(7, 'John Doe', 'john@codingdaily.dev', "Tester", false, '16 Dec, 2020', '8 Feb, 2021'),
  createData(8, 'Ken McDonald', 'ken@codingdaily.dev', "Tester", false, '16 Dec, 2020', '8 Feb, 2021'),
  createData(9, 'Sally McDowell', 'sally@codingdaily.dev', "Monitor", false, '16 Dec, 2020', '8 Feb, 2021'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function UserTable() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Users</Title>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
      </div>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Users
        </Link>
      </div>
    </React.Fragment>
  );
}