import * as functions from "firebase-functions";
import next from "next";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "url";

const nextApp = next({
    dev: false,
    conf: {
        distDir: ".next",
    },
    dir: process.cwd()
});

export const nextServer = functions.https.onRequest(async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    await nextApp.prepare();

    const parsedUrl = parse(req.url || "/", true);
    const handler = nextApp.getRequestHandler();

    return handler(req, res, parsedUrl);
});