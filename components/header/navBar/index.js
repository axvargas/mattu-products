import React, { useContext, Fragment } from 'react';
//Material ui imports
import { Button } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
//style imports
import useStyles from './style';

//component imports
import ButtonLink from '../../buttonLink';

import { FirebaseContext } from '../../../firebase';

const NavBar = () => {
    const { user, firebase } = useContext(FirebaseContext)
 
    const classes = useStyles();
    return (
        <div className={classes.sectionDesktop}>
            <Button className={classes.button} startIcon={<HomeRoundedIcon />} component={ButtonLink} href="/">HOME</Button>
            <Button className={classes.button} startIcon={<StarRoundedIcon />} component={ButtonLink} href="/popular">POPULAR</Button>
            {user && <Button className={classes.button} startIcon={<AddBoxRoundedIcon />} component={ButtonLink} href="/new-product">NEW PRODUCT</Button>}
            <div className={classes.grow} />

            {
                user ?
                    <Fragment>
                        {user && <Button className={classes.button} disabled disableElevation variant="contained">{`Hello ${user.displayName}`}</Button>}
                        <Button className={classes.btnblack} variant="contained" color="secondary" onClick={() => firebase.signOut()}>SIGN OUT</Button>
                    </Fragment>
                    :
                    <Fragment>
                        <Button className={classes.btnblack} variant="contained" color="secondary" component={ButtonLink} href="/sign-in">SIGN IN</Button>
                        <Button className={classes.btn} variant="outlined" color="default" component={ButtonLink} href="/sign-up">SIGN UP</Button>
                    </Fragment>
            }



        </div >
    );
}

export default NavBar;
