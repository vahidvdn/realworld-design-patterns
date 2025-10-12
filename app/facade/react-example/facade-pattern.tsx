import React, { useState } from "react";

// -------------------------------
// Facade Pattern implementation
// -------------------------------

// Subsystem 1: Authentication
class AuthService {
  login(username: string, password: string): boolean {
    console.log(`Authenticating ${username}...`);
    return username === "admin" && password === "1234";
  }

  logout() {
    console.log("User logged out");
  }
}

// Subsystem 2: Data fetching
class DataService {
  fetchUserData() {
    console.log("Fetching user data...");
    return { name: "Admin User", email: "admin@example.com" };
  }
}

// Subsystem 3: Notification
class NotificationService {
  notify(message: string) {
    console.log(`Notification: ${message}`);
  }
}

// -------------------------------
// Facade: provides a simple interface to complex subsystems
// -------------------------------
class AppFacade {
  private auth = new AuthService();
  private data = new DataService();
  private notify = new NotificationService();

  loginAndFetch(username: string, password: string) {
    const success = this.auth.login(username, password);
    if (!success) {
      this.notify.notify("Login failed");
      return null;
    }

    const userData = this.data.fetchUserData();
    this.notify.notify("Login successful");
    return userData;
  }

  logout() {
    this.auth.logout();
    this.notify.notify("You have logged out");
  }
}

// -------------------------------
// React UI that uses the Facade
// -------------------------------
export default function FacadePatternDemo() {
  const [facade] = useState(() => new AppFacade());
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = () => {
    const result = facade.loginAndFetch(form.username, form.password);
    setUser(result);
  };

  const handleLogout = () => {
    facade.logout();
    setUser(null);
  };

  return (
    <div style={{ fontFamily: 'system-ui, Arial', padding: 20 }}>
      <h2>Facade Pattern — React demo</h2>
      <p>The Facade provides a unified interface to multiple subsystems.</p>

      {!user ? (
        <div style={{ marginTop: 20 }}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            style={{ marginRight: 8, padding: 4 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ marginRight: 8, padding: 4 }}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div style={{ marginTop: 20 }}>
          <h3>Welcome, {user.name}</h3>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: '#666' }}>Open the console to see the internal subsystem calls hidden behind the Facade.</p>
      </div>
    </div>
  );
}
