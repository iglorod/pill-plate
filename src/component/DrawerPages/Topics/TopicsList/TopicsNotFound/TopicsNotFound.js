import React from 'react';

import CardImage from '../../../../../assets/images/CardImage.png';
import useStyles from '../../styles';

const TopicsNotFound = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.topicsNotFoundNote}>
                <p>NOTHING!!!</p>
                <p>Your topics list is empty.</p>
            </div>
            <img src={CardImage} className={classes.topicsNotFoundImg} alt={'card'} />
        </React.Fragment>
    )
}

export default TopicsNotFound;
