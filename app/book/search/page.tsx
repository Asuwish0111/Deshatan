"use client";

import React, { useState } from "react";
import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";

export default function SearchPage() {
  const { language, db } = useDeshatan();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const filteredDestinations = db.destinations.filter((dest) => {
    const matchesSearch =
      dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.blurb.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || dest.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const regions = [...new Set(db.destinations.map((d) => d.region))];

  return (
    <main style={{ padding: "40px 20px", backgroundColor: "var(--paper)" }}>
      <div className="wrap">
        <h1 style={{ marginBottom: "30px" }}>🔍 Search Trips</h1>

        <div style={{ marginBottom: "30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
              🔎 Search Destination
            </label>
            <input
              type="text"
              placeholder="Search trips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid var(--ink)",
                borderRadius: "6px",
                fontSize: "16px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
              📍 Filter by Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid var(--ink)",
                borderRadius: "6px",
                fontSize: "16px",
                fontFamily: "inherit",
              }}
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h2 style={{ marginBottom: "20px" }}>
          📍 Results ({filteredDestinations.length})
        </h2>

        {filteredDestinations.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "var(--paper-deep)",
              borderRadius: "10px",
            }}
          >
            <p style={{ fontSize: "18px", color: "var(--ink-soft)" }}>
              No trips found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                style={{
                  border: "2px solid var(--ink)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "5px 5px 0 var(--paper-deep)",
                  backgroundColor: "#fff",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "var(--paper-deep)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "48px",
                    borderBottom: "2px solid var(--ink)",
                  }}
                >
                  🏔️
                </div>
                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: "var(--indigo-accent)",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    {dest.region}
                  </div>
                  <h3 style={{ marginBottom: "8px" }}>{dest.title}</h3>
                  <p style={{ color: "var(--ink-soft)", marginBottom: "15px", fontSize: "14px" }}>
                    {dest.blurb}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", color: "var(--ink-muted)" }}>Starting from</div>
                      <div style={{ fontSize: "20px", fontWeight: "600", color: "var(--sindoor)" }}>
                        ₹{dest.priceFrom.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "18px", color: "var(--marigold)" }}>⭐ {dest.rating}</div>
                      <div style={{ fontSize: "12px", color: "var(--ink-muted)" }}>
                        {dest.reviews} reviews
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn"
                    style={{ width: "100%" }}
                    onClick={() => {
                      alert(`Selected: ${dest.title}\n\nDetailed page coming soon!`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
