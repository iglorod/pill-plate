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
import { connect } from 'react-redux';

import useStyles from './styles';
import { validation } from '../../../utility/validation';
import { editTopicAction, editTopicActionCreator } from '../../../store/actions/topics';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditTopic = (props) => {
    const classes = useStyles();

    const [stateInputs, setStateInputs] = useState({
        title: {
            config: {
                name: 'title',
                label: 'Title',
            },
            validationRules: {
                isRequred: true,
                maxLength: 20,
            },
            isValid: true,
            validationMessage: '',
            value: '',
        },
        notes: {
            config: {
                name: 'notes',
                label: 'Notes',
            },
            validationRules: {
                maxLength: 100,
            },
            isValid: true,
            validationMessage: '',
            value: '',
        }
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    useEffect(() => {
        props.topic === null ? clearTopic() : toPropsTopic();
    }, [props.topic])

    const clearTopic = () => {
        setStateInputs(prevState => {
            return {
                ...prevState,
                title: {
                    ...prevState.title,
                    isValid: true,
                    validationMessage: '',
                    value: '',
                },
                notes: {
                    ...prevState.notes,
                    isValid: true,
                    validationMessage: '',
                    value: '',
                }
            }
        })
    }

    const toPropsTopic = () => {
        setStateInputs(prevState => {
            return {
                ...prevState,
                title: {
                    ...prevState.title,
                    value: props.topic.name,
                },
                notes: {
                    ...prevState.notes,
                    value: props.topic.note,
                }
            }
        })
    }

    const editTopicHandler = () => {
        const updateTopic = {
            _id: props.topic._id,
            name: stateInputs.title.value,
            note: stateInputs.notes.value,
            date: new Date().toLocaleDateString(),
        }

        //close dialog
        props.handleClose();

        //send patch request to api
        props.startEditingTopic(updateTopic);

        //update state
        props.finishEditingTopic(updateTopic, handleOpenSnackbar);
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
                maxWidth={'xs'}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div className={classes.dialogColorHat}></div>
                <DialogTitle id="alert-dialog-slide-title" className={classes.topicTitle}>{"Edit Topic"}</DialogTitle>
                <DialogContent>
                    {inputs}
                </DialogContent>
                <DialogActions>
                    <Button className={classes.closeBtn} onClick={props.handleClose}>Disagree</Button>
                    <Button disabled={!fieldsIsValid} className={classes.agreeBtn} onClick={editTopicHandler}>Agree</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                message={'Topic was edited'}
            />
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditingTopic: (topic) => { dispatch(editTopicAction(topic)) },
        finishEditingTopic: (topic, handleOpenSnackbar) => { dispatch(editTopicActionCreator(topic, handleOpenSnackbar)) }
    }
}

export default connect(null, mapDispatchToProps)(EditTopic);
