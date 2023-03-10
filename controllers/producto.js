//Importacion
const { response, request } = require('express');
const mongoose = require('mongoose');
//Modelos
const Producto = require('../models/producto');

const getProducto = async (req = request, res = response) => {

    const query = { estado: true };

    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        msg: '----- Lista de productos -----',
        listaProductos
    });
}

const getMasVendidos = async (req = request, res = response) => {

    let listaMasVendidos = await Producto.find().sort({ vendidos: 1 })

    res.json({
        msg: '----- Productos más vendidos -----',
        listaMasVendidos
    });
}

const getAgotados = async (req = request, res = response) => {

    const query = { stock: 0 };
    const listaAgotados = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
    ])

    res.json({
        msg: '----- Productos agotados -----',
        listaAgotados
    });
}

const getProductoPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id).
        populate('usuario', 'nombre').
        populate('categoria', 'nombre')

    res.json({
        msg: '----- Buscador -----',
        producto
    });
}

const postProducto = async (req = request, res = response) => {

    const { estado, usuario, vendidos, ...body } = req.body;
    const productoEnDB = await Producto.findOne({ nombre: body.nombre });

    if (productoEnDB) {
        return res.status(400).json({
            mensajeError: `${productoEnDB.nombre} ya existe.`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.user._id
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json({
        msg: '----- Producto agregado -----',
        producto
    });
}

const putProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.user._id;   
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json({
        msg: '----- Producto editado -----',
        producto
    });
}

const deleteProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndDelete(id);

    res.json({
        msg: '----- Producto eliminado -----',
        productoBorrado
    });
}

module.exports = {
    getProducto,
    postProducto,
    putProducto,
    deleteProducto,
    getAgotados,
    getMasVendidos,
    getProductoPorId
}