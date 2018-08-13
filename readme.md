# Nodejs script for AssemblyAI speech-to-text transcription

This is a node module (not yet an npm package) to get speech-to-text transcriptions using AssemblyAI API.

## How to use this

### What you'll need

You'll need Nodejs (v8 or above).

### Clone/download the repo & run `npm install`

Clone the repo or download it to a folder. Then run:

`npm install`

This will download all the necessary files.

### Get your token from AssemblyAI and save it

Get an API key from [AssemblyAI][1].

Open up `constants.js`. Save your API key it in the "api_key" variable in that file.

### Set your audio_src_url

In the same `constants.js` file, set the audio_src_url to the audio file you want to transcribe. (The audio file needs to be uploaded to someplace and publicly accessible)

### Run the scripts

Finally run:

`npm run transcribe`

And after a while

`npm run download`

The first one (transcribe) will send the request for transcription. AssemblyAI will take some time to transcribe (typically, half the total time length of the audio file)

The second one will download any transcription that's in queue.