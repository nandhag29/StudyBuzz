import React, { useState } from 'react';
import './App.css';
import VideoUpload from './VideoUpload';
import VideoProcessing from './VideoProcessing';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoSelected = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <div className="App">
      <h1>Video Upload and Processing</h1>
      {!selectedVideo ? (
        <VideoUpload onVideoSelected={handleVideoSelected} />
      ) : (
        <VideoProcessing videoUrl={selectedVideo} />
      )}
    </div>
  );
}

export default App;

