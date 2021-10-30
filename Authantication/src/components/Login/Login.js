import React, { useState, useEffect, useReducer } from 'react';

import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const dispatchHandler=(state, action)=>{
  if(action.type === "USER_INPUT"){
    return { value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === "INPUT_BLUR"){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return { value: "", isValid: false}
}

const passwordHandler = ( state, action ) =>{
  if( action.type === "USER_PASSWORD"){
    return { value: action.val, isValid: action.val.trim().length > 6}
  }
  if( action.type === "PASSWORD_BLUR"){
    return { value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: "", isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(dispatchHandler, {
    value: "",
    isValid: null
  })

  const [passwordState, dispatchPassword] = useReducer(passwordHandler, {
    value: "",
    isValid: 0
  })

  const { isValid: emailIsvalid } = emailState;
  const { isValid: passwordIsvalid } = passwordState;

  useEffect(() => {
    const interval = setTimeout(()=>{
      console.log("valid");
      setFormIsValid(
        passwordIsvalid && emailIsvalid
      );
    },1000)
    return (()=>{
      console.log("cleanUp");
      clearTimeout(interval)
    })

  }, [emailIsvalid, passwordIsvalid])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: "USER_PASSWORD", val: event.target.value});

    setFormIsValid(
      // event.target.value.trim().length > 6 && emailState.value.includes('@')
      passwordState.isValid && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "PASSWORD_BLUR" })
  };

  const submitHandler = (event, store) => {
    event.preventDefault();
    store.onLogin(emailState, passwordState);
  };

  return (
    <AuthContext.Consumer>
      {(store)=>{
        return(
          <Card className={classes.login}>
          <form onSubmit={submitHandler(store)}>
            <div
              className={`${classes.control} ${
                emailState.isValid === false ? classes.invalid : ''
              }`}
            >
              <label htmlFor="email">E-Mail</label>
              <input
                type="email"
                id="email"
                value={emailState.value}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
              />
            </div>
            <div
              className={`${classes.control} ${
                passwordState.isValid === false ? classes.invalid : ''
              }`}
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={passwordState.value}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
              />
            </div>
            <div className={classes.actions}>
              <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                Login
              </Button>
            </div>
          </form>
        </Card>
        )
      }}
    </AuthContext.Consumer>
  );
};

export default Login;
