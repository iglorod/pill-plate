import React, { useState } from 'react';
import { CssBaseline } from '@material-ui/core';

import useStyle from './style';
import DrawerBlock from './DrawerBlock/DrawerBlock';
import AppBarBlock from './AppBarBlock/AppBarBlock';

const AppSceleton = (props) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const classes = useStyle();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarBlock handleDrawerToggle={handleDrawerToggle} />
            <DrawerBlock isMobile={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}

export default AppSceleton;