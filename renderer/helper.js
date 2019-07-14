
exports.$ = id => {
  return document.getElementById(id)
}

exports.convertTime = time => {
  const minutes = '0' + Math.floor(time / 60)
  const seconds = '0' + Math.floor(time - minutes * 60)
  return `${minutes.substr(-2)} : ${seconds.substr(-2)}`
}
