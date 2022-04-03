var express = require('express');
var router = express.Router();
var Validator = require('fastest-validator');

const { Product } = require('../models');

var v = new Validator();

// melihat semua data products
router.get('/', async (req, res) => {
   const products = await Product.findAll();
   res.send(products);
});

// melihat product berdasarkan id
router.get('/:id', async (req, res) => {
   const id = req.params.id;
   const product = await Product.findByPk(id);
   res.send(product || {});
});

// menambah data product
router.post('/', async (req, res) => {
   // validator field
   const schema = {
      name: 'string',
      brand: 'string',
      description: 'string|optional'
   }

   const validate = v.validate(req.body, schema);

   // ketika ada error
   if (validate.length) {
      return res.status(400).json(validate);
   }

   const product = await Product.create(req.body);

   res.json(product);
   // res.send('ok');
});

router.put('/:id', async (req, res) => {
   // ambil id
   const id = req.params.id;
   let product = await Product.findByPk(id);

   if (!product) {
      return res.json({message : 'Product not found'});
   }

   // validator field
   const schema = {
      name: 'string|optional',
      brand: 'string|optional',
      description: 'string|optional'
   }

   const validate = v.validate(req.body, schema);

   // ketika ada error
   if (validate.length) {
      return res.status(400).json(validate);
   }

   product = await product.update(req.body);

   res.send(product);
});

router.delete('/:id', async (req, res) => {
   const id = req.params.id;
   const product = await Product.findByPk(id);

   if (!product) {
      return res.json({message : 'Product not found'});
   }

   await product.destroy();
   res.json({message: "Product is deleted."});
});



module.exports = router;