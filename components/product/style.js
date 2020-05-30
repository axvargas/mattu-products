import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    // grid: {
    //     flexGrow: 1,
    //     width: '100%'
    // },

    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    
    btnComment: {
        textTransform: 'none'
    },

    container: {
        marginTop: '2rem',
        marginBottom: '2rem',

    },
    typo: {
        textAlign: "center",
        fontWeight: 'bold'
    },
    typo2: {
        fontWeight: 'bold'
    },
    grid: {
        width: '100%'
    },
    textfield: {
        width: '100%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(3),
    },
    comments: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    // submit: {
    //     margin: theme.spacing(3, 0, 2),
    // },
}));
export default useStyles;