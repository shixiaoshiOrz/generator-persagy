const files = require.context('../api', true, /.(ts|js)$/)
// 合并所有的API
const allApi = files.keys().reduce((con: any, src: string) => {
  return Object.assign(con, files(src).default)
}, {})
export default allApi
