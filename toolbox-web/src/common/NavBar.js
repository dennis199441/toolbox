import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavLogoutBtn from './NavLogoutBtn';
import NavBlogBtn from './NavBlogBtn';
import NavDashboardBtn from './NavDashboardBtn';
import NavProfileBtn from './NavProfileBtn';
import NavHomeBtn from './NavHomeBtn';
import NavUsersBtn from './NavUsersBtn';
import NavRolesBtn from './NavRolesBtn';
import { isLogin } from '../utils/auth';
import MenuAboutBtn from '../public/components/MenuAboutBtn';
import MenuBlogBtn from '../public/components/MenuBlogBtn';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  pageButtons: {
    marginLeft: 'auto',
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <List>
        <NavDashboardBtn />
        <NavBlogBtn />
      </List>
      <Divider />
      <List>
        <NavUsersBtn />
        <NavRolesBtn />
      </List>
      <Divider />
      <List>
        <NavProfileBtn />
        <NavLogoutBtn />
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {isLogin() ?
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            : null}
          <NavHomeBtn />
          <div className={classes.pageButtons}>
            <MenuAboutBtn />
            <MenuBlogBtn />
          </div>
        </Toolbar>
      </AppBar>
      {
        isLogin() ?
          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden implementation="css">
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                  <CloseIcon />
                </IconButton>
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          : null}
    </div>
  );
}