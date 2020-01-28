import React from 'react';

import Logo from '../../../../../../assets/images/logo.png';
import useStyle from '../../../style';

const DrawerLogo = () => {
    const classes = useStyle();

    return (
        <div className={classes.toolbar}>
            <img src={Logo} alt='ICON' width='100%' />
        </div>
    )
}

export default DrawerLogo;