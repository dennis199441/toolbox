import React from 'react';
import { logout, isLogin } from '../utils';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function NavLogoutBtn() {

    let history = useHistory();

    const handleClick = () => {
        logout();
        history.push("/");
    }

    if (!isLogin()) {
        return null;
    }

    return (
        <ListItem onClick={handleClick} button key={"Logout"}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={"Logout"} />
        </ListItem>
    )
}