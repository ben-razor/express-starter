import DidVerifier from './did_verifier.js';

let API_URL = process.env.CERAMIC_URL || 'https://ceramic-clay.3boxlabs.com';
console.log('API_URL', API_URL);
const didVerifier = new DidVerifier(API_URL);

export function verify() {
    return async function (req, res, next) {
        let body = req.body;
        let userIdSupplied = ('userid' in body);
        let jwsSupplied = ('jws' in body);

        if(jwsSupplied && userIdSupplied) {
            let userid = body.userid;
            let result = await didVerifier.verifyJWS(userid, body.jws);

            if(result.success) {
                next()
            }
            else {
                let resp = {
                    success: false,
                    reason: result.reason,
                    data: {}
                }

                let status = 500;

                if(resp.reason === 'error-jws-mismatch') {
                    status = 401;
                }

                res.status(status).send(resp)
            }
        }
        else {
            let reason = 'error-empty-userid';

            if(userIdSupplied) {
                reason = 'error-empty-jws';
            }

            let resp = {
                success: false,
                reason: reason,
                data: {}
            }

            res.status(400).send(resp)
        }
    }
}
