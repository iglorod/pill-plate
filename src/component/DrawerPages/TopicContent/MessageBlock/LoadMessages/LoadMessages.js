import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadMessages = () => {
    return (
        <div style={
            {
                alignSelf: 'center',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
            }
        }><CircularProgress disableShrink /></div>
    )
}

export default LoadMessages;
