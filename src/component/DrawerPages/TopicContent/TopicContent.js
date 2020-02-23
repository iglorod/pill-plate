import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

import useStyles from './styles';
import InputBlock from './InputBlock/InputBlock';
import MessageBlock from './MessageBlock/MessageBlock';
import ActionsBlock from './ActionsBlock/ActionsBlock';
import { setCurrentTopicActionCreator } from '../../../store/actions/topics';
import { sendFileMessageAction } from '../../../store/actions/messages';

const TopicContent = (props) => {
    const classes = useStyles();

    const [loadingFileProgress, setLoadingFileProgress] = useState(0);

    const [editingMessage, setEditingMessage] = useState(null);

    const [selectedMessagesId, setSelectedMessageId] = useState([]);

    const [filter, setFilter] = useState({
        files: false,
        photos: false,
        videos: false,
        links: false,
    });

    const editingMessageHandler = () => {
        if (selectedMessagesId.length === 1)
            setEditingMessage(selectedMessagesId[0]);
    }

    const changeSelectedMessage = (messageId) => {
        if (selectedMessagesId.includes(messageId)) {
            const newCollection = selectedMessagesId.filter(item => item !== messageId);
            setSelectedMessageId([...newCollection]);
        }
        else {
            const newCollection = [...selectedMessagesId];
            newCollection.push(messageId);
            setSelectedMessageId([...newCollection]);
        }

        setEditingMessage(null);
    }

    const clearSelectedMessages = () => {
        setSelectedMessageId([]);
        setEditingMessage(null);
    }

    const changeProgress = (newProgress) => {
        setLoadingFileProgress(newProgress);
    }

    const dispatchFiles = (files) => {
        files.map(file => {
            const messageData = {
                file: file,
                sender: props.userId,
            }
            return props.uploadFile(messageData, props.socket, changeProgress);
        });
    }

    const roomName = props.match.params.id;

    useEffect(() => {
        props.setCurrentTopic(roomName);
    }, [])

    return (
        <div className={classes.root}>
            <Dropzone onDrop={acceptedFiles => { dispatchFiles(acceptedFiles, props.imageDrop) }}>
                {({ getRootProps }) => (
                    <section className={classes.dropSection}>
                        <div {...getRootProps()} className={classes.dropArea}>
                            <ActionsBlock
                                selectedMessagesId={selectedMessagesId}
                                editingMessageStart={editingMessageHandler}
                                clearSelectedMessages={clearSelectedMessages}
                                filter={filter}
                                setFilter={setFilter} />
                            <MessageBlock
                                loadingFileProgress={loadingFileProgress}
                                changeSelectedMessage={changeSelectedMessage}
                                selectedMessagesId={selectedMessagesId}
                                changeProgress={changeProgress}
                                userId={props.userId}
                                filter={filter} />
                            <InputBlock
                                socketRoom={roomName}
                                changeProgress={changeProgress}
                                dispatchFiles={dispatchFiles}
                                editingMessage={editingMessage}
                                clearSelectedMessages={clearSelectedMessages} />
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        openLoading: state.msg.loading,
        savingMessages: state.msg.savingMessages,
        socket: state.sckt.socket,
        userId: state.auth.id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTopic: (topicId) => { dispatch(setCurrentTopicActionCreator(topicId)) },
        uploadFile: (messageData, socket, changeProgress) => { dispatch(sendFileMessageAction(messageData, socket, changeProgress)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicContent);
