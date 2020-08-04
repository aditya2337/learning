"use strict"

export var pwa = function () {
  var worker = new Worker("./worker.js");
  var topics = {};
  var subUid = -1;

  function removeSubscriber(subscribers, topic, token, subscriber, idx) {
    if (subscriber.token === token) {
      worker.removeEventListener(topic, subscriber.func)
      subscribers.splice(idx, 1);
      return token;
    }
  }

  return {
    publish: function (topic, params) {
      if (!topics[topic]) {
        return false
      }

      worker.postMessage(params)

      return this
    },
    subscribe: function (topic, func) {
      if (!topics[topic]) {
        topics[topic] = [];
      }

      var token = (++subUid).toString();
      topics[topic].push({ token, func });
      worker.addEventListener(topic, func)
      return token;
    },
    unSubscribe: function (token) {
      Object.entries(topics).forEach(function forEachTopic([topic, subscribers]) {
        subscribers.forEach(removeSubscriber.bind(null, subscribers, topic, token));
      });
    },
  };
};
