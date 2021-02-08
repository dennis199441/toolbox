import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function NavAboutBtn() {

    let history = useHistory();

    const handleClick = () => {
        history.push("/about");
    }

    return (
        <Button onClick={handleClick} color="inherit">About</Button>
    )
}