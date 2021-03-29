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

        var width = this.videoWidth,
            height = this.videoHeight,
            duration = this.duration;
        var canvas = document.createElement('canvas');
        Object.assign(canvas, {
          width: width,
          height: height
        });
        canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(function (blob) {
          URL.revokeObjectURL(_this.src);
          _this.src = '';
          resolve({
            blob: blob,
            width: width,
            height: height,
            duration: duration
          });
        }, 'image/jpeg', 0.95);
      });
    } else {
      video.addEventListener('loadedmetadata', function () {
        var width = this.videoWidth,
            height = this.videoHeight,
            duration = this.duration;
        URL.revokeObjectURL(this.src);
        this.src = '';
        resolve({
          width: width,
          height: height,
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