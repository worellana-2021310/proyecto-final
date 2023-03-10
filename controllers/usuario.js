const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const getUsuario = async (req = request, res = response) => {

    const query = { estado: true };
    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: '----- Lista usuario -----',
        listaUsuarios
    });
}

const postUsuario = async (req = request, res = response) => {

    const { nombre, email, password, rol, carrito } = req.body;
    const usuarioDB = new Usuario({ nombre, email, password, rol, carrito });

    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    await usuarioDB.save();

    res.status(201).json({
        msg: '----- Usuario creado -----',
        usuarioDB
    });
}

const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.status(200).json({
        msg: '----- Usuario editado -----',
        usuarioEditado
    });
}

const deleteUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    res.json({
        msg: '----- Usuario eliminado -----',
        usuarioEliminado
    });
}

const registroUsuario = async (req = request, res = response) => {

    const { nombre, email, password } = req.body;
    const usuarioRegistrado = new Usuario({ nombre, email, password });

    const salt = bcryptjs.genSaltSync();
    usuarioRegistrado.password = bcryptjs.hashSync(password, salt);

    await usuarioRegistrado.save();

    res.status(201).json({
        msg: '----- Registrado exitosamente -----',
        usuarioRegistrado
    });
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
    registroUsuario
}
