import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, Zoom } from '@material-ui/core';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { connect } from 'react-redux';

import useStyles from '../styles';
import './InputBlock.css';
import ActionSection from './ActionSection/ActionSection';
import { sendTextMessageAction } from '../../../../store/actions/messages';

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

    useEffect(() => {
        setFreqSmiles([...getFreqSmiles()]);
    }, []);

    const onInputChange = (event) => {
        const newValue = event.target.value;
        setTextAreaValue(newValue);
    }

    const addNewEmoji = (emoji) => {
        setTextAreaValue(prevState => prevState + emoji.native);

        setFreqSmiles(prevState => addNewSmileToFreq([...prevState], emoji.id));
    }

    const addFreqEmoji = (emoji) => {
        setTextAreaValue(prevState => prevState + emoji.native);
    }

    const handleClickShowSmiles = () => {
        setShowSmiles(prevState => !prevState);
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }

    const sendMessage = () => {
        if (textAreaValue === '') return;
        const messageData = {
            text: textAreaValue,
            sender: props.userId
        }

        props.setAllowScrollToBtm(true);
        props.sendTextMessage(messageData, props.socket);
        setTextAreaValue('');
    }

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
                            <InputAdornment position="end" className={classes.addSmileBlock}>
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
                sendMessage={sendMessage}
                setAllowScrollToBtm={props.setAllowScrollToBtm}
                changeProgress={props.changeProgress}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        socket: state.sckt.socket,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendTextMessage: (message, socket) => { dispatch(sendTextMessageAction(message, socket)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBlock);
