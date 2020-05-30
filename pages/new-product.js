import React, { useContext } from 'react';
import Layout from '../components/layout';
import { Typography } from '@material-ui/core';
//firebase context
import { FirebaseContext } from '../firebase';
//component import
import NewProductForm from '../components/newProductForm';
import Error404 from '../components/404';
const NewProduct = () => {
    //context de firebase
    const { user } = useContext(FirebaseContext);
    return (
        <div>
            <Layout>
                {user ?
                    <NewProductForm />
                    :
                    <Error404 />
                }
            </Layout>


        </div>
    );
}

export default NewProduct;