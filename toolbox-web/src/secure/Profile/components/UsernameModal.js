import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { changeUsername } from '../../../utils';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UsernameModal() {

  const [error, setError] = useState(false);
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    if (!username) {
      setError(true);
      return false;
    }
    try {
      const data = await changeUsername(username);
      if (data) {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  const handleChange = async () => {
    setError(false);
  }

  return (
    <div>
      <Typography color="primary" align="center">Update username</Typography>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          error={error}
          helperText="Please input username."
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Update
          </Button>
      </form>
    </div>
  )
}
