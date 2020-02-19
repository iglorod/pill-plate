import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        padding: theme.spacing(3),
        paddingTop: '0',
        margin: 'auto',
        overflow: 'auto',
        background: '#FFFFFF',
        boxShadow: theme.shadows[3],
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0.5),
        },
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
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '60%',
        },
    },
    messagesBlock: {
        height: '75%',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    inputBlock: {
        height: '25%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    textArea: {
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
    inputProp: {
        fontFamily: 'Lato, sans-serif',
        fontSize: '14px',
        "&:after": {
            borderBottomColor: theme.palette.primary.dark,
        },
    },
    dropSection: {
        height: '100%',
    },
    dropArea: {
        outline: 'none',
        height: '100%',
    },
    dragDropArea: {
        outline: 'none',
        height: '100%',
        '& > svg': {
            verticalAlign: 'bottom',
        }
    },
    freqEmoji: {
        margin: '5px',
        display: 'inline-block',
        '& > button': {
            outline: 'none !important',
            cursor: 'pointer !important',
            verticalAlign: '2px',
        },
        '& > button > span': {
            verticalAlign: 'middle !important',
        }
    },
    addFileBtn: {
        cursor: 'pointer',
        color: '#adadad',
        marginTop: '5px',
        marginRight: '25px',
        '&:hover': {
            color: theme.palette.primary.dark,
        }
    },
    addImageBtn: {
        cursor: 'pointer',
        color: '#adadad',
        marginTop: '6px',
        marginRight: '25px',
        '&:hover': {
            color: theme.palette.primary.dark,
        }
    },
    toggleSmilesBtn: {
        background: 'transparent !important',
        transition: '.3s all',
        '&:hover': {
            color: 'darkgrey',
        }
    },
    addSmileBlock: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    sendBth: {
        color: theme.palette.primary.dark,
        fontWeight: '700',
        '&:hover': {
            background: 'transparent',
        }
    },
    messageSecondaryAction: {
        top: '9px',
        transform: 'none',
        '& > span': {
            color: 'grey'
        },
    },
    messagesList: {
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
    downloadLink: {
        color: 'grey',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    downloadIcon: {
        backgroundColor: '#4e4e4e',
        cursor: 'pointer',
    },
    messageAuthorEmail: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '14px',
        fontWeight: '600',
        margin: '0',
        color: '#5d5d5d',
        display: 'inline',
    },
    capitalizeEmail: {
        textTransform: 'capitalize',
        display: 'inline',
    },
    messageLiElement: {
        paddingTop: '0',
        paddingBottom: '0',
    },
    topLiFetching: {
        textAlign: 'center',
        padding: '30px 0',
    }
}));

export default style;
