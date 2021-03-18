const getVideoInfo = function(file, captureImage = true) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    Object.assign(video, {
      src: URL.createObjectURL(file),
      currentTime: 1,
    })
    if (captureImage) {
      video.addEventListener('loadeddata', function() {
        const { videoWidth, videoHeight, duration } = this
        const canvas = document.createElement('canvas')
        Object.assign(canvas, {
          width: videoWidth, height: videoHeight
        })
        canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(blob => {
          URL.revokeObjectURL(this.src)
          resolve({ blob, videoWidth, videoHeight, duration })
        }, 'image/jpeg', 0.95)
      })
    } else {
      video.addEventListener('loadeddata', function() {
        const { videoWidth, videoHeight, duration } = this
        URL.revokeObjectURL(this.src)
        resolve({ videoWidth, videoHeight, duration })
      })
    }
    video.onerror = (error) => { reject(error) }
  })
}

export default {
  getVideoInfo
}
