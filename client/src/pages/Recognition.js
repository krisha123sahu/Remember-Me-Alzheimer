import { useEffect, useRef, useState } from "react";

function Recognition() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [streaming, setStreaming] = useState(false);
  const [image, setImage] = useState(null);

  // Start camera automatically
  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      videoRef.current.srcObject = stream;
      setStreaming(true);

      // 🔥 AUTO CAPTURE after 3 seconds
      setTimeout(() => {
        captureAndSend();
      }, 3000);

    } catch (error) {
      console.error(error);
      alert("Camera permission needed");
    }
  };

  const captureAndSend = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setImage(imageData);

    sendToBackend(imageData);
  };

  const sendToBackend = async (img) => {
    try {
      console.log("Sending to backend...");

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: img })
      });

      const data = await response.json();

      console.log("Response:", data);

      alert(data.message);

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="page">
      <div className="camera-card">
        <h1>Face Recognition</h1>

        <video ref={videoRef} autoPlay playsInline className="video" />

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <p>Camera is scanning automatically...</p>
      </div>
    </div>
  );
}

export default Recognition;