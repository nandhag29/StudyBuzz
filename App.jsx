import React, { useState } from 'react';
import './App.css';
import VideoUpload from './VideoUpload';
import VideoProcessing from './VideoProcessing';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [transcriptionResult, setTranscriptionResult] = useState(null);

  const handleVideoSelected = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleTranscribe = () => {
    const formData = new FormData();
    formData.append('audio', selectedVideo);

    fetch('/transcribe/', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      setTranscriptionResult(data.text);
    });
  }

  return (
    <div className="App">
      <h1>Video Upload and Processing</h1>
      {!selectedVideo ? (
        <VideoUpload onVideoSelected={handleVideoSelected} />
      ) : (
        <>
          <VideoProcessing videoUrl={selectedVideo} />
          <button onClick={handleTranscribe}>Transcribe</button>
          {transcriptionResult && (
            <div className="transcription-box">
              <h2>Transcription Result</h2>
              <p>{transcriptionResult}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
