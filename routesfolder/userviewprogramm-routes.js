const express = require('express');
const router = express.Router();
const Programme = require('../models/programmeshema');

 

// View scheduled programmes
router.get('/viewprogrammes', async (req, res) => {
  try {
    const programmes = await Programme.find();
    res.render('user-view-programme', { programmes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch this programmes' });
  }
});


// View a specific programme
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const programme = await Programme.findById(id);
    res.render('user-view-specific-programme', { programme });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch programme details' });
  }
 
});

module.exports = router;
