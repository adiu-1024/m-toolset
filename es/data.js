
const listToObjByValue = (list, fieldName) => {
  return list.reduce((obj, item) => {
    obj[item[fieldName]] = item
    return obj
  }, {})
}

const unique = (list, primaryKey) => {
  const map = new Map()
  for (const item of list) {
    const value = item[primaryKey]
    if (map.has(value)) {
      map.get(value)['options'].push(item)
    } else {
      map.set(value, {[primaryKey]: value, options: [item]})
    }
  }
  return [...map.values()]
}

const listToTree = (list, id = 'id', pid = 'pid') => {
  const map = new Map(), roots = []
  for (const item of list) {
    map.set(item[id], item)
    const parent = map.get(item[pid])
    if (!parent) {
      roots.push(item)
    } else {
      !parent.children && (parent.children = [])
      parent.children.push(item)
    }
  }
  return roots
}

export {
  unique,
  listToTree,
  listToObjByValue
}
