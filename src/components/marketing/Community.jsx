// Ported from the original single-file prototype, markup unchanged.
export default function Community() {
  return (
    <>
      <section className="community">
        <div className="wrap comm-grid">
          <div className="reveal">
            <span className="eyebrow"><span className="hindi" data-i18n="community.eyebrow.word">Yatri Biradari</span> <span data-i18n="community.eyebrow.gloss">The yatri circle</span></span>
            <h2 data-i18n="community.h2">Travel together, earn together.</h2>
            <p data-i18n="community.p1">Join a point group with your friends and family. Every booking anyone makes adds to the shared pool — redeem it together on the next trip. Dadi's Char Dham funds your Spiti ride. That's the circle.</p>
            <p style={{marginTop:'14px'}} data-i18n="community.p2">And when you're back, your reviews of guides, drivers and stays keep the next yatri safe. Follow the journeys, share yours.</p>
            <div className="socials">
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.4 1.4 0 1 0 0-2.9 1.4 1.4 0 0 0 0 2.9z" /></svg></a>
              <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" /></svg></a>
              <a href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.2l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L7.6 3.9H5.7L17.8 20z" /></svg></a>
              <a href="#" aria-label="WhatsApp community"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.5 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2 .9c.3.2.5.3.5.4.1.1.1.7-.2 1.2z" /></svg></a>
            </div>
          </div>
          <div className="points-card reveal">
            <h3><span data-i18n="community.pointsH3">✦ Yatra Points — the family pool</span></h3>
            <div className="points-row"><span data-i18n="community.row1">Papa books Char Dham</span><b>+4,200 pts</b></div>
            <div className="points-row"><span data-i18n="community.row2">You review your Ziro guide</span><b>+150 pts</b></div>
            <div className="points-row"><span data-i18n="community.row3">Cousin's Pondy weekend</span><b>+900 pts</b></div>
            <div className="points-row"><span data-i18n="community.row4">Group pool balance</span><b>18,750 pts</b></div>
            <div className="points-row"><span data-i18n="community.row5">Redeemable on next booking</span><b>₹1,875 off</b></div>
          </div>
        </div>
      </section>    </>
  );
}
