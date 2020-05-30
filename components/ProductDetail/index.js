import React from 'react';
import Link from 'next/link';
//Date fns import
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
//material ui imports 
import { Grid, Typography, Paper, ButtonBase, IconButton, Button } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
//Style import
import useStyles from './style';
const ProductDetail = ({ product }) => {
    //Styles
    const classes = useStyles();

    //Destructuring pof product
    const { id, comments, dateOfCreation, company, description, name, votes, url, imgUrl } = product;


    return (
        <Grid item xs={12} className={classes.grid}>
            {/* <div> */}
            <Paper className={classes.paper} >
                <Grid container spacing={2} justify="center">
                    <Grid item >
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="product" src={imgUrl} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} xs container>
                        <Grid item xs container direction="column" justify="space-between" spacing={2}>
                            <Grid item xs>
                                <Link href="/products/[id]" as={`/products/${id}`}>
                                    <Typography gutterBottom variant="subtitle1" className={classes.bold}>
                                        {name}
                                    </Typography>
                                </Link>
                                <Typography variant="body2" gutterBottom>
                                    {description}
                                </Typography>

                            </Grid>

                            <Grid item xs container direction="column" justify="flex-end" spacing={2} >
                                <Grid item >
                                    <Typography variant="body2">
                                        {formatDistanceToNow(new Date(dateOfCreation))} ago
                                    </Typography>
                                </Grid>
                            </Grid>


                        </Grid>
                        <Grid item>
                            <Grid container direction="column" justify="center" alignItems="center" >

                                <Grid item>

                                    {/* <IconButton aria-label="vote" color="secondary"> */}
                                    <ThumbUpIcon fontSize="small" color="secondary" />
                                    {/* </IconButton> */}

                                </Grid>
                                <Grid item>
                                    {votes}
                                </Grid>
                                <Grid item style={{ marginTop: '1rem' }}></Grid>
                                <Grid item>
                                    <CommentIcon size="small" color="secondary" />
                                </Grid>
                                <Grid item>
                                    {comments.length}
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
            </Paper>

            {/* </div> */}
        </Grid>
    );
}

export default ProductDetail;
