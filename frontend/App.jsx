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
      <img src = "src/assets/studybuzz.png" alt = "Bobby the Bee" style = {{width: '20%'}} />
      <h1>StudyBuzz</h1>
      {!selectedVideo ? (
        <VideoUpload onVideoSelected={handleVideoSelected} />
      ) : (
        <div>
          <VideoProcessing videoUrl={selectedVideo} />
          <video width="400" controls>
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default App;

