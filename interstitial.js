(function() {
  // Sayfa tamamen yüklendiğinde başlat
  window.addEventListener('load', function() {

    // HTML yapısını oluştur
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
          background:#fff url('https://via.placeholder.com/800x600?text=Interstitial+Ad') center/cover no-repeat;
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

    // Sayfa yüklendikten 2 saniye sonra göster
    setTimeout(() => {
      interstitial.style.visibility = 'visible';
      interstitial.style.opacity = '1';
    }, 2000);

    // Kapatma butonu
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      interstitial.style.opacity = '0';
      interstitial.style.visibility = 'hidden';
    });

    // Reklama tıklanırsa kampanya sayfasına git
    interstitial.addEventListener('click', (e) => {
      if (!e.target.closest('#closeAdBtn')) {
        window.open('https://report.korkmazdeniz.com', '_blank');
      }
    });

  });
})();