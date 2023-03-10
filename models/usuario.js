const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        default: 'ROLE_CLIENTE'

    },
    estado: {
        type: Boolean,
        default: true
    },
    carrito: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }
});

module.exports = model('Usuario', UsuarioSchema);