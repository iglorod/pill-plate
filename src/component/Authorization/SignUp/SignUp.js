import React from 'react';

import SignUpForm from './SignUpForm/SignUpForm';
import AuthContainer from '../AuthContainer/AuthContainer';

const SignUp = () => {
  return (
    <AuthContainer>
      <SignUpForm />
    </AuthContainer>
  );
}

export default SignUp;