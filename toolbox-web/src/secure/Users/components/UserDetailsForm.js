import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { getUserDetails } from '../../../utils/auth';

const useStyles = makeStyles({
  table: {
    width: 1200,
  },
});

function createData(key, value, type) {
  return { key, value, type };
}

export default function UserDetailsForm(props) {

  const history = useHistory();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserDetails(props.username);
      if (!data.username) {
        history.replace("/secure/users");
        return;
      }
      const user = [
        createData('Username', data.username, 'text'),
        createData('Email', data.email, 'email'),
        createData('Password', '********', 'password'),
      ];

      setRows(user);
    };
    fetchData()
  }, [history, props.username]);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>User Details</Title>
      <Table className={classes.table} aria-label="profile">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell align="left" scope="row">
                <Typography align="left">
                  {row.key}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography align="left">
                  {row.value}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
