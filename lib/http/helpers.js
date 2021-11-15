export function getErrorResponse(status, reason, data={}) {
    let resp = {
        success: false,
        reason: reason,
        data: data
    }

    return [status, resp];
}

export function getSuccessResponse(data) {
    let status = 200;
    let resp = {
        success: true,
        reason: 'ok',
        data: data
    }
    return [status, resp];
}

export function handleDBResult(err, rows) {
    let status = 200;
    let success = true;
    let reason = 'ok';
    let data = [];

    if(!err) {
        data = rows;
    }
    else {
        status = 500;
        success = false;
        reason = 'error-db:' + err.toString();
        console.log(err);
    }

    let resp = {
        success: success,
        reason: reason,
        data: data
    }

    return [ status, resp ];
}