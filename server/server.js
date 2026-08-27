const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// 🔔 NEW IMPORTS
const webpush = require("web-push");
const cron = require("node-cron");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// 🔐 YOUR KEYS
const PUBLIC_KEY = "BDcmpCRVLvLSK6novEvTvlJFatOnZ4XulH2AbNj0UN9G18LK212G9iSiR3nkgyYR7mwILKRrCnDr0Re1MIy8fes";
const PRIVATE_KEY = "cCAhnYHPzNzip4ggxhDMJNH48iu-IRiDj78JhowiKLA";

webpush.setVapidDetails(
  "mailto:test@test.com",
  PUBLIC_KEY,
  PRIVATE_KEY
);

// 🧠 STORE SUBSCRIPTIONS
let subscriptions = [];

// 📩 SAVE USER SUBSCRIPTION
app.post("/subscribe", (req, res) => {
  subscriptions.push(req.body);
  console.log("✅ User subscribed");
  res.status(201).json({ message: "Subscribed" });
});

// 🧠 TIME CONVERTER
function convertToMinutes(timeStr) {
  if (!timeStr) return -1;

  const [time, modifier] = timeStr.split(" ");
  let [h, m] = time.split(":").map(Number);

  if (modifier?.toLowerCase() === "pm" && h !== 12) h += 12;
  if (modifier?.toLowerCase() === "am" && h === 12) h = 0;

  return h * 60 + m;
}

// 🔔 SEND PUSH
function sendNotification(title, body) {
  const payload = JSON.stringify({ title, body });

  subscriptions.forEach(sub => {
    webpush.sendNotification(sub, payload).catch(err => {
      console.error("Push error:", err);
    });
  });
}

// ⏰ CRON JOB (every minute)
cron.schedule("* * * * *", () => {
  console.log("⏰ Checking reminders...");

  let members = [];
  try {
    members = JSON.parse(fs.readFileSync("members.json", "utf-8"));
  } catch {
    members = [];
  }

  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();

  members.forEach(member => {
    const med = convertToMinutes(member.medicine);
    const food = convertToMinutes(member.food);

    if (med === current) {
      console.log(`💊 Medicine for ${member.name}`);
      sendNotification("💊 Medicine Time", `Hi ${member.name}, take your medicine`);
    }

    if (food === current) {
      console.log(`🍽 Food for ${member.name}`);
      sendNotification("🍽 Food Time", `Hi ${member.name}, it's time to eat`);
    }
  });
});

// 🔥 TEST ROUTE (VERY IMPORTANT)
app.get("/test", (req, res) => {
  console.log("🔥 Sending test notification");

  const payload = JSON.stringify({
    title: "Test Notification",
    body: "If you see this, everything is working!"
  });

  subscriptions.forEach(sub => {
    webpush.sendNotification(sub, payload)
      .catch(err => console.error("Push error:", err));
  });

  res.send("Test sent");
});

// ================= EXISTING CODE =================

app.post("/upload", (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: "No image received" });
  }

  try {
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const filePath = path.join(__dirname, "input.png");

    fs.writeFileSync(filePath, base64Data, "base64");

    const pythonProcess = spawn("py", ["-3.10", "recognition.py", filePath]);

    let result = "";
    let errorMsg = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorMsg += data.toString();
    });

    pythonProcess.on("close", () => {
      if (errorMsg) {
        console.error("Python Error:", errorMsg);

        return res.json({
          message: "Error in recognition"
        });
      }

      console.log("Face result:", result.trim());

      res.json({
        message: `Detected Faces: ${result.trim()}`
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});