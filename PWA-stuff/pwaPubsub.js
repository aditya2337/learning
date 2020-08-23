"use strict";

export var pwa = function () {
  var worker = new Worker("./worker.js");
  var topics = {};
  var subUid = -1;

  function removeSubscriber(subscribers, topic, token, subscriber, idx) {
    if (subscriber.token === token) {
      worker.removeEventListener(topic, subscriber.func);
      subscribers.splice(idx, 1);
      return token;
    }
  }

  return {
    publish: function (topic, params) {
      if (!topics[topic]) {
        return false;
      }

      worker.postMessage(params);

      return this;
    },
    subscribe: function (topic, func) {
      if (!topics[topic]) {
        topics[topic] = [];
      }

      var token = (++subUid).toString();
      topics[topic].push({ token, func });
      worker.addEventListener(topic, func);
      return token;
    },
    unSubscribe: function (token) {
      Object.entries(topics).forEach(function forEachTopic([
        topic,
        subscribers,
      ]) {
        subscribers.forEach(
          removeSubscriber.bind(null, subscribers, topic, token),
        );
      });
    },
    terminateWorker: function () {
      worker.terminate();
    },
    registerServiceWorker: function () {
      // Check for browser support of service worker
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("./serviceWorker.js", { updateViaCache: "none" })
          .then(function (registration) {
            // Successful registration
            console.log(
              "Hooray. Registration successful, scope is:",
              registration.scope,
            );

            svcWorker =
              registration.installing ||
              registration.waiting ||
              registration.active;
            navigator.serviceWorker.addEventListener(
              "controllerchange",
              function onController() {
                svcWorker = navigator.serviceWorker.controller;
                sendStatusUpdates(svcWorker);
              },
            );

            navigator.serviceWorker.addEventListener("message", onSWMessage);
          })
          .catch(function (err) {
            // Failed registration, service worker won’t be installed
            console.log(
              "Whoops. Service worker registration failed, error:",
              err,
            );
          });
      }
    },
  };
};
