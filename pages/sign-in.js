import React from 'react';
//Material ui imports
import { Typography } from '@material-ui/core';

//component imports
import Layout from '../components/layout';
import SignInForm from '../components/signInForm';
const SignIn = () => {
	return (
		<div>
			<Layout>
				<SignInForm />
			</Layout>


		</div>
	);
}

export default SignIn;
