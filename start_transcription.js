const req = require("request-promise");
const fs = require("fs");
const d3 = require("d3");
const mkdirp = require("mkdirp");
require('dotenv').config();
const transcriptDir = "./transcripts";
const queueFile = `${transcriptDir}/q.csv`;
mkdirp(transcriptDir);

if (!process.argv[2])
  return console.log(
    "No file for transcription. Check the docs for `npm run transcribe <file>`"
  );

const audio_src_url = process.argv[2];
const key = process.env.API_KEY

const options = {
  url: "https://api.assemblyai.com/transcript",
  method: "post",
  headers: {
    authorization: `Bearer ${key}`
  },
  body: JSON.stringify({
    audio_src_url: audio_src_url
  })
};

console.log("Initiated...");

req(options)
  .then(response => {
    const res = JSON.parse(response);
    if (!res.transcript.status)
      return console.log(
        "The Assembly API couldn't send this file for transcription."
      );
    const fileData = fs.readFileSync(`${queueFile}`, "utf-8");
    const existingData = d3.csvParse(fileData);
    existingData.push({
      id: res.transcript.id
    });
    const output = d3.csvFormat(existingData);
    fs.writeFileSync(`${queueFile}`, output);
    console.log("Queued");
    console.log("After some time, run the queue.");
  })
  .catch(error => {
    console.error(error);
  });
