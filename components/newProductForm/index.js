
import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Router, { useRouter } from 'next/router';
//@Material-UI imports
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Typography,
    Container,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,

} from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';


//react-firebase-file-uploader import 
import FileUploader from 'react-firebase-file-uploader';


// Component imports
import Copyright from '../copyright';

// Style imports
import useStyles from './style';
// import { useSnackbar } from 'notistack';

//RHF import
import { useForm } from "react-hook-form";

//firebase
import { FirebaseContext } from '../../firebase';


const NewProductForm = () => {
    // const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    //useForm
    const { register, handleSubmit, errors, setError } = useForm();

    // FireBaseContext
    const { user, firebase } = useContext(FirebaseContext);


    //Routing hook
    const router = useRouter();

    // Local States
    const [img, setImg] = useState(null);
    const [photo, setPhoto] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [progress, setProgress] = useState(0);
    // const [uploading, setUploading] = useState(false);


    const onSubmit = async (data, URI, imgId) => {
        const { name, company, url, description } = data;
        if (!user) {
            return router.push('/sign-in');
        }
        //Create a product
        const product = {
            name,
            company,
            url,
            description,
            imgUrl: URI,
            votes: 0,
            comments: [],
            dateOfCreation: Date.now(),
            creator: {
                id: user.uid,
                name: user.displayName
            },
            hasVoted: [],
            imgId
        }
        console.log(product);

        //Insert the product to the db
        try {
            firebase.db.collection('products').add(product);
            return router.push('/');
        } catch (error) {
            console.log(error);
            console.log("There was an error while inserting in the db");
        }



    };

    //Functions about FileUploader
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    }

    const handleUpload = (data) => {
        const unique = uuidv4();
        const uploadTask = firebase.storage.ref(`products/${unique}${img.name}`).put(img);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                // setUploading(error);
                console.log(error);
                setError("photo", "validate", "There is an error with the image");
            },
            () => {
                firebase.storage
                    .ref("products")
                    .child(`${unique}${img.name}`)
                    .getDownloadURL()
                    .then(url => {
                        setImgUrl(url);
                        console.log(url);
                        onSubmit(data, url, `${unique}${img.name}`);
                    })

            }
        );
    }


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LocalOfferIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    New Product
                </Typography>


                <form className={classes.form} onSubmit={handleSubmit(handleUpload)} noValidate>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="off"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Product Name"
                                autoFocus
                                //onChange={handleChange('first')}
                                // value={form.first}
                                error={errors.name}
                                helperText={errors.name && errors.name.message}
                                inputRef={register({
                                    required: "Name of the product is required"
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="company"
                                label="Company Name"
                                name="company"
                                autoComplete="off"
                                //onChange={handleChange('company')}
                                // value={form.company}
                                error={errors.company}
                                helperText={errors.company && errors.company.message}
                                inputRef={register({ required: "Company name is required" })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                accept="img/*"
                                className={classes.input}
                                id="contained-button-file"
                                type="file"
                                onChange={handleChange}

                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                id="photo"
                                label="Photo"
                                name="photo"
                                autoComplete="off"
                                value={img ? img.name : ""}
                                error={errors.photo}
                                helperText={errors.photo && errors.photo.message}
                                inputRef={register({ required: "The photo is required" })}
                                InputProps={{
                                    endAdornment: <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="secondary" component="span">
                                            Upload
                                        </Button>
                                    </label>
                                }}
                                InputLabelProps={{
                                    shrink: img ? true : false,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="url"
                                label="URL"
                                name="url"
                                autoComplete="off"
                                error={errors.url}
                                helperText={errors.url && errors.url.message}
                                inputRef={register({
                                    required: "The URL is required",
                                    pattern: {
                                        value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                                        message: "Invalid URL"
                                    }
                                })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                rowsMax={6}

                                id="description"
                                label="Product description"
                                name="description"
                                autoComplete="off"
                                error={errors.description}
                                helperText={errors.description && errors.description.message}
                                inputRef={register({ required: "The description of the product is required" })}
                            />
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            create new product
                    </Button>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container >

    );
}
export default NewProductForm;