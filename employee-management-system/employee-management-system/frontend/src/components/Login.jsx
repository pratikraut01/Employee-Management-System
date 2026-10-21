import { useState } from "react";

// Demo login. For production, replace with Spring Security + JWT.
const USERS = {
  admin: { password: "admin123", role: "admin" },
  employee: { password: "emp123", role: "employee" },
};

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const u = USERS[username.trim().toLowerCase()];
    if (u && u.password === password) onLogin(u.role);
    else setError("Invalid username or password");
  };

  return (
    <div className="login-wrap">
      <form className="card login" onSubmit={submit}>
        <h2>Employee Management System</h2>
        <p className="muted">Sign in as Admin or Employee</p>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Login</button>
        <p className="hint">Demo: admin / admin123 &nbsp;|&nbsp; employee / emp123</p>
      </form>
    </div>
  );
}
