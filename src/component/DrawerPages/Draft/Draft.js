import React from 'react';
import SoonMessage from '../../../assets/images/soon.png';

import useStyles from './styles.js';

const Draft = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.imageBlock}>
                <img
                    src={SoonMessage}
                    className={classes.image}
                    alt={'coming soon'} />
            </div>
            <div className={classes.title}>COMING SOON</div>
        </div>
    )
}

export default Draft;
