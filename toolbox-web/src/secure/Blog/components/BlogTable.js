import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Title from './Title';

// Generate Order Data
function createData(id, title, author, createAt, updateAt) {
  return { id, title, author, createAt, updateAt };
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 500 },
  { field: 'author', headerName: 'Author', width: 250 },
  {
    field: 'createAt',
    headerName: 'Create At',
    sortable: true,
    width: 160,
  },
  {
    field: 'updateAt',
    headerName: 'Update At',
    sortable: true,
    width: 160,
  },
];

const rows = [
  createData(0, 'Title 1', 'dennis', '16 Mar, 2020', '8 Feb, 2021'),
  createData(1, 'Title 2', 'dennis','16 Sep, 2020', '8 Feb, 2021')
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function BlogTable() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Blog</Title>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
      </div>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Blog
        </Link>
      </div>
    </React.Fragment>
  );
}