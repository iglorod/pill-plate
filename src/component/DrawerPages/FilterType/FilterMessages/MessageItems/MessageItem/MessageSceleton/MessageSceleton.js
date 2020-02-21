import React from 'react';
import { ListItemText } from '@material-ui/core';

import useStyles from '../../../../styles';

const MessageSceleton = (props) => {
    const classes = useStyles();

    const [emailName, emailEnd] = props.author.split('@');

    return (
        <ListItemText
            primary={
                props.showName ?
                    <React.Fragment>
                        <p className={[classes.capitalizeEmail, classes.messageAuthorEmail].join(' ')}>{emailName}</p>
                        <p className={classes.messageAuthorEmail}>{'@' + emailEnd}</p>
                    </React.Fragment> : null
            }
            disableTypography
            secondary={props.content}
        />
    )
}

export default MessageSceleton;