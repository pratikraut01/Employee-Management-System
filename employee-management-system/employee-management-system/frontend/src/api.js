const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api/employees";

async function request(url, options) {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...options });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data.errors ? Object.values(data.errors).join(", ") : data.message;
    throw new Error(detail || "Request failed");
  }
  return data;
}

export const getEmployees = (search = "") =>
  request(search ? `${BASE}?search=${encodeURIComponent(search)}` : BASE);
export const createEmployee = (e) => request(BASE, { method: "POST", body: JSON.stringify(e) });
export const updateEmployee = (id, e) => request(`${BASE}/${id}`, { method: "PUT", body: JSON.stringify(e) });
export const deleteEmployee = (id) => request(`${BASE}/${id}`, { method: "DELETE" });
