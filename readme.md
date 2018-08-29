# Nodejs script for AssemblyAI speech-to-text transcription

This is a node module (not yet an npm package) to get speech-to-text transcriptions using AssemblyAI API.

## How to use this

### What you'll need

You'll need Nodejs (v8 or above).

### Clone/download the repo & run `npm install`

Clone the repo or download it to a folder. Then run:

```bash
npm install
```

This will download all the necessary libraries.

### Get your token from AssemblyAI and save it

Get an API key from [AssemblyAI][1].

Create a new `.env` file and add this to it:

```
API_KEY='...'
```

(Replace `...` with your API key)


### Run the scripts

Finally run:

```bash
npm run transcribe <single audio file url>
```

And after a while

```bash
npm run download
```

The first one (transcribe) will send the request for transcription. AssemblyAI will take some time to transcribe (typically, 20% of the total time length of the audio file). The audio file url should be publicly accessible (so you have to host the file somewhere).

The second one will download any transcription that's in queue.

[1]: https://assemblyai.com
