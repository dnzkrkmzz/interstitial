(function() {
  // === AYARLAR ===
  const showDelay = 2000; // Sayfa açıldıktan sonra kaç ms sonra gösterilecek (2000 = 2 sn)
  const cooldownMinutes = 1; // Aynı kullanıcıya tekrar gösterilmeden önce geçmesi gereken süre (dakika)
  const adLink = "https://report.korkmazdeniz.com/";
  const adImage = "https://dnzkrkmzz.github.io/interstitial/800x600.jpeg";

  // === COOKIE FONKSİYONLARI ===
  function setCookie(name, value, minutes) {
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000)); // dakika → ms
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, val] = cookie.trim().split('=');
      if (key === name) return val;
    }
    return null;
  }

  // === ANA FONKSİYON ===
  window.addEventListener('load', function() {
    const lastShown = getCookie('interstitial_shown');

    // Cookie varsa, reklam daha önce gösterilmiş → tekrar gösterme
    if (lastShown) return;

    // Reklam HTML yapısını oluştur
    const overlay = document.createElement('div');
    overlay.innerHTML = `
      <div id="interstitial-overlay" style="
        position:fixed;
        top:0; left:0;
        width:100%; height:100%;
        background:rgba(0,0,0,0.8);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:9999;
        visibility:hidden;
        opacity:0;
        transition:opacity 0.5s ease, visibility 0.5s ease;
      ">
        <div id="interstitial-ad" style="
          width:80%;
          max-width:800px;
          height:600px;
          background:#fff url('${adImage}') center/cover no-repeat;
          position:relative;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 0 20px rgba(0,0,0,0.4);
        ">
          <button id="closeAdBtn" style="
            position:absolute;
            top:10px; right:15px;
            background:rgba(0,0,0,0.6);
            color:#fff;
            border:none;
            border-radius:50%;
            width:30px; height:30px;
            cursor:pointer;
            font-size:18px;
          ">&times;</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const interstitial = document.getElementById('interstitial-overlay');
    const closeBtn = document.getElementById('closeAdBtn');

    // Sayfa yüklendikten belirli süre sonra göster
    setTimeout(() => {
      interstitial.style.visibility = 'visible';
      interstitial.style.opacity = '1';
      // Gösterildiğinde cookie oluştur
      setCookie('interstitial_shown', '1', cooldownMinutes);
    }, showDelay);

    // Kapatma butonu
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      interstitial.style.opacity = '0';
      interstitial.style.visibility = 'hidden';
    });

    // Reklama tıklanırsa kampanya sayfasına git
    interstitial.addEventListener('click', (e) => {
      if (!e.target.closest('#closeAdBtn')) {
        window.open(adLink, '_blank');
      }
    });
  });
})();
