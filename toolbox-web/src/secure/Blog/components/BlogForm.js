import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Title from './Title';

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

  const history = useHistory();
  const [error, setError] = useState(false);
  const classes = useStyles();
  const [htmlContent, setHtmlContent] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setHtmlContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(htmlContent);
    let title = e.target[0].value;
    if (!title) {
      setError(true);
      return false;
    }
    return false;
  }

  const handleCancel = () => {
    history.replace('/secure/blog');
  }
  
  const handleTitleChange = async () => {
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
