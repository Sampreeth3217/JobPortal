const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();  // process.env.SECRET_KEY
let mClient = new MongoClient(process.env.DB_URL);
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173'
}));

mClient.connect()
  .then((connectionObj) => {
    console.log("DB connection Successful");
    const fsddb = connectionObj.db('JobPortal');

    const usersCollection = fsddb.collection('users');
    const jobsCollection = fsddb.collection('jobs');
    const applicationsCollection = fsddb.collection('applications');
    const applicantsCollection = fsddb.collection('applicants');

    app.set('usersCollection', usersCollection);
    app.set('jobsCollection', jobsCollection);
    app.set('applicationsCollection', applicationsCollection);
    app.set('applicantsCollection', applicantsCollection);

    const PORT = process.env.PORT_No;

    app.listen(PORT, () => console.log(`HTTP server started on port ${PORT}`));
  })
  .catch(err => console.log("Error in connection", err));

const userApp = require('./APIs/UserAPI');
const JobsApp = require('./APIs/JobsAPI');
const ApplicationsApp = require('./APIs/ApplicationsAPI');

app.use('/user-api', userApp);
app.use('/jobs-api', JobsApp);
app.use('/applications-api', ApplicationsApp);

//handling invalid paths
app.use('*', (req, res, next) => {
  console.log(req.status);
  res.send({ message: 'Invalid path' });
});

app.use((err, req, res, next) => {
  res.send({ message: "Error Occurred", errMessage: err.message });
});
