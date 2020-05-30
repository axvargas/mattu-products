import React from 'react';
import Link from 'next/link';
import { Typography } from '@material-ui/core';

import Header from '../header/appBar';
const Layout = (props) => {
    return (
        <>
            <Header/>
            <main>
                {props.children}
            </main>
        </>
    );
}

export default Layout;
