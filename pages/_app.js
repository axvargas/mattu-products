import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

import firebase, { FirebaseContext } from '../firebase';

import useAuthentication from '../hooks/useAuthentication';

export default function MyApp(props) {
    const { Component, pageProps } = props;

    //USER AUTH HOOK
    const user = useAuthentication();

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Mattu Products</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                

            </Head>
            <FirebaseContext.Provider
                value={{
                    firebase,
                    user
                }}
            >

                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>

            </FirebaseContext.Provider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};