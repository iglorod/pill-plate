import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        padding: theme.spacing(3),
        margin: 'auto',
        overflow: 'auto',
        background: '#FFFFFF',
        boxShadow: theme.shadows[3],
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
        },
        [theme.breakpoints.up('md')]: {
            width: '70%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50%',
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
        "& textarea::-webkit-scrollbar-track": {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            backgroundColor: 'transparent',
        },
        "& textarea::-webkit-scrollbar": {
            width: '8px',
            backgroundColor: 'transparent',
        },
        "& textarea::-webkit-scrollbar-thumb": {
            borderRadius: '10px',
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, .3)',
            backgroundColor: 'rgba(129, 129, 129, 0.1)',
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
    }
}));

export default style;
