import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Checkbox, Link, TextField, FormControlLabel, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import useStyles from '../../styles';
import { signInAction } from '../../../../store/actions/authorization';
import { validation } from '../../../../utility/validation';
import { ReactLink } from '../../../UI/Link/Link';
import { finishLoadingActionCreator } from '../../../../store/actions/authorization';

const SignInForm = (props) => {
    const classes = useStyles();

    const [rememberMe, setRememberMe] = useState(false);

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
        props.finishLoading();
    }, [])

    const signInHandler = (event) => {
        event.preventDefault();

        const loginData = {
            email: stateInputs.email.value,
            password: stateInputs.password.value
        };

        try {
            props.onSignIn(loginData, rememberMe);
        } catch (error) {
            console.log(error);
        }
    }

    const rememberCheckboxHandler = () => {
        setRememberMe(prevState => {
            return !prevState
        })
    }

    const onInputHandler = (inputName, event) => {
        const newValue = event.target.value;

        const [currentValid, newValidationMessage] = validation(
            newValue,
            stateInputs[inputName].validationRules,
            stateInputs.email.value
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

    if (props.userId) return (
        <Redirect to={'/pulp'} />
    )

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">Sign in</Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    {inputs}
                </Grid>

                {
                    props.errorMessage !== null
                        ? <Alert severity="error" className={classes.errorAlert}>{props.errorMessage}</Alert>
                        : null
                }

                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" onChange={rememberCheckboxHandler} />}
                    label="Remember me" />

                <div className={classes.buttonWrapper}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!fieldsIsValid || props.authStart}
                        className={classes.submit}
                        onClick={signInHandler}>
                        <Typography variant="subtitle1">Sign In</Typography>
                    </Button>

                    {props.authStart && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>

                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2" className={classes.redirectLink}>Forgot password?</Link>
                    </Grid>
                    <Grid item>
                        <Link component={ReactLink} to="/sign-up" variant="body2" className={classes.redirectLink}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        userId: state.auth.id,
        authStart: state.auth.authStart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (loginData, rememberMe) => { dispatch(signInAction(loginData, rememberMe)) },
        finishLoading: () => { dispatch(finishLoadingActionCreator()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);