import dayjs from 'dayjs'

export const getIndex = (a, b, c) => {
  return a.findIndex(e => (b ? e[b].toString() : e.toString()) === c.toString())
}

export const getLocalDateFormat = () => {
  const dummyDate = new Date(2021, 2, 1)
  let str = dummyDate.toLocaleDateString()
  str = str.replace("2021","YYYY")
  str = str.replace("3","MM")
  str = str.replace("1","DD")
  return str
}

export const sortDates = (arr, name) => {
  return arr.sort((a, b) => {
    const dateA = new Date(a[name + '_format'])
    const dateB = new Date(b[name + '_format'])
    return dateB.getTime() - dateA.getTime()
  })
}

export const sortNumbers = (arr, name) => {
  return arr.sort((a,b) => a[name] - b[name])
}

export const firstLetterCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export const dateFormat = (date, template) => dayjs(date).format(template)

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})
