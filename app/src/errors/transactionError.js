class transactionError extends Error {
    
    constructor(message, reasonList) {
        super()
        // Mantiene un seguimiento adecuado de la pila para el lugar donde se lanzó nuestro error (solo disponible en V8)
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, walletNotFound)
        }
    
        this.name = 'walletNotFound'
        // Información de depuración personalizada
        this.message = "Transaction failed with message " +  message + " with list of reasons " + reasonList
        this.status = status
        this.date = new Date()
    }
}

module.exports = transactionError