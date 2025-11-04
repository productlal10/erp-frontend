
// src/RoleAccess.js
import React, { useState, useEffect } from "react";
import axios from "axios";

// Enable cookies for all axios requests
axios.defaults.withCredentials = true;

const API_BASE = "http://localhost:4000";
const MODULES = ["Customer Master", "Vendor Master", "Employee Master", "Item Master","CostSheet Master","SystemPO Master","TNA Master","VendorPO Master","DailyProductionReport Master"];

const emptyPermissions = () =>
  MODULES.reduce((acc, m) => {
    acc[m] = { create: false, edit: false, delete: false, view: false };
    return acc;
  }, {});

const badgeStyle = (ok) => ({
  display: "inline-block",
  minWidth: 22,
  padding: "4px 8px",
  borderRadius: 12,
  fontSize: 12,
  fontWeight: 600,
  background: ok ? "#dcfce7" : "#fee2e2",
  color: ok ? "#166534" : "#991b1b",
  transition: "all 0.2s ease",
});

const RoleAccess = () => {
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState(emptyPermissions());
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchRoles();
    // eslint-disable-next-line
  }, []);

  const fetchRoles = async () => {
    try {
      setError("");
      const res = await axios.get(`${API_BASE}/role-permissions`);
      const data = Array.isArray(res.data) ? res.data : [];
      setRoles(data.map((r) => ({ role: r.role, access: r.access || emptyPermissions() })));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch roles");
    }
  };

  const handleCheckboxChange = (module, perm) => {
    setPermissions((p) => ({
      ...p,
      [module]: { ...p[module], [perm]: !p[module][perm] },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role.trim()) return alert("Please enter a role name.");

    try {
      setLoading(true);
      setError("");
      await axios.post(`${API_BASE}/role-permissions`, { role: role.trim(), access: permissions });
      await fetchRoles();
      setRole("");
      setPermissions(emptyPermissions());
      setIsEditing(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save role");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (r) => {
    setRole(r.role);
    const access = { ...emptyPermissions(), ...(r.access || {}) };
    setPermissions(access);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setRole("");
    setPermissions(emptyPermissions());
    setIsEditing(false);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "20px auto", padding: 20 }}>
      {/* Form Card */}
      <div style={{ background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.1)", marginBottom: 30 }}>
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: "600", color: "#111827" }}>
          {isEditing ? "Edit Role" : "Create Role"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>Role Name</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Admin"
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                width: "280px",
              }}
            />
          </div>

          <div style={{ overflowX: "auto", marginBottom: 20 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fafafa", borderRadius: 8, overflow: "hidden" }}>
              <thead style={{ background: "#f3f4f6" }}>
                <tr>
                  <th style={{ padding: 12, textAlign: "left" }}>Module</th>
                  {["Create", "Edit", "Delete", "View"].map((h) => (
                    <th key={h} style={{ padding: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MODULES.map((m) => (
                  <tr key={m} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: 12, textAlign: "left", fontWeight: 500 }}>{m}</td>
                    {["create", "edit", "delete", "view"].map((perm) => (
                      <td key={perm} style={{ padding: 12 }}>
                        <input
                          type="checkbox"
                          checked={!!permissions[m][perm]}
                          onChange={() => handleCheckboxChange(m, perm)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 18px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {isEditing ? (loading ? "Updating..." : "Update Role") : loading ? "Saving..." : "Save Role"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{
                  padding: "10px 18px",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Roles Table */}
      <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: 14, fontSize: 18, fontWeight: 600 }}>Saved Roles</h3>
        {error && <div style={{ color: "#dc2626", marginBottom: 10 }}>{error}</div>}

        {roles.length === 0 ? (
          <div style={{ color: "#6b7280" }}>No roles found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f9fafb" }}>
                <tr>
                  <th style={{ padding: 12, textAlign: "left" }}>Role</th>
                  {MODULES.map((m) => (
                    <th key={m} style={{ padding: 12 }}>{m}</th>
                  ))}
                  <th style={{ padding: 12 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r.role} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: 12, fontWeight: 600 }}>{r.role}</td>
                    {MODULES.map((m) => {
                      const perms = r.access?.[m] || {};
                      return (
                        <td key={m} style={{ padding: 12 }}>
                          <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
                            <span style={badgeStyle(!!perms.create)}>C</span>
                            <span style={badgeStyle(!!perms.edit)}>E</span>
                            <span style={badgeStyle(!!perms.delete)}>D</span>
                            <span style={badgeStyle(!!perms.view)}>V</span>
                          </div>
                        </td>
                      );
                    })}
                    <td style={{ padding: 12 }}>
                      <button
                        onClick={() => handleEdit(r)}
                        style={{
                          padding: "6px 12px",
                          background: "#f3f4f6",
                          border: "1px solid #e5e7eb",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleAccess;
