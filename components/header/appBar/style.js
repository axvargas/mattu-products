import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    sectionMobile: {
        flexGrow: 1,
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    sectionMobileMore: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },



}));
export default useStyles;