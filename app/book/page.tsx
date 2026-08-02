"use client";

import React from "react";
import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";

export default function BookPage() {
  const { language, db } = useDeshatan();

  return (
    <main style={{ padding: "40px 20px" }}>
      <div className="wrap">
        <h1 style={{ marginBottom: "30px" }}>✈️ Book Your Trip</h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {db.destinations.map((dest) => (
            <div
              key={dest.id}
              style={{
                border: "2px solid var(--ink)",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "5px 5px 0 var(--paper-deep)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "var(--paper-deep)",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                }}
              >
                🏔️
              </div>
              <h3 style={{ marginBottom: "8px" }}>{dest.title}</h3>
              <p style={{ color: "var(--ink-soft)", marginBottom: "10px" }}>{dest.blurb}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <span style={{ fontSize: "18px", fontWeight: "600", color: "var(--sindoor)" }}>
                  ₹{dest.priceFrom.toLocaleString()}/day
                </span>
                <span style={{ color: "var(--marigold)" }}>⭐ {dest.rating}</span>
              </div>
              <button
                className="btn"
                style={{ width: "100%" }}
                onClick={() => {
                  alert(`Booking: ${dest.title}\n\nFull booking flow coming soon!`);
                }}
              >
                Select Trip
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "var(--paper-deep)", borderRadius: "10px" }}>
          <h2 style={{ marginBottom: "15px" }}>📝 Booking Flow Coming Soon!</h2>
          <p>The following pages are ready to be developed:</p>
          <ul style={{ marginTop: "15px", marginLeft: "20px" }}>
            <li>/book/search - Search & filter trips</li>
            <li>/book/trip/[id] - Trip details</li>
            <li>/book/customize/[id] - Customize your trip</li>
            <li>/book/pick/[id] - Select guide & driver</li>
            <li>/book/stay/[id] - Select accommodation</li>
            <li>/book/details/[id] - Guest information</li>
            <li>/book/payment/[id] - Payment form</li>
            <li>/book/confirmation/[id] - Booking confirmation</li>
            <li>/book/mytrips - View your bookings</li>
            <li>/book/track/[id] - Live tracker</li>
            <li>/book/review/[id] - Write review</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
