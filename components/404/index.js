import React from 'react';
import { Container } from '@material-ui/core';
//component import
import Display from '../display';
import useStyles from './style';
const Error404 = () => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Display src="/404.svg" text="Page not found" />
        </Container>

    );
}

export default Error404;
