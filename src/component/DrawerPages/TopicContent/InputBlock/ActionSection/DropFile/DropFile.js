import React from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';

import useStyles from '../../../styles';
import { sendFileMessageAction } from '../../../../../../store/actions/messages';

const DropFile = (props) => {
    const classes = useStyles();

    const dispatchFiles = (files) => {
        files.map(file => {
            const messageData = {
                file: file,
                sender: props.usedId,
            }
            props.setAllowScrollToBtm(true);
            return props.uploadFile(messageData, props.socket, props.changeProgress);
        });
    }

    let { getRootProps, getInputProps } = useDropzone({
        accept: props.imageDrop ? 'image/*' : null,
        onDrop: acceptedFiles => dispatchFiles(acceptedFiles, props.imageDrop),
    });

    return (
        <div {...getRootProps({ onDrop: event => event.stopPropagation() })} className={classes.dragDropArea}>
            <input {...getInputProps()} />
            {props.icon}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        usedId: state.auth.id,
        socket: state.sckt.socket,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFile: (messageData, socket, changeProgress) => { dispatch(sendFileMessageAction(messageData, socket, changeProgress)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropFile);