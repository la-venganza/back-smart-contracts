const idInUse = require('../../errors/idInUse')

function handleError(error){
    if (error instanceof idInUse) {
        console.log("id in use ")
        message = error.message + ' | ' + error.detail.msg
        throw new ServerError(error, message, error.status || 500)
    } else if (error.request) {
        //custom error for unresponsive server
        console.log("no response from python service")
        throw new ConnectionError(error, 'Python Service is not responding')
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
        throw new Error(error)
    }
}

module.exports = handleError
