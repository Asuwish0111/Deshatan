"use client";

import React, { useState } from "react";
import { useDeshatan } from "@/lib/context";

export default function DetailsPage() {
  const { language } = useDeshatan();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelDate: "",
    passengers: "1",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking submitted! Proceeding to payment...");
  };

  return (
    <main style={{ padding: "40px 20px", backgroundColor: "var(--paper)" }}>
      <div className="wrap" style={{ maxWidth: "600px" }}>
        <h1 style={{ marginBottom: "30px" }}>📋 Your Details</h1>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>👤 Personal Information</h2>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
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

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
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

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
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
          </div>

          {/* Trip Details */}
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>✈️ Trip Details</h2>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Travel Date *
              </label>
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                required
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

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Number of Passengers *
              </label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid var(--ink)",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontFamily: "inherit",
                }}
              >
                {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "person" : "people"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Summary */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "var(--paper-deep)",
              borderRadius: "10px",
              marginBottom: "30px",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>💰 Booking Summary</h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Trip Package</span>
              <strong>₹45,000</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Meals</span>
              <strong>₹5,000</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Pickup</span>
              <strong>₹500</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Insurance</span>
              <strong>₹1,200</strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "10px",
                borderTop: "2px solid var(--ink)",
              }}
            >
              <strong style={{ fontSize: "18px" }}>Total</strong>
              <strong style={{ fontSize: "18px", color: "var(--sindoor)" }}>₹51,700</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              className="btn"
              style={{ flex: 1 }}
            >
              Proceed to Payment
            </button>
            <button
              type="button"
              className="btn ghost"
              style={{ flex: 1 }}
              onClick={() => alert("Going back...")}
            >
              Back
            </button>
          </div>

          {/* Terms */}
          <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "var(--paper-deep)", borderRadius: "6px" }}>
            <label style={{ display: "flex", alignItems: "start", gap: "10px", fontSize: "13px" }}>
              <input type="checkbox" required style={{ marginTop: "2px" }} />
              <span>
                I agree to the <a href="#" style={{ color: "var(--sindoor)", fontWeight: "600" }}>terms and conditions</a> and <a href="#" style={{ color: "var(--sindoor)", fontWeight: "600" }}>privacy policy</a>
              </span>
            </label>
          </div>
        </form>
      </div>
    </main>
  );
}
