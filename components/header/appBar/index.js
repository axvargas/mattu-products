import React, { useContext, Fragment } from 'react';
import Router from 'next/router';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    MenuItem,
    Menu,
    Button
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
//style imports
import useStyles from './style';

//Component imports
import Search from '../search';
import NavBar from '../navBar';

import { FirebaseContext } from '../../../firebase';


const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    //NAVBAR USER VARIABLE
    const { user, firebase } = useContext(FirebaseContext);

    // Functions
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const signOutUser = () => {
        firebase.signOut();
    }

    // Rendering Menus
    const menuId = 'primary-search-account-menu';
    const renderMenuUser = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >


            {user && <MenuItem disabled >Hello {user.displayName}</MenuItem>}
            <MenuItem onClick={() => { handleMenuClose(); signOutUser(); }}>
                <IconButton color="inherit">
                    <MeetingRoomRoundedIcon />
                </IconButton>

                <p>Sign Out</p>


            </MenuItem>

        </Menu>
    );
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={()=>{Router.push("/sign-in");handleMenuClose();}} >
                <IconButton color="inherit">
                    <AssignmentIndRoundedIcon />
                </IconButton>

                <p>Sign In</p>


            </MenuItem>

            <MenuItem onClick={()=>{Router.push("/sign-up");handleMenuClose();}}>
                <IconButton color="inherit">
                    <AssignmentRoundedIcon />
                </IconButton>

                <p>Sign Up</p>
            </MenuItem>


        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={()=>{Router.push("/");handleMobileMenuClose();}}>
                <IconButton aria-label="show 4 new mails" color="inherit">

                    <HomeRoundedIcon />

                </IconButton>
                <p>Home</p>
            </MenuItem>
            <MenuItem onClick={()=>{Router.push("/popular");handleMobileMenuClose();}}>
                <IconButton aria-label="show 11 new notifications" color="inherit">

                    <StarRoundedIcon />

                </IconButton>
                <p>Popular</p>
            </MenuItem>
            {user &&
                <MenuItem onClick={()=>{Router.push("/new-product");handleMobileMenuClose();}}>
                    <IconButton aria-label="show 11 new notifications" color="inherit">

                        <AddBoxRoundedIcon />

                    </IconButton>
                    <p>New product</p>
                </MenuItem>}

        </Menu>
    );



    // Final return
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.sectionMobileMore}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"

                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                    <Typography className={classes.title} variant="h6" noWrap>
                        MattuProducts
                    </Typography>
                    <Search />
                    {/* <div className={classes.grow} /> */}

                    <NavBar />

                    <div className={classes.sectionMobile}>
                        <div className={classes.grow} />
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {user ? renderMenuUser : renderMenu}
        </div>
    );
}
export default Header;