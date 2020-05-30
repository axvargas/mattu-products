import React from 'react';
//material ui import
import { Backdrop, CircularProgress } from '@material-ui/core';

//style import
import useStyles from './style';

const Loading = ({ open }) => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loading;
