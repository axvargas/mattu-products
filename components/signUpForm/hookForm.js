import React, { useState } from 'react';
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
    Typography,
    Container,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,

} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Component imports
import Copyright from '../copyright';

// Style imports
import useStyles from './style';
// import { useSnackbar } from 'notistack';

//RHF import
import { useForm } from "react-hook-form";

//firebase
import firebase from '../../firebase';

const SignUpForm = () => {
    // const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    //useForm
    const { register, handleSubmit, getValues, errors, setError } = useForm();


    // Local States

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const handleClickShowPassword = (prop) => (event) => {
        event.preventDefault();
        switch (prop) {
            case 'password':
                setShowPassword(!showPassword);
                break;
            case 'password1':
                setShowPassword1(!showPassword1);
                break;
            default:
                break;
        }

    };


    const onSubmit = async (data) => {
        console.log(data);
        const { first, last, email, password } = data;

        //Create account on firebase
        try {
            await firebase.signUp(first, last, email, password);
            Router.push('/');
        } catch (error) {
            const { code, message } = error;
            switch (code) {
                case 'auth/email-already-in-use':
                case 'auth/invalid-email':
                    setError("email", "validate", message);
                    break;
                case 'auth/operation-not-allowed':
                    setError("password", "validate", message);
                    setError("email", "validate", message);
                    break;
                case 'auth/weak-password':
                    setError("password", "validate", message);
                    break;
                default:
                    break;
            }

            console.log("There was an error while creating the auser", error);

        }


        // setTimeout(() => {
        //     if (data.email === 'andresxavier99@hotmail.com') {
        //         setError("email", "validate", "The email is already registered");
        //     } else {
        //         console.log(data);
        //     }
        // }, 2000);


    };



    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="first"
                                variant="outlined"
                                required
                                fullWidth
                                id="first"
                                label="First Name"
                                autoFocus
                                //onChange={handleChange('first')}
                                // value={form.first}
                                error={errors.first}
                                helperText={errors.first && errors.first.message}
                                inputRef={register({
                                    required: "First Name is required"
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="last"
                                label="Last Name"
                                name="last"
                                autoComplete="lname"
                                //onChange={handleChange('last')}
                                // value={form.last}
                                error={errors.last}
                                helperText={errors.last && errors.last.message}
                                inputRef={register({ required: "Last name is required" })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                // onChange={handleChange('email')}
                                // value={form.email}
                                error={errors.email}
                                helperText={errors.email && errors.email.message}
                                inputRef={register({
                                    required: "Email is required",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.txt} required fullWidth variant="outlined"
                                error={errors.password}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    inputRef={register({
                                        required: "Password required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                                    })}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    // value={form.password}
                                    //onChange={handleChange('password')}
                                    autoComplete="current-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword('password')}

                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                    labelWidth={85}
                                />
                                {errors.password &&
                                    < FormHelperText error={errors.password}>{errors.password.message}</FormHelperText>
                                }

                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.txt} required fullWidth variant="outlined"
                                error={errors.passwordConfirmation}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                                <OutlinedInput
                                    name="passwordConfirmation"
                                    inputRef={register({
                                        required: "The confirmation password is required",
                                        validate: {
                                            matchesPreviousPassword: value => {
                                                const { password } = getValues();
                                                return password === value || "Passwords should match!";
                                            }
                                        }
                                    })}
                                    id="confirmation-password"
                                    type={showPassword1 ? 'text' : 'password'}
                                    // value={form.password1}
                                    //onChange={handleChange('password1')}
                                    autoComplete="current-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword('password1')}

                                                edge="end"
                                            >
                                                {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                    labelWidth={150}
                                />
                                {errors.passwordConfirmation &&
                                    <FormHelperText error={errors.passwordConfirmation}>{errors.passwordConfirmation.message}</FormHelperText>
                                }

                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    {/* <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/sign-in' variant="body2" >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container >

    );
}
export default SignUpForm;