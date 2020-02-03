import React from 'react';

import Logo from '../../../../../assets/images/logo.png';
import useStyle from '../../../style';
import cssClasses from './DrawerLogo.module.css';

const DrawerLogo = () => {
    const classes = useStyle();

    return (
        <div className={classes.toolbar}>
            <img src={Logo} alt='ICON' width='100%' />
            <div className={cssClasses.titleBlock}>
                <p className={cssClasses.logoTitle}>PILLPLATE</p>
                <p className={cssClasses.logoSubTitle}>SORT YOUR GARBAGE</p>
            </div>
        </div>
    )
}

export default DrawerLogo;