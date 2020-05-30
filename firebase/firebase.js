import app from 'firebase/app';
import firebaseConfig from './config';

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
            // app.analytics();
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    // Register a user
    async signUp(first, last, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

        return await newUser.user.updateProfile({
            displayName: `${first} ${last}`
        })
    }

    //Sign in a user
    async signIn(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password);
        // this.analytics.logEvent('login');
    }

    //Sign out a user
    async signOut() {
        await this.auth.signOut();
    }
}

export default Firebase;