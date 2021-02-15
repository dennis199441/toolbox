import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Title from './Title';
import { createRole } from '../../../utils';

export default function RoleDetailsForm() {

  const history = useHistory(); 

  const handleSubmit = async(e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let description = e.target[2].value;
    if(!name || !description) {
      return false;
    }

    const data = await createRole(name, description);
    if(data.id) {
      history.replace('/secure/roles');
      return;
    }
  }

  return (
    <React.Fragment>
      <Title>Create Role</Title>
      <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Role name"
            name="name"
            autoFocus
          />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            label="Role description"
            name="description"
          />
        <Button type="submit" color="primary">Submit</Button>
      </form>
    </React.Fragment>
  );
}
