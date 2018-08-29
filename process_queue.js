const fs = require("fs");
const d3 = require("d3");
const mkdirp = require("mkdirp");
require('dotenv').config();
const req = require("request-promise");
const transcriptDir = `./transcripts`;
const queueFile = `${transcriptDir}/q.csv`;
mkdirp(transcriptDir);

const fileContents = fs.readFileSync(queueFile, "utf-8");
const ids = d3.csvParse(fileContents);
const key = process.env.API_KEY;

function getTranscript(id) {
  return new Promise((resolve, reject) => {
    if (!id) reject("No transcript ID given.");
    const options = {
      url: `https://api.assemblyai.com/transcript/${id}`,
      method: "get",
      headers: { authorization: `Bearer ${key}` }
    };
    console.log(
      `Downloading for Transcript ID: ${id} (if status is incompleted/queued, wont download)`
    );
    req(options)
      .then(res => {
        const result = JSON.parse(res);
        if (result.transcript.status == "completed") {
          resolve(result.transcript.text);
        } else {
          console.log(
            `Transcription ${result.transcript.id} not yet ready for download.`
          );
          reject(0);
        }
      })
      .catch(err => {
        console.log("Somethign went wrong: " + err);
        reject(0);
      });
  });
}

async function init() {
  if (!ids.length) return console.log("Nothing in queue");
  let i = 0;
  let retryIds = [];
  while (i < ids.length) {
    const text = await getTranscript(ids[i].id).catch(err => {
      return null;
    });
    if (text) {
      fs.writeFileSync(`${transcriptDir}/${ids[i].id}.txt`, text);
    } else {
      retryIds.push(ids[i]);
    }
    i++;
  }
  const output = d3.csvFormat(retryIds);
  fs.writeFileSync(queueFile, output);
  console.log("Done.");
}

init();
