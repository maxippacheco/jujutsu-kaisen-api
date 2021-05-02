const { Router } = require('express');
const { validarCampos } = require('../middlewares/validarCampos');
const { check } = require('express-validator');
const { getAllCurses, getCurseById , createCurses, updatedCurses} = require('../controllers/curses');
const { curseExists } = require('../helpers/database-validators');

const router = Router();

router.get('/', getAllCurses)

router.get('/:id',[
    check('id', 'No es un ID de mongo valido').isMongoId(),
    // check('id').custom( wizzardPerIdExists ),
    validarCampos
], getCurseById)

router.post('/',[
    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(curseExists),
    validarCampos

],createCurses);


router.put('/:id',[
    check('id', 'No es un ID de mongo valido').isMongoId(),
    // check('id').custom(wizzardPerIdExists),
    validarCampos
], updatedCurses);

module.exports= router;