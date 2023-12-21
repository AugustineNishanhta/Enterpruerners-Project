const express = require('express');
const router = express.Router();
const SchemaModel = require('../models/modelschema');

router.get('/adminview', async (req, res) => {
  try {
    const data = await SchemaModel.find();
    res.render('adminfile', { data });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const data = await SchemaModel.findById(req.params.id).exec();
    res.render('newhtml', { user: data });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
