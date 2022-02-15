export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

/*
* number to string
* */
export function capitalAmount(number) {
  var ret = "";
  if (number != "" && number != null && number != "0") {
    var unit = "仟佰拾亿仟佰拾万仟佰拾元角分",
      str = "";
    number += "00";
    var point = number.indexOf(".");
    if (point >= 0) {
      number = number.substring(0, point) + number.substr(point + 1, 2);
    }
    unit = unit.substr(unit.length - number.length);
    for (var i = 0; i < number.length; i++) {
      str +=
        "零壹贰叁肆伍陆柒捌玖".charAt(number.charAt(i)) + unit.charAt(i);
    }
    ret =
      str
        .replace(/零(仟|佰|拾|角)/g, "零")
        .replace(/(零)+/g, "零")
        .replace(/零(万|亿|元)/g, "$1")
        .replace(/(亿)万|(拾)/g, "$1$2")
        .replace(/^元零?|零分/g, "")
        .replace(/元$/g, "元") + "整";
  }
  return ret
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {
  }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
