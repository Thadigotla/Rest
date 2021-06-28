//It will get  start  ,when service worker installed
self.addEventListener("install", function (event) {
	console.log("Service worker  is installed", event);
});

//It will get  start  ,when service worker installed
self.addEventListener("activate", function (event) {
	console.log("Service worker  is Activated");

	//It makes sures  to start without any errros

	return self.ClientRectList.clain();
});

// note : due to separate threads they run in diff THREADS

//It will trigger for all the fetch events even for html and reuqests, etc,...
self.addEventListener("fetch", function (event) {
	console.log("Fetch evet is triggered");

	event.respondWith(fetch(event.request));
});

//For Notification clicks
self.addEventListener("notificationclick", function (event) {
	var notification = event.notification;
	var action = event.action;

	if (action == "confirm") {
		console.log("Confirm was chosen");

		notification.close();
	} else {
		console.log(action);
	}
});

//For closing Notifications
self.addEventListener("notificationclose", function (event) {
	console.log("Notification was closed");
});
