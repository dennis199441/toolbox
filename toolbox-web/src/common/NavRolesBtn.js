import React from 'react';
import { isLogin } from '../utils';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

export default function NavRolesBtn() {

    let history = useHistory();

    const handleClick = () => {
        history.push("/secure/roles");
    }

    if (!isLogin()) {
        return null;
    }

    return (
        <ListItem onClick={handleClick} button key={"Roles"}>
            <ListItemIcon><AccessibilityIcon /></ListItemIcon>
            <ListItemText primary={"Roles"} />
        </ListItem>
    )
}