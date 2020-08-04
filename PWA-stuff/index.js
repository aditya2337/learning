import { pwa } from './pwaPubsub';

var pwaPubSub = pwa();

function onMessage(e) {
  console.log(e.data)
}
function onMessage2(e) {
  console.log(e.data)
}

var messenger = pwaPubSub.subscribe('message', onMessage)
var messenger2 = pwaPubSub.subscribe('message', onMessage2)

pwaPubSub.publish('message', "Yo bro")

setTimeout(() => {
  pwaPubSub.unSubscribe(messenger2)
  pwaPubSub.publish('message', "Only once")
}, 1000)


