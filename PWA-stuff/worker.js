self.onmessage = function onMessage(event) {
  console.log(event.data)
}

self.postMessage("heyo")
