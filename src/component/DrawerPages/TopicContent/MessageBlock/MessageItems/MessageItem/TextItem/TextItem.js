import React from 'react';

import MessageSceleton from '../MessageSceleton/MessageSceleton';

const TextItem = (props) => {
    return (
        <MessageSceleton
            showName={props.showName}
            author={props.message.creatorId.email}
            content={
                <p style={{
                    color: 'black',
                    margin: '0',
                    marginTop: '5px',
                }}>{props.message.text}</p>
            }
        />
    )
}

export default TextItem;
