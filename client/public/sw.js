self.addEventListener("push", function (event) {
  console.log("🔥 Push received in SW");

  event.waitUntil(
    self.registration.showNotification("TEST NOTIFICATION", {
      body: "If you see this → system works",
      icon: "/logo192.png"
    })
  );
});