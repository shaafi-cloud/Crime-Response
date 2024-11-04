import AssignIncident from "../models/assignedIncident.js";
import Incident from "../models/incident.js";
import User from "../models/user.js";

export const assignIncident = async (req, res) => {
    const { incidentId, officerUsername, priority, typeOfIncident, description, location, date, evidence, status } = req.body;

    //validate officer and incident id
    try {
        const officer = await User.findOne({ username: officerUsername });
        if (!officer) {
          return res.status(404).json({ message: "Officer not found" });
        }
    
        const newAssignment = new AssignIncident({
            incidentId,
            officerId: officer._id,
            priority,
            typeOfIncident,
            description,
            location,
            date,
            status,
        });
    
        await newAssignment.save();
        res.status(200).json({ message: "Incident assigned successfully" });
      } catch (error) {
        console.error("Error assigning incident:", error);
        res.status(500).json({ message: "Server error" });
      }};

export const getAllassigned = async (req, res) => {
    const  officerId  = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(officerId)){
        return res.status(400).json({ error: 'Invalid officer ID.' });

    }
    try {
        const assignedIncidents = await AssignIncident.find({officer: officerId}).populate('incident');
        if(assignedIncidents.length === 0){
            return res.status(404).json({message: "No incidents assigned yet"})
        }
        res.status(200).json({data: assignedIncidents});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};