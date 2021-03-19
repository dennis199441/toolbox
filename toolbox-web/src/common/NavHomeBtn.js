import React from 'react';
import Link from '@material-ui/core/Link';
import logo from '../static/logo.png';

export default function NavHomeBtn() {
    return (
        <Link href="/">
            <img src={logo} alt="CodingDaily.dev" />
        </Link>
    )
}