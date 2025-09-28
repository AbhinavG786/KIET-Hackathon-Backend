import { User } from "../models/userModel.js";
import { Alert } from "../models/alertModel.js";

const fetchAstronauts = async (req, res) => {
  try {
    const astronauts = await User.find({ role: "astronaut" })
    res.status(200).json({ message: "Astronauts fetched successfully", data: astronauts });
  }
    catch (error) {
      return res.status(500).json({ message: "Error fetching astronauts", error });
    }   
}

const fetchAlertsForAstronaut = async (req,res)=>{
  const {astronautId}=req.params;
  try {
    const alerts = await Alert.find({ userId: astronautId }).populate("userId", "profile");;
    res.status(200).json({ message: "Alerts fetched successfully", data: alerts });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching alerts", error });
  }
};

export { fetchAstronauts, fetchAlertsForAstronaut };