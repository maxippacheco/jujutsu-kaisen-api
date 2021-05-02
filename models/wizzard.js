const { Schema, model } = require("mongoose");

const WizzardSchema = Schema({

    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique: true
    },
    grado: {
        type: String,
        required:[true, 'El grado de hechizeria es obligatorio'],
    },
    estado:{
        type: String,
        default: 'Vivo'
    },
    img:{
        type: String
    },
    ocupacion:{
        type: String,
        default: 'Hechizero',
        required: true
    },
    state:{
        type: Boolean,
        default: true,
        required: true
    },
    apodo:{
        type: String
    },
    afiliacion:{
        type: String,
        default: 'Colegio Técnico de Magia Metropolitana de Tokio'
    },
    clan:{
        type: String
    },

})


WizzardSchema.methods.toJSON = function() {
    const { __v, _id, ...wizzard  } = this.toObject();
    wizzard.uid = _id;
    return wizzard;
}

module.exports = model('Wizzard', WizzardSchema);