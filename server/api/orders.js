const router = require('express').Router();
const { Order, Product } = require('../db/models');
module.exports = router;

// GET api/orders
router.get('/', (req, res, next) => {
  Order.findAll({})
    .then(Orders => res.json(Orders))
    .catch(next)
});

// GET api/Orders/:orderId
router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .then(order => {
            res.json(order);
        })
        .catch(next);
});

// POST api/orders
router.post('/', (req, res, next) => {
    Order.create(req.body.order)
    .then(order => {
        order.addProduct([req.body.p1, req.body.p2]);
        res.json(order);
    })
    .catch(next)
});

// PUT api/orders/:orderId
router.put('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    Order.findById(id, {
        include: [{model: Product}]
    })
    .then(order => res.json(order))
    .catch(next)
});

// DELETE api/orders/:orderId
router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.destroy({ where: { id }})
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
});