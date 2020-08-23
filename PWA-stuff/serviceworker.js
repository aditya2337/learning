"use strict";

const version =  1;
let isOnline = true;

console.log(self.clients);
self.addEventListener("install", onInstall);
self.addEventListener("activate", onActive);
self.addEventListener("message", onMessage);

main().catch(console.error);

/******************************************************************************* */

async function main() {
  console.log(self.clients);
  await sendMessage({ requestStatusUpdate: true });
}

async function onInstall(event) {
  console.log(`Service worker (${version}) installed`, event);
  self.skipWaiting();
  // event.waitUntil(
  //   caches.open(cacheName).then(function addCache(cache) {
  //     return cache.addAll([
  //       // "./Default-Unselected@2x.png",
  //       // "./Btn-CoD-AllGames.png",
  //       // "./Btn-CoD-AllGames@2x.png",
  //       // "./Btn-CoD-Unselectable.png",
  //       // "./Btn-CoD-Unselectable@2x.png",
  //       // "./Btn-CoD-Unselected-Default.png",
  //       // "./Btn-CoD-Unselected-Default@2x.png",
  //       // "./Btn-CoD-Unselected-Hover.png",
  //       // "./Btn-CoD-Unselected-Hover@2x.png",
  //     ]);
  //   })
  // );
}

function onActive(event) {
  event.waitUntil(handleActivation());
}

async function handleActivation() {
  await self.clients.claim();
  console.log(`Service worker (${version}) is active`);
}

async function sendMessage(message) {
  console.log(self);
  const allClients = self.clients.matchAll({
    includeUncontrolled: true,
  });

  return Promise.all(
    allClients.map(function sendClientMessage(client) {
      const channel = new MessageChannel();
      channel.port1.onmessage = onMessage;
      return client.postMessage(message, [channel.port2]);
    })
  );
}

function onMessage({ data }) {
  if (data.statusUpdate) {
    ({ isOnline } = data.statusUpdate);
    console.log(
      `Service worker (v${version} status update, isOnline: ${isOnline})`
    );
  }
}
