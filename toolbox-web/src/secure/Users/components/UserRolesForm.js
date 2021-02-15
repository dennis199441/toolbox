import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { getUserDetails, getUserRoles, revokeRole } from '../../../utils';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, name, description) {
  return { id, name, description };
}

export default function UserDetailsForm(props) {

  const history = useHistory();
  const [rows, setRows] = useState([]);

  const handleRevoke = async(e) => {
    let roleId = e.target.getAttribute('value');
    let user = await getUserDetails(props.username);
    await revokeRole(user.id, roleId);
    async function fetchData() {
      const data = await getUserRoles(props.username);
      const roles = data.map((role) => {
        return createData(role.id, role.name, role.description);
      })

      setRows(roles);
    };
    fetchData();
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getUserRoles(props.username);
      const roles = data.map((role) => {
        return createData(role.id, role.name, role.description);
      })

      setRows(roles);
    };
    fetchData()
  }, [history, props.username]);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Roles</Title>
      <Table className={classes.table} aria-label="profile">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography align="left"><b>Name</b></Typography>
            </TableCell>
            <TableCell align="left">
              <Typography align="left"><b>Description</b></Typography>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left" scope="row">
                <Typography align="left">
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography align="left">
                  {row.description}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button onClick={handleRevoke} color="secondary">
                <Typography align="left" value={row.id}>
                  Revoke
                </Typography>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
