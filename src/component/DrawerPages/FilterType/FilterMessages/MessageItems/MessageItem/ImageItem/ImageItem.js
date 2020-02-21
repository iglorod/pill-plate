import React, { useState } from 'react';

import ImageReview from '../../../../../../UI/ImageReview/ImageReview';
import MessageSceleton from '../MessageSceleton/MessageSceleton';

const TextItem = (props) => {
    const [openImage, setOpenImage] = useState(false);

    const toggleImageReview = (event) => {
        event.stopPropagation();
        setOpenImage(prevState => !prevState);
    }

    const IMAGE_PATH = 'http://localhost:4000/' + props.message.path;

    return (
        <React.Fragment>
            <ImageReview open={openImage} imageSrc={IMAGE_PATH} toggleView={toggleImageReview} />

            <MessageSceleton
                showName={props.showName}
                author={props.message.creatorId.email}
                content={
                    <div style={{ width: '70%', paddingTop: '10px' }}>
                        <img
                            src={IMAGE_PATH}
                            style={{
                                maxHeight: '30vh',
                                maxWidth: '100%',
                                cursor: 'pointer',
                            }}
                            onClick={toggleImageReview}
                            alt={'saved'} />
                    </div>
                } />
        </React.Fragment>
    )
}

export default TextItem;
