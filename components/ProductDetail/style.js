import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    grid: {
        flexGrow: 1,
        width: '100%'
    },
    paper: {
        backgroundColor: "#FFF",
        padding: theme.spacing(2),
        margin: 'auto',
        width: '100%'
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    bold: {
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    btnComment: {
        textTransform: 'none'
    }
}));
export default useStyles;