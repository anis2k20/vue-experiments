<template>
    <div class="container">
      <h1 class="text-xl font-semibold mb-4">Face Matching</h1>
  
      <!-- Reference Photo Upload -->
      <div class="mb-6">
        <label for="reference-photo" class="block mb-2">Upload Reference Photo</label>
        <input
          type="file"
          id="reference-photo"
          @change="handleReferencePhotoUpload"
          accept="image/*"
          class="block w-full p-2 border rounded"
        />
      </div>
  
      <!-- Webcam Feed -->
      <div class="mb-6 flex justify-center">
        <div class="w-full md:w-64 h-64 border-2 rounded-lg flex justify-center items-center">
          <video
            ref="videoElement"
            v-if="cameraActive"
            autoplay
            playsinline
            class="object-cover w-full h-full"
          ></video>
          <span v-else class="text-gray-400">Camera is off</span>
        </div>
      </div>
  
      <!-- Buttons -->
      <div class="mb-6 flex justify-center space-x-4">
        <button
          v-if="!cameraActive"
          @click="startCamera"
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Start Camera
        </button>
        <button
          v-else
          @click="capturePhoto"
          class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Capture Photo
        </button>
        <button
          v-if="capturedPhoto"
          @click="resetCamera"
          class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
        >
          Retake Photo
        </button>
      </div>
  
      <!-- Captured Photo -->
      <div v-if="capturedPhoto" class="mb-6">
        <h3 class="text-lg font-semibold">Captured Photo</h3>
        <img :src="capturedPhoto" alt="Captured" class="w-full md:w-64 h-64 object-cover rounded">
      </div>
  
      <!-- Match Result -->
      <div v-if="authenticationResult !== null" class="mt-6 text-center">
        <p v-if="authenticationResult" class="text-green-500 font-semibold">Match Found!</p>
        <p v-else class="text-red-500 font-semibold">No Match Found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import * as faceapi from 'face-api.js';
  
  export default {
    name: 'FaceMatch',
    setup() {
      const videoElement = ref(null);
      const cameraActive = ref(false);
      const capturedPhoto = ref(null);
      const referencePhoto = ref(null);
      const authenticationResult = ref(null);
      const streamRef = ref(null);
      const modelsLoaded = ref(false);
  
      // Load face-api models
      const loadModels = async () => {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        modelsLoaded.value = true;
      };
  
      // Initialize face-api models on mount
      onMounted(() => {
        loadModels();
      });
  
      // Clean up camera stream on unmount
      onUnmounted(() => {
        if (streamRef.value) {
          streamRef.value.getTracks().forEach(track => track.stop());
          streamRef.value = null;
        }
      });
  
      // Handle reference photo upload
      const handleReferencePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            referencePhoto.value = e.target.result;
            authenticationResult.value = null; // Reset previous result
          };
          reader.readAsDataURL(file);
        }
      };
  
      // Start camera
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          streamRef.value = stream;
          cameraActive.value = true;
          videoElement.value.srcObject = stream;
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      };
  
      // Capture a photo from the webcam
      const capturePhoto = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.value.videoWidth;
        canvas.height = videoElement.value.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);
        capturedPhoto.value = canvas.toDataURL('image/png');
        authenticateUser();
      };
  
      // Reset the camera and captured photo
      const resetCamera = () => {
        capturedPhoto.value = null;
        authenticationResult.value = null;
      };
  
      // Detect face and compare photos
      const detectFace = async (imageUrl) => {
        const img = await faceapi.fetchImage(imageUrl);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        return detections;
      };
  
      // Authenticate user by comparing uploaded photo with webcam photo
      const authenticateUser = async () => {
        if (!modelsLoaded.value || !referencePhoto.value || !capturedPhoto.value) {
          return;
        }
  
        const referenceDetection = await detectFace(referencePhoto.value);
        const capturedDetection = await detectFace(capturedPhoto.value);
  
        if (!referenceDetection || !capturedDetection) {
          authenticationResult.value = false;
          return;
        }
  
        const distance = faceapi.euclideanDistance(
          referenceDetection.descriptor,
          capturedDetection.descriptor
        );
        const similarityThreshold = 0.6;
  
        authenticationResult.value = distance < similarityThreshold;
      };
  
      return {
        videoElement,
        cameraActive,
        capturedPhoto,
        referencePhoto,
        authenticationResult,
        handleReferencePhotoUpload,
        startCamera,
        capturePhoto,
        resetCamera,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  button {
    margin-top: 10px;
  }
  </style>
  