console.log('Service Worker started with push.js');
self.addEventListener("push", function (e) {
  var data = e.data.json();
  var body = (data === null || data === void 0 ? void 0 : data.body) || 'Todo';
  var title = (data === null || data === void 0 ? void 0 : data.title) || 'Todo'
  var options = {
    body: body,
    badge: 'dot',
    icon: "https://appsaeed.github.io/icon-72x72.png",
    actions: [
      {
        action: 'open-task',
        title: 'Open now'
      }
    ]
  };
  var notification = self.registration.showNotification(title, options);

  console.log(notification);

  self.addEventListener('notificationclick', function (event) {
    event.notification.close(); 
  
    if (event.action) {
      event.waitUntil(
        clients.openWindow('https://appsaeed.github.io') 
      );
    }
  });

});


