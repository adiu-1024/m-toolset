"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideoInfo = void 0;

var getVideoInfo = function getVideoInfo(file) {
  var captureImage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return new Promise(function (resolve, reject) {
    var video = document.createElement('video');
    Object.assign(video, {
      src: URL.createObjectURL(file),
      currentTime: 1
    });

    if (captureImage) {
      video.addEventListener('loadeddata', function () {
        var _this = this;

        var videoWidth = this.videoWidth,
            videoHeight = this.videoHeight,
            duration = this.duration;
        var canvas = document.createElement('canvas');
        Object.assign(canvas, {
          width: videoWidth,
          height: videoHeight
        });
        canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(function (blob) {
          URL.revokeObjectURL(_this.src);
          resolve({
            blob: blob,
            videoWidth: videoWidth,
            videoHeight: videoHeight,
            duration: duration
          });
        }, 'image/jpeg', 0.95);
      });
    } else {
      video.addEventListener('loadedmetadata', function () {
        var videoWidth = this.videoWidth,
            videoHeight = this.videoHeight,
            duration = this.duration;
        URL.revokeObjectURL(this.src);
        resolve({
          videoWidth: videoWidth,
          videoHeight: videoHeight,
          duration: duration
        });
      });
    }

    video.onerror = function (error) {
      reject(error);
    };
  });
};

exports.getVideoInfo = getVideoInfo;