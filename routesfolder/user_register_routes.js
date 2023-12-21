const express = require('express');
const SchemaModel = require('../models/modelschema');

exports.create = async function (req, res) {
  try {
    const newaqcellorator = new SchemaModel();
    newaqcellorator.Name = req.body.Name;
    newaqcellorator.Roll = req.body.Roll;
    newaqcellorator.Address = req.body.Address;
    newaqcellorator.email = req.body.email
    newaqcellorator.Businesstype = req.body.Businesstype;
    newaqcellorator.business =req.body.business
    

    await newaqcellorator.save();    
    res.redirect('/signup-success')
  }catch (error) {
    res.send("err on routerfile"+ error);
  }
};




