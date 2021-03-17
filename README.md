#### Toolset
* Get information about local video files
  ```JS
  import { getVideoInfo } from 'm-toolset'
  getVideoInfo(file).then(
    ({ blob, ...videoInfo } = data) => {
      console.log('Video cover', blob)
      console.log('Width, height and duration of video', videoInfo)
    },
    error => {
      console.log(error)
    }
  )
  ```
