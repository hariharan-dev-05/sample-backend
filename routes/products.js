const express = require('express');
const router = express.Router();

// Sample data
let products = [
  { id: 1, name: 'Laptop', price: 999.99, stock: 15 },
  { id: 2, name: 'Phone', price: 699.99, stock: 25 },
  { id: 3, name: 'Tablet', price: 449.99, stock: 30 }
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST create new product
router.post('/', (req, res) => {
  const { name, price, stock } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  
  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price),
    stock: stock || 0
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const { name, price, stock } = req.body;
  if (name) product.name = name;
  if (price) product.price = parseFloat(price);
  if (stock !== undefined) product.stock = parseInt(stock);
  
  res.json(product);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;