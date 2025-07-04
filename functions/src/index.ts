import * as functions from "firebase-functions";
import next from "next";
import path from "path";

const nextApp = next({
    dev: false,
    conf: {
        distDir: ".next",
    },
    dir: path.resolve(__dirname, "..", "..")
});

export const ssrlandingpageastroya = functions.https.onRequest(async (req, res) => {
    try {
        await nextApp.prepare();
        const handler = nextApp.getRequestHandler();
        return handler(req, res);
    } catch (error) {
        console.error("Erro no servidor Next.js:", error);
        res.status(500).send("Erro interno do servidor");
    }
});