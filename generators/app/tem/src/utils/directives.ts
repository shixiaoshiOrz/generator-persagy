/**
 * 注册全局的自定义指令
*/

type typeKey = {
    [key: string]: any;
}

const allDirectives: typeKey = {
  title: {
    inserted (el: any) {
      const { clientWidth, scrollWidth, title } = el
      if (!title && scrollWidth > clientWidth) el.title = el.innerText
    }
  }
}

export default (Vue: any) => {
  Object.keys(allDirectives).forEach((n: any) => Vue.directive(n, allDirectives[n]))
}
