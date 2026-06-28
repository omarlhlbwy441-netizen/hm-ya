// hm-ya Global Ad Network
document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/treasury')
        .then(res => res.json())
        .then(data => {
            if(data.ads_enabled) {
                const adBanner = document.createElement('div');
                adBanner.innerHTML = `
                    <div style="position:fixed; bottom:20px; left:20px; right:20px; background:linear-gradient(90deg, #0f2027, #203a43, #2c5364); border: 2px solid #00ffff; border-radius: 12px; padding: 20px; box-shadow: 0 0 20px rgba(0, 255, 255, 0.4); z-index: 9999; display:flex; justify-content:space-between; align-items:center;">
                        <div style="color: #fff;">
                            <h3 style="margin:0; color:#00ffff; text-transform:uppercase;">🌟 فرصة استثمارية ذهبية 🌟</h3>
                            <p style="margin:5px 0 0 0;">استثمر الآن في منظومة hm-ya، مستقبل الذكاء الاصطناعي والتواصل اللامركزي.</p>
                        </div>
                        <button onclick="window.location.href='/investor_pitch.html'" style="background:#00ffff; color:#000; padding:10px 20px; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">التفاصيل</button>
                        <span onclick="this.parentElement.style.display='none'" style="color:#fff; cursor:pointer; font-size:24px; margin-left:15px;">&times;</span>
                    </div>
                `;
                document.body.appendChild(adBanner);
            }
        });
});
