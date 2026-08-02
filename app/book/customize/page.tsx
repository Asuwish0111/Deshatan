"use client";

import React, { useState } from "react";
import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";
import { PACE_OPTIONS, MEAL_PLANS, PICKUP_OPTIONS, ADDONS, OCCASIONS } from "@/lib/constants";

export default function CustomizePage() {
  const { language } = useDeshatan();
  const [pace, setPace] = useState<"relaxed" | "balanced" | "packed">("balanced");
  const [meal, setMeal] = useState<"breakfast" | "half" | "full">("half");
  const [pickup, setPickup] = useState<"self" | "railway" | "airport" | "home">("self");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [occasion, setOccasion] = useState("none");
  const [notes, setNotes] = useState("");

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((a) => a !== addonId) : [...prev, addonId]
    );
  };

  const addonCost = selectedAddons.reduce(
    (sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price || 0),
    0
  );

  return (
    <main style={{ padding: "40px 20px", backgroundColor: "var(--paper)" }}>
      <div className="wrap">
        <h1 style={{ marginBottom: "30px" }}>🎨 Customize Your Trip</h1>

        <div className="customize-grid">
          <div>
            {/* Pace Selection */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>⏱️ Trip Pace</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {PACE_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setPace(option.key as any)}
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      border: "2px solid var(--ink)",
                      borderRadius: "8px",
                      backgroundColor: pace === option.key ? "var(--marigold-soft)" : "#fff",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ fontWeight: "600" }}>{option.label}</div>
                    <div style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
                      {option.hint}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Plan Selection */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>🍽️ Meal Plan</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {MEAL_PLANS.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setMeal(option.key as any)}
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      border: "2px solid var(--ink)",
                      borderRadius: "8px",
                      backgroundColor: meal === option.key ? "var(--marigold-soft)" : "#fff",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontWeight: "600" }}>{option.label}</div>
                    <div style={{ color: "var(--sindoor)", fontWeight: "600" }}>
                      +₹{option.perDayPerPax}/day
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pickup Selection */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>🚗 Pickup Option</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {PICKUP_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setPickup(option.key as any)}
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      border: "2px solid var(--ink)",
                      borderRadius: "8px",
                      backgroundColor: pickup === option.key ? "var(--marigold-soft)" : "#fff",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontWeight: "600" }}>{option.label}</div>
                    <div style={{ color: "var(--sindoor)", fontWeight: "600" }}>
                      +₹{option.fee}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>✨ Add-ons</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ADDONS.map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    style={{
                      padding: "15px",
                      border: "2px solid var(--ink)",
                      borderRadius: "8px",
                      backgroundColor: selectedAddons.includes(addon.id)
                        ? "var(--marigold-soft)"
                        : "#fff",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.id)}
                        readOnly
                        style={{ marginRight: "10px" }}
                      />
                      {addon.label}
                    </div>
                    <div style={{ color: "var(--sindoor)", fontWeight: "600" }}>
                      +₹{addon.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>🎉 Occasion</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {OCCASIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setOccasion(opt.key)}
                    style={{
                      padding: "10px 16px",
                      border: "2px solid var(--ink)",
                      borderRadius: "20px",
                      backgroundColor: occasion === opt.key ? "var(--sindoor)" : "#fff",
                      color: occasion === opt.key ? "var(--paper)" : "var(--ink)",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>📝 Special Requests</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests or preferences..."
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "12px",
                  border: "2px solid var(--ink)",
                  borderRadius: "8px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Summary Card */}
          <div style={{ position: "sticky", top: "20px" }}>
            <div
              style={{
                border: "3px solid var(--ink)",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "8px 8px 0 var(--marigold)",
              }}
            >
              <h3 style={{ marginBottom: "20px" }}>💰 Trip Summary</h3>

              <div style={{ marginBottom: "15px", paddingBottom: "15px", borderBottom: "2px dashed var(--ink)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span>Base Trip</span>
                  <strong>₹45,000</strong>
                </div>
                {MEAL_PLANS.find((m) => m.key === meal)?.perDayPerPax && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span>Meals (5 days)</span>
                    <strong>
                      ₹{(MEAL_PLANS.find((m) => m.key === meal)?.perDayPerPax || 0) * 5 * 2}
                    </strong>
                  </div>
                )}
                {PICKUP_OPTIONS.find((p) => p.key === pickup)?.fee > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span>Pickup</span>
                    <strong>₹{PICKUP_OPTIONS.find((p) => p.key === pickup)?.fee}</strong>
                  </div>
                )}
                {addonCost > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span>Add-ons</span>
                    <strong>₹{addonCost}</strong>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "18px", fontWeight: "600" }}>Total</span>
                <strong style={{ fontSize: "24px", color: "var(--sindoor)" }}>
                  ₹{(45000 + (MEAL_PLANS.find((m) => m.key === meal)?.perDayPerPax || 0) * 5 * 2 + (PICKUP_OPTIONS.find((p) => p.key === pickup)?.fee || 0) + addonCost).toLocaleString()}
                </strong>
              </div>

              <button
                className="btn"
                style={{ width: "100%", marginBottom: "10px" }}
                onClick={() => alert("Proceeding to guide selection...")}
              >
                Continue to Guides
              </button>
              <button
                className="btn ghost"
                style={{ width: "100%" }}
                onClick={() => alert("Saving customization...")}
              >
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
