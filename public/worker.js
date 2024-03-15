console.log("Service Worker Loaded...");

self.addEventListener("push", function (e) {
  var data = e.data.json();
  console.log("Push Recieved. from todo app ..", data);
  var options = {
    body: (data === null || data === void 0 ? void 0 : data.body) || 'no body',
    badge: "https://appsaeed.github.io/icon-512x512.png",
    tag: "tag-1",
    icon: "https://appsaeed.github.io/icon-512x512.png",
    actions: [{
      action: 'ok',
      title: 'Ok'
    }]
  };
  if (data !== null && data !== void 0 && data.image) {
    options.image = data.image;
  }
  self.registration.showNotification(data.title, options);
});