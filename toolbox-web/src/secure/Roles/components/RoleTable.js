import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Title from './Title';
import { getRoles } from '../../../utils';

// Generate Order Data
function createData(id, name, desc, createAt, updateAt) {
  return { id, name, desc, createAt, updateAt };
}

const columns = [
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'desc', headerName: 'Description', width: 500 },
  {
    field: 'createAt',
    headerName: 'Created At',
    sortable: true,
    width: 135,
  },
  {
    field: 'updateAt',
    headerName: 'Updated At',
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
  const [selected, setSelected] = useState([]);
    
  useEffect(() => {
    async function fetchData() {
      const data = await getRoles();
      let roles = data.map((role) => {
        return createData(role.name, role.name, role.description, role.created_at, role.updated_at)
      });
      setRows(roles)
    };
    fetchData()
  }, []);

  const classes = useStyles();
  
  const onSelectionChange = (newSelection) => {
    setSelected(newSelection.rowIds);
  }

  return (
    <React.Fragment>
      <Title>Roles</Title>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onSelectionChange={onSelectionChange} />
      </div>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Roles
        </Link>
      </div>
    </React.Fragment>
  );
}