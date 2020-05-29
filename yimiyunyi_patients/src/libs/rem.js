// 设置 rem 函数
function setRem () {
  // 默认宽度 375 1rem = 10px
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  // 得到html的Dom元素
  let htmlDom = document.getElementsByTagName('html')[0]
  // 设置根元素字体大小
  htmlDom.style.fontSize = htmlWidth / 750 * 40 + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
