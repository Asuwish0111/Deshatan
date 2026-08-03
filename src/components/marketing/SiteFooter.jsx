'use client';
import { useState } from 'react';

export default function SiteFooter() {
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [ok, setOk] = useState(false);
  const [done, setDone] = useState(false);

  const subscribe = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) { setNote('Enter a valid WhatsApp number.'); setOk(false); return; }
    setDone(true); setOk(true); setPhone('');
    setNote("You're on the list — first message lands within 24 hours.");
    setTimeout(() => { setDone(false); setOk(false); setNote(''); }, 4500);
  };

  return (
    <>
      <footer>

        <div className="foot-trust">
          <div className="wrap foot-trust-row">
            <div className="foot-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>
              <div><b data-i18n="footer.trust1H">2,600+ verified guides &amp; drivers</b><span data-i18n="footer.trust1P">Background-checked, review-scored</span></div>
            </div>
            <div className="foot-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></svg>
              <div><b data-i18n="footer.trust2H">Secure payments</b><span data-i18n="footer.trust2P">UPI, cards &amp; netbanking, escrow-held</span></div>
            </div>
            <div className="foot-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></svg>
              <div><b data-i18n="footer.trust3H">24×7 yatra support</b><span data-i18n="footer.trust3P">Real humans, on call across time zones</span></div>
            </div>
            <div className="foot-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h11M4 5c0 6 4 9 8 11M9 5c-1 6-3.5 9.5-7 11.5M14 20l3.5-8 3.5 8M15.3 17.5h4.4" /></svg>
              <div><b data-i18n="footer.trust4H">10 Indian languages</b><span data-i18n="footer.trust4P">Book in the language you think in</span></div>
            </div>
          </div>
        </div>

        <div className="wrap">

          <div className="foot-news">
            <div className="foot-news-copy">
              <h4 data-i18n="footer.newsH4">Get yatra ideas on WhatsApp</h4>
              <p data-i18n="footer.newsP">Offbeat picks, price drops and seasonal routes — no spam, unsubscribe any time.</p>
            </div>
            <div>
              <div className="foot-news-form">
          <input
            type="tel" inputMode="tel" placeholder="WhatsApp number" data-i18n-ph="footer.newsPh"
            aria-label="WhatsApp number" value={phone} disabled={done}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') subscribe(); }} />
          <button type="button" onClick={subscribe} data-i18n={done ? undefined : 'footer.newsBtn'}>
            {done ? 'Subscribed ✓' : 'Notify me'}
          </button>
        </div>
              <p className={'foot-news-note' + (ok ? ' ok' : '')} data-i18n={note ? undefined : "footer.newsNote"}>
          {note || "We'll message you, never sell your number."}
        </p>
            </div>
          </div>

          <div className="foot-grid">
            <div className="foot-brand">
              <span className="logo-name" style={{color:'var(--paper)'}}>Deshatan</span>
              <p data-i18n="footer.brandP">Journeys across all of Bharat, Nepal and Bhutan — with verified guides, trusted drivers, and your family watching over every kilometre.</p>
              <div className="foot-socials">
                <a href="#" aria-label="Instagram" onclick="return false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.2.06 2 .24 2.7.52.7.28 1.3.65 1.9 1.25.6.6.97 1.2 1.25 1.9.28.7.46 1.5.52 2.7.06 1.2.07 1.6.07 4.8s0 3.6-.07 4.8c-.06 1.2-.24 2-.52 2.7a5.1 5.1 0 0 1-1.25 1.9 5.1 5.1 0 0 1-1.9 1.25c-.7.28-1.5.46-2.7.52-1.2.06-1.6.07-4.8.07s-3.6 0-4.8-.07c-1.2-.06-2-.24-2.7-.52a5.1 5.1 0 0 1-1.9-1.25 5.1 5.1 0 0 1-1.25-1.9c-.28-.7-.46-1.5-.52-2.7C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.06-1.2.24-2 .52-2.7A5.1 5.1 0 0 1 4.04 2.6a5.1 5.1 0 0 1 1.9-1.25c.7-.28 1.5-.46 2.7-.52C9.8 2.2 10.2 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.98.04-1.51.2-1.86.34-.47.18-.8.4-1.15.75s-.57.68-.75 1.15c-.14.35-.3.88-.34 1.86-.06 1.24-.07 1.6-.07 4.76s.01 3.52.07 4.76c.04.98.2 1.51.34 1.86.18.47.4.8.75 1.15s.68.57 1.15.75c.35.14.88.3 1.86.34 1.24.06 1.6.07 4.76.07s3.52-.01 4.76-.07c.98-.04 1.51-.2 1.86-.34.47-.18.8-.4 1.15-.75s.57-.68.75-1.15c.14-.35.3-.88.34-1.86.06-1.24.07-1.6.07-4.76s-.01-3.52-.07-4.76c-.04-.98-.2-1.51-.34-1.86a3.3 3.3 0 0 0-.75-1.15 3.3 3.3 0 0 0-1.15-.75c-.35-.14-.88-.3-1.86-.34-1.24-.06-1.6-.07-4.76-.07zm0 4.1a5.9 5.9 0 1 1 0 11.8 5.9 5.9 0 0 1 0-11.8zm0 1.8a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2zm6.1-2a1.38 1.38 0 1 1-2.76 0 1.38 1.38 0 0 1 2.76 0z" /></svg></a>
                <a href="#" aria-label="YouTube" onclick="return false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2s-.2-1.5-.85-2.15c-.8-.85-1.7-.85-2.1-.9C15.9 4 12 4 12 4h0s-3.9 0-6.65.15c-.4.05-1.3.05-2.1.9C2.6 5.7 2.4 7.2 2.4 7.2S2.2 9 2.2 10.75v1.5C2.2 14 2.4 15.8 2.4 15.8s.2 1.5.85 2.15c.8.85 1.85.82 2.3.9C7.15 19 12 19 12 19s3.9 0 6.65-.15c.4-.05 1.3-.05 2.1-.9.65-.65.85-2.15.85-2.15s.2-1.8.2-3.55v-1.5c0-1.75-.2-3.55-.2-3.55zM9.95 14.3V8.7l5.4 2.8-5.4 2.8z" /></svg></a>
                <a href="#" aria-label="X / Twitter" onclick="return false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 10.6 20.3 3h-2l-5.8 6.6L7.8 3H2.9l7 10.2L2.9 21h2l6.1-7 5 7h4.9l-7.3-10.4zM11.4 13l-.7-1L5.1 4.5h2.2l4.5 6.4.7 1 5.9 8.4h-2.2L11.4 13z" /></svg></a>
                <a href="#" aria-label="WhatsApp channel" onclick="return false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.3-.1-.5-.15-.7.15-.2.3-.8.95-.95 1.15-.2.2-.35.2-.65.1-.3-.15-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.65-2.1-.2-.3 0-.45.15-.6.15-.15.3-.35.45-.5.15-.2.2-.3.3-.5.1-.2.05-.4 0-.55-.1-.15-.7-1.7-.95-2.3-.25-.6-.5-.5-.7-.5h-.6c-.2 0-.55.1-.85.4-.3.3-1.1 1.1-1.1 2.65s1.15 3.05 1.3 3.25c.15.2 2.25 3.45 5.45 4.85.75.3 1.35.5 1.8.65.75.25 1.45.2 2 .1.6-.1 1.7-.7 1.95-1.35.25-.65.25-1.2.15-1.35-.1-.15-.3-.2-.65-.35zM12 2.1c-5.5 0-9.9 4.4-9.9 9.9 0 1.75.45 3.4 1.3 4.9l-1.4 5.1 5.25-1.35c1.4.8 3 1.25 4.75 1.25 5.5 0 9.9-4.4 9.9-9.9s-4.4-9.9-9.9-9.9zm0 17.9c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.85-3-.2-.3a8 8 0 1 1 14.15-4.9c0 4.4-3.6 8-8 8z" /></svg></a>
              </div>
              <div className="foot-apps">
                <a href="#" onclick="return false">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 12.3c0-2.4 2-3.6 2.1-3.65-1.1-1.65-2.85-1.85-3.45-1.9-1.45-.15-2.85.85-3.6.85-.75 0-1.9-.85-3.15-.8-1.6.02-3.1.95-3.9 2.4-1.7 2.9-.45 7.2 1.2 9.55.8 1.15 1.75 2.45 3 2.4 1.2-.05 1.65-.77 3.1-.77s1.85.77 3.15.75c1.3-.02 2.1-1.17 2.9-2.35.6-.85.85-1.3 1.3-2.3-3.4-1.3-3.65-4.98-3.65-4.98zM14.1 4.55c.65-.8 1.1-1.9 1-3-.95.05-2.1.65-2.75 1.4-.6.7-1.15 1.85-1 2.9 1.05.1 2.1-.55 2.75-1.3z" /></svg>
                  <span className="app-txt"><small data-i18n="footer.appStoreSmall">Download on the</small><b>App Store</b></span>
                </a>
                <a href="#" onclick="return false">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 2.3c-.3.3-.5.75-.5 1.3v16.8c0 .55.2 1 .5 1.3l.1.1L13 12.3v-.2L3.7 2.2l-.1.1z" /><path d="M16.1 15.4l-3.1-3.1v-.2l3.1-3.1 3.65 2.1c1.05.6 1.05 1.6 0 2.2l-3.65 2.1z" /><path d="M13 12.1l3.1 3.1-9.5 5.4c-.35.2-.85.15-1.15-.1L13 12.1z" /><path d="M13 11.9 5.45 3.5c.3-.25.8-.3 1.15-.1l9.5 5.4-3.1 3.1z" /></svg>
                  <span className="app-txt"><small data-i18n="footer.playStoreSmall">Get it on</small><b>Google Play</b></span>
                </a>
              </div>
            </div>
            <div>
              <h4 data-i18n="footer.col1H4">Destinations</h4>
              <ul>
                <li><a href="#coverage" data-i18n="footer.col1Li1">All 28 states</a></li>
                <li><a href="#coverage" data-i18n="footer.col1Li2">8 union territories</a></li>
                <li><a href="#coverage" data-i18n="footer.col1Li3">Nepal &amp; Bhutan</a></li>
                <li><a href="#features" data-i18n="footer.col1Li4">Offbeat Bharat</a></li>
              </ul>
            </div>
            <div>
              <h4 data-i18n="footer.col2H4">Travel with trust</h4>
              <ul>
                <li><a href="#features" data-i18n="footer.col2Li1">Guide reviews</a></li>
                <li><a href="#features" data-i18n="footer.col2Li2">Driver reviews</a></li>
                <li><a href="#features" data-i18n="footer.col2Li3">Safety map (offline)</a></li>
                <li><a href="#groups" data-i18n="footer.col2Li4">Live yatra tracker</a></li>
              </ul>
            </div>
            <div>
              <h4 data-i18n="footer.col3H4">Plan &amp; save</h4>
              <ul>
                <li><a href="#calculator" data-i18n="footer.col3Li1">Dream calculator</a></li>
                <li><a href="#features" data-i18n="footer.col3Li2">Budget sorting</a></li>
                <li><a href="#groups" data-i18n="footer.col3Li3">Yatra point groups</a></li>
                <li><a href="#groups" data-i18n="footer.col3Li4">Custom hotel briefs</a></li>
              </ul>
            </div>
            <div>
              <h4 data-i18n="footer.col4H4">Company</h4>
              <ul>
                <li><a href="#" onclick="return false" data-i18n="footer.col4Li1">About us</a></li>
                <li><a href="#" onclick="return false" data-i18n="footer.col4Li2">Careers</a></li>
                <li><a href="#" onclick="return false" data-i18n="footer.col4Li3">Yatra journal (blog)</a></li>
                <li><a href="#" onclick="return false" data-i18n="footer.col4Li4">Contact &amp; help centre</a></li>
              </ul>
            </div>
          </div>

          <div className="foot-bottom">
            <span><svg className="paisley-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2C7 2 3 7 4 13c.6 3.8 3.6 6.5 7.2 7.4 1.6.4 2.8-1.2 1.8-2.6-1-1.4-2.6-1.6-3.8-2.8C7.5 13.4 7 11 8.4 9c1.6-2.3 4.6-2.6 6.8-1.2 2.8 1.8 3.4 5.6 1.4 8.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg><span data-i18n="footer.bottomText">© 2026 Deshatan · Made with pyaar in Bharat</span></span>
            <div className="foot-legal">
              <a href="#" onclick="return false" data-i18n="footer.legalPrivacy">Privacy policy</a>
              <a href="#" onclick="return false" data-i18n="footer.legalTerms">Terms of service</a>
              <a href="#" onclick="return false" data-i18n="footer.legalCancel">Cancellation policy</a>
              <a href="#/admin/login" data-i18n="footer.adminLogin">Operator / admin login</a>
            </div>
            <div className="foot-pay">
              <span data-i18n="footer.payLabel">We accept</span>
              <div className="foot-pay-icons"><span>UPI</span><span>VISA</span><span>MC</span><span>Netbank</span></div>
            </div>
            <span className="hindi" style={{color:'var(--marigold)'}}>Atithi Devo Bhava</span>
          </div>
        </div>
      </footer>
    </>
  );
}
