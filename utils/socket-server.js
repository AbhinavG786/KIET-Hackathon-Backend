import { Server } from "socket.io";
import { GoogleGenAI, Modality } from "@google/genai";
let io;

export const SocketServiceInit = (server) => {
 io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-2.5-flash-native-audio-preview-09-2025";

io.on("connection", async (socket) => {
  console.log("Client connected:", socket.id);

  // Queue for Gemini responses
  const responseQueue = [];

  // Open Gemini Live session
  const session = await ai.live.connect({
    model: MODEL,
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction:
        "You are a helpful assistant named Maitri. Answer in a supportive and friendly tone.",
    },
    callbacks: {
      onopen: () => console.log("Gemini session opened"),
      onmessage: (msg) => {
        responseQueue.push(msg);
      },
      onerror: (e) => console.error("Gemini error:", e.message),
       onclose: (e) => {
          console.log("Gemini session closed:", e.reason);
          clearInterval(interval); // cleanup loop if Gemini closes
        },
    },
  });

  // Receive raw audio chunks from Android app
  socket.on("audio_chunk", async (chunk) => {
    try {
      // Convert ArrayBuffer to base64 PCM
      const base64Audio = Buffer.from(chunk).toString("base64");

      await session.sendRealtimeInput({
        audio: {
          data: base64Audio,
          mimeType: "audio/pcm;rate=16000", // Android must send PCM16 mono 16kHz
        },
      });
    //   console.log(typeof chunk, chunk.length)
    //     // const buffer = Buffer.from(chunk, "base64");

    // await session.sendRealtimeInput({
    //   audio: {
    //     data:chunk, // Gemini expects base64
    //     mimeType: "audio/pcm;rate=16000",
    //   },
    // });
    } catch (err) {
      console.error("Error sending audio chunk:", err);
    }
  });

  // Relay Gemini audio responses back to frontend
  // async function streamGeminiResponses() {
  //   while (true) {
  //     const msg = responseQueue.shift();
  //     if (!msg) {
  //       await new Promise((res) => setTimeout(res, 50));
  //       continue;
  //     }

  //     if (msg.data) {
  //       // Send audio bytes back to Android client
  //       const buffer = Buffer.from(msg.data, "base64");
  //       socket.emit("audio_response", buffer);
  //     }

  //     // If Gemini marks turn complete
  //     if (msg.serverContent?.turnComplete) {
  //       socket.emit("turn_complete");
  //     }
  //   }
  // }

  const interval = setInterval(() => {
  const msg = responseQueue.shift();
  if (!msg) return;

  if (msg.data) {
    // Send audio bytes back to Android client
    const buffer = Buffer.from(msg.data, "base64");
    socket.emit("audio_response", buffer);
  }

      // If Gemini marks turn complete
  if (msg.serverContent?.turnComplete) {
    socket.emit("turn_complete");
  }
}, 50);

  // streamGeminiResponses();

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    clearInterval(interval); 
    session.close();
  });
});
}
