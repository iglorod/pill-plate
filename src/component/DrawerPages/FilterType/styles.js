import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
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
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
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
        position: 'relative',
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
    messageLiItem: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        cursor: 'pointer',
    },
    messageLiWithAuthor: {
        paddingTop: '0',
        paddingBottom: '0',
    },
    messageLiSelected: {
        background: '#fff8d7',
    },
    topLiFetching: {
        textAlign: 'center',
        paddingTop: '30px',
    },
    actionsBlock: {
        position: 'absolute',
        width: '100%',
        top: '0',
        zIndex: '1',
    },
    topicName: {
        fontSize: '18px',
        fontFamily: 'Poppins, sans-serif',
    },
    membersCount: {
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif',
        paddingLeft: '25px',
        color: 'rgba(0,0,0,.4)',
        height: 'min-content',
    },
    topicData: {
        boxShadow: theme.shadows[1],
        '& > div': {
            alignItems: 'center',
        }
    },
    topicNote: {
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif',
        color: 'rgba(0,0,0,.8)',
    },
    isChecked: {
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: theme.palette.primary.dark,
        margin: '0',
    },
    avatarStyle: {
        background: theme.palette.primary.dark,
    },
    deleteButton: {
        margin: theme.spacing(.5),
        fontFamily: 'Lato, sans-serif',
    },
    editButton: {
        margin: theme.spacing(.5),
        fontFamily: 'Lato, sans-serif',
        color: 'rgba(0,0,0,.4)',
    },
    messageActionsBlock: {
        marginLeft: 'auto',
    },
    secondaryActions: {
        flexDirection: 'column',
        background: 'rgb(250, 250, 250)',
    },
    filterActionsBlock: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
    },
    expansionMenu: {
        background: theme.palette.primary.main,
        borderRadius: '0',
    },
    filterChip: {
        boxShadow: theme.shadows[1],
    }
}));

export default style;
