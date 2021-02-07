import React from 'react';
import { isLogin } from '../utils';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';

export default function NavLogoutBtn() {

    let history = useHistory();

    const handleClick = () => {
        history.push("/secure/users");
    }

    if (!isLogin()) {
        return null;
    }

    return (
        <ListItem onClick={handleClick} button key={"Users"}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary={"Users"} />
        </ListItem>
    )
}