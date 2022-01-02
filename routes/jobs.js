const express = require('express')
const router = express.Router();

// import jobs controller
const {
	getJobs,
	newJob,
	getJobsInRadius,
	updateJob,
	deleteJob,
	getJob,
	jobStats,
	applyJob
} = require('../controllers/jobsController');

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth');

router.route('/jobs').get(getJobs);
router.route('/job/:id/:slug').get(getJob);
router.route('/job/new').post(isAuthenticatedUser, authorizedRoles('employeer', 'admin'), newJob)
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius)
router.route('/job/:id')
	.put(isAuthenticatedUser, authorizedRoles('employeer', 'admin'), updateJob)
	.delete(isAuthenticatedUser, authorizedRoles('employeer', 'admin'), deleteJob);
router.route('/stats/:topic').get(jobStats);

router.route('/job/:id/apply').put(isAuthenticatedUser, authorizedRoles('user'), applyJob);

module.exports = router;
