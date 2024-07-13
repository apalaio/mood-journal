import { SignUp } from '@clerk/nextjs';
import React from 'react';

const SignUpPage = () => (
  <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
);

export default SignUpPage;
