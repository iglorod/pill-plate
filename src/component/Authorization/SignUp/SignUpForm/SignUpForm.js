import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Link, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import axios from 'axios';

import useStyles from '../../styles';
import { signUpAction } from '../../../../store/actions/authorization';
import { validation } from '../../../../utility/validation';

const SignUpForm = (props) => {
    const classes = useStyles();

    const [emailIsCorrect, setEmailIsCorrect] = useState(false);
    const [emailTimeoutId, setEmailTimeoutId] = useState(null);

    const [stateInputs, setStateInputs] = useState({
        email: {
            config: {
                name: 'email',
                label: 'Email',
            },
            validationRules: {
                isRequred: true,
                isEmail: true,
                shoudBeUniqe: true
            },
            isValid: false,
            validationMessage: '',
            value: '',
        },
        emailConfirm: {
            config: {
                name: 'email1',
                label: 'Confirm Email',
            },
            validationRules: {
                isRequred: true,
                shoudBeEqual: true,
            },
            isValid: false,
            validationMessage: '',
            value: '',
        },
        password: {
            config: {
                type: 'password',
                name: 'password',
                label: 'Password',
            },
            validationRules: {
                isRequred: true,
                minLength: true,
            },
            isValid: false,
            validationMessage: '',
            value: '',
        },
    });

    useEffect(() => {
        if (!emailIsCorrect) return;

        clearTimeout(emailTimeoutId);

        const timeoutId = setTimeout(() => {
            const data = {
                email: stateInputs.email.value
            }

            axios.post('http://localhost:4000/user/email-exists', data)
                .then(response => {

                    if (response.data) {
                        setStateInputs(prevState => ({
                            ...prevState,
                            email: {
                                ...prevState.email,
                                isValid: false,
                                validationMessage: 'Email already exist',
                            }
                        }))

                    }
                })
                .catch(err => console.log(err))

        }, 800);
        setEmailTimeoutId(timeoutId);
    }, [stateInputs.email.value])

    const signUpHandler = (event) => {
        event.preventDefault();

        const newUser = {
            email: stateInputs.email.value,
            password: stateInputs.password.value
        };

        try {
            props.onSignUp(newUser);
        } catch (error) {
            console.log(error);
        }
    }

    const onInputHandler = (inputName, event) => {
        const newValue = event.target.value;

        const [currentValid, newValidationMessage] = validation(
            newValue,
            stateInputs[inputName].validationRules,
            stateInputs.email.value
        );

        checkEmailIsCorrect(inputName, currentValid);

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

    const checkEmailIsCorrect = (imputName, isValid) => {
        if (imputName === 'email') setEmailIsCorrect(isValid);
    }

    let inputs = [];
    let fieldsIsValid = true;

    for (let key in stateInputs) {
        inputs.push(
            <Grid item key={key} xs={12}>
                <TextField
                    label={stateInputs[key].config.label}
                    name={stateInputs[key].config.name}
                    type={stateInputs[key].config.type}
                    variant="outlined"
                    fullWidth
                    color="primary"
                    value={stateInputs[key].value}
                    onInput={onInputHandler.bind(this, key)}
                    error={!stateInputs[key].isValid && stateInputs[key].value.length > 0}
                    helperText={stateInputs[key].validationMessage}
                />
            </Grid>
        );

        fieldsIsValid = stateInputs[key].isValid && fieldsIsValid;
    }

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">Sign up</Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    {inputs}
                </Grid>

                <Typography
                    variant="body1"
                    display="block"
                    className={classes.errorText}>
                    {props.errorMessage}
                </Typography>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!fieldsIsValid}
                    className={classes.submit}
                    onClick={signUpHandler}
                >
                    <Typography variant="subtitle1">Sign Up</Typography>
                </Button>

                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/sign-in" variant="body2" className={classes.redirectLink}>
                            {'Already have an account? Sign in'}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp: (newUser) => dispatch(signUpAction(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);