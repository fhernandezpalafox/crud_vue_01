const express = require('express');
const cors = require('cors');
const { sequelize, Producto } = require('./src/database');

const app = express();
app.use(express.json());
app.use(cors());

// Crear un nuevo producto
app.post('/api/productos', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const producto = await Producto.create({ nombre, descripcion, precio });
  res.json(producto);
});

// Obtener todos los productos
app.get('/api/productos', async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

// Obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  res.json(producto);
});

// Actualizar un producto
app.put('/api/productos/:id', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const producto = await Producto.findByPk(req.params.id);
  producto.nombre = nombre;
  producto.descripcion = descripcion;
  producto.precio = precio;
  await producto.save();
  res.json(producto);
});

// Eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  await producto.destroy();
  res.json({ message: 'Producto eliminado' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});