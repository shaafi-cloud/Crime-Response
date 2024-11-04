import AssignIncident from "../models/assignedIncident.js";
import Incident from "../models/incident.js";
import User from "../models/user.js";

export const assignIncident = async (req, res) => {
    const { officerId, incidentId, status, priority } = req.body;

    //validate officer and incident id
    if(!mongoose.Types.ObjectId.isValid(officerId) || !mongoose.Types.ObjectId.isValid(incidentId)){
        return res.status(400).json({error: "Invalid officer or incident id"});
    }

    try {
        const officer = await User.findById(officerId);
        if(!officer){
            return res.status(404).json({ error: 'Officer not found.' });
        }

        const incident = await Incident.findById(incidentId);
        if (!incident){
            return res.status(404).json({error: "Inicent not found"});
        }

        const assignment = new AssignIncident(req.body);
        await assignment.save();
        res.status(200).json({message: "assigned successfully"});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

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