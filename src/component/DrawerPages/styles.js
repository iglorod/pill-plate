import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        height: '100%',
        width: '100%',
        overflow: 'auto',
        "&::-webkit-scrollbar-track": {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            backgroundColor: 'transparent',
        },
        "&::-webkit-scrollbar": {
            width: '8px',
            backgroundColor: 'transparent',
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: '10px',
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, .3)',
            backgroundColor: 'rgba(129, 129, 129, 0.1)',
            opacity: '0.3',
        }
    },
    gridConatainer: {
        width: '100%',
        margin: '0',
        flexGrow: 1
    },
    topic: {
        borderRadius: '5px',
        height: '180px',
        width: '100%',
        background: '#FFFFFF',
        boxShadow: theme.shadows[3],
        "&:hover": {
            background: '#FCFCFC',
        }
    },
    topicInfo: {
        height: 'inherit',
        width: '100%',
        padding: '10px 10px 5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    topicLink: {
        textDecoration: 'none',
        color: '#000000',
        fontFamily: 'Lato, sans-serif',
    },
    topicName: {
        fontFamily: 'Lato, sans-serif',
        fontSize: '28px',
        margin: '0',
    },
    topicNote: {
        fontSize: '14px',
        color: 'grey',
    },
    topicCreated: {
        color: 'grey',
        fontSize: '12px',
        margin: '0',
    },
}));

export default style;
