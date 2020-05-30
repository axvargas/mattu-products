import React from 'react';
import { Grid, Typography } from '@material-ui/core'

//style imports
import useStyles from "./style"
const Display = ({ src, text, variant }) => {
    const classes = useStyles();
    if (!variant) {
        variant = "h2"
    }
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <img src={src} alt="Page not found" className={classes.img} />
            </Grid>
            <Grid item>
                <Typography variant={variant} className={classes.typo}>{text}</Typography>
            </Grid>
        </Grid>
    );
}

export default Display;
