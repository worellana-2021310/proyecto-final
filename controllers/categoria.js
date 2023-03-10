const { response, request } = require('express');

const Categoria = require('../models/categoria');
const Producto = require('../models/producto')

const getCategoria = async (req = request, res = response) => {

    const listaCategorias = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find()
    ])

    res.json({
        msg: '----- Lista de categorias -----',
        listaCategorias
    });
}

const postCategoria = async (req = request, res = response) => {

    const { categoria, descripcion } = req.body;
    const categoriaDB = new Categoria({ categoria, descripcion });

    await categoriaDB.save();
    res.status(201).json({
        msg: '----- Categoria agregada -----',
        categoriaDB
    });
}

const putCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, ...resto } = req.body;

    const categoriaEditada = await Categoria.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json({
        msg: '----- Categoria editada -----',
        categoriaEditada
    });
}

const deleteCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const categoriaEliminada = await Categoria.findByIdAndDelete(id);
    res.json({
        msg: '----- Categoria eliminada -----',
        categoriaEliminada
    });
}

const defaultCategoria = async (req = request, res = response) => {

    let data = {
        nombre: 'Categoria por defecto',
        descripcion: 'Categoria por defecto',
        usuario: ""
    }
    let existeCategoria = await Categoria.findOne({ nombre: 'Categoria por defecto' });
    if (existeCategoria) return console.log('----- Categoria por defecto -----');
    let defCategoria = new Categoria(data);
    await defCategoria.save();
    return console.log('----- Categoria por defecto -----');
}

module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria,
    defaultCategoria
}