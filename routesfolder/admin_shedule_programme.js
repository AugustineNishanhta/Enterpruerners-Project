
const express = require('express');
const router = express.Router();
const Programme = require('../models/programmeshema');
path = require('path');

router.get('/visit', (req, res) => {
  const filePath = path.join(__dirname, '../views/Shedule_new_programme.html');
  res.sendFile(filePath);
});

// Schedule a new programme
router.post('/schedule', async (req, res) => {
  const { programmeName, weekNo, study, outcome, pdfFile } = req.body;

  // Check if all required fields are present
  if (!programmeName || !weekNo || !study || !outcome || !pdfFile) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const modules = weekNo.map((week, index) => ({
    weekNo: week,
    study: study[index],
    outcome: outcome[index],
    pdfFile: pdfFile[index],
  }));

  try {
    const newProgramme = new Programme({
      name: programmeName,
      modules: modules,
    });

    const savedProgramme = await newProgramme.save();

    res.redirect('/adminapi');
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule programme' });
  }
});


// View scheduled programmes
router.get('/view', async (req, res) => {
  try {
    const programmes = await Programme.find();
    res.render('viewprogramme', { programmes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch this programmes' });
  }
});


// View a specific programme
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const programme = await Programme.findById(id);
    res.render('view-specific-programme', { programme });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch programme details' });
  }
 
});

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const programme = await Programme.findById(id);
    const moduleCount = programme.modules.length;
    res.render('edit-specific-programme', { programme, moduleCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the programme' });
  }
});

router.post('/add-module/:id', async (req, res) => {
  const { id } = req.params;
  const { weekNo, study, outcome, pdfFile } = req.body;

  try {
    const programme = await Programme.findById(id);
    const newModule = {
      weekNo,
      study,
      outcome,
      pdfFile,
    };
    programme.modules.push(newModule);
    await programme.save();
    res.redirect(`/programme/edit/${id}`);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add the module' });
  }
});


// Update a specific module in a programme
router.post('/update-module/:id/:index', async (req, res) => {
  const { id, index } = req.params;
  const { weekNo, study, outcome, pdfFile } = req.body;

  try {
    const programme = await Programme.findById(id);
    programme.modules[index].weekNo = weekNo;
    programme.modules[index].study = study;
    programme.modules[index].outcome = outcome;
    programme.modules[index].pdfFile = pdfFile;
    await programme.save();
    res.redirect(`/programme/edit/${id}`);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the module' });
  }
});

// Delete a specific module from a programme
router.post('/delete-module/:id/:index', async (req, res) => {
  const { id, index } = req.params;

  try {
    const programme = await Programme.findById(id);
    programme.modules.splice(index, 1);
    await programme.save();
    res.redirect(`/programme/edit/${id}`);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the module' });
  }
});


// Update the programme details
router.post('/update-programme/:id', async (req, res) => {
  const { id } = req.params;
  const { programmeName, modules } = req.body;

  try {
    const updatedProgramme = await Programme.findByIdAndUpdate(
      id,
      { name: programmeName, modules },
      { new: true }
    );

    res.redirect(`/programme/edit/${updatedProgramme._id}`);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update programme' });
  }
});

// Delete the entire programme
router.post('/delete-programme/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Programme.findByIdAndDelete(id);
    res.redirect('/programme/view');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the programme' });
  }
});

module.exports = router;


