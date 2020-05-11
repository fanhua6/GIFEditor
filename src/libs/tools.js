
export const throttle = (fn, interval) => {
  let _self = fn
  let  timer
  let  firstTime = true

  return function () {
    let args = arguments
    let _me = this

    if(firstTime) {
      _self.apply(_me, args)
      return firstTime = false
    }

    if(timer) {
      return false
    }

    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      _self.apply(_me, args)
    }, interval || 500)
  }
}

export const arrSort = (arr, sort) => {
  return arr.sort((a, b) => {
    return b[sort] - a[sort]
  })
}

export const getBase64 = url => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = "blob"
    xhr.onload = function() {
      if(this.status == 200) {
        let blob = this.response
        let reader = new FileReader()

        reader.onloadend = e => {
          resolve(e.target.result)
        }

        reader.readAsDataURL(blob)
      }
    }
    xhr.send()
  })
}