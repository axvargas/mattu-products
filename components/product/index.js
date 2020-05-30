import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//component import
import Error404 from '../../components/404';
import LoadingProduct from '../../components/loadingProduct';
import Display from '../display';
//firebase context
import { FirebaseContext } from '../../firebase';
//material ui import
import { Container, Typography, Grid, TextField, Button, List, ListItem, ListItemText, Divider, Tooltip } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded';
import DeleteIcon from '@material-ui/icons/Delete';
//style import
import useStyles from './style';
//RHF import
import { useForm } from "react-hook-form";
//Date fns import
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
const Product = () => {
    const router = useRouter();
    const { query: { id } } = router;


    //context de firebase
    const { firebase, user } = useContext(FirebaseContext);
    //local state

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [consultDB, setConsultDB] = useState(true);


    //RHF hoook
    const { register, handleSubmit } = useForm();
    const classes = useStyles();
    //Destructuring pof product
    const { comments, dateOfCreation, company, description, name, votes, url, imgUrl, creator, hasVoted, imgId } = product;

    //EFFECT
    useEffect(() => {

        if (id && consultDB) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();
                if (product.exists) {
                    setProduct(product.data());
                    setConsultDB(null)
                } else {
                    setError(true);
                    setConsultDB(null)
                }

            }

            getProduct();
            console.log("Inside")
        }
    }, [id, consultDB]);
    // Administrate the votes
    const handleVote = async () => {
        if (!user) {
            return router.push("/");
        }
        //Obtain actual votes
        let productQuery2 = await firebase.db.collection('products').doc(id);
        let product2 = await productQuery2.get();
        let { votes } = product2.data();
        // Obtain and sumarize votes
        const newTotal = votes + 1;

        // Save the new voter
        if (hasVoted.includes(user.uid)) return;

        const newHasVoted = [...hasVoted, user.uid];
        //Update de DB

        await firebase.db.collection('products').doc(id).update({ votes: newTotal, hasVoted: newHasVoted });
        // Update State
        setProduct({
            ...product,
            votes: newTotal
        })

        setConsultDB(true);
    }

    const handleComment = async (data) => {
        console.log("Commenting")
        if (!user) return router.push("/");
        document.getElementById("form").reset();
        // add new info to the comment
        data.userId = user.uid;
        data.userName = user.displayName;

        //Lets take a copy of comments and add the new comment
        let productQuery2 = await firebase.db.collection('products').doc(id);
        let product2 = await productQuery2.get();
        let { comments } = product2.data();
        const newComments = [...comments, data];

        //Update the db
        await firebase.db.collection('products').doc(id).update({ comments: newComments });

        //Update state
        setProduct({
            ...product,
            comments: newComments
        })

        setConsultDB(true);
    }

    const isCreator = (id) => {
        if (creator.id === id) {
            return true;
        }
        return false;
    }

    const canDelete = () => {
        console.log("Can delete")
        if (!user) return false
        if (creator.id === user.uid) {
            return true
        }
    }

    const handleDeleteProduct = async () => {
        console.log("Deleting")
        if (!user) return router.push("/");
        if (creator.id !== user.uid) {
            return router.push("/");
        }
        try {
            await firebase.storage.ref(`products/${imgId}`).delete();
            await firebase.db.collection('products').doc(id).delete();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container className={classes.container}>
            {!error && Object.keys(product).length === 0 &&
                <LoadingProduct />
            }
            {error && <Error404 />}
            {Object.keys(product).length !== 0 &&
                <>
                    <Typography variant="h4" className={classes.typo}>{name}</Typography>

                    <Grid container justify="flex-start" alignItems="flex-start" spacing={2} className={classes.container}>
                        <Grid item lg={8} md={8} sm={12} xs={12}>
                            <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                                <Grid item>
                                    <Typography variant="body2">
                                        Published by {<strong>{creator.name}</strong>} from {<strong>{company}</strong>}
                                    </Typography>
                                    <Typography variant="body2">
                                        {formatDistanceToNow(new Date(dateOfCreation))} ago
                            </Typography>
                                </Grid>

                                <Grid item>
                                    <img src={imgUrl} alt={name} className={classes.img} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        {description}
                                    </Typography>
                                </Grid>
                                {user &&


                                    <Grid item>
                                        <Typography variant="subtitle1" className={classes.typo2}>
                                            Add a comment
                                        </Typography>
                                        <form id="form" className={classes.form} onSubmit={handleSubmit(handleComment)} noValidate>

                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rowsMax={6}
                                                        id="comment"
                                                        placeholder="Comment"
                                                        name="comment"
                                                        autoComplete="off"
                                                        // error={errors.description}
                                                        // helperText={errors.description && errors.description.message}
                                                        inputRef={register({ required: true })}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        type="reset"
                                                        fullWidth
                                                        variant="contained"
                                                        color="secondary"
                                                    // onClick={handleCancel}
                                                    // className={classes.submit}
                                                    >
                                                        cancel
                                    </Button>

                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"

                                                    // className={classes.submit}
                                                    >
                                                        add a comment
                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>

                                    </Grid>
                                }
                                <Grid item className={classes.comments}>
                                    <Typography variant="subtitle1" className={classes.typo2}>
                                        Comments
                            </Typography>

                                    <List className={classes.root} >


                                        {comments.length > 0 ?
                                            comments.map((comment, i) => (
                                                <Fragment key={`${i}${comment.userId}${comment.userName}`}>
                                                    <ListItem alignItems="flex-start" >
                                                        <ListItemText

                                                            // primary="Brunch this weekend?"
                                                            secondary={
                                                                <React.Fragment>
                                                                    <Grid container direction="row" alignItems="flex-start" >
                                                                        {isCreator(comment.userId) &&
                                                                            <Grid item>
                                                                                <Tooltip title="Creator" placement="top" arrow>
                                                                                    <EmojiObjectsRoundedIcon color="secondary" />
                                                                                </Tooltip>
                                                                            </Grid>
                                                                        }

                                                                        <Grid item>
                                                                            <Typography
                                                                                component="span"
                                                                                variant="subtitle1"
                                                                                className={classes.inline}
                                                                                color="textPrimary"
                                                                            >
                                                                                {comment.userName}
                                                                            </Typography>
                                                                            {` — ${comment.comment}`}
                                                                        </Grid>
                                                                    </Grid>
                                                                </React.Fragment>
                                                            }
                                                        />

                                                    </ListItem>
                                                    <Divider />
                                                </Fragment>

                                            ))
                                            :
                                            <>
                                                <Divider />
                                                <Display src="/noComments.svg" text="There are no comments yet" variant="h6" />
                                                <Divider />
                                            </>
                                        }
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Grid container direction="column" justify="center" alignItems="stretch" spacing={2}>
                                <Grid item xs={12}>
                                    <Button

                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        target="_blank"
                                        href={url}
                                    >
                                        Visit URL
                                    </Button>

                                </Grid>
                                <Grid item xs={12} style={{ marginTop: '2rem' }}>

                                </Grid>
                                {user &&


                                    <Grid item xs={12}>
                                        <Button

                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            className={classes.submit}
                                            onClick={handleVote}
                                        >
                                            <Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
                                                <Grid item>
                                                    <ThumbUpIcon fontSize="small" />
                                                </Grid>
                                                <Grid item>
                                                    Give it a like
                                        </Grid>
                                            </Grid>

                                        </Button>

                                    </Grid>
                                }
                                <Grid item xs={12}>

                                    <Typography className={classes.typo}>{votes} Likes</Typography>


                                </Grid>


                            </Grid>
                        </Grid>
                        {canDelete() &&
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" className={classes.typo2}>Dangerous zone</Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={handleDeleteProduct}
                                >
                                    <Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
                                        <Grid item>
                                            <DeleteIcon fontSize="small" />
                                        </Grid>
                                        <Grid item>
                                            Delete Product
                                        </Grid>
                                    </Grid>

                                </Button>
                            </Grid>
                        }
                    </Grid>
                </>
            }
        </Container >
    );
}

export default Product;
