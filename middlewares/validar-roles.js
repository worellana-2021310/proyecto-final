const { request, response } = require('express');

const esAdminRole = (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: '----- Valida tu rol ADMIN -----'
        })
    }

    const { role, nombre } = req.user
    if (role != 'ROLE_ADMIN') {
        return res.status(401).json({
            msg: '----- Solo el ADMIN puede acceder -----'
        })
    }
    next();
}

const esClienteRole = (req = request, res = response) => {
    if (!req.user) {
        return res.status(500).json({
            msg: '----- Valida tu rol CLIENTE -----'
        })
    }

    const { role, nombre } = req.user
    if (role === 'CLIENTE_ROLE') {
        return res.status(200).json({
            msg: '----- ROLE CLIENTE -----'
        })
    }
    next();
}

module.exports = {
    esAdminRole,
    esClienteRole
}