import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Title from './Title';
import { getUsers, activateUser, deactivateUser } from '../../../utils';

// Generate Order Data
function createData(id, name, email, activate, createAt, lastLogin) {
  return { id, name, email, activate, createAt, lastLogin };
}

const columns = [
  { field: 'name', headerName: 'Username', width: 200 },
  { field: 'email', headerName: 'Email', width: 350 },
  { field: 'activate', headerName: 'Activate', width: 150 },
  {
    field: 'createAt',
    headerName: 'Created At',
    sortable: true,
    width: 200,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    sortable: true,
    width: 200,
  },
];

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

  const handleActivate = () => {
    async function fetchData() {
      for (let i = 0; i < selected.length; i++) {
        await activateUser(selected[i]);
      }
    };
    fetchData()
  }

  const handleDeactivate = () => {
    async function fetchData() {
      for (let i = 0; i < selected.length; i++) {
        await deactivateUser(selected[i]);
      }
    };
    fetchData();
  }

  return (
    <React.Fragment>
      <Title>Users</Title>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onSelectionChange={onSelectionChange} />
      </div>
      <div className={classes.seeMore}>
        <Button onClick={handleActivate} color="primary">Activate</Button>
        <Button onClick={handleDeactivate} color="secondary">Deactivate</Button>
      </div>
    </React.Fragment>
  );
}