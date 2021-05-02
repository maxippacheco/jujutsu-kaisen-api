const { response } = require('express');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLODINARY_URL );
const { subirArchivo } = require('../helpers/subir-archivo');
const Wizzard = require('../models/wizzard');
const Curse = require('../models/curse');

const uploadFile = async(req, res = response) => {
    
    try {
        
        const nombre = await subirArchivo(req.files, undefined, 'imgs')

        res.json({nombre})

    } catch (error) {
        console.log(error);
    }
}

const imageToCloudinary = async(req, res = response) => {
    
    const {id, coleccion} = req.params;
    
    let modelo;

    switch ( coleccion ) {
        case 'wizzards':
            modelo = await Wizzard.findById(id);
                if (!modelo) {
                    return res.status(400).json({msg: `El hechizero con este id no existe`});

                }
            break;
        
            case 'curses':
                modelo = await Curse.findById(id);
                    if (!modelo) {
                        return res.status(400).json({msg: `La maldicion con este id no existe`});
    
                    }
                break;
    
        default:
            res.status(500).json({
                msg:'Se me ha olvidado validar esto'
            })
            break;
    }

    //Limpiar imagenes existentes

    if ( modelo.img ) {
      
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
  
        const [public_id] = nombre.split('.');

        cloudinary.uploader.destroy(public_id)

    }



    const {tempFilePath} = req.files.archivo;

    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);


    modelo.img = secure_url;

    await modelo.save();


    res.json(modelo)
}


module.exports = {
    uploadFile,
    imageToCloudinary
};