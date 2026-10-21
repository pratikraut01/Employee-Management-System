import { useState } from "react";
import Login from "./components/Login.jsx";
import EmployeeList from "./components/EmployeeList.jsx";

export default function App() {
  const [role, setRole] = useState(() => localStorage.getItem("ems-role"));

  const login = (r) => { localStorage.setItem("ems-role", r); setRole(r); };
  const logout = () => { localStorage.removeItem("ems-role"); setRole(null); };

  if (!role) return <Login onLogin={login} />;

  return (
    <div className="app">
      <header className="topbar">
        <h1>Employee Management System</h1>
        <div>
          <span className={`badge ${role}`}>{role === "admin" ? "Admin" : "Employee"}</span>
          <button className="btn ghost" onClick={logout}>Logout</button>
        </div>
      </header>
      <EmployeeList isAdmin={role === "admin"} />
    </div>
  );
}
