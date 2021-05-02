const { Router } = require('express');
const {
    createWizzard,
    getWizzardById,
    getAllWizzards,
    wizzardUpdated
} = require('../controllers/wizzards');
const { validarCampos } = require('../middlewares/validarCampos');
const { check } = require('express-validator');
const { wizzardExist, wizzardPerIdExists, esGradoValido } = require('../helpers/database-validators');

const router = Router();

router.get('/', getAllWizzards)

router.get('/:id',[
    check('id', 'No es un ID de mongo valido').isMongoId(),
    check('id').custom( wizzardPerIdExists ),
    validarCampos
],getWizzardById)

router.post('/',[
    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('grado').custom(esGradoValido),
    check('nombre').custom(wizzardExist),
    validarCampos

],createWizzard);


router.put('/:id',[
    check('id', 'No es un ID de mongo valido').isMongoId(),
    check('id').custom(wizzardPerIdExists),
    validarCampos
], wizzardUpdated);

module.exports= router;