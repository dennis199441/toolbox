import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Title from './Title';
import { createBlog, updateBlog, queryBlogById } from '../../../utils/blog';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  editor: {
    margin: theme.spacing(2, 1, 2),
    height: 550
  },
  button: {
    margin: theme.spacing(0, 62, 0),
  },
}));

export default function BlogForm(props) {

  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState();
  const [error, setError] = useState(false);
  const classes = useStyles();
  const [htmlContent, setHtmlContent] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    async function fetchData() {
      let res = await queryBlogById(id);
      if (res.data && res.data.length === 1) {
        let blog = res.data[0];
        setTitle(blog.title);
        setHtmlContent(blog.content);
        const blocksFromHtml = htmlToDraft(blog.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        setEditorState(EditorState.createWithContent(contentState));
      }
    }

    if (id && id !== "create") {
      fetchData();
    }
  }, [id]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setHtmlContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError(true);
      return false;
    }

    let access_token = localStorage.getItem('access_token');
    let userInfo = jwt.decode(access_token);
    let author = userInfo.identity.username;
    if (id && id !== "create") {
      let published = false;
      let data = await updateBlog({ id, title, author, content: htmlContent, published });
      if (data.code === 200) {
        window.alert("Update blog successfully!");
        history.replace('/secure/blog');
      }
    } else {
      let data = await createBlog(title, author, htmlContent, false);
      if (data.code === 200) {
        window.alert("Create blog successfully!");
        history.replace('/secure/blog');
      }
    }

    return false;
  }

  const handleCancel = () => {
    history.replace('/secure/blog');
  }

  const handleTitleChange = async (e) => {
    setTitle(e.target.value)
    setError(false);
  }

  return (
    <React.Fragment>
      <Title>Blog Details</Title>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          error={error}
          helperText="Please input title."
          value={title}
          onChange={handleTitleChange}
        />
        <div className={classes.editor}>
          <Editor
            editorStyle={{ border: "1px solid #d4d4d4", height: 450, borderRadius: 5, overflowY: "auto" }}
            editorState={editorState}
            wrapperClassName="blog-wrapper"
            editorClassName="blog-editor"
            spellCheck={true}
            handlePastedText={() => false}
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <div className={classes.button}>
          <Button type="submit" variant="text" color="primary">
            Submit
          </Button>
          <Button type="button" variant="text" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}
