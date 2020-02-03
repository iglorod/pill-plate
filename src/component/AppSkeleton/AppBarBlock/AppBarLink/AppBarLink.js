import React from 'react';
import { IconButton, Typography, Link } from '@material-ui/core';

import useStyle from '../../style';

const AppBarLink = (props) => {
    const classes = useStyle();

    return (
        <IconButton
            edge="start"
            className={classes.appBarButton}
        >
            <Link
                href={props.link}
                color="inherit"
                underline="none"
                className={classes.appBarLink}
            >
                {props.icon}
                <Typography variant="body1" noWrap>{props.text}</Typography>
            </Link>
        </IconButton>
    )
}

export default AppBarLink;