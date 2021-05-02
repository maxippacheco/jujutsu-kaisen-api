const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, imageToCloudinary } = require('../controllers/uploads');
const { validarColeccion } = require('../helpers/validar-coleccion');
const {validarArchivoSubir} = require('../middlewares/validar-archivo');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();


router.post('/', validarArchivoSubir, uploadFile);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('coleccion').custom(c => validarColeccion(c, ['wizzards', 'curses'])),
    check('id').isMongoId(),
    validarCampos,
], imageToCloudinary);


module.exports= router;