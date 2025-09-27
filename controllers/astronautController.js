import { User } from "../models/userModel.js";

const fetchAstronauts = async (req, res) => {
  try {
    const astronauts = await User.find({ role: "astronaut" })
    res.status(200).json({ message: "Astronauts fetched successfully", data: astronauts });
  }
    catch (error) {
      return res.status(500).json({ message: "Error fetching astronauts", error });
    }   
}

export { fetchAstronauts };