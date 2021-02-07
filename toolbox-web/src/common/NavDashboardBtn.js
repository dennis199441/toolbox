import React from 'react';
import { isLogin } from '../utils';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default function NavLogoutBtn() {

    let history = useHistory();

    const handleClick = () => {
        history.push("/secure/dashboard");
    }

    if (!isLogin()) {
        return null;
    }

    return (
        <ListItem onClick={handleClick} button key={"Dashboard"}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary={"Dashboard"} />
        </ListItem>
    )
}