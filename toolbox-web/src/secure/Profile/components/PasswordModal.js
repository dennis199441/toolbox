import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { changePassword } from '../../../utils';

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

export default function PasswordModal() {

  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let oldPassword = e.target[0].value;
    let newPassword = e.target[2].value;
    if (!oldPassword) {
      setOldPasswordError(true);
      return false;
    }

    if (!newPassword) {
      setNewPasswordError(true);
      return false;
    }

    try {
      const data = await changePassword(oldPassword, newPassword);
      if (data) {
        window.location.reload();
      } else {
        window.alert("Failed to change password");
      }
    } catch (e) {
      console.error(e);
      return false
    }
  }

  const handleOldChange = async () => {
    setOldPasswordError(false);
  }

  const handleNewChange = async () => {
    setNewPasswordError(false);
  }

  return (
    <div>
      <Typography color="primary" align="center">Update password</Typography>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="oldPassword"
          label="Old password"
          name="oldPassword"
          autoComplete="oldPassword"
          autoFocus
          error={oldPasswordError}
          helperText="Please input your old password."
          onChange={handleOldChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="newPassword"
          label="New password"
          name="newPassword"
          autoComplete="newPassword"
          error={newPasswordError}
          helperText="Please input your new password."
          onChange={handleNewChange}
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
