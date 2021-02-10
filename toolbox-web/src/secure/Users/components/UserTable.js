import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Title from './Title';
import { getUsers } from '../../../utils';

// Generate Order Data
function createData(id, name, email, activate, createAt, lastLogin) {
  return { id, name, email, activate, createAt, lastLogin };
}

const columns = [
  { field: 'name', headerName: 'Username', width: 300 },
  { field: 'email', headerName: 'Email', width: 350 },
  { field: 'activate', headerName: 'Activate', width: 150 },
  {
    field: 'createAt',
    headerName: 'Created At',
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

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function UserTable() {

  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUsers();
      let users = data.map((user) => {
        let is_active = user.is_active === 1 ? true : false;
        return createData(user.username, user.username, user.email, is_active, user.created_at, user.last_login)
      });
      setRows(users)
    };
    fetchData()
  }, []);

  const classes = useStyles();

  const onSelectionChange = (newSelection) => {
    setSelected(newSelection.rowIds);
  }

  return (
    <React.Fragment>
      <Title>Users</Title>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onSelectionChange={onSelectionChange} />
      </div>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Users
        </Link>
      </div>
    </React.Fragment>
  );
}