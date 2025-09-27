import { uploadBufferToCloudinary } from "../utils/cloudinary.js";
import { Log } from "../models/logsModel.js";

const uploadVideo=async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
        try {
            const result = await uploadBufferToCloudinary(req.file.buffer, req.file.originalname, "videos", "video");
            
           const logDetails= await Log.create({
                user: req.user.id,
                type: "video",
                filePath: result.secure_url,
            });
            return res.status(200).json({ message: "Video uploaded successfully", data: logDetails });
        } catch (error) {
            console.error("Error uploading video:", error);
            return res.status(500).json({ message: "Error uploading video", error });
        }
}

export {uploadVideo};