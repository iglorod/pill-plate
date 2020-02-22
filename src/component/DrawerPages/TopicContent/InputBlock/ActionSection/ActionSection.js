import React from 'react';
import { Note, PhotoCamera } from '@material-ui/icons';
import { Emoji } from 'emoji-mart';
import { Button } from '@material-ui/core';

import useStyles from '../../styles';
import DropFile from './DropFile/DropFile';

const ActionSection = (props) => {
    const classes = useStyles();

    return (
        <section style={{ display: 'flex', justifyContent: 'space-between', }}>

            <DropFile
                icon={<Note className={classes.addFileBtn} />} 
                changeProgress={props.changeProgress}
                dispatchFiles={props.dispatchFiles} />
            <DropFile
                icon={<PhotoCamera className={classes.addImageBtn} />}
                changeProgress={props.changeProgress}
                dispatchFiles={props.dispatchFiles}
                imageDrop />

            <div style={{ overflow: 'hidden', display: 'flex', width: '100%', }}>
                {
                    props.smiles.map(item => {
                        return (
                            <div
                                key={item}
                                className={classes.freqEmoji}
                            >
                                <Emoji
                                    emoji={item}
                                    set='twitter'
                                    size={20}
                                    onClick={props.addEmoji}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <div style={{ marginLeft: '20px' }}>
                <Button className={classes.sendBth} component="span" onClick={props.sendOrEditMessage}>SEND</Button>
            </div>
        </section>
    )
}

export default ActionSection;
