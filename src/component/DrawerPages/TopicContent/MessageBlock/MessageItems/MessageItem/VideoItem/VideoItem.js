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
                        controls>
                        <source src={'http://localhost:4000/' + props.message.path} type="video/mp4" />
                    </video>
                </div>
            }
        />
    )
}

export default TextItem;
