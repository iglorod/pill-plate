import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';

import useStyles from './styles';

const ImageReview = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.toggleView}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <img src={props.imageSrc} className={classes.image} alt={'review'} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default ImageReview;
