import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import logo from '../static/logo.png';

export default function NavHomeBtn() {

    let history = useHistory();

    const handleClick = () => {
        history.push("/");
    }

    return (
        <Button onClick={handleClick} color="inherit">
            <img src={logo} alt="CodingDaily.dev"/>
        </Button>
    )
}