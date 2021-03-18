#### Installing
* Using npm
  ```cmd
  npm install m-toolset
  ```

* Using yarn
  ```cmd
  yarn add m-toolset
  ```

* ES6 import
  ```JS
  import toolset from 'm-toolset'
  ```

#### Use examples
* Get information about local video files
  ```JS
  toolset.getVideoInfo(file).then(
    ({ blob, ...info } = data) => {
      console.log('Video cover', blob)
      console.log('Width, height and duration of video', info)
    },
    error => {
      console.log(error)
    }
  )
  ```

* Object array to object
  ```JS
  const sourceModel = [
    { id: 1, name: '巨量' },
    { id: 2, name: '微信' },
    { id: 3, name: '广点通' }
  ]
  const resultModel = toolset.listToMapByValue(sourceModel, 'id')
  ```
  Output results
  ```JS
  {
    1: { id: 1, name: '巨量' },
    2: { id: 2, name: '微信' },
    3: { id: 3, name: '广点通' }
  }
  ```

* Merge multidimensional object arrays and remove duplicate
  ```JS
  const sourceModel = [
    { year: "2020", month: 1, startDate: "2020-01-01", endDate: "2020-01-31" },
    { year: "2020", month: 2, startDate: "2020-02-01", endDate: "2020-02-29" },
    { year: "2021", month: 1, startDate: "2021-01-01", endDate: "2021-01-31" },
    { year: "2021", month: 2, startDate: "2021-02-01", endDate: "2021-02-28" }
  ]
  const resultModel = toolset.unique(sourceModel, 'year')
  ```
  Output results
  ```JS
  [
    {
      year: "2020",
      options: [
        { year: "2020", month: 1, startDate: "2020-01-01", endDate: "2020-01-31" },
        { year: "2020", month: 2, startDate: "2020-02-01", endDate: "2020-02-29" }
      ]
    },
    {
      year: "2021",
      options: [
        { year: "2021", month: 1, startDate: "2021-01-01", endDate: "2021-01-31" },
        { year: "2021", month: 2, startDate: "2021-02-01", endDate: "2021-02-28" }
      ]
    }
  ]
  ```

* List structure to tree structure
  ```JS
  const sourceModel = [
    { id: 1, name: 'M1部门' },
    { id: 11, pid: 1, name: '张三' },
    { id: 12, pid: 1, name: '李四' },
    { id: 13, pid: 1, name: '王五' },
    { id: 2, name: 'M2部门' },
    { id: 21, pid: 2, name: '赵六' },
    { id: 22, pid: 2, name: '周七' },
    { id: 23, pid: 2, name: '吴八' }
  ]
  const resultModel = toolset.listToTree(sourceModel, 'id', 'pid')
  ```
  Output results
  ```JS
  [
    {
      id: 1,
      name: 'M1部门',
      children: [
        { id: 11, pid: 1, name: '张三' },
        { id: 12, pid: 1, name: '李四' },
        { id: 13, pid: 1, name: '王五' }
      ]
    },
    {
      id: 2,
      name: 'M2部门',
      children: [
        { id: 21, pid: 2, name: '赵六' },
        { id: 22, pid: 2, name: '周七' },
        { id: 23, pid: 2, name: '吴八' }
      ]
    }
  ]
  ```
