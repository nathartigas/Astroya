import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = "landing-page-astroya";

if (!getApps().length) {
  if (!process.env.FIREBASE_ADMIN_CREDENTIALS) {
    throw new Error("FIREBASE_ADMIN_CREDENTIALS environment variable is not set.");
  }
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS, "base64").toString("utf-8")
    );

    initializeApp({
      credential: cert(serviceAccount),
      projectId,
      databaseURL: `https://${projectId}.firebaseio.com`,
    });
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
    throw error;
  }
}

export const db = getFirestore();