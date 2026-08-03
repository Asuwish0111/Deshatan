// Ported from the original single-file prototype, markup unchanged.
export default function Groups() {
  return (
    <>
      <section className="groups" id="groups">
        <div className="wrap">
          <div className="groups-head reveal">
            <span className="eyebrow"><span className="hindi" data-i18n="groups.eyebrow.word">Aapki Yatra</span> <span data-i18n="groups.eyebrow.gloss">Your kind of yatra</span></span>
            <h2 data-i18n="groups.h2">Every age travels differently. So does every itinerary here.</h2>
          </div>
          <div className="group-grid">
      
            <div className="jharokha reveal">
              <div className="arch-img">
                <svg viewBox="0 0 300 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="300" height="210" fill="#A14834" />
                  <circle cx="150" cy="70" r="46" fill="#CF9E46" />
                  <path d="M0 150 Q75 110 150 150 T300 150 V210 H0 Z" fill="#2B355D" />
                  <path d="M118 210 V160 H182 V210 Z" fill="#26190E" />
                  <path d="M126 160 Q150 118 174 160 Z" fill="#26190E" />
                  <g stroke="#F6EDD9" strokeWidth="2.5" fill="none" strokeLinecap="round">
                    <path d="M60 52 q8 -10 16 0 q8 -10 16 0" />
                  </g>
                </svg>
              </div>
              <div className="body">
                <h3 data-i18n="groups.g1.h3">For couples</h3>
                <div className="sub" data-i18n="groups.g1.sub">Do log, ek raasta</div>
                <p data-i18n="groups.g1.p">Udaipur lake palaces, Coorg coffee mornings, houseboat nights in Alleppey. Private drivers, candlelit havelis, zero group tours.</p>
                <ul data-i18n="groups.g1.list">
                  <li>Honeymoon &amp; anniversary circuits</li>
                  <li>Couple-rated stays only</li>
                  <li>Photographer add-on in 22 cities</li>
                </ul>
              </div>
            </div>
      
            <div className="jharokha reveal">
              <div className="arch-img">
                <svg viewBox="0 0 300 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="300" height="210" fill="#23695B" />
                  <path d="M-10 210 L90 60 L170 180 L230 90 L320 210 Z" fill="#2B355D" />
                  <path d="M60 105 L90 60 L120 105 Z" fill="#F6EDD9" />
                  <path d="M205 128 L230 90 L255 128 Z" fill="#F6EDD9" />
                  <circle cx="248" cy="44" r="26" fill="#CF9E46" />
                  <path d="M30 190 q30 -14 60 0 q30 -14 60 0" stroke="#CF9E46" strokeWidth="4" fill="none" strokeDasharray="8 8" />
                </svg>
              </div>
              <div className="body">
                <h3 data-i18n="groups.g2.h3">For the young &amp; restless</h3>
                <div className="sub" data-i18n="groups.g2.sub">Trek, track, repeat</div>
                <p data-i18n="groups.g2.p">Kedarkantha summits, Spiti bike circuits, Rishikesh rapids. Graded treks with certified leads and your live track shared home automatically.</p>
                <ul data-i18n="groups.g2.list">
                  <li>60+ graded treks, all seasons</li>
                  <li>Hostel &amp; camp bookings sorted by ₹</li>
                  <li>Group point-pools for squad trips</li>
                </ul>
              </div>
            </div>
      
            <div className="jharokha reveal">
              <div className="arch-img">
                <svg viewBox="0 0 300 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="300" height="210" fill="#2B355D" />
                  <circle cx="150" cy="84" r="40" fill="#F6EDD9" />
                  <path d="M104 210 V140 H196 V210 Z" fill="#A14834" />
                  <path d="M104 140 Q150 96 196 140 Z" fill="#A14834" />
                  <path d="M96 210 V150 h8 M196 210 v-60 h8" stroke="#CF9E46" strokeWidth="5" />
                  <rect x="134" y="164" width="32" height="46" fill="#CF9E46" />
                  <path d="M0 210 h300" stroke="#CF9E46" strokeWidth="6" />
                </svg>
              </div>
              <div className="body">
                <h3 data-i18n="groups.g3.h3">For silver yatris</h3>
                <div className="sub" data-i18n="groups.g3.sub">Aaram se, poore shaan se</div>
                <p data-i18n="groups.g3.p">Char Dham by helicopter or by road — your pace, your choice. Doctors on call, lift-access stays, drivers rated for gentle highway driving.</p>
                <ul data-i18n="groups.g3.list">
                  <li>Senior-paced itineraries, longer halts</li>
                  <li>Medical support in every package</li>
                  <li>Family gets live tracking by default</li>
                </ul>
              </div>
            </div>
      
          </div>
        </div>
      </section>    </>
  );
}
