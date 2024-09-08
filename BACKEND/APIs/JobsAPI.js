const express = require('express');
const JobsApp = express.Router();
const tokenVerify = require('../middlewares/tokenVerify');
const expressAsyncHandler = require('express-async-handler');

// Middleware
JobsApp.use(express.json());

// Create a new job posting
JobsApp.post('/', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const jobsCollection = req.app.get('jobsCollection');
    let newJob = req.body;
    await jobsCollection.insertOne(newJob);
    res.send({ message: "Job posting created", payload: newJob });
  } catch (error) {
    res.status(500).send({ message: "Error creating job posting", error });
  }
}));

// Get all job postings
JobsApp.get('/', expressAsyncHandler(async (req, res) => {
  const jobsCollection = req.app.get('jobsCollection');
  let jobsList = await jobsCollection.find().toArray();
  res.send({ message: "jobs", payload: jobsList });
}));

// Get a specific job by ID
JobsApp.get('/:id', expressAsyncHandler(async (req, res) => {
  try {
    const jobsCollection = req.app.get('jobsCollection');
    const jobId = req.params.id;
    let job = await jobsCollection.findOne({ _id: jobId });
    if (job) {
      res.send({ message: "one_job", payload: job });
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching job", error });
  }
}));

// Delete a job posting
JobsApp.delete('/:id', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const jobsCollection = req.app.get('jobsCollection');
    await jobsCollection.deleteOne({ _id: req.params.id });
    res.send({ message: "Job deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting job", error });
  }
}));

module.exports = JobsApp;
