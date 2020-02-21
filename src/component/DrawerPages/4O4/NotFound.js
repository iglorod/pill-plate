import React from 'react';
import IdeaMessage from '../../../assets/images/idea.png';

import useStyles from './styles.js';

const NotFound = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.imageBlock}>
                <img
                    src={IdeaMessage}
                    className={classes.image}
                    alt={'select topic'} />
            </div>
            <div className={classes.title}>SAVE YOUR IDEAS</div>
        </div>
    )
}

export default NotFound;
