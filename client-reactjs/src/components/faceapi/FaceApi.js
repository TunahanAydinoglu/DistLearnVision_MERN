import React, { useRef, useEffect } from "react";
import "./faceApi.scss";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

function FaceApi({ onPlayVideo, onPauseVideo }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFacemesh = async () => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    setInterval(() => {
      detect(net);
    }, 1000);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces({ input: video });
      if (face.length > 0) {
        onPlayVideo();
      } else {
        onPauseVideo();
      }

      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };

  useEffect(() => {
    runFacemesh();
  }, []);

  return (
    <div className="face-api">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          zindex: 9,
          width: 80,
          height: 60,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          zindex: 9,
          width: 80,
          height: 60,
        }}
      />
    </div>
  );
}

export default FaceApi;
