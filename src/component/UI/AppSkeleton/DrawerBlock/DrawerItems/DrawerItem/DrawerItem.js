import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import useStyle from '../../../style';

const DrawerItem = (props) => {
    const classes = useStyle();

    const RouterLink = React.forwardRef((routeProps, ref) => (
        <NavLink ref={ref} to={props.to} {...routeProps} activeClassName={classes.active} />
    ));

    return (
        <li>
            <ListItem button to={props.to} component={RouterLink} >
                <ListItemIcon>{props.icon}</ListItemIcon>
                <ListItemText primary={props.text} />
            </ListItem>
        </li>
    )
}

export default DrawerItem;