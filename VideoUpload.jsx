import React, { useState } from 'react';

const VideoUpload = ({ onVideoSelected }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.includes('video')) {
      const videoUrl = URL.createObjectURL(file);
      setSelectedVideo(videoUrl);
      onVideoSelected(videoUrl); // Notify the parent component
    } else {
      alert('Please select a valid video file.');
    }
  };

  return (
    <div>
      <input
        type="file"
        id="videoInput"
        accept="video/*"
        onChange={handleVideoChange}
      />
      {selectedVideo && (
        <div>
          <video width="400" controls>
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;