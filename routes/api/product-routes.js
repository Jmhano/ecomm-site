const router = require("express").Router();
const { Product } = require("../../models");

// GET /api/users
router.get("/", (req, res) => {
  // Access our Product model and run .findAll() method)
  Product.findAll()
  .then((dbProductData) => res.json(dbProductData))
    //.then(dbProductData => { console.log(‘what is dbPRoductData’, dbProductData) })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/products/1
Product.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

// POST /api/products
router.post('/', (req, res) => {
    // expects {product_name 'Lernantino', price: '$1.88', stock: '498'}
    Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock
    })
      .then(dbProductData => res.json(dbProductData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });



// PUT /api/products/1
router.put('/:id', (req, res) => {
  // expects {product_name: 'Lernantino', price: '6.77', stock: '1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Product.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbProductData => {
      if (!dbProductData[0]) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// DELETE /api/products/1
router.delete('/:id', (req, res) => {
    Product.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbProductData => {
        if (!dbProductData) {
          res.status(404).json({ message: 'No product found with this id' });
          return;
        }
        res.json(dbProductData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
