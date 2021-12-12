const idInUse = require('../../errors/idInUse')

function handleError(error){
    throw new error(error);
}

module.exports = handleError
