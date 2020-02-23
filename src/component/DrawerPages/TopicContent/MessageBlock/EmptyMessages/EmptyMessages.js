import React from 'react';

const EmptyMessages = () => {
    return (
        <div style={
            {
                alignSelf: 'center',
                color: 'grey',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
            }
        }>No messages yet...</div>
    )
}

export default EmptyMessages;