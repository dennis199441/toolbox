import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { getCurrentUser } from '../../../utils';
import UsernameModal from './UsernameModal';
import PasswordModel from './PasswordModal';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
}));

function createData(key, value, type) {
  return { key, value, type };
}

export default function ProfileForm() {

  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getCurrentUser();
      const user = [
        createData('Email', data.email, 'email'),
        createData('Username', data.username, 'text'),
        createData('Password', '********', 'password'),
      ];

      setRows(user);
    };
    fetchData()
  }, []);

  const handleClick = (key) => {
    if (key === 'Username') {
      setModal("username");
      setOpen(true);
    }

    if (key === 'Password') {
      setModal("password");
      setOpen(true);
    }
  }

  return (
    <React.Fragment>
      <Title>Profile</Title>
      <Table className={classes.table} aria-label="profile">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key} onClick={() => handleClick(row.key)}>
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {modal === "username" ? <UsernameModal/> : <PasswordModel/>}
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
