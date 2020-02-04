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
    },
    wrapper: {
        background: 'white',
        boxShadow: theme.shadows[2]
    },
    buttonWrapper: {
        position: 'relative',
        margin: theme.spacing(3, 0, 2),
    },
    redirectLink: {
        color: theme.palette.primary.dark
    },
    errorAlert: {
        marginTop: '10px',
    },
    buttonProgress: {
        color: theme.palette.primary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
}));

export default useStyles;