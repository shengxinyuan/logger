// 补全合并单元格内读取不到的json数据
function formatAllXlsxJson (list, filterMeuns) {
  let meunObj = {}
  let newList = []
  Object.entries(list[0]).forEach(([k, v]) => {
    if (filterMeuns && filterMeuns.length && filterMeuns.includes(v)) {
      meunObj[v] = k
    }
  })
  
  list.map((v, i) => {
    if (i !== 0) {
      newList.push({
        eventCname: v[meunObj['事件中文名']] || '',
        page: v[meunObj['页面']],
        eventId: v[meunObj['event_id']],
      })
    }
  })
  console.log(newList);
  return newList
}

// 向上查找单元格值
function getUpTableCellValue (list) {
  list.forEach((val, i) => {
    if (!val.page && i > 1) {
      val.page = list[i - 1].page
    }
  })
  return list
}

export {
  formatAllXlsxJson,
  getUpTableCellValue
}