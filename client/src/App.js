import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from "react";

import Home from './pages/Home';
import Recognition from './pages/Recognition';
import Dashboard from './pages/Dashboard';
import AddMember from "./pages/AddMember";

function App() {

  const PUBLIC_KEY = "BDcmpCRVLvLSK6novEvTvlJFatOnZ4XulH2AbNj0UN9G18LK212G9iSiR3nkgyYR7mwILKRrCnDr0Re1MIy8fes";

  useEffect(() => {
    subscribeUser();
  }, []);

  // 🔔 SUBSCRIBE USER (IMPROVED)
  async function subscribeUser() {
    if (!("serviceWorker" in navigator)) return;

    try {
      const reg = await navigator.serviceWorker.ready;

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("❌ Notification permission denied");
        return;
      }

      // ✅ CHECK EXISTING SUBSCRIPTION
      let sub = await reg.pushManager.getSubscription();

      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
        });
      }

      // ✅ SEND TO SERVER
      await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sub)
      });

      console.log("✅ Subscribed successfully");

    } catch (err) {
      console.error("❌ Subscription error:", err);
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
  }

  return (
    <Router>
      <div className="app">

        <nav className="navbar">
          <h1>🧠 Remember Me</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/recognition">Recognition</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add-member">Add Member</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-member" element={<AddMember />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;