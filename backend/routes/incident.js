import express from 'express';
import mongoose from 'mongoose';
import Incident from '../models/incident.js';
import User from '../models/user.js';
import { createIncident, getIncident, getIncidntbyId, getSome, updateIncident, upload } from '../controllers/incidents.js';
const router = express.Router();


//create new incident
router.post("/add", upload.single('evidence'), createIncident)

//Update status
router.patch("/update/:id", updateIncident)

//get all incidents
router.get("/all", getIncident)
//get all incidents
router.get("/some",getSome)

router.get("/:id", getIncidntbyId)

export default router;