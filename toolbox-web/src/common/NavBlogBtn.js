import React from 'react';
import { isLogin } from '../utils';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookIcon from '@material-ui/icons/Book';

export default function NavLogoutBtn() {

    let history = useHistory();

    const handleClick = () => {
        history.push("/secure/blog");
    }

    if (!isLogin()) {
        return null;
    }

    return (
        <ListItem onClick={handleClick} button key={"Blog"}>
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText primary={"Blog"} />
        </ListItem>
    )
}