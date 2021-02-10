import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(key, value, type) {
  return { key, value, type };
}

const rows = [
  createData('Username', 'dennis', 'text'),
  createData('Email', 'denni@gmailcom', 'email'),
  createData('Password', '********', 'password'),
];

export default function ProfileForm() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Profile</Title>
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
