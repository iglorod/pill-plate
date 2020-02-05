import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const style = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        boxShadow: theme.shadows[2],
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    appBarButton: {
        borderRadius: 0,
        padding: '0px',
        margin: '0 5px'
    },
    appBarLink: {
        display: 'inherit',
        padding: '8px',
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: theme.palette.primary.main,
        border: 'none',
        boxShadow: theme.shadows[3]
    },
    content: {
        flexGrow: 1,
    },
    activeLink: {
        background: 'white',
        boxShadow: theme.shadows[3],
        fontWeight: '600',
        transition: '.2s all',
        "&:hover": {
            background: 'white !important',
            boxShadow: theme.shadows[5],
        }
    },
    nestedLink: {
        paddingLeft: theme.spacing(4),
    },
    nestedLinkActive: {
        background: 'rgba(0, 0, 0, 0.08)',
    }
}));

export default style;