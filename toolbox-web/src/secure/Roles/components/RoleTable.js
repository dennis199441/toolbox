import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Title from './Title';

// Generate Order Data
function createData(id, name, desc, createAt, lastLogin) {
  return { id, name, desc, createAt, lastLogin };
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'desc', headerName: 'Description', width: 500 },
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
  createData(0, 'Admin', 'Can access all APIs', '16 Mar, 2020', '8 Feb, 2021'),
  createData(1, 'Operator', 'Can access some APIs', '16 Mar, 2020', '8 Feb, 2021')
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
      <Title>Roles</Title>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
      </div>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Roles
        </Link>
      </div>
    </React.Fragment>
  );
}