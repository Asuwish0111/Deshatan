// Ported from the original single-file prototype, markup unchanged.
export default function Showcase() {
  return (
    <>
      <section className="showcase" id="showcase">
        <div className="wrap">
          <div className="showcase-head reveal">
            <span className="eyebrow"><span className="hindi">Asli Tasveerein</span> <span data-i18n="showcase.eyebrow.gloss">Not illustrations — real places</span></span>
            <h2 data-i18n="showcase.h2">Every arch and frieze on this page is drawn. These aren't.</h2>
          </div>
          <div className="showcase-grid">
            <div className="showcase-card reveal">
              <div className="showcase-media">
                <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Leh%E2%80%93Manali_Highway,_Ladakh,_India_(2016).jpg?width=700" alt="Leh–Manali Highway, Ladakh" loading="lazy" />
                <span className="showcase-region">Himalayas</span>
              </div>
              <div className="showcase-body"><h3 data-i18n="showcase.c1.h3">Manali to Leh</h3>
                <p data-i18n="showcase.c1.p">High-altitude passes and a driver who knows every hairpin.</p></div>
            </div>
            <div className="showcase-card reveal">
              <div className="showcase-media">
                <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Kedarnath_temple_view.jpg?width=700" alt="Kedarnath temple, Char Dham" loading="lazy" />
                <span className="showcase-region">Himalayas</span>
              </div>
              <div className="showcase-body"><h3 data-i18n="showcase.c2.h3">Char Dham Yatra</h3>
                <p data-i18n="showcase.c2.p">Yamunotri to Badrinath — by road or helicopter.</p></div>
            </div>
            <div className="showcase-card reveal">
              <div className="showcase-media">
                <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Lake_Palace,_Udaipur.jpg?width=700" alt="Taj Lake Palace, Udaipur" loading="lazy" />
                <span className="showcase-region">Rajasthan</span>
              </div>
              <div className="showcase-body"><h3 data-i18n="showcase.c3.h3">Rajasthan Heritage Trail</h3>
                <p data-i18n="showcase.c3.p">Lake palaces, desert dunes, blue lanes of Jodhpur.</p></div>
            </div>
            <div className="showcase-card reveal">
              <div className="showcase-media">
                <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Allepy_Backwaters,_Kerala,_India.jpg?width=700" alt="Alleppey backwaters, Kerala" loading="lazy" />
                <span className="showcase-region">Deep South</span>
              </div>
              <div className="showcase-body"><h3 data-i18n="showcase.c4.h3">Kerala Backwaters</h3>
                <p data-i18n="showcase.c4.p">Houseboats in Alleppey, coffee mornings in Coorg.</p></div>
            </div>
            <div className="showcase-card reveal">
              <div className="showcase-media">
                <img src="https://commons.wikimedia.org/wiki/Special:FilePath/The_National_Memorial_Choeten,_Thimphu,_Bhutan.JPG?width=700" alt="National Memorial Chorten, Thimphu, Bhutan" loading="lazy" />
                <span className="showcase-region">Nepal &amp; Bhutan</span>
              </div>
              <div className="showcase-body"><h3 data-i18n="showcase.c5.h3">Nepal &amp; Bhutan Crossing</h3>
                <p data-i18n="showcase.c5.p">Kathmandu, Pokhara, Thimphu, Paro — one continuous trip.</p></div>
            </div>
            <div className="showcase-card reveal">
              <div className="showcase-media">
                <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Siikhe_lake_in_Ziro,_Arunachal_Pradesh.jpg?width=700" alt="Siikhe lake, Ziro, Arunachal Pradesh" loading="lazy" />
                <span className="showcase-region">Seven Sisters</span>
              </div>
              <div className="showcase-body"><h3 data-i18n="showcase.c6.h3">Offbeat Northeast</h3>
                <p data-i18n="showcase.c6.p">Ziro's pine valleys, Majuli's river island.</p></div>
            </div>
            <div className="showcase-card reveal">
              <div className="showcase-media">
                <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Radhanagar_beach,_Havelock_islands,_Andaman_and_Nicobar.JPG?width=700" alt="Radhanagar beach, Havelock, Andaman" loading="lazy" />
                <span className="showcase-region">Coasts &amp; Islands</span>
              </div>
              <div className="showcase-body"><h3 data-i18n="showcase.c7.h3">Andaman Islands</h3>
                <p data-i18n="showcase.c7.p">Reefs, quiet beaches, island-hopping ferries.</p></div>
            </div>
            <div className="showcase-card reveal">
              <div className="showcase-media">
                <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Kee_monastery_Spiti_Valley_(edited).jpg?width=700" alt="Key monastery, Spiti Valley" loading="lazy" />
                <span className="showcase-region">Himalayas</span>
              </div>
              <div className="showcase-body"><h3 data-i18n="showcase.c8.h3">Spiti Valley Circuit</h3>
                <p data-i18n="showcase.c8.p">Cold-desert monasteries under some of Bharat's bluest skies.</p></div>
            </div>
          </div>
          <p className="showcase-credit" data-i18n="showcase.credit">Photos via Wikimedia Commons contributors.</p>
        </div>
      </section>    </>
  );
}
