const express = require('express');
const UserApp = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenVerify = require('../middlewares/tokenVerify');
const expressAsyncHandler = require('express-async-handler');

// Middleware
UserApp.use(express.json());

const middleware_1 = (req, res, next) => {
  console.log('middleware_1');
  next();
};

const middleware_2 = (req, res, next) => {
  console.log('middleware_2');
  next();
};

UserApp.use(middleware_1);
UserApp.use(middleware_2);

// Applicant (User) Routes

UserApp.get('/applicants', tokenVerify, expressAsyncHandler(async (req, res) => {
  const applicantsCollection = req.app.get('applicantsCollection');
  let applicantsList = await applicantsCollection.find().toArray();
  res.send({ message: "applicants", payload: applicantsList });
}));

UserApp.get('/applicants/:username', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const applicantsCollection = req.app.get('applicantsCollection');
    const username = req.params.username;
    let applicant = await applicantsCollection.findOne({ username: username });
    if (applicant) {
      res.send({ message: "one_applicant", payload: applicant });
    } else {
      res.status(404).send({ message: "Applicant not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching applicant", error });
  }
}));

UserApp.post('/applicants', expressAsyncHandler(async (req, res) => {
  try {
    const applicantsCollection = req.app.get('applicantsCollection');
    let newApplicant = req.body;
    let existingApplicant = await applicantsCollection.findOne({ username: newApplicant.username });

    if (existingApplicant !== null) {
      res.send({ message: "Applicant already exists" });
    } else {
      let hashedPassword = await bcryptjs.hash(newApplicant.password, 7);
      newApplicant.password = hashedPassword;

      await applicantsCollection.insertOne(newApplicant);
      res.send({ message: "Applicant created", payload: newApplicant });
    }
  } catch (error) {
    res.status(500).send({ message: "Error creating applicant", error });
  }
}));

UserApp.post('/login', expressAsyncHandler(async (req, res) => {
  try {
    const applicantsCollection = req.app.get('applicantsCollection');
    const applicantCred = req.body;
    let dbApplicant = await applicantsCollection.findOne({ username: applicantCred.username });

    if (dbApplicant == null) {
      res.send({ message: "Invalid Username" });
    } else {
      let result = await bcryptjs.compare(applicantCred.password, dbApplicant.password);
      if (result == false) {
        res.send({ message: "Invalid Password" });
      } else {
        let signedToken = jwt.sign({ username: applicantCred.username }, process.env.SECRET_KEY, { expiresIn: '24h' });
        res.send({ message: "Login Successful", payload: { user: dbApplicant, token: signedToken } });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Error during login", error });
  }
}));

UserApp.put("/applicants", tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const applicantsCollection = req.app.get("applicantsCollection");
    let modifiedApplicant = req.body;
    let updatedApplicant = await applicantsCollection.updateOne(
      { username: modifiedApplicant.username },
      { $set: { ...modifiedApplicant } }
    );
    res.send({ message: "Applicant modified", payload: updatedApplicant });
  } catch (error) {
    res.status(500).send({ message: "Error modifying applicant", error });
  }
}));

UserApp.delete('/applicants/:username', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const applicantsCollection = req.app.get('applicantsCollection');
    await applicantsCollection.deleteOne({ username: req.params.username });
    res.send({ message: "Applicant deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting applicant", error });
  }
}));

// Job Postings Routes

UserApp.post('/jobs', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const jobsCollection = req.app.get('jobsCollection');
    let newJob = req.body;
    await jobsCollection.insertOne(newJob);
    res.send({ message: "Job posting created", payload: newJob });
  } catch (error) {
    res.status(500).send({ message: "Error creating job posting", error });
  }
}));

UserApp.get('/jobs', expressAsyncHandler(async (req, res) => {
  const jobsCollection = req.app.get('jobsCollection');
  let jobsList = await jobsCollection.find().toArray();
  res.send({ message: "jobs", payload: jobsList });
}));

UserApp.get('/jobs/:id', expressAsyncHandler(async (req, res) => {
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

UserApp.delete('/jobs/:id', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const jobsCollection = req.app.get('jobsCollection');
    await jobsCollection.deleteOne({ _id: req.params.id });
    res.send({ message: "Job deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting job", error });
  }
}));

// Job Applications Routes

UserApp.post('/applications', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const applicationsCollection = req.app.get('applicationsCollection');
    let newApplication = req.body;
    await applicationsCollection.insertOne(newApplication);
    res.send({ message: "Application submitted", payload: newApplication });
  } catch (error) {
    res.status(500).send({ message: "Error submitting application", error });
  }
}));

UserApp.get('/applications/:username', tokenVerify, expressAsyncHandler(async (req, res) => {
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

UserApp.delete('/applications/:id', tokenVerify, expressAsyncHandler(async (req, res) => {
  try {
    const applicationsCollection = req.app.get('applicationsCollection');
    await applicationsCollection.deleteOne({ _id: req.params.id });
    res.send({ message: "Application deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting application", error });
  }
}));

module.exports = UserApp;