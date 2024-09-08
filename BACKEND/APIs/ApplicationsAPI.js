const express = require('express');
const ApplicationsApp = express.Router();
const tokenVerify = require('../middlewares/tokenVerify');
const expressAsyncHandler = require('express-async-handler');

// Middleware
ApplicationsApp.use(express.json());

// Submit a new application
ApplicationsApp.post('/', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const applicationsCollection = req.app.get('applicationsCollection');
    let newApplication = req.body;
    await applicationsCollection.insertOne(newApplication);
    res.send({ message: "Application submitted", payload: newApplication });
  } catch (error) {
    res.status(500).send({ message: "Error submitting application", error });
  }
}));

// Get all applications for a specific user
ApplicationsApp.get('/:username', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const applicationsCollection = req.app.get('applicationsCollection');
    const username = req.params.username;
    let applications = await applicationsCollection.find({ username: username }).toArray();
    if (applications.length > 0) {
      res.send({ message: "applications", payload: applications });
    } else {
      res.status(404).send({ message: "No applications found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching applications", error });
  }
}));

// Delete a specific application by ID
ApplicationsApp.delete('/:id', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const applicationsCollection = req.app.get('applicationsCollection');
    await applicationsCollection.deleteOne({ _id: req.params.id });
    res.send({ message: "Application deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting application", error });
  }
}));

module.exports = ApplicationsApp;
