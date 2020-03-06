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
        borderRadius: '0 !important',
        padding: '0px !important',
        margin: '0 5px !important'
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
        background: 'white !important',
        boxShadow: theme.shadows[3],
        fontWeight: '600',
        transition: '.2s all !important',
        "&:hover": {
            background: 'white !important',
            boxShadow: theme.shadows[5],
        }
    },
    nestedLink: {
        paddingLeft: theme.spacing(4) + 'px !important',
    },
    nestedLinkActive: {
        background: 'rgba(0, 0, 0, 0.08) !important',
    }
}));

export default style;