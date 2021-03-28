import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const useStyles = makeStyles(() => ({
    largeButton: {
        width: 100
    },
    smallButton: {
        width: 50
    },
}));

export default function MenuBlogBtn() {
    const { width } = useWindowDimensions();
    const classes = useStyles();
    let history = useHistory();

    const handleClick = () => {
        history.push("/about");
    }

    const renderButton = () => {
        if (width > 700) {
            return <Button onClick={handleClick} color="inherit" className={classes.largeButton}>About</Button>;
        }
        return <Button onClick={handleClick} color="inherit" className={classes.smallButton}>About</Button>;
    }

    return renderButton();
}