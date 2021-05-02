
const validarColeccion = (coleccion = '' , colecciones = []) => {
    
    const incluida = colecciones.includes(coleccion);

    if (!incluida) {
        throw new Error('La coleccion que se solicita no es valida o no existe');
    }

    return true;
}

module.exports = {
    validarColeccion
}