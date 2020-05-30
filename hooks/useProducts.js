import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../firebase';

const useProducts = (order) => {

    //Local State
    const [products, setProducts] = useState([]);
    const [done, setDone] = useState(null)
    //FireBase context
    const { firebase } = useContext(FirebaseContext);
    useEffect(() => {
        const getProducts = async () => {
            await firebase.db.collection("products").orderBy(order, 'desc').onSnapshot(handleSnapshot);
        }
        getProducts();

    }, []);

    // Snapchot handler
    const handleSnapshot = (snapshot) => {
        const products = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setProducts(products);
        setDone(true)
    }

    return { products, done }
}
export default useProducts;