// lib/firebase-admin-init.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = "landing-page-astroya";

const initFirebaseAdmin = () => {
    if (!getApps().length && process.env.FIREBASE_ADMIN_CREDENTIALS) {
        try {
            const serviceAccount = JSON.parse(
                Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS, "base64").toString("utf-8")
            );

            return initializeApp({
                credential: cert(serviceAccount),
                projectId,
                databaseURL: `https://${projectId}.firebaseio.com`,
            });
        } catch (error) {
            console.error("Firebase Admin initialization error:", error);
        }
    }
    return getApps()[0];
};

export const app = initFirebaseAdmin();
export const db = getFirestore(app);