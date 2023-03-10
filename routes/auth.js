const { Router } = require('express');
const { login } = require('../controllers/auth');
const router = Router();
const { check } = require('express-validator');


router.post('/login', [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
], login);

module.exports = router;

