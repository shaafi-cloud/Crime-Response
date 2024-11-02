import Incident from "../models/incident.js";

export const createIncident = async (req, res) => {
    const incident = req.body;
    if (!incident.typeOfIncident || !incident.date || !incident.description ) {
        return res.status(400).send({message: "fill the required fields"});
    }
    const newIncident = new Incident(incident);

    try {
        await newIncident.save();
        res.status(200).send({message: "incident saved sucesfully"})
    } catch (error) {
        console.log("error creating incident", error.message);
        res.status(400).send({message: "server error"});
    }
    

};

export const updateIncident = async (req, res) => {
    const { id } = req.params;
    const  { status, officerId, priority } = req.body;

    if (!status || !priority || !officerId) {
        return res.status(400).json({error: "fill the fields needed"});
    }

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(officerId)) {
        return res.status(400).json({error: "Invalid incident or officer id format"});
    }

    try {
        const officer = await User.findById(officerId);
        if(!officer){
            return res.status(404).json({message: "officer not found"});
        }

        const updateIncident = await Incident.findById(
            id,{ status, priority},
            { new: true}
        );
        if (!updateIncident){
            return res.status(404).json({error: "incident not found"});
        }
        res.status(200).json({message: "incident updated successfully"});

    } catch (error) {
        
    }
};

export const getIncident = async (req, res) => {
    try {
        const incidents = await Incident.find({});
        if(!incidents){
            return res.status(404).send({ error: ' no Incident found.' });
        }
        res.status(200).json({data: incidents});
    } catch (error) {
        console.log("error fetching incidents", error.message);
        res.status(500).json({error: "server error"});
    }
};