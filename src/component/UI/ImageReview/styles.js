import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        maxHeight: '60vh',
        maxWidth: '50vw',
        minHeight: '25vh',
        minWidth: '35vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        outline: 'none',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '70vh',
            maxWidth: '100vw',        
        }
    },
    image: {
        maxHeight: '58vh',
        maxWidth: '48vw',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '68vh',
            maxWidth: '98vw',        
        }
    }
}));

export default useStyles;