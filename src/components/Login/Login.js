import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../Input/Input';

const emailReducer = (state, action) => {

  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')};
  }

  if(action.type==='USER_BLUR'){
    return {value:state.value, isValid:state.value.includes('@')};
  }

  return {value:'', isValid:false};
}

const passwordReducer = (state, action) => {

  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.length>6};
  }

  if(action.type==='USER_BLUR'){
    return {value:state.value, isValid:state.value.length>6};
  }

  return {value:'', isValid:false};
}

const Login = (props) => {
  const ctx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value:'',
    isValid:false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value:'',
    isValid:false,
  });

  const {isValid:emailStateIsValid} = emailState;
  const {isValid:passwordStateIsValid} = passwordState;

  useEffect(() => {
    const identifier = setTimeout( () => {
      setFormIsValid(
        emailStateIsValid && passwordStateIsValid
      )
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailStateIsValid, passwordStateIsValid]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({type:'USER_INPUT', val:event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT', val:event.target.value});

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.value.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type:'USER_BLUR'});

  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchEmail({type:'USER_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      ctx.onLogin(emailState.value, passwordState.value);
    } if(!emailStateIsValid){
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailRef}
        label='email'
        type='email'
        id='email'
        isValid={emailState.isValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />

        <Input
        ref={passwordRef}
        label='password'
        type='password'
        id='password'
        isValid={passwordState.isValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
