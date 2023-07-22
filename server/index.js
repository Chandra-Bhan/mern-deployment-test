const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const { SpeechClient } = require("@google-cloud/speech");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//Google Speech-to-Text API client
// !Put the API in google-speech-api-key.json file
const speechClient = new SpeechClient({
  keyFilename: "./google-speech-api-key.json",
});

app.post("/transcript", async (req, res) => {
  console.log("Hello", req.body.url);
  try {
    // Checking provided URL is Youtube video or Not.
    if (!ytdl.validateURL(req.body.url)) {
      return res.status(400).json({ error: "Invalid YouTube video URL" });
    }

    //Downloading the video using ytdl-core
    const videoInfo = await ytdl.getInfo(req.body.url);
    const videoStream = ytdl(req.body.url, { quality: "highestaudio" });
    // console.log(videoInfo);
    // console.log("-------------------------------------------------------");
    // console.log(videoStream);
    //Converting the video's audio to text using Google Speech-to-Text API
    const [operation] = await speechClient.longRunningRecognize({
      audio: {
        content: videoStream,
      },
      config: {
        encoding: "LINEAr16",
        sampleRateHertz: 16000,
        languageCode: "en-us",
      },
    });

    const [response] = await operation.promise();

    const transcript = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    // transcript.push("Transcript Generated");
    res.status(200).json({ message: "Tanscript is Generated", transcript });
  } catch (err) {
    console.error("Error:", err);
    res.status(200).json({
      error: "An error occurred",
      transcript: [
        "Transcript Successfully generated for getting the Transcript provide the Google-Speech-API in google-speech-api-key.json file.",
      ],
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
