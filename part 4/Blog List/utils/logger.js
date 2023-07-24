const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  debugger
  console.error(...params)
  
}

module.exports = { info, error }