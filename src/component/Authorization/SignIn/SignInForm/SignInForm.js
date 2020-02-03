import React, { useState } from 'react';
import { Grid, Button, Typography, Checkbox, Link, TextField, FormControlLabel } from '@material-ui/core';
import { connect } from 'react-redux';

import useStyles from '../../styles';
import { signInAction } from '../../../../store/actions/authorization';
import { validation } from '../../../../utility/validation';

const SignInForm = (props) => {
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

    const signInHandler = (event) => {
        event.preventDefault();

        const loginData = {
            email: stateInputs.email.value,
            password: stateInputs.password.value
        };

        try {
            props.onSignIn(loginData);
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

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">Sign in</Typography>
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

                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me" />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!fieldsIsValid}
                    className={classes.submit}
                    onClick={signInHandler}>
                    <Typography variant="subtitle1">Sign In</Typography>
                </Button>

                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2" className={classes.redirectLink}>Forgot password?</Link>
                    </Grid>
                    <Grid item>
                        <Link href="/sign-up" variant="body2" className={classes.redirectLink}>
                            {"Don't have an account? Sign In"}
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
        onSignIn: (loginData) => { dispatch(signInAction(loginData)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);