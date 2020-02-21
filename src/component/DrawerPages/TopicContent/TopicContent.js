import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

import useStyles from './styles';
import InputBlock from './InputBlock/InputBlock';
import MessageBlock from './MessageBlock/MessageBlock';
import ActionsBlock from './ActionsBlock/ActionsBlock';
import { setCurrentTopicActionCreator } from '../../../store/actions/topics';

const TopicContent = (props) => {
    const classes = useStyles();

    const [allowScrollToBtm, setAllowScrollToBtm] = useState(true);
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

    const roomName = props.match.params.id;

    useEffect(() => {
        props.setCurrentTopic(roomName);
    }, [])

    useEffect(() => {
        if (props.savingMessages === true) scrollToBottom();
        else changeProgress(0);
    }, [props.savingMessages])

    let bottomEl = null;

    const scrollToEl = (
        <li
            style={{ textAlign: 'center', padding: '0 10%' }}
            ref={(el) => bottomEl = el}
        >
            {props.savingMessages
                ? <LinearProgress variant="determinate" value={loadingFileProgress} />
                : null}
        </li>
    );

    const scrollToBottom = () => {
        if (bottomEl === null) return;
        bottomEl.scrollIntoView();
    }

    return (
        <div className={classes.root}>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
                                scrollToEl={scrollToEl}
                                scrollToBottom={scrollToBottom}
                                allowScrollToBtm={allowScrollToBtm}
                                setAllowScrollToBtm={setAllowScrollToBtm}
                                loadingFileProgress={loadingFileProgress}
                                changeSelectedMessage={changeSelectedMessage}
                                selectedMessagesId={selectedMessagesId} 
                                filter={filter} />
                            <InputBlock
                                socketRoom={roomName}
                                setAllowScrollToBtm={setAllowScrollToBtm}
                                changeProgress={changeProgress}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTopic: (topicId) => { dispatch(setCurrentTopicActionCreator(topicId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicContent);
