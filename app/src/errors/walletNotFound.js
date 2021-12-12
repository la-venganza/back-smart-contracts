class walletNotFound extends Error {
    
    constructor(userId, status) {
        super()
        // Mantiene un seguimiento adecuado de la pila para el lugar donde se lanzó nuestro error (solo disponible en V8)
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, walletNotFound)
        }
    
        this.name = 'walletNotFound'
        // Información de depuración personalizada
        this.message = "wallet with id " +  userId + " not found"
        this.status = status
        this.date = new Date()
    }
}

module.exports = walletNotFound