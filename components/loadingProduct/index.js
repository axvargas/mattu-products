import React from 'react';
//material ui import
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core'

//style import
import useStyles from './style';

const LoadingProduct = ({ open }) => {
    const classes = useStyles();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Skeleton variant="text" width="100%" height={100} />
                </Grid>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <Skeleton variant="text" width="100%" height={50} />
                    <Skeleton variant="rect" width="100%" height={500} />
                    <Skeleton variant="text" width="100%" height={100} />
                    <Skeleton variant="text" width="100%" height={100} />
                    <Skeleton variant="text" width="100%" height={100} />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>

                    <Skeleton variant="rect" width="100%" height={100} />
                    <Skeleton variant="rect" width="100%" height={100} />
                </Grid>
            </Grid>


        </>
    );
}

export default LoadingProduct;
