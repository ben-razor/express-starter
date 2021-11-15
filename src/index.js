import dotenv from 'dotenv';
import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import { verify } from '../lib/identity/did/did_middleware';
import { corsOptionsDelegate } from '../lib/cors/cors';
import { getSuccessResponse, getErrorResponse } from '../lib/http/helpers';

const nodeEnv = process.env.NODE_ENV;
let envPath =  '.env' + (nodeEnv ? `.${nodeEnv}` : '');
dotenv.config({ path: envPath });

const port = process.env.PORT || 8878;
const key = process.env.KEY || 'src/localhost.key';
const cert = process.env.CERT || 'src/localhost.crt';

const app = express()
let options = {};

if(key && cert) {
    options = {
        key: fs.readFileSync(key),
        cert: fs.readFileSync(cert)
    };
}

app.use(express.json());
app.use(cors(corsOptionsDelegate));

app.get('/', async (req, res) => {
    let success = true;

    if(success) {
        let data = {
            'message': 'Johnny 5 is alive!'
        }

        let [status, resp] = getSuccessResponse(data);
        res.status(status).json(resp);
    }
    else {
        let [status, resp] = getErrorResponse(400, reason);
        res.status(status).json(resp);
    }
});

app.post('/api/test_post', async(req, res) => {
    let body = req.body
    let success= body.success;
   
    if(success) {
        let data = { 'message': 'test_post success' };
        let [status, resp] = getSuccessResponse(data);
        res.status(status).json(resp);
    }
    else {
        let reason = 'error-empty-success';
        let [status, resp] = getErrorResponse(400, reason);
        res.status(status).json(resp);
    }
})

app.post('/api/test_verify', verify(), async(req, res) => {
    let body = req.body
    let success= body.success;
   
    if(success) {
        let data = { 'message': 'test_verify success' };
        let [status, resp] = getSuccessResponse(data);
        res.status(status).json(resp);
    }
    else {
        let reason = 'error-empty-success';
        let [status, resp] = getErrorResponse(400, reason);
        res.status(status).json(resp);
    }
})

https.createServer(options, app).listen(port, () => {
    console.log(`ExpressJS server listening on ${port}`)
});