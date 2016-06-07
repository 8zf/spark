/**
 * SignatureController
 *
 * @description :: Server-side logic for managing signatures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var GridFs = require('skipper-gridfs')
var gridFsAdapter = GridFs({uri: 'mongodb://localhost/spark', dbname: 'spark-file'})
var receiving = gridFsAdapter.receive()

module.exports = {

  upload (req, res) {
    req.file('file').upload({
      adapter: require('skipper-gridfs'),
      uri: 'mongodb://localhost/spark',
      dbname: 'spark-file'
    }, function (err, filesUploaded) {
      if (err) return res.negotiate(err)
      console.log(filesUploaded)
      // return res.ok()
      return res.send(filesUploaded)
    });

  }


};

