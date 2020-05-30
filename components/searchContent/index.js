import React, { useEffect, useState } from 'react';

//Component import
import ProductDetail from '../ProductDetail';
import Display from '../display';
//material ui imports
import { Container, Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { useRouter } from 'next/router';


//hook imports
import useProducts from '../../hooks/useProducts';

//style imports
import useStyles from './style';
const SearchContent = () => {
    const router = useRouter();
    const { query: { q } } = router;

    //styles
    const classes = useStyles();
    //use hook
    const { products, done } = useProducts("dateOfCreation");

    //local state
    const [result, setResult] = useState([])
    useEffect(() => {
        const getProducts = () => {
            const search = q.toLowerCase();
            const filter = products.filter(product => {
                return (
                    product.name.toLowerCase().includes(search) ||
                    product.description.toLowerCase().includes(search)
                )
            })
            console.log(filter)
            setResult(filter);
        }
        getProducts();
    }, [q, products]);

    return (
        <Container className={classes.container}>
            <Grid container direction="column" justify="center" alignItems="center" spacing={1}>

                {result.length > 0 && done &&
                    result.map(product => {
                        return <ProductDetail key={product.id} product={product} />
                    })


                }
                {result.length === 0 && done &&
                    <Display src="/noResults.svg" text="There are no results for your search" />
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

export default SearchContent;
