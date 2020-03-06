import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
    Snackbar
} from '@material-ui/core';
import axios from '../../../utility/axios-instance';

import useStyles from './styles';
import { validation } from '../../../utility/validation';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ShareTopic = (props) => {
    const classes = useStyles();

    const [stateInputs, setStateInputs] = useState({
        email: {
            config: {
                name: 'email',
                label: 'Email',
            },
            validationRules: {
                isRequred: true,
                isEmail: true,
            },
            isValid: false,
            validationMessage: '',
            value: '',
        },
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setSnackbarMessage(null);
    }

    useEffect(() => {
        props.topic === null ? clearTopic() : toPropsTopic();
    }, [props.topic])

    const clearTopic = () => {
        setStateInputs(prevState => {
            return {
                ...prevState,
                email: {
                    ...prevState.email,
                    isValid: false,
                    validationMessage: '',
                    value: '',
                },
            }
        })
    }

    const toPropsTopic = () => {
        setStateInputs(prevState => {
            return {
                ...prevState,
                email: {
                    ...prevState.email,
                    value: '',
                },
            }
        })
    }

    const shareTopicHandler = () => {
        const newMemberData = {
            currentMembers: props.topic.membersId,
            email: stateInputs.email.value,
        }

        props.handleClose();
        startShareTopic(props.topic._id, newMemberData);

    }

    const startShareTopic = (topicId, newMemberData) => {
        axios.patch('/topics/single/share/' + topicId, newMemberData)
            .then(response => {
                setOpenSnackbar(true);
                setSnackbarMessage('Topic shared successfully');
            })
            .catch(err => {
                console.log(err);
                setOpenSnackbar(true);
                setSnackbarMessage(err.response.data.message);
            });
    }

    const onInputHandler = (inputName, event) => {
        const newValue = event.target.value;

        const [currentValid, newValidationMessage] = validation(
            newValue,
            stateInputs[inputName].validationRules,
            null
        );

        setStateInputs(prevState => ({
            ...prevState,
            [inputName]: {
                ...prevState[inputName],
                value: newValue,
                isValid: currentValid,
                validationMessage: newValidationMessage
            }
        }));
    }

    let inputs = [];
    let fieldsIsValid = true;

    for (let key in stateInputs) {
        inputs.push(
            <TextField
                key={key}
                className={classes.topicInput}
                label={stateInputs[key].config.label}
                name={stateInputs[key].config.name}
                fullWidth
                color="primary"
                value={stateInputs[key].value}
                onInput={onInputHandler.bind(this, key)}
                error={!stateInputs[key].isValid && stateInputs[key].value.length > 0}
                helperText={stateInputs[key].validationMessage}
            />
        );

        fieldsIsValid = stateInputs[key].isValid && fieldsIsValid;
    }

    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth={'sm'}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div className={classes.dialogColorHat}></div>
                <DialogTitle id="alert-dialog-slide-title" className={classes.topicTitle}>{"Share Topic"}</DialogTitle>
                <DialogContent>
                    {inputs}
                </DialogContent>
                <DialogActions>
                    <Button className={classes.closeBtn} onClick={props.handleClose}>Cancel</Button>
                    <Button disabled={!fieldsIsValid} className={classes.agreeBtn} onClick={shareTopicHandler}>Share</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </React.Fragment>
    )
}

export default ShareTopic;
