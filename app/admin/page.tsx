"use client";

import React, { useState } from "react";
import { useDeshatan } from "@/lib/context";

export default function AdminPage() {
  const { db } = useDeshatan();
  const [selectedTab, setSelectedTab] = useState("dashboard");

  return (
    <main style={{ padding: "40px 20px" }}>
      <div className="wrap">
        <h1 style={{ marginBottom: "30px" }}>🔧 Admin Dashboard</h1>

        <div style={{ display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap" }}>
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "bookings", label: "Bookings" },
            { id: "guides", label: "Guides" },
            { id: "analytics", label: "Analytics" },
            { id: "settings", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                padding: "12px 20px",
                backgroundColor: selectedTab === tab.id ? "var(--sindoor)" : "var(--paper-deep)",
                color: selectedTab === tab.id ? "var(--paper)" : "var(--ink)",
                border: "2px solid var(--ink)",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {selectedTab === "dashboard" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            <div style={{ padding: "20px", backgroundColor: "var(--indigo)", color: "var(--paper)", borderRadius: "10px" }}>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>Total Bookings</div>
              <div style={{ fontSize: "32px", fontWeight: "600", marginTop: "10px" }}>
                {db.bookings.length}
              </div>
            </div>
            <div style={{ padding: "20px", backgroundColor: "var(--sindoor)", color: "var(--paper)", borderRadius: "10px" }}>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>Total Guides</div>
              <div style={{ fontSize: "32px", fontWeight: "600", marginTop: "10px" }}>
                {db.guides.length}
              </div>
            </div>
            <div style={{ padding: "20px", backgroundColor: "var(--marigold)", color: "var(--ink)", borderRadius: "10px" }}>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>Total Stays</div>
              <div style={{ fontSize: "32px", fontWeight: "600", marginTop: "10px" }}>
                {db.stays.length}
              </div>
            </div>
            <div style={{ padding: "20px", backgroundColor: "var(--peacock)", color: "var(--paper)", borderRadius: "10px" }}>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>Total Destinations</div>
              <div style={{ fontSize: "32px", fontWeight: "600", marginTop: "10px" }}>
                {db.destinations.length}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "bookings" && (
          <div>
            <h2 style={{ marginBottom: "20px" }}>📅 Bookings ({db.bookings.length})</h2>
            {db.bookings.length === 0 ? (
              <p style={{ color: "var(--ink-muted)" }}>No bookings yet. Bookings will appear here.</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--ink)" }}>
                    <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Guest</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {db.bookings.map((booking) => (
                    <tr key={booking.id} style={{ borderBottom: "1px solid var(--paper-deep)" }}>
                      <td style={{ padding: "10px" }}>{booking.id}</td>
                      <td style={{ padding: "10px" }}>{booking.guestName}</td>
                      <td style={{ padding: "10px" }}>{booking.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {selectedTab === "guides" && (
          <div>
            <h2 style={{ marginBottom: "20px" }}>👨‍💼 Guides & Drivers</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {db.guides.map((guide) => (
                <div
                  key={guide.id}
                  style={{
                    padding: "20px",
                    border: "2px solid var(--ink)",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  }}
                >
                  <h3>{guide.name}</h3>
                  <p style={{ color: "var(--ink-muted)", marginBottom: "10px" }}>📍 {guide.city}</p>
                  <p style={{ marginBottom: "10px" }}>⭐ {guide.rating} ({guide.reviews} reviews)</p>
                  <p style={{ fontSize: "12px", color: "var(--ink-muted)" }}>
                    Languages: {guide.languages.join(", ")}
                  </p>
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "8px 12px",
                      backgroundColor: guide.verified ? "var(--peacock)" : "var(--paper-deep)",
                      color: guide.verified ? "white" : "var(--ink)",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {guide.verified ? "✓ Verified" : "Pending Verification"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "analytics" && (
          <div style={{ padding: "20px", backgroundColor: "var(--paper-deep)", borderRadius: "10px" }}>
            <h2 style={{ marginBottom: "20px" }}>📊 Analytics</h2>
            <p style={{ color: "var(--ink-soft)", marginBottom: "15px" }}>
              <strong>Total Revenue:</strong> ₹{db.bookings.reduce((sum, b) => sum + b.total, 0).toLocaleString()}
            </p>
            <p style={{ color: "var(--ink-soft)", marginBottom: "15px" }}>
              <strong>Average Booking Value:</strong> ₹
              {(db.bookings.length > 0
                ? Math.round(db.bookings.reduce((sum, b) => sum + b.total, 0) / db.bookings.length)
                : 0
              ).toLocaleString()}
            </p>
            <p style={{ color: "var(--ink-soft)" }}>
              <strong>Confirmed Bookings:</strong> {db.bookings.filter((b) => b.status === "confirmed").length}
            </p>
          </div>
        )}

        {selectedTab === "settings" && (
          <div style={{ padding: "20px", backgroundColor: "var(--paper-deep)", borderRadius: "10px" }}>
            <h2 style={{ marginBottom: "20px" }}>⚙️ Settings</h2>
            <p style={{ marginBottom: "15px" }}>
              <strong>Site Name:</strong> {db.settings.siteName}
            </p>
            <p style={{ marginBottom: "15px" }}>
              <strong>Support Email:</strong> {db.settings.supportEmail}
            </p>
            <p>
              <strong>Payment Methods:</strong> {db.settings.paymentMethods.join(", ")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
