class idInUse extends Error {
    
    constructor( userId, status) {
        // Pasa los argumentos restantes (incluidos los específicos del proveedor) al constructor padre
        super()
        // Mantiene un seguimiento adecuado de la pila para el lugar donde se lanzó nuestro error (solo disponible en V8)
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, idInUse)
        }
    
        this.name = 'idInUse'
        // Información de depuración personalizada
        this.message = "user id " + userId + " is already in use"
        this.status = status
        this.date = new Date()
    }
}

module.exports = idInUse