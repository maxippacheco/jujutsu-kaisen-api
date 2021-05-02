const { Schema, model } = require("mongoose");

const CurseSchema = Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    apodo:{ type: String },
    tipo: {
        type: String,
        default: 'Espiritu Maldito'
    },
    state: {type: Boolean, default: true},
    img: { type: String },
    estado: {
        type: String,
        default: 'Vivo'
    }
})

module.exports = model( 'Curse' , CurseSchema );