export default function AdminSettings() {
  return (
    <>
      <h1>Settings</h1>
      <div className="sub">Configuration lives in environment variables, so it is the same in development and production.</div>

      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Variable</th><th>What it controls</th><th>Set?</th></tr></thead>
          <tbody>
            <tr><td>DATABASE_URL</td><td>Postgres connection. Empty means file mode (.data/db.json).</td><td>{process.env.DATABASE_URL ? 'yes' : 'no — file mode'}</td></tr>
            <tr><td>ADMIN_EMAIL / ADMIN_PASSWORD</td><td>Who can sign into this panel.</td><td>{process.env.ADMIN_EMAIL ? 'yes' : 'using defaults'}</td></tr>
            <tr><td>SESSION_SECRET</td><td>Signs the admin session cookie.</td><td>{process.env.SESSION_SECRET ? 'yes' : 'using dev default'}</td></tr>
            <tr><td>RAZORPAY_KEY_ID / SECRET</td><td>Live payments. Empty means test mode, no money moves.</td><td>{process.env.RAZORPAY_KEY_ID ? 'yes — live' : 'no — test mode'}</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
