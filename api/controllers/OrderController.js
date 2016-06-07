/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var co = require('co')
var uuid = require('uuid');

module.exports = {

  new (req, res) {
    co(function*() {
      var sender = req.param('senderId') ? yield Customer.findOne(req.param('senderId')) : yield Customer.create({
        name: req.param('senderName'),
        phone: req.param('senderPhone'),
        address: req.param('senderAddress'),
        district: req.param('senderDistrict'),
        city: req.param('senderCity'),
        province: req.param('senderProvince')
      })
      var receiver = req.param('receiverId') ? yield Customer.findOne(req.param('receiverId')) : yield Customer.create({
        name: req.param('receiverName'),
        phone: req.param('receiverPhone'),
        address: req.param('senderAddress'),
        district: req.param('receiverDistrict'),
        city: req.param('receiverCity'),
        province: req.param('receiverProvince')
      })
      res.send(yield Order.create({
        orderNumber: uuid.v1(),
        sender: sender,
        receiver: receiver,
        content: req.param('content'),
        weight: req.param('weight'),
        unit: req.param('unit')
      }))
    }).catch(function (err) {
      res.negotiate(err)
    })
  },

  track (req, res) {
    co(function*() {
      var order = yield Order.findOne({orderNumber: req.param('orderNumber')}).populate('sender').populate('receiver')
      if (!order) return res.send({order: null, routes: null})
      var routes = yield Route.find({order: order.id}).populate('location')
      res.view('order/track', {
        order: order,
        routes: routes
      })
    })
  },

  sign (req, res) {

  }
};

