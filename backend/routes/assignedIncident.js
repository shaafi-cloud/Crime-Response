import express from 'express';
import mongoose from 'mongoose';
import AssignIncident from '../models/assignedIncident';
import User from '../models/user';
import Incident from '../models/incident';
import { assignIncident, getAllassigned } from '../controllers/assignedIncidents';

const router = express.Router();


//assign incident to an officer
router.post("/add", assignIncident);


//Get all assigned incidents with validation ID
router.get("/:officerId", getAllassigned);

export default router;