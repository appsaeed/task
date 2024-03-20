console.log('Service Worker started with push.js');
self.addEventListener("push", function (e) {
  var data = e.data.json();
  var body = (data === null || data === void 0 ? void 0 : data.body) || 'Todo';
  var title = (data === null || data === void 0 ? void 0 : data.title) || 'Todo';
  var options = {
    body: body,
    badge: "https://appsaeed.github.io/favicon.ico",
    icon: "https://appsaeed.github.io/icon-512x512.png",
    actions: [
      {
        action: 'https://appsaeed.github.io',
        title: 'open'
      }
    ]
  };
  self.registration.showNotification(title, options);
});
