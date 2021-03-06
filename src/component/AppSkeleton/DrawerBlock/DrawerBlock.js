import React from 'react';
import { Drawer, Hidden } from '@material-ui/core';

import useStyles from '../styles';
import DrawerItems from './DrawerItems/DriwerItems';

const DrawerBlock = (props) => {
    const classes = useStyles();
    const { container } = props;

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant='temporary'
                    open={props.isMobile}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <DrawerItems />
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    <DrawerItems />
                </Drawer>
            </Hidden>
        </nav>
    )
}

export default DrawerBlock;