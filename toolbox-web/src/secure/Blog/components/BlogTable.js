import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Title from './Title';

// Generate Order Data
function createData(id, title, author, publishedAt, createAt, updateAt) {
  return { id, title, author, publishedAt, createAt, updateAt };
}

const columns = [
  {
    field: 'title',
    headerName: 'Title',
    width: 500,
    renderCell: (params) => {
      let url = "/secure/blog/" + params.row.id;
      return <Link to={url}>{params.value}</Link>
    },
  },
  { field: 'author', headerName: 'Author', width: 250 },
  {
    field: 'publishedAt',
    headerName: 'Published At',
    sortable: true,
    width: 135,
  },
  {
    field: 'createAt',
    headerName: 'Create At',
    sortable: true,
    width: 135,
  },
  {
    field: 'updateAt',
    headerName: 'Update At',
    sortable: true,
    width: 135,
  },
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function BlogTable() {

  const history = useHistory();
  const classes = useStyles();
  const [rows, setRows] = useState([
    createData(0, 'Title 1', 'dennis', '17 Mar, 2020', '16 Mar, 2020', '8 Feb, 2021'),
    createData(1, 'Title 2', 'dennis', '17 Mar, 2020', '16 Sep, 2020', '8 Feb, 2021')
  ]);
  const [selected, setSelected] = useState([]);

  const onSelectionChange = (newSelection) => {
    setSelected(newSelection.rowIds);
  }

  const handleCreate = () => {
    history.push('/secure/blog/create');
  }

  const handleDelete = () => {

  }

  const handlePublish = () => {

  }

  const handleUnpublish = () => {

  }

  return (
    <React.Fragment>
      <Title>Blog</Title>
      <div style={{ height: 700, width: 1245 }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onSelectionChange={onSelectionChange} />
      </div>
      <div className={classes.seeMore}>
        <Button onClick={handleCreate} color="primary">Create</Button>
        <Button onClick={handleDelete} color="secondary">Delete</Button>
        <Button onClick={handlePublish} color="primary">Publish</Button>
        <Button onClick={handleUnpublish} color="secondary">Unpublish</Button>
      </div>
    </React.Fragment>
  );
}