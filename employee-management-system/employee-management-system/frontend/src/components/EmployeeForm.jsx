import { useState } from "react";

const EMPTY = { firstName: "", lastName: "", email: "", phone: "", department: "", jobTitle: "", salary: "", hireDate: "" };

export default function EmployeeForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? { ...EMPTY, ...initial } : EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSave({
        ...form,
        salary: form.salary === "" ? null : Number(form.salary),
        hireDate: form.hireDate || null,
      });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="overlay">
      <form className="card modal" onSubmit={submit}>
        <h2>{initial ? "Edit Employee" : "Add Employee"}</h2>
        <div className="grid">
          <label>First name<input required value={form.firstName} onChange={set("firstName")} /></label>
          <label>Last name<input required value={form.lastName} onChange={set("lastName")} /></label>
          <label>Email<input required type="email" value={form.email} onChange={set("email")} /></label>
          <label>Phone<input value={form.phone} onChange={set("phone")} /></label>
          <label>Department<input required value={form.department} onChange={set("department")} /></label>
          <label>Job title<input required value={form.jobTitle} onChange={set("jobTitle")} /></label>
          <label>Salary<input type="number" min="0" step="0.01" value={form.salary} onChange={set("salary")} /></label>
          <label>Hire date<input type="date" value={form.hireDate} onChange={set("hireDate")} /></label>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="actions">
          <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
