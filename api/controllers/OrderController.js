/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  query (req, res) {
    var order
    Order.findOne({orderNumber: req.param('orderNumber')}).populate('sender').populate('receiver').then((result) => {
      order = result
      if (order) {
        return Route.find({order: order.id}).populate('location')
      } else {
        res.send({order: null, routes: null})
      }
    }).then((routes) => {
      res.send({
        order: order,
        routes: routes
      })
    })
  },

  sign (req, res) {

  }
};

