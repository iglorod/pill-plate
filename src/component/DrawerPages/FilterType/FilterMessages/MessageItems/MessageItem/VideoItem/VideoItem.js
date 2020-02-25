import React from 'react';

import MessageSceleton from '../MessageSceleton/MessageSceleton';

const TextItem = (props) => {
    return (
        <MessageSceleton
            showName={props.showName}
            author={props.message.creatorId.email}
            content={
                <div style={{ width: '70%', paddingTop: '10px', }}>
                    <video
                        style={{
                            maxHeight: '30vh',
                            maxWidth: '100%',
                        }}
                        onClick={(event) => event.stopPropagation()}
                        controls>
                        <source src={props.message.path} type="video/mp4" />
                    </video>
                </div>
            }
        />
    )
}

export default TextItem;
