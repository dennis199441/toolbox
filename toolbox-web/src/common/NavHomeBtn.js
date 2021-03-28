import React from 'react';
import Link from '@material-ui/core/Link';
import logo from '../static/logo.png';
import icon from '../static/icon.png';
import useWindowDimensions from '../hooks/useWindowDimensions';

export default function NavHomeBtn() {

    const { width } = useWindowDimensions();

    return (
        <div>
            { width > 700 ?
                <Link href="/">
                    < img src={logo} alt="CodingDaily.dev" />
                </Link > :
                <Link href="/">
                    < img src={icon} alt="CodingDaily.dev" />
                </Link >
            }
        </div>

    )
}