/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  query (req, res) {
    var order;
    Order.findOne({orderNumber: req.param('orderNumber')}).populate('sender').populate('receiver').then((result) => {
      order = result
      return Route.find({order:order.id}).populate('location')
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

