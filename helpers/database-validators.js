const Grado = require("../models/grado");
const Wizzard = require("../models/wizzard");
const Curse = require("../models/curse");

const wizzardExist = async(nombre = '') => {
    
    const wizzardExists = await Wizzard.findOne({ nombre });

    if ( wizzardExists ) {
        throw new Error(`El hechizero ${ nombre } ya existe`)
    }

}

const wizzardPerIdExists = async(id = '') => {
    
    const wizzardExistsperId = await Wizzard.findById(id);

    if ( !wizzardExistsperId ) {
        throw new Error(`El hechizero con este id no existe`)
    }

}

const esGradoValido = async(grado = '') => {
    
    const gradoExists = await Grado.find({grado});

    if ( !gradoExists ) {
        throw new Error(`El grado de hechizeria es invalido`)
    }

}

const curseExists = async( nombre = '' ) => {
    const curseExist = await Curse.findOne({nombre});

    if ( curseExist ) {
        throw new Error(`La maldicion ${ nombre } ya existe`)
    }
}


module.exports = {
    wizzardExist,
    wizzardPerIdExists,
    esGradoValido,
    curseExists
}
