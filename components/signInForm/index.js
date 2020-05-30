import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
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
    Container,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText
} from '@material-ui/core';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Component imports
import Copyright from '../copyright';

// Style imports
import useStyles from './style';

// RHF import 
import { useForm } from "react-hook-form";

//firebase
import firebase from '../../firebase';
// //notistack
// import { useSnackbar } from 'notistack';

const SignInForm = () => {
    const classes = useStyles();
    // const { enqueueSnackbar } = useSnackbar();

    //RHF hook
    const { register, handleSubmit, errors, setError } = useForm();

    // Local States
    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {

        const { email, password } = data;

        //Signing in with firebase
        try {
            await firebase.signIn(email, password);
            Router.push('/');
        } catch (error) {
            const { code, message } = error;
            switch (code) {
                case 'auth/invalid-email':
                case 'auth/user-disabled':
                    setError("email", "validate", message);
                    break;
                case 'auth/user-not-found':
                    setError("email", "validate", "The user is not registered");
                    break;
                case 'auth/wrong-password':
                    setError("password", "validate", "The password is invalid or does not match the user");
                    break;
                default:
                    break;
            }
            console.log("There was an error while creating the auser", message);

        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={register({
                            required: "The email is required",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Invalid email address"
                            }
                        })}
                        error={errors.email}
                        helperText={errors.email && errors.email.message}
                    />

                    <FormControl className={classes.txt} required fullWidth variant="outlined"
                        error={errors.password}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}

                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            name="password"
                            inputRef={register({
                                required: "The password is required",
                                minLength: { value: 6, message: "Password was supposed to be at least 6 characters" }
                            })}
                            labelWidth={85}
                        />
                        {errors.password &&
                            <FormHelperText error={errors.password}>{errors.password.message}</FormHelperText>
                        }

                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2"> */}
                                Forgot password?
                            {/* </Link> */}
                        </Grid>
                        {/* <Grid item>
                            <Link to='/sign-up' variant="body2" onClick={byeError}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid> */}
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
export default SignInForm;