const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
});

const Producto = sequelize.define('producto', {
  nombre: Sequelize.STRING,
  descripcion: Sequelize.STRING,
  precio: Sequelize.FLOAT,
});

module.exports = {
  sequelize,
  Producto,
};