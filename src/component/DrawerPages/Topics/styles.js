import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        height: '100%',
        width: '100%',
        overflow: 'auto',
        "&::-webkit-scrollbar-track": {
            borderRadius: '10px',
        },
        "&::-webkit-scrollbar": {
            width: '8px',
            backgroundColor: 'transparent',
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: '10px',
            backgroundColor: '#fff6ca',
            opacity: '0.3',
        },
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
        alignItems: 'center',
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
        wordBreak: 'break-word',
    },
    topicNote: {
        fontSize: '14px',
        color: 'grey',
        overflow: 'auto',
        "&::-webkit-scrollbar-track": {
            borderRadius: '10px',
        },
        "&::-webkit-scrollbar": {
            width: '8px',
            backgroundColor: 'transparent',
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: '10px',
            backgroundColor: '#fff6ca',
            opacity: '0.3',
        },
    },
    topicCreated: {
        color: 'grey',
        fontSize: '12px',
        margin: '0',
    },
    topicHat: {
        height: '10px',
        width: '100%',
        position: 'absolute',
        top: '0',
        background: '#FFE66D',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
    },
    topicMenuButton: {
        zIndex: '1',
        position: 'absolute',
        top: '15px',
        right: '0',
        transition: 'all .3s',
        "&:hover": {
            background: 'none',
            color: '#000000',
        }
    },
    unreadedCount: {
        position: 'absolute',
        left: '20px',
        bottom: '20px',
    },
    topicsNotFoundImg: {
        maxWidth: '100%',
        maxHeight: '95%',
        display: 'block',
        margin: 'auto',
    },
    topicsNotFoundNote: {
        width: '100%',
        maxHeight: '100%',
        margin: '-24px',
        position: 'absolute',
        textAlign: 'center',
        '& p:first-child': {
            fontSize: '30px',
            color: 'grey',
            fontFamily: '"Nunito", sans-serif',
            marginBottom: '0',
        },
        '& p:last-child': {
            fontSize: '18px',
            color: 'lightgray',
            fontFamily: '"Nunito", sans-serif',
        },
    }
}));

export default style;
