import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles(theme => ({
    topicTitle: {
        textAlign: 'center',
        fontFamily: 'Lato, sans-serif',
        paddingBottom: 0,
    },
    dialogColorHat: {
        background: theme.palette.primary.main,
        height: '15px',
    },
    agreeBtn: {
        color: theme.palette.primary.dark,
    },
    closeBtn: {
        color: theme.palette.secondary.main,
    },
    topicInput: {
        marginTop: theme.spacing(2),
    }
}));

export default style;
