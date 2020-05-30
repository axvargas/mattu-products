import React from 'react';

//Component import
import ProductDetail from '../ProductDetail';
import Display from '../display';
//material ui imports
import { Container, Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

//hook products import
import useProducts from '../../hooks/useProducts';

//Style import
import useStyles from './style';
const PopularContent = () => {
    //Styles
    const classes = useStyles();

    //useProducts
    const { products, done } = useProducts('votes');
    return (
        <Container className={classes.container}>
            <Grid container direction="column" justify="center" alignItems="center" spacing={1}>

                {products.length > 0 && done &&
                    products.map(product => {
                        return <ProductDetail key={product.id} product={product} />
                    })

                }
                {products.length === 0 && done &&
                    <Display src="/noResults.svg" text="There aren't popular products" />

                }
                {!done &&
                    <>
                        <Skeleton variant="text" width="100%" height={118} />
                        <Skeleton variant="text" width="100%" height={118} />
                        <Skeleton variant="text" width="100%" height={118} />
                        <Skeleton variant="text" width="100%" height={118} />
                        <Skeleton variant="text" width="100%" height={118} />

                    </>
                }
            </Grid>
        </Container >
    );
}

export default PopularContent;
