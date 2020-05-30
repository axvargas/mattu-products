import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        marginLeft: '1rem',

        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },

    btnblack:{
        color: 'black',
        margin: theme.spacing(1),
    },
    button: {
        color: '#fff',
        margin: theme.spacing(1),
    },
    btn: {
        borderColor: '#fff',
        color: 'inherit',
        margin: theme.spacing(1),
    }


}));
export default useStyles;