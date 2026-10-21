import { useEffect, useState } from "react";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../api.js";
import EmployeeForm from "./EmployeeForm.jsx";

export default function EmployeeList({ isAdmin }) {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {id..} = edit
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async (q = search) => {
    try {
      setLoading(true);
      setEmployees(await getEmployees(q));
      setError("");
    } catch {
      setError("Cannot reach the server. Is the Spring Boot backend running on port 8080?");
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => load(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const save = async (data) => {
    if (editing?.id) await updateEmployee(editing.id, data);
    else await createEmployee(data);
    setEditing(null);
    load();
  };

  const remove = async (e) => {
    if (!window.confirm(`Delete ${e.firstName} ${e.lastName}?`)) return;
    try { await deleteEmployee(e.id); load(); } catch (err) { setError(err.message); }
  };

  return (
    <main className="content">
      <div className="toolbar">
        <input className="search" placeholder="Search by name, email, department, title..."
               value={search} onChange={(e) => setSearch(e.target.value)} />
        {isAdmin && <button className="btn" onClick={() => setEditing({})}>+ Add Employee</button>}
      </div>

      {error && <div className="error">{error}</div>}

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Job Title</th>
              {isAdmin && <><th>Salary</th><th>Hired</th><th>Actions</th></>}
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="8" className="muted center">Loading...</td></tr>}
            {!loading && employees.length === 0 && <tr><td colSpan="8" className="muted center">No employees found</td></tr>}
            {!loading && employees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.firstName} {e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>{e.jobTitle}</td>
                {isAdmin && (
                  <>
                    <td>{e.salary != null ? Number(e.salary).toLocaleString() : "-"}</td>
                    <td>{e.hireDate || "-"}</td>
                    <td className="row-actions">
                      <button className="btn small" onClick={() => setEditing(e)}>Edit</button>
                      <button className="btn small danger" onClick={() => remove(e)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EmployeeForm initial={editing.id ? editing : null} onSave={save} onCancel={() => setEditing(null)} />
      )}
    </main>
  );
}
