import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Title from './Title';

// Generate Order Data
function createData(id, name, email, roles, activate, createAt, lastLogin) {
  return { id, name, email, roles, activate, createAt, lastLogin };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const handleSubmit = (event) => {
  console.log(event);
}

export default function ProfileForm() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Profile</Title>
      <FormControl>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input id="username" aria-describedby="username" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="email">Email address</InputLabel>
        <Input id="email" aria-describedby="email" />
      </FormControl>
    </React.Fragment>
  );
}