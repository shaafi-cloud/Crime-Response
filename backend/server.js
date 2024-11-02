import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.js";
import incidentRouter from "./routes/incident.js";
import assignedRouter from "./routes/assignedIncident.js";
import { authenticate, authorize } from './middleware/auth.js';
import bodyParser from "body-parser";

dotenv.config();

const app = express();
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use("/users", userRoute);
app.use("/incident", incidentRouter);
app.use("/incidetAss", assignedRouter);

const port = 3000;
connectDB();

app.get("/", (req, res) => {
    res.send("welcome, user!");
});


 
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})