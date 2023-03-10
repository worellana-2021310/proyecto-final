const { request, response } = require('express');
const User = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: '----- Correo incorrecto -----'
            })
        }

        if (!user) {
            return res.status(202).json({
                msg: '----- Usuario no encontrado -----'
            })
        }

        if (!bcryptjs.compareSync(password, user.password)) {
            return res.status(400).json({
                msg: '----- Contraseña incorrecta -----'

            })
        }

        const token = await generarJWT(user.id);

        res.json({
            msg: '----- Login exitoso -----',
            email,
            password,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '----- Comunicarse con soporte -----'
        })
    }
}

module.exports = {
    login
}