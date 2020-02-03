import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    wrapper: {
        background: 'white',
        boxShadow: theme.shadows[2]
    },
    redirectLink: {
        color: theme.palette.primary.dark
    },
    errorText: {
        color: '#f44336',
        margin: '5px 15px',
        textAlign: 'center'
    }
}));

export default useStyles;