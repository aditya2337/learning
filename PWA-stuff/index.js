import { pwa } from './pwaPubsub';

const button = document.getElementById("btn")
const resultEl = document.getElementById("result")

let started = false

button.addEventListener("click", onClick)

var pwaPubSub = pwa();

pwaPubSub.registerServiceWorker();

function onMessage(e) {
  var liNode = document.createElement("li")
  liNode.textContent = e.data.fib
  resultEl.appendChild(liNode)
}

var messenger = pwaPubSub.subscribe('message', onMessage)


function onClick(event) {
  started = !started

  if (started) {
    pwaPubSub.publish('message', "start")
    button.textContent = "Stop"
  } else {
    // stop the timer
    button.textContent = "Start"
    pwaPubSub.terminateWorker()
  }
}


