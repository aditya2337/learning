var start = false
var currentFib = 0

self.onmessage = function onMessage(event) {
  const { data } = event
  if (data == "start") {
    start = true
    getNextFib()
  } else if (data == "stop") {
    start = false
  }
}

function getNextFib() {
  var fibNum = fib(currentFib)
  self.postMessage({ fib: fibNum })
  
  if (start) {
    currentFib++
    getNextFib()
    // setTimeout(getNextFib, 0)
  }
}

function fib(num) {
  if (num < 2) {
    return num
  }

  return fib(num - 1) + fib(num - 2)
}
