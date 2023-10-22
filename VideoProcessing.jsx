import React, { useEffect, useRef } from 'react';

const VideoProcessing = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current.play();
    }
  }, [videoUrl]);

  return (
    <div>
      <video ref={videoRef} width="800" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoProcessing;