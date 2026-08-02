"use client";

import React from "react";

export default function GuidePage() {
  const pages = [
    {
      category: "🏠 Main",
      items: [
        { path: "/", label: "Landing Page", desc: "Full homepage with all sections" },
      ],
    },
    {
      category: "🎫 Booking Flow",
      items: [
        {
          path: "/book",
          label: "All Trips",
          desc: "Browse all available trips with details",
        },
        {
          path: "/book/search",
          label: "Search Trips",
          desc: "Search and filter trips by destination and region",
        },
        {
          path: "/book/customize",
          label: "Customize Trip",
          desc: "Customize pace, meals, pickups, add-ons, occasion",
        },
        {
          path: "/book/details",
          label: "Enter Details",
          desc: "Guest information form (name, email, phone, date)",
        },
      ],
    },
    {
      category: "⚙️ Admin",
      items: [
        {
          path: "/admin",
          label: "Admin Dashboard",
          desc: "Dashboard with tabs: Dashboard, Bookings, Guides, Analytics, Settings",
        },
      ],
    },
  ];

  return (
    <main style={{ padding: "40px 20px", backgroundColor: "var(--paper)" }}>
      <div className="wrap">
        <h1 style={{ marginBottom: "15px" }}>🗺️ Site Navigation Guide</h1>
        <p style={{ color: "var(--ink-soft)", marginBottom: "30px" }}>
          Explore all the pages and features available in the Deshatan Travel platform.
        </p>

        {pages.map((section, i) => (
          <div key={i} style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "15px",
                paddingBottom: "10px",
                borderBottom: "3px solid var(--sindoor)",
              }}
            >
              {section.category}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
              {section.items.map((item, j) => (
                <a
                  key={j}
                  href={item.path}
                  style={{
                    display: "block",
                    padding: "20px",
                    border: "2px solid var(--ink)",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "3px 3px 0 var(--paper-deep)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "5px 5px 0 var(--paper-deep)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "3px 3px 0 var(--paper-deep)";
                  }}
                >
                  <h3 style={{ marginBottom: "8px", color: "var(--sindoor)" }}>
                    {item.label}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginBottom: "12px" }}>
                    {item.desc}
                  </p>
                  <code
                    style={{
                      fontSize: "12px",
                      backgroundColor: "var(--paper-deep)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      color: "var(--ink)",
                    }}
                  >
                    {item.path}
                  </code>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Features Overview */}
        <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "var(--paper-deep)", borderRadius: "10px" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>✨ Features Overview</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            <div>
              <h3 style={{ marginBottom: "10px", color: "var(--sindoor)" }}>💻 Frontend</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: "8px" }}>✓ React Components</li>
                <li style={{ marginBottom: "8px" }}>✓ TypeScript</li>
                <li style={{ marginBottom: "8px" }}>✓ 10 Languages</li>
                <li style={{ marginBottom: "8px" }}>✓ Responsive Design</li>
                <li style={{ marginBottom: "8px" }}>✓ Interactive Forms</li>
              </ul>
            </div>

            <div>
              <h3 style={{ marginBottom: "10px", color: "var(--sindoor)" }}>🎨 Design</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: "8px" }}>✓ Custom CSS</li>
                <li style={{ marginBottom: "8px" }}>✓ Design Tokens</li>
                <li style={{ marginBottom: "8px" }}>✓ Animations</li>
                <li style={{ marginBottom: "8px" }}>✓ Brand Colors</li>
                <li style={{ marginBottom: "8px" }}>✓ Hover Effects</li>
              </ul>
            </div>

            <div>
              <h3 style={{ marginBottom: "10px", color: "var(--sindoor)" }}>📊 Data</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: "8px" }}>✓ 8 Destinations</li>
                <li style={{ marginBottom: "8px" }}>✓ 5 Guides</li>
                <li style={{ marginBottom: "8px" }}>✓ 3 Drivers</li>
                <li style={{ marginBottom: "8px" }}>✓ 3 Stays</li>
                <li style={{ marginBottom: "8px" }}>✓ Real Pricing</li>
              </ul>
            </div>

            <div>
              <h3 style={{ marginBottom: "10px", color: "var(--sindoor)" }}>📱 Interactive</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: "8px" }}>✓ Live Calculator</li>
                <li style={{ marginBottom: "8px" }}>✓ Search Filters</li>
                <li style={{ marginBottom: "8px" }}>✓ Form Validation</li>
                <li style={{ marginBottom: "8px" }}>✓ Dynamic Pricing</li>
                <li style={{ marginBottom: "8px" }}>✓ State Management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div style={{ marginTop: "30px", padding: "30px", backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>🛠️ Technology Stack</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
            <div>
              <strong>Frontend</strong>
              <ul style={{ listStyle: "none", padding: "10px 0", fontSize: "14px" }}>
                <li>Next.js 16</li>
                <li>React 19</li>
                <li>TypeScript</li>
                <li>CSS Modules</li>
              </ul>
            </div>
            <div>
              <strong>State Management</strong>
              <ul style={{ listStyle: "none", padding: "10px 0", fontSize: "14px" }}>
                <li>React Context API</li>
                <li>useContext Hook</li>
                <li>localStorage</li>
                <li>JSON Database</li>
              </ul>
            </div>
            <div>
              <strong>Internationalization</strong>
              <ul style={{ listStyle: "none", padding: "10px 0", fontSize: "14px" }}>
                <li>10 Languages</li>
                <li>Custom i18n System</li>
                <li>Language Detection</li>
                <li>Font Switching</li>
              </ul>
            </div>
            <div>
              <strong>Styling</strong>
              <ul style={{ listStyle: "none", padding: "10px 0", fontSize: "14px" }}>
                <li>CSS Variables</li>
                <li>Responsive Grid</li>
                <li>Animations</li>
                <li>Dark Mode Ready</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "var(--indigo)", color: "white", borderRadius: "10px", textAlign: "center" }}>
          <h3 style={{ marginBottom: "15px" }}>🚀 Quick Navigation</h3>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/"
              className="btn"
              style={{
                display: "inline-block",
                backgroundColor: "var(--marigold)",
                color: "var(--ink)",
                padding: "10px 20px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              🏠 Home
            </a>
            <a
              href="/book/search"
              className="btn"
              style={{
                display: "inline-block",
                backgroundColor: "var(--sindoor)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              🎫 Book Trip
            </a>
            <a
              href="/admin"
              className="btn"
              style={{
                display: "inline-block",
                backgroundColor: "var(--peacock)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              ⚙️ Admin
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
