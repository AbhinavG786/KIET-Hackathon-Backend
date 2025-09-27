import { uploadBufferToCloudinary } from "../utils/cloudinary.js";
import { Log } from "../models/logsModel.js";
import { Alert } from "../models/alertModel.js";
import axios from "axios";
import FormData from "form-data";

const uploadVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const form = new FormData();
    form.append("file", req.file.buffer, req.file.originalname);
    const response = await axios.post(
      "http://localhost:8000/analysis/process_video",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );
    if (!response.data) {
      return res
        .status(500)
        .json({ message: "No response from analysis service" });
    }
    const { type, message, severity } = response.data;
    const alertDetails = await Alert.create({
      userId: "68d80b659c5a95005dacb1e5",
      type,
      message,
      severity,
    });
    console.log("Alert created:", alertDetails);
    // const result = await uploadBufferToCloudinary(
    //   req.file.buffer,
    //   req.file.originalname,
    //   "videos",
    //   "video"
    // );

    // const logDetails = await Log.create({
    //   userId: "68d80b659c5a95005dacb1e5",
    //   type: "video",
    //   filePath: result.secure_url,
    // });
    return res.status(200).json({ message: "Video uploaded successfully" });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res.status(500).json({ message: "Error uploading video", error });
  }
};

export { uploadVideo };
