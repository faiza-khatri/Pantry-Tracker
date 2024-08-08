import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const CameraInput = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        height={300}
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
};

export default CameraInput;
