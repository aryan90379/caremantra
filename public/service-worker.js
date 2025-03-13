self.addEventListener("push", (event) => {
  try {
    let data = { 
      title: "Default Title", 
      body: "Default Body", 
      url: "https://google.com",
      image: "" // Default empty image
    };

    if (event.data && typeof event.data.text === "function") {
      try {
        data = JSON.parse(event.data.text());
      } catch (parseError) {
        console.error("Push data is not valid JSON:", parseError);
      }
    }

    // Use the URL passed from the push payload and include an image
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192x192.png",
      image: data.image || "",  // Add image field for notification
      data: { url: data.url || "https://google.com" },
    });
  } catch (error) {
    console.error("Error handling push event:", error);
  }
});

// Handle notification click events
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  // Open the provided URL if it exists
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (let client of clientList) {
          if ("focus" in client) return client.focus();
        }
        return clients.openWindow(event.notification.data.url || "/");
      })
  );
});
