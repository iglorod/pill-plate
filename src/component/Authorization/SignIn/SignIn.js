import React from 'react';

import SignInForm from './SignInForm/SignInForm';
import AuthContainer from '../AuthContainer/AuthContainer';

const SignIn = () => {
  return (
    <AuthContainer>
      <SignInForm />
    </AuthContainer>
  );
}

export default SignIn;