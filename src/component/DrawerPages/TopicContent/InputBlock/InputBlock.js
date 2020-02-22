import React, { useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment, IconButton, Zoom } from '@material-ui/core';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { connect } from 'react-redux';

import useStyles from '../styles';
import './InputBlock.css';
import ActionSection from './ActionSection/ActionSection';
import { sendTextMessageAction, editMessageAction } from '../../../../store/actions/messages';
import * as messageTypes from '../../../../utility/message-types';

const getFreqSmiles = () => {
    const freqObj = JSON.parse(localStorage.getItem('emoji-mart.frequently'));
    let freqArr = [];

    for (let key in freqObj) {
        freqArr.push(key);
    }

    return freqArr.reverse().slice(0, 15);
}

const addNewSmileToFreq = (freqSmiles, idEmoji) => {
    const freqSmilesCount = freqSmiles.length;

    freqSmiles = freqSmiles.filter(item => item !== idEmoji);

    if (freqSmilesCount === freqSmiles.length) {
        freqSmiles.splice(freqSmiles.length - 1, 1);
    }

    return [
        idEmoji,
        ...freqSmiles
    ]
}

const InputBlock = (props) => {
    const classes = useStyles();

    const [textAreaValue, setTextAreaValue] = useState('');

    const [showSmiles, setShowSmiles] = useState(false);

    const [freqSmiles, setFreqSmiles] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
        setFreqSmiles([...getFreqSmiles()]);
    }, []);

    useEffect(() => {
        if (!props.editingMessage) return;
        const message = props.topic.messages.find(item => item._id === props.editingMessage);
        setTextAreaValue(message.text);
        focusInput();
    }, [props.editingMessage])

    const focusInput = () => {
        inputRef.current.focus();
    }

    const onInputChange = (event) => {
        const newValue = event.target.value;
        setTextAreaValue(newValue);
    }

    const addNewEmoji = (emoji) => {
        setTextAreaValue(prevState => prevState + emoji.native);
        focusInput();
        setFreqSmiles(prevState => addNewSmileToFreq([...prevState], emoji.id));
    }

    const addFreqEmoji = (emoji) => {
        setTextAreaValue(prevState => prevState + emoji.native);    
        focusInput();
    }

    const handleClickShowSmiles = () => {
        setShowSmiles(prevState => !prevState);
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendOrEditMessage();
        }
    }

    const sendOrEditMessage = () => {
        props.editingMessage ? editMessage() : sendMessage();
    }

    const sendMessage = () => {
        if (textAreaValue === '') return;

        const messageData = {
            text: textAreaValue,
            sender: props.userId
        }
        const urlMatches = textAreaValue.match(/\b(http|https)?:\/\/\S+/gi) || [];

        props.setAllowScrollToBtm(true);

        if (urlMatches.length === 0)
            props.sendTextMessage(messageData, props.socket, messageTypes.TEXT);
        else
            props.sendTextMessage(messageData, props.socket, messageTypes.LINK);

        setTextAreaValue('');
    }

    const editMessage = () => {
        if (textAreaValue === '') return;

        props.editMessage({ text: textAreaValue }, props.socket, props.editingMessage);
        setTextAreaValue('');
        props.clearSelectedMessages();
    }

    const smileLostFocusHandler = () => setShowSmiles(false);

    return (
        <div className={classes.inputBlock}>
            <div style={{ position: 'relative' }}>
                <Zoom in={showSmiles}>
                    <Picker
                        set='twitter'
                        onSelect={addNewEmoji}
                        color={'#FFE66D'}
                        sheetSize={20}
                    />
                </Zoom>

                <TextField
                    id="filled-multiline-flexible"
                    className={classes.textArea}
                    fullWidth
                    multiline
                    autoFocus 
                    inputRef={inputRef}
                    rows={2}
                    rowsMax={4}
                    placeholder={'Start to write...'}
                    value={textAreaValue}
                    onChange={onInputChange}
                    onKeyDown={handleEnterKeyPress}
                    InputLabelProps={{
                        className: classes.inputLabelProp
                    }}
                    InputProps={{
                        className: classes.inputProp,
                        endAdornment: (
                            <InputAdornment position="end" className={classes.addSmileBlock} onBlur={smileLostFocusHandler}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowSmiles}
                                    disableRipple={true}
                                    disableFocusRipple={true}
                                    disableTouchRipple={true}
                                    className={classes.toggleSmilesBtn}
                                >
                                    <InsertEmoticonIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>

            <ActionSection
                smiles={freqSmiles}
                addEmoji={addFreqEmoji}
                sendOrEditMessage={sendOrEditMessage}
                changeProgress={props.changeProgress}
                dispatchFiles={props.dispatchFiles}
                focusInput={focusInput}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        socket: state.sckt.socket,
        topic: state.msg.topics[state.tpc.openedTopicId],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendTextMessage: (message, socket, messageType) => { dispatch(sendTextMessageAction(message, socket, messageType)) },
        editMessage: (message, socket, editableMessageId) => { dispatch(editMessageAction(message, socket, editableMessageId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBlock);
