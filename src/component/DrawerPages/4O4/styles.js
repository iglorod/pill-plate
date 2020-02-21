import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    imageBlock: {
        height: '60%',
        textAlign: 'center',
    },
    image: {
        height: '100%',
    },
    title: {
        textAlign: 'center',
        fontSize: '35px',
        fontFamily: '"Poppins", sans-serif',
        color: 'rgba(0, 0, 0, 0.26)',
    }
}));

export default style;
