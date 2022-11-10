export default {
  /*
  * 权限判断
  * @ params key 权限的key
  * @ return Blean
  */
  hasAuth: (state: any) => (key: string) => {
    try {
      return state.authId.includes(key)
    } catch {
      return false
    }
  }
}
