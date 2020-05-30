import React from 'react';
import Layout from '../components/layout';
import SignUpForm from '../components/signUpForm/hookForm';
import { Typography } from '@material-ui/core';



const SignUp = () => {
    return (
        <div>
            <Layout>
                
                <SignUpForm />
            </Layout>
        </div>
    );
}

export default SignUp;