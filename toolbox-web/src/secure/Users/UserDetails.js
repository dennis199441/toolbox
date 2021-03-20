import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UserDetailsForm from './components/UserDetailsForm';
import UserRolesForm from './components/UserRolesForm';
import NavBar from '../../common/NavBar';
import Copyright from '../../common/Copyright';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 0,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'visible',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function UserDetails() {
    
    const { username } = useParams();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavBar />
            <CssBaseline />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <UserDetailsForm username={username} />
                            </Paper>
                            <br/>
                            <Paper className={classes.paper}>
                                <UserRolesForm username={username} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}