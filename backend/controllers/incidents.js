import Incident from "../models/incident.js";
import multer from 'multer';


export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
 export const upload = multer({ storage: storage });



export const createIncident = async (req, res) => {
    // const incident = req.body;
    const { typeOfIncident, date, location, description } = req.body;
    const evidence = req.file ? req.file.path : null; // Save the file path

    if (!typeOfIncident ||!date ||!location ||!description) {
        return res.status(400).send({message: "fill the required fields"});
    }
    const newIncident = new Incident({
        typeOfIncident, date, location, description, evidence
    });

    try {
        await newIncident.save();
        res.status(200).send({ success: true, message: "incident saved sucesfully"})
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