const webcam = document.querySelector(".webcam");
const videoCanvas = document.querySelector(".video");
const faceCanvas = document.querySelector(".face");

const ctx = videoCanvas.getContext("2d");
const faceCtx = faceCanvas.getContext("2d");

let index = 0;

const faceDetector = new FaceDetector();

const SIZE = 10;
const SCALE = 1.5;

// use a function to populate the user's video
async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1000, height: 800 }
  });
  webcam.srcObject = stream;
  await webcam.play();
  //size the canvas to be the same size as the video
  videoCanvas.width = webcam.videoWidth;
  videoCanvas.height = webcam.videoHeight;
  faceCanvas.width = webcam.videoWidth;
  faceCanvas.height = webcam.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(webcam);
//   faces.forEach(drawFace);
  // faces.forEach(censor);
  faces.forEach(putMask);
    if (!faces.length) {
        faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
        index = getRandomInt(4, index);
      }
  //ask the browser when the next animation frame is, and tell it to run detect for us
  requestAnimationFrame(detect);
}

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
  ctx.strokeStyle = "pink";
  ctx.lineWidth = 2;
  ctx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  faceCtx.drawImage(
    //5 src args
    webcam, // where does this source came from
    face.x, //where do we start the source pull from
    face.y,
    face.width,
    face.height,
    //4 draw args
    face.x,
    face.y,
    SIZE,
    SIZE
  );
  faceCtx.drawImage(
    faceCanvas,
    face.x,
    face.y,
    SIZE,
    SIZE,
    face.x - (face.width * SCALE - face.width) / 2,
    face.y - (face.height * SCALE - face.height) / 2,
    face.width * SCALE,
    face.height * SCALE
  );
}

function putMask({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  base_image = new Image();
  base_image.src = `face${index}.png`;
  faceCtx.drawImage(
    base_image,
    face.x - (face.width * SCALE - face.width) / 2,
    face.y - (face.height * SCALE - face.height) / 2,
    face.width * SCALE,
    face.height * SCALE
  );
}

function getRandomInt(max, index) {
    let res = Math.floor(Math.random() * Math.floor(max));
    if (res === index) {
        res += 1;
    }
    return res;
  }

populateVideo().then(detect);
