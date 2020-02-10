import React, { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

import useStyles from './styles';
import InputBlock from './InputBlock/InputBlock';
import MessageBlock from './MessageBlock/MessageBlock';
import { setCurrentTopicActionCreator } from '../../../store/actions/topics';
import { saveTextMessageActionCreator } from '../../../store/actions/messages';

const TopicContent = (props) => {
    const classes = useStyles();

    const roomName = props.match.params.id;

    props.socket.emit('join-to-topic', roomName);

    props.socket.on('recive-text-message', message => {
        console.log('message');
        props.reciveTextMessage(message);
    });

    useEffect(() => {
        props.setCurrentTopic(roomName);
    }, [])

    return (
        <div className={classes.root}>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps }) => (
                    <section className={classes.dropSection}>
                        <div {...getRootProps()} className={classes.dropArea}>
                            <MessageBlock />
                            <InputBlock socketRoom={roomName} />
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        socket: state.sckt.socket,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTopic: (topicId) => { dispatch(setCurrentTopicActionCreator(topicId)) },
        reciveTextMessage: (message) => { dispatch(saveTextMessageActionCreator(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicContent);
