import React from 'react';
import { useDropzone } from 'react-dropzone';

import useStyles from '../../../styles';

const DropFile = (props) => {
    const classes = useStyles();

    let { getRootProps, getInputProps } = useDropzone({
        accept: props.imageDrop ? 'image/*' : null,
        onDrop: acceptedFiles => console.log(acceptedFiles),
    });

    return (
        <div {...getRootProps({ onDrop: event => event.stopPropagation() })} className={classes.dragDropArea}>
            <input {...getInputProps()} />
            {props.icon}
        </div>
    )
}

export default DropFile;