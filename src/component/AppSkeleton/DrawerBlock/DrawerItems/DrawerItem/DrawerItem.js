import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import useStyle from '../../../style';

const DrawerItem = (props) => {
    const classes = useStyle();

    const RouterLink = React.forwardRef((routeProps, ref) => (
        <NavLink ref={ref} to={props.to} {...routeProps} activeClassName={props.isNested ? classes.nestedLinkActive : classes.activeLink} />
    ));

    return (
        <ListItem
            button
            className={props.isNested ? classes.nestedLink : null}
            to={props.to}
            component={RouterLink}
            onClick={props.collapseToggle}>
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText primary={props.text} />
            {props.addTopicBtn}
        </ListItem>
    )
}

export default DrawerItem;