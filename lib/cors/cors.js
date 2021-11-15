export function corsOptionsDelegate(req, callback) {
    let allowList= ['https://ceramic-explore-ben-razor.vercel.app', 'https://ceramic-explore.vercel.app', 'https://34.77.88.57']
    let host = req.hostname;

    if(host.includes('localhost')) {
        allowList = ['http://localhost', 'https://localhost'];
    }

    let origin = req.header('Origin');
    let corsOptions;

    if(origin) {
        let originNoPort = origin.split(':').slice(0,2).join(':')

        if (allowList.includes(originNoPort )) {
            corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
        } else {
            corsOptions = { origin: false } // disable CORS for this request
        }
    }
    else {
        corsOptions = { origin: true };
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}