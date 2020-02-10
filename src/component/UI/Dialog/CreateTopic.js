import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField
} from '@material-ui/core';
import { connect } from 'react-redux';

import useStyles from './style';
import { validation } from '../../../utility/validation';
import { createTopicAction } from '../../../store/actions/topics';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTopic = (props) => {
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
            isValid: false,
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

    const clearState = () => {
        setStateInputs(prevState => {
            return {
                ...prevState,
                title: {
                    ...prevState.title,
                    isValid: false,
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

    const createTopicHandler = () => {
        const newTopic = {
            creatorId: props.userId,
            name: stateInputs.title.value,
            note: stateInputs.notes.value,
        }

        //close and clear dialog
        props.handleClose(); 
        clearState();

        //create topic
        props.startCreatingTopic(newTopic);
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
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            maxWidth={'xs'}
            onClose={() => {
                clearState();
                props.handleClose();
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <div className={classes.dialogColorHat}></div>
            <DialogTitle id="alert-dialog-slide-title" className={classes.topicTitle}>{"Create Topic"}</DialogTitle>
            <DialogContent>
                {inputs}
            </DialogContent>
            <DialogActions>
                <Button className={classes.closeBtn} onClick={props.handleClose}>Disagree</Button>
                <Button disabled={!fieldsIsValid} className={classes.agreeBtn} onClick={createTopicHandler}>Agree</Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startCreatingTopic: (topic) => { dispatch(createTopicAction(topic)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTopic);
