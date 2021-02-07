import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavDrawer from './NavDrawer';
import { isLogin } from '../utils';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export default function NavBar() {
  const classes = useStyles();

  let history = useHistory();

  const handleHome = () => {
    history.push("/");
  }

  const handleAbout = () => {
    history.push("/about");
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Console
          </Typography>
          <Button onClick={handleHome} color="inherit">Home</Button>
          <Button onClick={handleAbout} color="inherit">About</Button>
        </Toolbar>
      </AppBar>
      {isLogin() ? <NavDrawer /> : null}
    </div>
  );
}