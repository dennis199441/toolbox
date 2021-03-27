import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Title from './Title';
import { queryBlogs, updateBlog, deleteBlog } from '../../../utils/blog';

// Generate Order Data
function createData(id, title, author, published, createAt, updateAt) {
  published = Boolean(published);
  return { id, title, author, published, createAt, updateAt };
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
  { field: 'author', headerName: 'Author', width: 200 },
  {
    field: 'published',
    headerName: 'Published',
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
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await queryBlogs(1, 10);
      let newRows = res.data.blogs.map(blog => {
        return createData(blog.id, blog.title, blog.author, blog.published, blog.creationTime, blog.updateTime);
      })
      setRows(newRows);
    }
    fetchData();
  }, []);

  const onSelectionChange = (newSelection) => {
    setSelected(newSelection.rowIds);
  }

  const handleCreate = () => {
    history.push('/secure/blog/create');
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the selected ${selected.length} blog(s)?`)) {
      await Promise.all(selected.map(async (id) => {
        await deleteBlog(id);
      }));
      window.location.reload();
    }
  }

  const handlePublish = async () => {
    if (window.confirm(`Are you sure you want to publish the selected ${selected.length} blog(s)?`)) {
      await Promise.all(selected.map(async (id) => {
        await updateBlog({ id: id, published: true });
      }));
      window.location.reload();
    }
  }

  const handleUnpublish = async () => {
    if (window.confirm(`Are you sure you want to unpublish the selected ${selected.length} blog(s)?`)) {
      await Promise.all(selected.map(async (id) => {
        await updateBlog({ id: id, published: false });
      }));
      window.location.reload();
    }
  }

  return (
    <React.Fragment>
      <Title>Blog</Title>
      <div style={{ height: 650, width: 1200 }}>
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