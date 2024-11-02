import express from 'express';
import mongoose from 'mongoose';
import AssignIncident from '../models/assignedIncident.js';
import User from '../models/user.js';
import Incident from '../models/incident.js';
import { assignIncident, getAllassigned } from '../controllers/assignedIncidents.js';

const router = express.Router();


//assign incident to an officer
router.post("/add", assignIncident);


//Get all assigned incidents with validation ID
router.get("/:officerId", getAllassigned);

export default router;