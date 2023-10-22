import React, { useState } from 'react';

const VideoUpload = ({ onVideoSelected }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(file);

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
      {false &&
      <input
        type="file"
        id="videoInput"
        accept="video/*"
        onChange={handleVideoChange}
      />
      }
    <form action="http://localhost:5100/upload" enctype='multipart/form-data' method='POST'>
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
    </form>
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