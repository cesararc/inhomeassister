import admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app';
import dotenv from 'dotenv';

dotenv.config();

const firestore = admin.initializeApp({
    credential: applicationDefault(),
    databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
});

export default firestore.firestore();

export const auth = firestore.auth();

// export const storage = admin.storage().bucket();
