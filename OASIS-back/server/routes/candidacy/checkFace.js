// const { faceDetectionNet, faceRecognitionNet, trainedModel } = require('./checkFace');
// const { Canvas, Image, ImageData } = require('canvas');
// const { createCanvas, loadImage } = require('canvas');
// const faceapi = require('face-api.js');

// // initialize face-api.js
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
// const detectionNet = faceDetectionNet.loadFromDisk('./models');
// const recognitionNet = faceRecognitionNet.loadFromDisk('./models');
// const faceMatcher = new faceapi.FaceMatcher(trainedModel, 0.6);

// // set up web camera
// const NodeWebcam = require('node-webcam');
// const Webcam = NodeWebcam.create({
//   width: 1280,
//   height: 720,
//   quality: 100,
//   delay: 0,
//   saveShots: false,
//   output: 'jpeg',
//   device: false,
//   callbackReturn: 'buffer',
//   verbose: false,
// });

// const checkFace = async (req, res) => {
//   const profileImgUrl = req.body.profileImgUrl;
//   const cameraImgData = await Webcam.capture('cameraImg');
//   const cameraImg = await faceapi.bufferToImage(cameraImgData);
  
//   // detect faces in the images
//   const profileFaceDetection = await detectionNet.detectSingleFace(profileImgUrl).withFaceLandmarks().withFaceDescriptor();
//   const cameraFaceDetection = await detectionNet.detectSingleFace(cameraImg).withFaceLandmarks().withFaceDescriptor();
  
//   // compare the faces
//   const profileFaceDescriptor = [profileFaceDetection.descriptor];
//   const cameraFaceDescriptor = [cameraFaceDetection.descriptor];
//   const matches = faceMatcher.matchDescriptors(profileFaceDescriptor, cameraFaceDescriptor);
//   const match = matches[0];
//   const isMatch = match._distance < match._bestMatchThreshold;
  
//   if (isMatch) {
//     res.json({ match: true });
//   } else {
//     res.json({ match: false });
//   }
// };

// module.exports = async (req, res) => {
//   await checkFace(req, res);
// };
