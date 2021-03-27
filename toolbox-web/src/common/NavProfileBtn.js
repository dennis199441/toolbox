import React from 'react';
import { isLogin } from '../utils/auth';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

export default function NavProfileBtn() {

    let history = useHistory();

    const handleClick = () => {
        history.push("/secure/profile");
    }

    if (!isLogin()) {
        return null;
    }

    return (
        <ListItem onClick={handleClick} button key={"Profile"}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary={"Profile"} />
        </ListItem>
    )
}