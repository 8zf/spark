/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    orderNumber: {
      type: 'string',
      unique: true
    },
    sender: {
      model: 'customer',
      required: true
    },
    receiver: {
      model: 'customer',
      required: true
    },
    signature: {
      type: 'string'
    }
  }

};

