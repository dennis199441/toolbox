import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Title from './Title';
import { getRoles } from '../../../utils/index';

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

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function RoleTable() {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRoles();
      let roles = data.map((role) => {
        return createData(role.id, role.name, role.description, role.created_at, role.updated_at)
      });
      setRows(roles)
    };
    fetchData()
  }, []);

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