/* Kiểm tra Website-AmSacViet/HomePage.html bằng Chrome thật qua file://, tắt mạng.
   Chạy: node scripts/check-browser.cjs   (thêm "edge" để dùng Edge) */
const { browser } = require('./cdp-browser.cjs');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const exe = process.argv[2] === 'edge' ? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' : undefined;
const url = pathToFileURL(path.resolve('Website-AmSacViet/HomePage.html')).href;
const shots = path.resolve('docs/screenshots');

(async () => {
  const b = await browser(exe);
  let n = 0;
  const ok = (name, v) => { assert.ok(v, name); n++; console.log('PASS ' + name); };
  const js = (s) => b.evaluate(s);
  const key = async (k, code, vk) => {
    // Enter cần kèm ký tự "\r" thì trình duyệt mới coi là bấm nút
    const extra = k === 'Enter' ? { text: String.fromCharCode(13), unmodifiedText: String.fromCharCode(13) } : {};
    await b.send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: vk, ...extra });
    await b.send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk });
  };
  // Mở trang như lần đầu trong phiên (có màn hình chào)
  const fresh = async () => {
    await b.goto(url);
    await js('sessionStorage.clear()');
    await b.goto(url);
    await b.wait('!!document.querySelector(".site-nav") && document.querySelector("#todayName").textContent.length > 1');
  };
  // Mở trang, bỏ qua màn hình chào
  const skip = async () => {
    await b.goto(url);
    await js('sessionStorage.setItem("asv-welcomed","1")');
    await b.goto(url);
    await b.wait('!!document.querySelector(".site-nav") && document.querySelector("#todayName").textContent.length > 1 && !document.getElementById("welcome")');
  };
  try {
    {
      const core = require('node:fs').readFileSync(path.resolve('Website-AmSacViet/app.js'), 'utf8');
      const src = core.slice(core.indexOf('PHẦN 1:'), core.indexOf('PHẦN 2:')); // chỉ phần bản dịch
      const part = (a, b2) => src.slice(src.indexOf(a), b2 ? src.indexOf(b2) : undefined);
      const dup = [part('vi: {', '  en: {'), part('  en: {', '\n};')].map((t) => { const k = [...t.matchAll(/^\s+"([^"]+)":/gm)].map((m) => m[1]); return k.filter((x, i) => k.indexOf(x) !== i); });
      ok('i18n: không có khóa dịch nào bị trùng (VI và EN)', dup[0].length === 0 && dup[1].length === 0);
    }
    await b.send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 });
    await b.size(1280, 900);
    await b.goto(url);
    await js('localStorage.clear(); localStorage.setItem("asv-lang","vi")');

    /* --- Màn hình chào --- */
    await fresh();
    await js('document.fonts.ready');
    ok('Lần đầu vào: hiện màn hình chào phủ kín, có logo, tên và nút', await js('(()=>{const w=document.getElementById("welcome");const r=w.getBoundingClientRect();return r.width===innerWidth&&r.height===innerHeight&&!!w.querySelector(".mt-logo")&&w.textContent.includes("Âm Sắc Việt")&&!!document.getElementById("welcomeEnter")})()'));
    ok('Màn hình chào: phần trang phía sau bị khóa (inert) và nút được focus', await js('document.getElementById("main").inert===true && document.activeElement.id==="welcomeEnter"'));
    await b.screenshot(path.join(shots, 'welcome-1280-vi.png'));
    await b.click('#welcomeEnter');
    await b.wait('!document.getElementById("welcome")', 4000);
    ok('Bấm "Vào thăm ngay" → vào trang chủ, mở khóa phần sau', await js('document.getElementById("main").inert===false && !document.body.classList.contains("welcome-open")'));

    await fresh();
    await b.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 640, y: 450, deltaX: 0, deltaY: 120 });
    await b.wait('!document.getElementById("welcome")', 4000);
    ok('Lăn chuột ở màn hình chào → vào trang chủ', true);

    await fresh();
    await key('ArrowDown', 'ArrowDown', 40);
    await b.wait('!document.getElementById("welcome")', 4000);
    ok('Phím mũi tên xuống ở màn hình chào → vào trang chủ', true);

    await b.goto(url);
    await b.wait('!!document.querySelector(".site-nav")');
    ok('Cùng phiên, quay lại trang chủ → không hiện lại màn hình chào', await js('!document.getElementById("welcome")'));

    /* --- Trang chủ --- */
    ok('Navbar có 5 mục (thêm Thuật ngữ, không có Quiz), Trang chủ đang được đánh dấu', await js('document.querySelectorAll(".site-nav .nav-link").length===5 && !!document.querySelector(".site-nav a[href=\\"glossary.html\\"]") && !document.querySelector("a[href*=\\"quiz\\"]") && document.querySelector(".nav-link.active").getAttribute("aria-current")==="page"'));
    ok('Trang chủ: nút phụ dẫn tới đàn bầu ảo; không còn dải mời lặp lại và thẻ Xem tiếp', await js('document.querySelectorAll("a[href=\\"instruments.html#dan-bau-ao\\"]").length===1 && !document.querySelector(".cta-band, .next-card")'));
    ok('Logo là con dấu đàn bầu, không còn họa tiết trống đồng', await js('!!document.querySelector(".brand .mt-logo") && !document.querySelector("[class*=ds-]")'));
    ok('Footer được vẽ', await js('!!document.querySelector(".site-footer")'));
    ok('Bootstrap JS đã nạp', await js('!!window.bootstrap'));
    ok('Font Alegreya và Be Vietnam Pro đã nạp', await js('document.fonts.check("700 20px Alegreya") && document.fonts.check("400 16px \\"Be Vietnam Pro\\"")'));
    ok('Chưa có âm thanh trước khi bấm', await js('ASV.Player.current===null && document.getElementById("asvPlayer").hidden'));
    await b.delay(300);
    ok('Hình vẽ nhạc cụ ở "Nghe thử một nhạc cụ" tải được và có alt', await js('(()=>{const i=document.querySelector("#todayMedia img");return !!i&&i.complete&&i.naturalWidth>0&&i.alt.includes(document.getElementById("todayName").textContent)})()'));
    ok('Đủ 12 hình nhạc cụ tải được', await js('Promise.all(ASV_DATA.instruments.map(it=>new Promise(r=>{const im=new Image();im.onload=()=>r(true);im.onerror=()=>r(false);im.src=it.image}))).then(a=>a.every(Boolean))'));
    ok('Thiếu file ảnh → vẫn hiện ô giữ chỗ có tên (không lỗi)', await js('new Promise(r=>{const m=ASV.createMedia({src:"images/khong-co.jpg",name:"Thử",kind:"instrument"});document.body.appendChild(m);setTimeout(()=>{r(!!m.querySelector(".media-ph"));m.remove()},300)})'));
    ok('3 tranh ở hero tải được và có alt', await js('[...document.querySelectorAll(".screen-panel img")].filter(i=>i.complete&&i.naturalWidth>0&&i.alt.length>20).length===3'));
    ok('Vào trang là thấy ngay nút "Bắt đầu khám phá" (không phải cuộn)', await js('document.querySelector(".hero-text .btn-son").getBoundingClientRect().bottom < innerHeight'));
    ok('Bảng tên 3 tranh là link sang đúng loại hình', await js('[...document.querySelectorAll(".screen-cap")].map(a=>a.getAttribute("href")).join("|")==="genres.html#quan-ho|genres.html#nha-nhac|genres.html#tai-tu"'));
    // Mở bằng file:// → bấm tranh mở bản ghi UNESCO trên YouTube ở tab mới (giả lập window.open để kiểm tra)
    await js('window.__opened=null; window.open=function(u){ window.__opened=u; }');
    await b.click('.screen-panel[data-genre="nha-nhac"] .screen-play');
    ok('Bấm vào tranh Trung Bộ → mở bản ghi nhã nhạc thật của UNESCO (không phát âm giả)', await js('String(window.__opened).includes("G5X7KUtbEkk") && ASV.Player.current===null'));
    ok('Nhãn tranh báo rõ là xem biểu diễn nhã nhạc và mở tab mới', await js('document.querySelector(".screen-panel[data-genre=nha-nhac] .screen-play").getAttribute("aria-label").includes("Nhã nhạc") && document.querySelector(".screen-panel[data-genre=nha-nhac] .screen-play").getAttribute("aria-label").includes("tab mới")'));
    ok('Loại hình không còn âm tổng hợp: không có nút "genre:", không còn preset giọng hát giả', await js('!document.querySelector("[data-play^=\\"genre:\\"]") && !ASV.Synth.presets.some(p=>p.indexOf("voice")===0) && !Object.keys(ASV.playables).some(k=>k.indexOf("genre:")===0)'));
    await js('scrollTo({top:2500,behavior:"instant"})');
    await b.delay(150);
    ok('Cuộn xuống giữa trang: thanh menu vẫn dính trên đầu', await js('Math.abs(document.querySelector(".site-header").getBoundingClientRect().top)<1'));
    await js('scrollTo({top:0,behavior:"instant"})');
    ok('Bản VI: bảng tên tranh ghi "Bắc Bộ / Trung Bộ / Nam Bộ"', await js('[...document.querySelectorAll(".screen-region")].map(e=>e.textContent).join("|")==="Bắc Bộ|Trung Bộ|Nam Bộ"'));
    /* --- Hoa văn nền trang chủ --- */
    ok('Nền: có vòng trống đồng, 6 hạc, dải sen, đủ hai lớp xa/gần; không còn chữ "hò xự xang xê cống"', await js('!!document.querySelector("#bgFar .bg-drum") && document.querySelectorAll(".hero-bg .bg-hac").length===6 && !!document.querySelector("#bgNear .bg-sen") && !document.body.innerText.includes("xang xê")'));
    ok('Nền trải xuống cả phần dưới: hoa văn ở 3 phần bên dưới và dải sen trước footer', await js('document.querySelectorAll(".has-deco .sec-deco img").length===7 && getComputedStyle(document.querySelector(".explore-next")).backgroundImage.includes("dai-sen")'));
    ok('Hoa văn rỗng trong (file SVG không còn hình tô đặc)', ['vong-trong-dong', 'hac', 'dai-sen'].every((n) => !require('node:fs').readFileSync(path.resolve('Website-AmSacViet/assets/motif-' + n + '.svg'), 'utf8').includes('fill="currentColor"')));
    ok('Nền: không còn hoa văn lặp đều, không còn ký hiệu ♪', await js('!document.body.classList.contains("page-motif") && !document.body.innerText.includes("♪")'));
    ok('Nền: hình nền đều tải được', await js('[...document.querySelectorAll(".hero-bg img")].every(i=>i.complete&&i.naturalWidth>0)'));
    ok('Nền: mặt nạ khoét lỗ đúng chỗ khối chữ (tâm lỗ trùng tâm tiêu đề, sai lệch < 40px)', await js('(()=>{const bg=document.getElementById("heroBg"),b=bg.getBoundingClientRect(),t=document.querySelector(".hero-text").getBoundingClientRect();const x=parseFloat(getComputedStyle(bg).getPropertyValue("--t-x"));return getComputedStyle(bg).maskImage.includes("radial-gradient")&&Math.abs(x-(t.left+t.width/2-b.left))<40})()'));
    ok('Nền: chỉ một chuyển động nền (vòng trống xoay, chu kỳ ≥ 40 giây)', await js('(()=>{const a=[...document.querySelectorAll(".hero-bg *")].map(e=>getComputedStyle(e)).filter(c=>c.animationName!=="none"&&c.animationDuration!=="0s");return a.length===1&&parseFloat(a[0].animationDuration)>=40})()'));
    await b.screenshot(path.join(shots, 'home-1280-vi.png'));

    /* --- Đàn bầu ở hero --- */
    // Bấm vào dây ở điểm 1/3 tính từ trục lên dây → bồi âm thứ 3
    const at = await js('(()=>{const svg=document.querySelector("#heroBau svg");const G=ASV.Motif.BAU;const u=1-1/3;const p=svg.createSVGPoint();p.x=G.sx+(G.px-G.sx)*u;p.y=G.sy+(G.py-G.sy)*u;const q=p.matrixTransform(svg.getScreenCTM());return{x:q.x,y:q.y}})()');
    ok('Dây đàn nằm trên cùng (bấm được)', await js('document.elementFromPoint(' + at.x + ',' + at.y + ').closest("#heroBau")!==null'));
    await b.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: at.x, y: at.y, button: 'left', clickCount: 1 });
    await b.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: at.x, y: at.y, button: 'left', clickCount: 1 });
    await b.wait('ASV.Player.current && ASV.Player.current.source==="synth"');
    ok('Bấm dây ở điểm 1/3 → phát bồi âm thứ 3 (≈392 Hz)', await js('ASV.Player.current.item.params.freq.toFixed(0)==="392" && document.getElementById("bauStatus").textContent.includes("3")'));
    await b.delay(120);
    ok('Dây đàn rung (đường dây đổi hình)', await js('document.querySelector(".bau-string").getAttribute("d").length>40'));
    ok('Chạm dây đàn → gợn sóng nhạt lan qua nền (một lần, không lặp)', await js('(()=>{const r=document.getElementById("bgRipple"),c=getComputedStyle(r);return r.classList.contains("is-on")&&c.animationIterationCount==="1"})()'));
    const shift = 'JSON.stringify([new DOMMatrix(getComputedStyle(document.getElementById("bgFar")).transform).m42,new DOMMatrix(getComputedStyle(document.getElementById("bgNear")).transform).m42])';
    await js('scrollTo({top:200,behavior:"instant"})');
    await b.delay(150);
    const [f1, n1] = JSON.parse(await js(shift));
    await js('scrollTo({top:3000,behavior:"instant"})');
    await b.delay(150);
    const [f2, n2] = JSON.parse(await js(shift));
    ok('Parallax: cuộn trang → lớp gần trôi nhanh hơn lớp xa, không quá 30px', f1 > 0 && n1 > f1 && f2 <= 30 && n2 <= 30);
    await js('scrollTo({top:0,behavior:"instant"})');
    ok('Thanh trình phát hiện với nút Dừng', await js('!document.getElementById("asvPlayer").hidden'));
    await b.screenshot(path.join(shots, 'home-1280-bau-playing.png'));
    await b.click('.player-stop');
    ok('Nút Dừng tắt âm thanh và ẩn thanh phát', await js('ASV.Player.current===null && document.getElementById("asvPlayer").hidden'));
    await js('document.getElementById("heroBau").focus()');
    await key('Enter', 'Enter', 13);
    await b.wait('ASV.Player.current!==null');
    ok('Dùng bàn phím (Enter) cũng gảy được đàn; lần đầu là âm thực (dây buông, ≈131 Hz)', await js('ASV.Player.current.item.params.freq.toFixed(0)==="131" && document.getElementById("bauStatus").textContent.includes("Âm thực")'));
    await key('Escape', 'Escape', 27);
    ok('Phím Esc dừng âm thanh', await js('ASV.Player.current===null'));
    // Chạm vào đoạn dây gần cần đàn → âm thực
    const nearRod = await js('(()=>{const svg=document.querySelector("#heroBau svg");const G=ASV.Motif.BAU;const u=0.12;const p=svg.createSVGPoint();p.x=G.sx+(G.px-G.sx)*u;p.y=G.sy+(G.py-G.sy)*u;const q=p.matrixTransform(svg.getScreenCTM());return{x:q.x,y:q.y}})()');
    await b.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: nearRod.x, y: nearRod.y, button: 'left', clickCount: 1 });
    await b.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: nearRod.x, y: nearRod.y, button: 'left', clickCount: 1 });
    await b.wait('ASV.Player.current!==null');
    ok('Chạm dây gần cần đàn → âm thực (dây buông)', await js('ASV.Player.current.item.params.freq.toFixed(0)==="131"'));
    await key('Escape', 'Escape', 27);

    /* --- Video UNESCO --- */
    ok('Có 3 thẻ video với link YouTube của UNESCO (mở tab mới)', await js('[...document.querySelectorAll(".video-card a[href*=\\"youtube.com/watch\\"]")].filter(a=>a.target==="_blank"&&a.rel.includes("noopener")).length>=3'));
    ok('Mở bằng file:// → không có nút "Xem tại đây", chỉ còn link YouTube; đã bỏ dòng ghi chú dài', await js('!document.querySelector("button[data-video-play]") && !document.getElementById("videoFileNote")'));
    ok('Trang chủ: đã bỏ các dòng chú thích nhỏ lặp ý (gợi ý bấm tên ảnh, "Xem…" dưới thẻ, gợi ý lăn chuột)', await js('!document.querySelector(".screen-hint, .path-more, .welcome-hint")'));
    ok('Có ghi nguồn UNESCO trên mỗi thẻ', await js('[...document.querySelectorAll(".video-credit")].every(p=>p.textContent.includes("UNESCO")&&p.querySelector("a[href*=\\"ich.unesco.org\\"]"))'));
    ok('Thẻ video không còn nút Nghe âm giả', await js('!document.querySelector(".video-card [data-play]")'));

    /* --- Nghe thử một nhạc cụ --- */
    await js('document.getElementById("todayCard").scrollIntoView({behavior:"instant",block:"center"})');
    await b.click('#todayListen [data-play]');
    await b.wait('ASV.Player.current && ASV.Player.current.status==="playing"');
    ok('Nút Nghe đổi thành Dừng khi đang phát', await js('document.querySelector("#todayListen .btn-play-label").textContent==="Dừng"'));
    await key('Escape', 'Escape', 27);
    const before = await js('document.getElementById("todayName").textContent');
    await b.click('#todayAnother');
    ok('"Chọn nhạc cụ khác" đổi sang nhạc cụ khác', (await js('document.getElementById("todayName").textContent')) !== before);

    await js('document.querySelector(".card-link[href=\\"history.html\\"]").scrollIntoView({behavior:"instant",block:"center"})');
    await b.click('.card-link[href="history.html"]');
    await b.wait('location.href.endsWith("history.html") && window.ASV && !!document.querySelector(".site-nav")');
    ok('Trang chủ → Lịch sử: trang đã làm xong nên chuyển trang thật, mọi trang trong menu đều ready', await js('ASV.PAGES.every(p=>p.ready)'));
    await skip();

    /* --- Song ngữ --- */
    await js('scrollTo({top:0,behavior:"instant"})');
    await b.click('.site-nav .lang-btn[data-lang="en"]');
    ok('EN: đổi lang, tiêu đề, aria-label', await js('document.documentElement.lang==="en" && document.title.includes("Traditional music of Vietnam") && document.getElementById("heroBau").getAttribute("aria-label").startsWith("A dan bau") && document.querySelector(".lang-btn[data-lang=en]").getAttribute("aria-pressed")==="true"'));
    ok('EN: không còn dấu tiếng Việt, kể cả tên site "Am Sac Viet"', await js('(()=>{const txt=document.body.innerText;return !/[à-ỹÀ-ỸđĐăĂâÂêÊôÔơƠưƯ]/.test(txt) && document.querySelector(".brand-name").textContent==="Am Sac Viet"})()'));
    ok('EN: vùng miền dịch sang tiếng Anh, không dùng tên dịch "Perfume River"', await js('document.body.innerText.includes("Northern Vietnam") && !document.documentElement.outerHTML.includes("Perfume")'));
    ok('EN: nội dung data.js và thẻ video cũng đổi', await js('/String|Wind|Percussion/.test(document.getElementById("todayFamily").textContent) && document.querySelector(".video-card .video-actions").textContent.includes("Open on YouTube")'));
    await fresh();
    ok('Màn hình chào cũng theo tiếng Anh (localStorage)', await js('document.getElementById("welcomeEnter").textContent.includes("Visit now")'));
    await b.screenshot(path.join(shots, 'welcome-1280-en.png'));

    for (const [w, h] of [[360, 740], [768, 1024], [1440, 900]]) {
      await b.size(w, h);
      await fresh();
      ok(w + 'px: màn hình chào vừa khung, nút nằm trong màn hình', await js('(()=>{const r=document.getElementById("welcomeEnter").getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight})()'));
      await b.screenshot(path.join(shots, 'welcome-' + w + '-en.png'));
      await skip();
      await b.delay(200);
      ok(w + 'px: không bị cuộn ngang', await js('document.documentElement.scrollWidth<=innerWidth'));
      await b.screenshot(path.join(shots, 'home-' + w + '-en.png'));
    }
    await js('I18n.set("vi")');
    await b.size(360, 740);
    await skip();
    await b.click('.navbar-toggler');
    await b.delay(450);
    ok('360px: nút menu mở danh sách điều hướng', await js('document.getElementById("asvNav").classList.contains("show")'));
    await b.screenshot(path.join(shots, 'home-360-menu.png'));

    /* ================= TRANG LOẠI HÌNH (genres.html) ================= */
    const gurl = pathToFileURL(path.resolve('Website-AmSacViet/genres.html')).href;
    await b.size(1280, 900);
    await js('I18n.set("vi")');
    await b.goto(gurl);
    await b.wait('document.querySelectorAll(".map-marker").length===16 && !!document.getElementById("genreName")');
    ok('Loại hình: menu gạch chân "Loại hình"; link từ trang chủ không còn báo "sẽ có"', await js('document.querySelector(".nav-link.active").getAttribute("href")==="genres.html" && ASV.PAGES.filter(p=>p.id==="genres")[0].ready===true'));
    ok('Loại hình: bản đồ có 16 nút đánh dấu (10 UNESCO chấm đặc, 6 loại hình khác chấm rỗng), có Hoàng Sa và Trường Sa', await js('document.querySelectorAll(".map-marker").length===16 && document.querySelector(".map-svg").textContent.includes("Hoàng Sa") && document.querySelector(".map-svg").textContent.includes("Trường Sa") && document.querySelectorAll(".map-marker.is-other").length===6'));
    ok('Loại hình: mở trang → chọn sẵn quan họ, nút đang chọn được tô sáng', await js('document.getElementById("genreName").textContent.includes("quan họ") && document.querySelector(".map-marker.is-active").dataset.genre==="quan-ho" && document.querySelector(".map-marker.is-active").getAttribute("aria-pressed")==="true"'));
    await b.click('.map-marker[data-genre="nha-nhac"]');
    ok('Loại hình: bấm điểm Nhã nhạc → khung đổi tên, ảnh thật, năm UNESCO 2003', await js('document.getElementById("genreName").textContent.includes("Nhã nhạc") && document.querySelector("#genrePanel .badge-unesco").textContent.includes("2003") && document.querySelector("#genrePanel img").src.includes("nha-nhac.jpg")'));
    ok('Loại hình: ảnh thật có chú thích và dòng nguồn (tác giả, giấy phép, link Wikimedia Commons)', await js('(()=>{const c=document.querySelector("#genrePanel figcaption");return !!c && c.textContent.includes("Phạm vi công cộng") && c.querySelector("a.photo-credit").href.startsWith("https://commons.wikimedia.org/") && document.querySelector("#genrePanel img").alt.includes("Festival Huế")})()'));
    ok('Loại hình: phần "Nghe và xem" chỉ có bản ghi thật (link YouTube đúng video UNESCO), không có âm giả', await js('!document.querySelector("#genreMedia [data-play]") && !!document.querySelector("#genreMedia a[href*=\\"G5X7KUtbEkk\\"]")'));
    await js('document.querySelector(".filter-btn[data-region=central]").scrollIntoView({behavior:"instant",block:"center"})');
    await b.click('.filter-btn[data-region="central"]');
    await b.delay(800); // chờ hiệu ứng phóng bản đồ (0.6s) chạy xong
    ok('Loại hình: lọc Trung Bộ → còn 6 thẻ, 10 điểm ngoài vùng bị ẩn hẳn (không bấm, không Tab tới)', await js('[...document.querySelectorAll(".genre-card")].filter(c=>!c.parentElement.hidden).length===6 && [...document.querySelectorAll(".map-marker")].filter(m=>m.hidden&&getComputedStyle(m).display==="none").length===10 && document.getElementById("filterCount").textContent.includes("6")'));
    ok('Loại hình: lọc Trung Bộ → bản đồ phóng tới vùng, nút đánh dấu giữ nguyên cỡ', await js('(()=>{const m=new DOMMatrix(getComputedStyle(document.getElementById("mapStage")).transform);const d=document.querySelector(".map-marker:not([hidden]) .map-dot").getBoundingClientRect();return m.a>1.2&&Math.abs(d.width-26)<2})()'));
    ok('Loại hình: bấm vào chỗ của một điểm đã ẩn không chọn được loại hình đó', await js('(()=>{const m=document.querySelector(".map-marker[data-genre=quan-ho]");return m.hidden&&document.querySelector(".map-marker.is-active").dataset.genre!=="quan-ho"})()'));
    await b.click('.filter-btn[data-region="highlands"]');
    ok('Loại hình: lọc Tây Nguyên → tự chọn cồng chiêng', await js('document.querySelector(".map-marker.is-active").dataset.genre==="cong-chieng"'));
    await b.click('.filter-btn[data-region="all"]');
    await b.delay(800);
    ok('Loại hình: bấm "Tất cả" → bản đồ thu về như cũ, đủ 16 điểm', await js('getComputedStyle(document.getElementById("mapStage")).transform==="none" && [...document.querySelectorAll(".map-marker")].every(m=>!m.hidden)'));
    await js('document.querySelector("#genrePanel [data-step=\\"1\\"]").scrollIntoView({behavior:"instant",block:"center"})');
    await b.click('#genrePanel [data-step="1"]');
    ok('Loại hình: nút "Loại hình sau" chuyển sang loại hình kế tiếp', await js('document.querySelector(".map-marker.is-active").dataset.genre==="tai-tu"'));
    await js('document.querySelector(".genre-card[data-genre=\\"ca-tru\\"]").scrollIntoView({behavior:"instant",block:"center"})');
    await b.click('.genre-card[data-genre="ca-tru"]');
    await b.delay(500);
    ok('Loại hình: bấm thẻ trong danh sách → chọn loại hình đó', await js('document.getElementById("genreName").textContent==="Ca trù"'));
    await js('document.querySelector(".map-marker[data-genre=\\"vi-giam\\"]").focus()');
    await key('Enter', 'Enter', 13);
    ok('Loại hình: dùng bàn phím (Tab tới điểm, Enter) cũng chọn được', await js('document.querySelector(".map-marker.is-active").dataset.genre==="vi-giam"'));
    ok('Loại hình: đủ 16 ảnh thật tải được', await js('Promise.all(ASV_DATA.genres.filter(g=>g.photo).length===16 && ASV_DATA.genres.map(g=>new Promise(r=>{const im=new Image();im.onload=()=>r(true);im.onerror=()=>r(false);im.src=g.image}))).then(a=>a.every(Boolean))'));
    await b.goto(url); // rời trang trước, để lần mở dưới đây là tải trang mới thật
    await b.goto(gurl + '#bai-choi');
    await b.wait('!!document.getElementById("genreName")');
    ok('Loại hình: địa chỉ genres.html#bai-choi mở thẳng bài chòi', await js('document.querySelector(".map-marker.is-active").dataset.genre==="bai-choi"'));
    await b.goto(url);
    await b.goto(gurl + '?vung=south');
    await b.wait('!!document.getElementById("genreName")');
    ok('Loại hình: địa chỉ genres.html?vung=south mở sẵn bộ lọc Nam Bộ', await js('document.querySelector(".filter-btn[aria-pressed=true]").dataset.region==="south" && document.querySelector(".map-marker.is-active").dataset.genre==="tai-tu"'));
    // Ảnh thiếu file → tự quay về ảnh dự phòng (tranh vẽ), không hiện ô giữ chỗ
    await js('window._fb=ASV.createMedia({src:"images/loai-hinh/anh/khong-co-file.jpg",fallback:"assets/motif-hac.svg",name:"Hò",kind:"genre",onFallback:function(){window._fbDone=true}});document.body.appendChild(window._fb)');
    await b.delay(400);
    ok('Ảnh thiếu file → tự hiện ảnh dự phòng (tranh vẽ)', await js('window._fbDone===true && window._fb.querySelector("img").getAttribute("src").endsWith("motif-hac.svg") && !window._fb.classList.contains("is-placeholder") && window._fb.classList.contains("is-art")'));
    await js('window._fb.remove()');
    // Lọc theo nhóm
    await b.goto(url);
    await b.goto(gurl);
    await b.wait('document.querySelectorAll(".map-marker").length===16');
    await js('document.querySelector(".filter-btn[data-group=other]").scrollIntoView({behavior:"instant",block:"center"})');
    await b.click('.filter-btn[data-group="other"]');
    await b.delay(300);
    ok('Loại hình: lọc "Loại hình khác" → 6 thẻ, chỉ còn chấm rỗng, tự chọn chèo, ghi lên địa chỉ ?nhom=other', await js('[...document.querySelectorAll(".genre-card")].filter(c=>!c.parentElement.hidden).length===6 && [...document.querySelectorAll(".map-marker:not([hidden])")].every(m=>m.classList.contains("is-other")) && document.querySelector(".map-marker.is-active").dataset.genre==="cheo" && location.search.includes("nhom=other")'));
    await b.click('.map-marker[data-genre="tuong"]');
    ok('Loại hình: tuồng chưa có danh hiệu → nhãn "Loại hình truyền thống", không có dòng "Công nhận"', await js('document.querySelector("#genrePanel .badge-unesco").textContent==="Loại hình truyền thống" && ![...document.querySelectorAll("#genrePanel dt")].some(d=>d.textContent==="Công nhận")'));
    ok('Loại hình: video tuồng của kênh chính thức Nhà hát Tuồng Việt Nam, ghi rõ nguồn', await js('!!document.querySelector("#genreMedia a[href*=\\"Y42hnhQQsAM\\"]") && document.querySelector("#genreMedia .video-credit").textContent.includes("kênh YouTube chính thức của Nhà hát Tuồng Việt Nam") && document.querySelector("#genreMedia .video-credit a").href.includes("@nhahattuongvietnam")'));
    await b.click('.map-marker[data-genre="ca-hue"]');
    ok('Loại hình: ca Huế → nhãn "Di sản quốc gia 2015", video phóng sự ghi rõ của VTV3', await js('document.querySelector("#genrePanel .badge-unesco").textContent==="Di sản quốc gia 2015" && document.querySelector("#genreMedia .video-credit").textContent.includes("phóng sự của VTV3")'));
    await b.click('.map-marker[data-genre="cheo"]');
    ok('Loại hình: chèo → nhãn nói rõ danh hiệu là của Chèo Bắc Ninh', await js('document.querySelector("#genrePanel .badge-unesco").textContent==="Chèo Bắc Ninh: di sản quốc gia 2025"'));
    await b.click('.filter-btn[data-region="highlands"]');
    ok('Loại hình: Tây Nguyên + Loại hình khác → báo không có loại hình nào, không lỗi', await js('[...document.querySelectorAll(".genre-card")].every(c=>c.parentElement.hidden) && document.getElementById("filterCount").textContent.includes("Không có loại hình")'));
    await b.goto(url);
    await b.goto(gurl + '?vung=north&nhom=unesco');
    await b.wait('!!document.getElementById("genreName")');
    ok('Loại hình: địa chỉ ?vung=north&nhom=unesco → 5 loại hình UNESCO ở Bắc Bộ (có hát văn, Then)', await js('(()=>{const ids=[...document.querySelectorAll(".genre-card")].filter(c=>!c.parentElement.hidden).map(c=>c.dataset.genre);return ids.length===5&&ids.includes("hat-van")&&ids.includes("then")})()'));
    await js('I18n.set("en")');
    ok('Loại hình EN: không còn dấu, vùng dịch sang tiếng Anh', await js('!/[à-ỹÀ-ỸđĐăĂâÂêÊôÔơƠưƯ]/.test(document.body.innerText) && document.querySelector(".filter-btn[data-region=north]").textContent==="Northern Vietnam" && document.querySelector(".map-svg").textContent.includes("Hoang Sa Archipelago")'));
    await b.screenshot(path.join(shots, 'genres-1280-en.png'));
    await js('I18n.set("vi")');
    for (const [w, h] of [[360, 740], [768, 1024]]) {
      await b.size(w, h);
      await b.goto(gurl);
      await b.wait('document.querySelectorAll(".map-marker").length===16');
      await b.delay(200);
      ok('Loại hình ' + w + 'px: không bị cuộn ngang', await js('document.documentElement.scrollWidth<=innerWidth'));
      await b.screenshot(path.join(shots, 'genres-' + w + '-vi.png'));
    }
    await b.size(1280, 900);
    await b.goto(gurl);
    await b.wait('document.querySelectorAll(".map-marker").length===16');
    await b.delay(300);
    await b.screenshot(path.join(shots, 'genres-1280-vi.png'));
    await b.click('.map-marker[data-genre="tai-tu"]');
    ok('Loại hình → Nhạc cụ: link tên nhạc cụ trỏ tới hộp chi tiết và không còn báo "sẽ có"', await js('!!document.querySelector("#genrePanel .chip[href=\\"instruments.html#dan-nguyet\\"]") && ASV.findPage("instruments.html#dan-nguyet").ready===true'));

    /* ================= TRANG NHẠC CỤ (instruments.html) ================= */
    const iurl = pathToFileURL(path.resolve('Website-AmSacViet/instruments.html')).href;
    await b.goto(iurl);
    await b.wait('document.querySelectorAll(".inst-card").length===12');
    const shownCount = 'document.querySelectorAll("[data-col]:not([hidden])").length';
    ok('Nhạc cụ: 12 thẻ, menu gạch chân "Nhạc cụ", đủ 12 hình', await js(shownCount + '===12 && document.querySelector(".nav-link.active").getAttribute("href")==="instruments.html" && [...document.querySelectorAll(".inst-card img")].every(i=>i.complete&&i.naturalWidth>0)'));
    await b.click('.inst-tools .filter-btn[data-family="wind"]');
    ok('Nhạc cụ: lọc Hơi → 3 thẻ, có dòng giải thích nhóm', await js(shownCount + '===3 && document.getElementById("familyHint").textContent.startsWith("Hơi:")'));
    await b.click('.inst-tools .filter-btn[data-family="percussion"]');
    ok('Nhạc cụ: lọc Gõ → 4 thẻ', await js(shownCount + '===4'));
    await b.click('.inst-tools .filter-btn[data-family="all"]');
    await js('{const s=document.getElementById("instSearch");s.value="dan bau";s.dispatchEvent(new Event("input"))}');
    ok('Nhạc cụ: gõ không dấu "dan bau" → tìm ra Đàn bầu', await js(shownCount + '===1 && !document.querySelector("[data-col=dan-bau]").hidden'));
    await js('{const s=document.getElementById("instSearch");s.value="Gia Rai";s.dispatchEvent(new Event("input"))}');
    ok('Nhạc cụ: tìm theo dân tộc "Gia Rai" → đàn t\'rưng', await js(shownCount + '===1 && !document.querySelector("[data-col=dan-trung]").hidden'));
    await js('{const s=document.getElementById("instSearch");s.value="piano";s.dispatchEvent(new Event("input"))}');
    ok('Nhạc cụ: không khớp → hiện "Không tìm thấy" kèm từ đã gõ', await js('!document.getElementById("instEmpty").hidden && document.getElementById("instEmptyText").textContent.includes("piano") && ' + shownCount + '===0'));
    await b.click('#instReset');
    ok('Nhạc cụ: nút "Xóa tìm kiếm và bộ lọc" đưa về đủ 12 thẻ', await js(shownCount + '===12 && document.getElementById("instEmpty").hidden && document.getElementById("instSearch").value===""'));
    await b.click('.inst-card[data-inst="dan-tranh"]');
    await b.wait('document.getElementById("instModal").classList.contains("show")');
    await b.delay(400);
    ok('Nhạc cụ: bấm thẻ → hộp chi tiết có ảnh, chất liệu, cách chơi, nút nghe, link loại hình', await js('(()=>{const m=document.getElementById("instModal");return document.getElementById("instModalTitle").textContent==="Đàn tranh" && !!m.querySelector(".inst-modal-media img") && m.textContent.includes("Chất liệu") && m.textContent.includes("Cách chơi") && !!m.querySelector("[data-play=\\"instrument:dan-tranh\\"]") && !!m.querySelector("a[href=\\"genres.html#tai-tu\\"]")})()'));
    await b.click('#instModal [data-play]');
    await b.wait('ASV.Player.current && ASV.Player.current.item.key==="instrument:dan-tranh"');
    ok('Nhạc cụ: nút Nghe trong hộp chi tiết phát âm thanh', true);
    await b.click('#instModal .modal-footer [data-step="1"]');
    ok('Nhạc cụ: "Nhạc cụ sau" chuyển sang đàn nguyệt và dừng tiếng đàn tranh', await js('document.getElementById("instModalTitle").textContent==="Đàn nguyệt" && !ASV.Player.isActive("instrument:dan-tranh")'));
    await key('Escape', 'Escape', 27);
    await b.wait('!document.getElementById("instModal").classList.contains("show")');
    await b.delay(800);
    ok('Nhạc cụ: Esc đóng hộp chi tiết và trả focus về thẻ', await js('document.activeElement.classList.contains("inst-card")'));
    await b.goto(url);
    await b.goto(iurl + '#phach');
    await b.wait('document.getElementById("instModal").classList.contains("show")');
    ok('Nhạc cụ: địa chỉ instruments.html#phach mở thẳng hộp chi tiết Phách', await js('document.getElementById("instModalTitle").textContent==="Phách"'));
    await key('Escape', 'Escape', 27);
    await b.wait('!document.querySelector(".modal-backdrop")');
    await b.delay(300);

    /* --- Chơi thử nhạc cụ ảo --- */
    await js('document.getElementById("choi-thu").scrollIntoView({behavior:"instant",block:"start"})');
    ok('Chơi thử: có đủ 12 nhạc cụ để chọn, kèm dòng nói rõ là âm mô phỏng', await js('document.querySelectorAll("#playPicker [data-play-pick]").length===12 && document.querySelector(".play-disclaimer").textContent.includes("mô phỏng")'));
    // Mỗi nhạc cụ (trừ đàn bầu có giao diện riêng): chọn rồi bấm phím đầu tiên → có tiếng và hiện nốt
    const others = await js('JSON.stringify(ASV_DATA.instruments.map(i=>i.id).filter(i=>i!=="dan-bau"))');
    let allOk = true;
    for (const id of JSON.parse(others)) {
      await b.click('#playPicker [data-play-pick="' + id + '"]');
      await js('document.getElementById("playPads").scrollIntoView({behavior:"instant",block:"center"})');
      const p = await js('(()=>{const r=document.querySelector("#playPads [data-key=\\"0\\"]").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
      await b.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: p.x, y: p.y, button: 'left', clickCount: 1 });
      await b.delay(80);
      const good = await js('ASV.Player.isActive("play:' + id + '") && document.getElementById("playNote").textContent.length>2');
      await b.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: p.x, y: p.y, button: 'left', clickCount: 1 });
      if (!good) { allOk = false; console.log('  chưa chơi được: ' + id); }
    }
    ok('Chơi thử: cả 11 nhạc cụ (ngoài đàn bầu) bấm phím đầu là có tiếng và hiện nốt', allOk);
    ok('Chơi thử: cả 11 nhạc cụ đều có mô hình để bấm trực tiếp (dây, phím, lỗ, ống, mặt trống…)', await js('Object.keys(ASV.PlayModels).length===11 && ASV_DATA.instruments.filter(i=>i.id!=="dan-bau").every(i=>!!ASV.PlayModels[i.id])'));
    await b.click('#playPicker [data-play-pick="dan-nguyet"]');
    await js('document.querySelector("#playPads [data-key=\\"2\\"]").focus()');
    await key('Enter', 'Enter', 13);
    ok('Mô hình dùng được bằng bàn phím: Tab tới phím đàn nguyệt thứ 3, nhấn Enter là gảy (Rê 4)', await js('document.activeElement.getAttribute("data-key")==="2" && document.getElementById("playNote").textContent.includes("Rê 4")'));
    await key('Escape', 'Escape', 27);
    await b.click('#playPicker [data-play-pick="trong"]');
    await js('document.getElementById("playPads").scrollIntoView({behavior:"instant",block:"center"})');
    const rim = await js('(()=>{const r=document.querySelector("#playPads .pm-rim").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+6}})()');
    await b.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: rim.x, y: rim.y, button: 'left', clickCount: 1 });
    await b.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: rim.x, y: rim.y, button: 'left', clickCount: 1 });
    ok('Trống: gõ vào vành gỗ ra tiếng "Cắc"', await js('document.getElementById("playNote").textContent.includes("Cắc")'));
    await key('Escape', 'Escape', 27);
    // Đàn tranh: vuốt qua dây
    await b.click('#playPicker [data-play-pick="dan-tranh"]');
    await js('document.getElementById("playPads").scrollIntoView({behavior:"instant",block:"center"})');
    const s1 = await js('(()=>{const r=document.querySelector("#playPads [data-key=\\"0\\"]").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
    const s6 = await js('(()=>{const r=document.querySelector("#playPads [data-key=\\"5\\"]").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
    await b.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: s1.x, y: s1.y, button: 'left', clickCount: 1 });
    for (let k = 1; k <= 10; k++) {
      await b.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: s1.x + (s6.x - s1.x) * k / 10, y: s1.y + (s6.y - s1.y) * k / 10, button: 'left', buttons: 1 });
      await b.delay(20);
    }
    ok('Đàn tranh: giữ rồi vuốt qua 6 dây → gảy lần lượt tới dây thứ 6 (Rê 5)', await js('document.getElementById("playNote").textContent.includes("Rê 5")'));
    await b.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: s6.x, y: s6.y, button: 'left', clickCount: 1 });
    // Đàn nhị: giữ để kéo cung, nhả ra là dừng
    await b.click('#playPicker [data-play-pick="dan-nhi"]');
    await js('document.getElementById("playPads").scrollIntoView({behavior:"instant",block:"center"})');
    const nhiKey = await js('(()=>{const r=document.querySelector("#playPads [data-key=\\"1\\"]").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
    await b.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: nhiKey.x, y: nhiKey.y, button: 'left', clickCount: 1 });
    await b.delay(300);
    ok('Đàn nhị: đang giữ thì phím sáng lên (đang kéo cung)', await js('document.querySelector("#playPads [data-key=\\"1\\"]").classList.contains("is-on")'));
    await b.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: nhiKey.x, y: nhiKey.y, button: 'left', clickCount: 1 });
    await b.delay(100);
    ok('Đàn nhị: nhả ra thì dừng kéo', await js('!document.querySelector("#playPads .is-on")'));
    // Bàn phím: phím số 3 khi đang ở phần chơi thử
    await b.click('#playPicker [data-play-pick="cong-chieng"]');
    await js('document.querySelector("#playPads [data-key=\\"0\\"]").focus()');
    await b.send('Input.dispatchKeyEvent', { type: 'keyDown', key: '3', code: 'Digit3', windowsVirtualKeyCode: 51, text: '3' });
    await b.send('Input.dispatchKeyEvent', { type: 'keyUp', key: '3', code: 'Digit3', windowsVirtualKeyCode: 51 });
    ok('Chơi thử: phím số 3 trên bàn phím gõ chiếc chiêng thứ 3', await js('document.getElementById("playNote").textContent.includes("Đô 4")'));
    await key('Escape', 'Escape', 27);
    ok('Chơi thử: Esc dừng âm thanh', await js('ASV.Player.current===null'));

    /* --- Đàn bầu ảo (trong phần chơi thử) --- */
    await b.click('#playPicker [data-play-pick="dan-bau"]');
    ok('Chọn Đàn bầu → hiện giao diện đàn bầu riêng (cần đàn)', await js('!document.getElementById("vbauPanel").hidden && document.getElementById("playGeneric").hidden'));
    await js('document.getElementById("vbauPanel").scrollIntoView({behavior:"instant",block:"center"})');
    await b.click('#vbauPluck');
    await b.wait('ASV.Player.isActive("vbau")');
    const f0 = await js('ASV.Player.current && document.getElementById("vbauNote").textContent');
    ok('Đàn bầu ảo: bấm "Gảy dây" → có tiếng, hiện nốt đang nghe (bồi âm 2 = Đô 4)', String(f0).includes('Đô 4'));
    await js('{const r=document.getElementById("vbauRod");r.value=100;r.dispatchEvent(new Event("input"))}');
    ok('Đàn bầu ảo: kéo cần đàn sang phải → nốt cao lên (Fa 4), cần đàn nghiêng theo', await js('document.getElementById("vbauNote").textContent.includes("Fa 4") && document.querySelector("#vbauArt .bau-rod").getAttribute("transform").includes("rotate(9")'));
    await js('document.getElementById("vbauRod").focus()');
    await key('ArrowLeft', 'ArrowLeft', 37);
    ok('Đàn bầu ảo: dùng phím mũi tên trên thanh cần đàn được', await js('Number(document.getElementById("vbauRod").value)===99'));
    await b.click('#vbauHarm [data-harm="3"]');
    ok('Đàn bầu ảo: chọn bồi âm 3 → gảy lại ở bồi âm mới', await js('document.querySelector("#vbauHarm [data-harm=\\"3\\"]").getAttribute("aria-pressed")==="true" && ASV.Player.isActive("vbau")'));
    await js('{const r=document.getElementById("vbauRod");r.value=0;r.dispatchEvent(new Event("input"))}');
    await b.click('#vbauHarm [data-harm="1"]');
    ok('Đàn bầu ảo: có nút "Âm thực" (dây buông) → Đô 3, kèm dòng giải thích âm thực / âm bồi', await js('document.querySelector("#vbauHarm [data-harm=\\"1\\"]").textContent==="Âm thực" && document.getElementById("vbauNote").textContent.includes("Đô 3") && document.querySelector(".vbau-explain").textContent.includes("âm bồi")'));
    await key('Escape', 'Escape', 27);
    ok('Đàn bầu ảo: Esc dừng tiếng đàn', await js('ASV.Player.current===null'));
    await js('I18n.set("en")');
    ok('Nhạc cụ EN: không còn dấu tiếng Việt', await js('!/[à-ỹÀ-ỸđĐăĂâÂêÊôÔơƠưƯ]/.test(document.body.innerText) && document.querySelector(".inst-card[data-inst=dan-bau] .inst-card-name").textContent==="Dan bau"'));
    await b.screenshot(path.join(shots, 'instruments-1280-en.png'));
    await js('I18n.set("vi")');
    for (const [w, h] of [[360, 740], [768, 1024]]) {
      await b.size(w, h);
      await b.goto(iurl);
      await b.wait('document.querySelectorAll(".inst-card").length===12');
      await b.delay(200);
      ok('Nhạc cụ ' + w + 'px: không bị cuộn ngang', await js('document.documentElement.scrollWidth<=innerWidth'));
      await b.screenshot(path.join(shots, 'instruments-' + w + '-vi.png'));
    }
    await b.size(1280, 900);
    await b.goto(iurl);
    await b.wait('document.querySelectorAll(".inst-card").length===12');
    await b.delay(300);
    await b.screenshot(path.join(shots, 'instruments-1280-vi.png'));

    /* ================= TRANG LỊCH SỬ (history.html) ================= */
    const hurl = pathToFileURL(path.resolve('Website-AmSacViet/history.html')).href;
    const histReady = 'document.querySelectorAll(".hist-item").length===8';
    await b.goto(hurl);
    await js('localStorage.setItem("asv-lang","vi")');
    await b.goto(url); // goto chỉ khác phần #hash thì không tải lại, nên đi qua trang khác
    await b.goto(hurl + '#nguyen');
    await b.wait(histReady);
    await b.delay(300);
    ok('Lịch sử: 8 mốc, 8 hình đã tải, menu gạch chân "Lịch sử", thanh thời kỳ 8 mục', await js(histReady + ' && [...document.querySelectorAll(".hist-figure img")].every(i=>i.complete&&i.naturalWidth>0) && document.querySelector(".nav-link.active").getAttribute("href")==="history.html" && document.querySelectorAll("#histNavList a").length===8'));
    ok('Lịch sử: history.html#nguyen mở thẳng mốc Triều Nguyễn, không bị thanh dính che', await js('document.querySelector("#histNavList [aria-current]").dataset.id==="nguyen" && document.getElementById("nguyen").getBoundingClientRect().top >= document.getElementById("histNav").getBoundingClientRect().bottom - 1'));
    ok('Lịch sử: mỗi mốc có nguồn tra cứu, hình có alt riêng; 6 mốc có mục "Còn tranh luận"', await js('[...document.querySelectorAll(".hist-item")].every(li=>li.querySelectorAll(".hist-sources li").length>=1 && li.querySelector(".hist-figure img").alt.length>30) && document.querySelectorAll(".hist-debate").length===6'));
    ok('Lịch sử: 8 mốc đều là ảnh thật (jpg), mỗi ảnh có chú thích và dòng nguồn link tới trang gốc', await js('[...document.querySelectorAll(".hist-figure")].every(f=>/\.jpe?g$/i.test(f.querySelector("img").getAttribute("src")) && f.querySelector("figcaption .photo-caption").textContent.length>10 && /^https:/.test(f.querySelector("figcaption a.photo-credit").href))'));
    ok('Lịch sử: tên tỉnh theo địa giới mới (Hà Nam cũ, nay thuộc Ninh Bình; Bạc Liêu nay thuộc Cà Mau)', await js('document.getElementById("dong-son").textContent.includes("nay thuộc Ninh Bình") && document.getElementById("tai-tu-cai-luong").textContent.includes("nay thuộc Cà Mau")'));
    ok('Lịch sử: mốc UNESCO liệt kê 9 lần ghi danh theo năm (2003 → 2019) và link tới 8 loại hình', await js('[...document.querySelectorAll("#unesco .hist-year")].map(e=>e.textContent).join()==="2003,2005,2009,2011,2013,2014,2016,2017,2019" && document.querySelectorAll("#unesco a[href^=\\"genres.html#\\"]").length===8'));
    ok('Lịch sử: thời Lê có nút nghe bản ghi ca trù thật (UNESCO), không có âm tổng hợp cho loại hình', await js('!!document.querySelector("#le [data-recording=ca-tru]") && !document.querySelector(".hist-item [data-play^=\\"genre:\\"]")'));
    await js('document.getElementById("histNavList").querySelector("[data-id=unesco]").click()');
    await b.delay(900);
    ok('Lịch sử: bấm "UNESCO" trên thanh thời kỳ → cuộn tới, focus vào tiêu đề, đổi #hash, gạch chân mục', await js('document.activeElement.id==="t-unesco" && location.hash==="#unesco" && document.querySelector("#histNavList [aria-current]").dataset.id==="unesco"'));
    ok('Lịch sử: thanh thời kỳ dính ngay dưới menu khi cuộn', await js('Math.abs(document.getElementById("histNav").getBoundingClientRect().top - document.getElementById("site-header").getBoundingClientRect().bottom) < 2'));
    await js('document.querySelector("#nguyen [data-play=\\"instrument:ken-bau\\"]").scrollIntoView({behavior:"instant",block:"center"})');
    await b.click('#nguyen [data-play="instrument:ken-bau"]');
    await b.wait('ASV.Player.current && ASV.Player.current.status==="playing"');
    ok('Lịch sử: nút nghe kèn bầu phát âm (ghi rõ âm mô phỏng), nhãn đổi thành Dừng', await js('document.querySelector("#nguyen [data-play=\\"instrument:ken-bau\\"] .btn-play-label").textContent==="Dừng" && document.querySelectorAll(".hist-note").length===1 && document.querySelector(".hist-note").textContent.includes("mô phỏng")'));
    await key('Escape', 'Escape', 27);
    ok('Lịch sử: Esc dừng âm', await js('ASV.Player.current===null'));
    ok('Lịch sử: link "Chơi thử" trỏ đúng tới phần chơi thử nhạc cụ', await js('!!document.querySelector("#nguyen a[href=\\"instruments.html?choi=ken-bau#choi-thu\\"]")'));
    await b.screenshot(path.join(shots, 'history-1280-vi.png'));
    const histCur = await js('document.querySelector("#histNavList [aria-current]").dataset.id');
    await js('I18n.set("en")');
    ok('Lịch sử EN: không còn dấu tiếng Việt, mốc đang xem giữ nguyên', await js('!/[à-ỹÀ-ỸđĐăĂâÂêÊôÔơƠưƯ]/.test(document.body.innerText) && document.title.startsWith("History") && document.querySelector("#histNavList [aria-current]").dataset.id==="' + histCur + '"'));
    ok('Lịch sử EN: thanh thời kỳ ghi "Lithophones, bronze drums", không còn "Stone and bronze"; dòng nguồn ảnh bằng tiếng Anh', await js('document.querySelector("#histNavList [data-id=dong-son]").textContent.includes("Lithophones, bronze drums") && !document.body.innerText.includes("Stone and bronze") && document.querySelector("#dong-son .photo-credit").textContent.startsWith("Photo:")'));
    ok('Lịch sử EN: năm "Thế kỷ 17 – 19" hiện là "17th – 19th c."', await js('[...document.querySelectorAll("#le .hist-year")].some(e=>e.textContent==="17th – 19th c.")'));
    await b.screenshot(path.join(shots, 'history-1280-en.png'));
    await js('I18n.set("vi")');
    for (const [w, h] of [[360, 740], [768, 1024]]) {
      await b.size(w, h);
      await b.goto(url);
      await b.goto(hurl);
      await b.wait(histReady);
      await b.delay(200);
      ok('Lịch sử ' + w + 'px: không bị cuộn ngang (thanh thời kỳ cuộn trong khung riêng)', await js('document.documentElement.scrollWidth<=innerWidth'));
      await b.screenshot(path.join(shots, 'history-' + w + '-vi.png'));
    }
    await b.size(1280, 900);

    /* ================= THUẬT NGỮ, NĂM ÂM / BẢY ÂM, GHI LẠI PHẦN CHƠI ================= */
    // Thuật ngữ trên trang Lịch sử
    await b.goto(url);
    await b.goto(hurl + '#le');
    await b.wait(histReady + ' && document.querySelectorAll(".gloss-term").length>0');
    await b.delay(300);
    ok('Thuật ngữ: chữ chuyên môn trong bài được đánh dấu, không nằm trong tiêu đề/nút/link', await js('document.querySelectorAll(".gloss-term").length>=5 && ![...document.querySelectorAll(".gloss-term")].some(e=>e.parentElement.closest("h1,h2,h3,a,button,.hist-nav"))'));
    ok('Thuật ngữ: mỗi khối chữ chỉ đánh dấu lần đầu của mỗi từ', await js('[...document.querySelectorAll("p,li,dd")].filter(p=>!p.querySelector("p,li,dd")).every(p=>{const ids=[...p.querySelectorAll(":scope .gloss-term")].map(e=>e.dataset.gloss);return ids.length===new Set(ids).size})'));
    await js('window._gt=document.querySelector("#le .gloss-term")||document.querySelector(".gloss-term");window._gt.scrollIntoView({block:"center",behavior:"instant"})');
    await js('window._gt.click()');
    await b.delay(150);
    ok('Thuật ngữ: bấm → khung giải thích mở, có tên từ, định nghĩa, link "Xem tất cả", focus vào nút Đóng', await js('!document.getElementById("glossPop").hidden && window._gt.getAttribute("aria-expanded")==="true" && document.querySelector(".gloss-pop-def").textContent.length>30 && document.querySelector(".gloss-pop a").getAttribute("href")==="glossary.html#"+window._gt.dataset.gloss && document.activeElement.classList.contains("gloss-pop-close")'));
    ok('Thuật ngữ: khung giải thích nằm trong màn hình', await js('(()=>{const r=document.getElementById("glossPop").getBoundingClientRect();return r.left>=0&&r.right<=document.documentElement.clientWidth})()'));
    await key('Escape', 'Escape', 27);
    ok('Thuật ngữ: Esc đóng khung, focus quay về chữ vừa bấm', await js('document.getElementById("glossPop").hidden && document.activeElement===window._gt && window._gt.getAttribute("aria-expanded")==="false"'));
    await js('I18n.set("en")');
    await b.delay(200);
    ok('Thuật ngữ EN: vẫn đánh dấu sau khi đổi ngôn ngữ, không còn dấu tiếng Việt', await js('document.querySelectorAll(".gloss-term").length>=5 && !/[à-ỹÀ-ỸđĐăĂâÂêÊôÔơƠưƯ]/.test(document.body.innerText)'));
    await js('I18n.set("vi")');

    // Năm âm và bảy âm
    await b.goto(url);
    await b.goto(iurl + '#thang-am');
    await b.wait('document.querySelectorAll(".scale-key").length===14');
    await b.delay(300);
    ok('Năm âm/bảy âm: hàng năm âm 6 phím + 2 ô trống (Mi, Si), hàng bảy âm 8 phím, tô Mi và Si', await js('document.querySelectorAll("[data-scale=penta] .scale-key").length===6 && document.querySelectorAll("[data-scale=penta] .scale-gap").length===2 && [...document.querySelectorAll("[data-scale=hepta] .scale-key.is-half")].map(e=>e.textContent).join()==="Mi,Si"'));
    ok('Năm âm/bảy âm: cuộn thẳng tới #thang-am khi mở bằng địa chỉ đó', await js('Math.abs(document.getElementById("thang-am").getBoundingClientRect().top) < 150'));
    await b.click('[data-scale-run="penta"]');
    await b.delay(500);
    ok('Năm âm/bảy âm: "Nghe cả thang" phát và tô sáng phím đang kêu, nút đổi thành Dừng', await js('ASV.Player.isActive("scale:penta") && document.querySelectorAll("[data-scale=penta] .scale-key.is-on").length===1 && document.querySelector("[data-scale-run=penta]").textContent.includes("Dừng")'));
    await key('Escape', 'Escape', 27);
    ok('Năm âm/bảy âm: Esc dừng và bỏ tô sáng', await js('ASV.Player.current===null && !document.querySelector(".scale-key.is-on")'));
    await b.click('[data-scale="hepta"] [data-note="E4"]');
    ok('Năm âm/bảy âm: bấm phím Mi phát một nốt', await js('ASV.Player.isActive("scale-note")'));
    await key('Escape', 'Escape', 27);
    await b.click('[data-timbre="sao"]');
    ok('Năm âm/bảy âm: đổi âm sắc sang tiếng sáo', await js('document.querySelector("[data-timbre=sao]").getAttribute("aria-pressed")==="true"'));

    /* ================= TRANG THUẬT NGỮ (glossary.html) ================= */
    const turl = pathToFileURL(path.resolve('Website-AmSacViet/glossary.html')).href;
    const glossReady = 'document.querySelectorAll(".gloss-entry").length===23';
    ok('Nhạc cụ: không còn khối thuật ngữ cũ và dòng gợi ý tìm kiếm; ô tìm có ví dụ không dấu', await js('!document.getElementById("thuat-ngu") && !document.getElementById("instSearchHint") && document.getElementById("instSearch").placeholder.includes("dan bau")'));
    await b.goto(url);
    await b.goto(iurl + '#thuat-ngu');
    await b.wait('location.href.includes("glossary.html") && ' + glossReady);
    ok('Link cũ instruments.html#thuat-ngu chuyển sang trang Thuật ngữ', true);
    await b.goto(url);
    await b.goto(turl);
    await b.wait(glossReady);
    ok('Thuật ngữ: 23 mục trong 4 nhóm, menu gạch chân "Thuật ngữ", đếm "23 từ"', await js('document.querySelectorAll(".gloss-group").length===4 && document.querySelector(".nav-link.active").getAttribute("href")==="glossary.html" && document.getElementById("glossCount").textContent==="23 từ"'));
    ok('Thuật ngữ: mỗi mục có tên (h3) và định nghĩa; trong mục không đánh dấu chính từ của nó', await js('[...document.querySelectorAll(".gloss-entry")].every(e=>e.querySelector("h3").textContent.length>1 && e.querySelector(".gloss-entry-def").textContent.length>30 && !e.querySelector(".gloss-term[data-gloss=\\""+e.id+"\\"]"))'));
    ok('Thuật ngữ: loại hình chỉ có nút "Xem biểu diễn" (video thật), không có âm tổng hợp', await js('!!document.querySelector("#ca-nuong [data-recording=ca-tru]") && !document.querySelector("[data-play^=\\"genre:\\"]")'));
    await js('document.querySelector(".filter-btn[data-group=unesco]").click()');
    ok('Thuật ngữ: lọc "Danh hiệu UNESCO" → còn 3 mục, nhóm khác ẩn hẳn, địa chỉ ghi ?nhom=unesco', await js('document.querySelectorAll("[data-col]:not([hidden])").length===3 && document.querySelectorAll(".gloss-group:not([hidden])").length===1 && document.getElementById("glossCount").textContent==="3 từ" && location.search==="?nhom=unesco"'));
    await js('document.querySelector(".filter-btn[data-group=all]").click(); {const i=document.getElementById("glossSearch"); i.value="am boi"; i.dispatchEvent(new Event("input"))}');
    ok('Thuật ngữ: gõ không dấu "am boi" → tìm ra "Âm bồi"', await js('!document.querySelector("[data-col=am-boi]").hidden && document.querySelectorAll("[data-col]:not([hidden])").length===1'));
    await js('{const i=document.getElementById("glossSearch"); i.value="xyz"; i.dispatchEvent(new Event("input"))}');
    ok('Thuật ngữ: không khớp → hiện "Không có từ nào khớp" và nút xóa', await js('!document.getElementById("glossEmpty").hidden && document.getElementById("glossEmptyText").textContent.includes("xyz")'));
    await b.click('#glossReset');
    ok('Thuật ngữ: bấm "Xóa tìm kiếm và bộ lọc" → hiện lại 23 mục, focus vào ô tìm', await js('document.querySelectorAll("[data-col]:not([hidden])").length===23 && document.activeElement.id==="glossSearch" && document.getElementById("glossEmpty").hidden'));
    await js('document.querySelector("[data-play=\\"term:am-thuc\\"]").scrollIntoView({block:"center",behavior:"instant"})');
    await b.click('#am-thuc [data-play="term:am-thuc"]');
    await b.wait('ASV.Player.current && ASV.Player.current.status==="playing"');
    ok('Thuật ngữ: "Nghe âm thực" phát âm mô phỏng, nhãn đổi thành Dừng, thanh phát ghi tên', await js('document.querySelector("#am-thuc .btn-play-label").textContent==="Dừng" && !document.getElementById("asvPlayer").hidden'));
    await key('Escape', 'Escape', 27);
    ok('Thuật ngữ: Esc dừng âm', await js('ASV.Player.current===null'));
    ok('Thuật ngữ: "Chơi thử" trỏ đúng phần chơi thử của trang Nhạc cụ', await js('!!document.querySelector("#am-boi a[href=\\"instruments.html#dan-bau-ao\\"]") && !!document.querySelector("#ve a[href=\\"instruments.html?choi=ty-ba#choi-thu\\"]")'));
    await js('window._gt=document.querySelector("#am-boi .gloss-term"); window._gt.scrollIntoView({block:"center",behavior:"instant"}); window._gt.click()');
    await b.delay(150);
    ok('Thuật ngữ: khung giải thích trên chính trang này có link "Đến mục từ này"', await js('document.querySelector(".gloss-pop a").getAttribute("href")==="#"+window._gt.dataset.gloss && document.querySelector(".gloss-pop a").textContent==="Đến mục từ này"'));
    await key('Escape', 'Escape', 27);
    await b.goto(url);
    await b.goto(turl + '?nhom=sound#ds-khan-cap');
    await b.wait(glossReady + ' && document.querySelector(".gloss-entry.is-target")');
    await b.delay(100);
    ok('Thuật ngữ: glossary.html#ds-khan-cap mở thẳng mục đó (bỏ bộ lọc đang ẩn nó), tô viền, focus vào mục', await js('document.activeElement.id==="ds-khan-cap" && !document.querySelector("[data-col=ds-khan-cap]").hidden && Math.abs(document.getElementById("ds-khan-cap").getBoundingClientRect().top) < 200'));
    await b.screenshot(path.join(shots, 'glossary-1280-vi.png'));
    await js('I18n.set("en")');
    await b.delay(200);
    ok('Thuật ngữ EN: không còn dấu tiếng Việt, tiêu đề "Glossary", đếm "23 terms", vẫn giữ mục đang xem', await js('!/[à-ỹÀ-ỸđĐăĂâÂêÊôÔơƠưƯ]/.test(document.body.innerText) && document.title.startsWith("Glossary") && document.getElementById("glossCount").textContent==="23 terms" && document.querySelectorAll(".gloss-entry").length===23'));
    await b.screenshot(path.join(shots, 'glossary-1280-en.png'));
    await js('I18n.set("vi")');
    await b.size(360, 740);
    await b.goto(url);
    await b.goto(turl);
    await b.wait(glossReady);
    await b.delay(200);
    ok('Thuật ngữ 360px: không cuộn ngang', await js('document.documentElement.scrollWidth<=innerWidth'));
    await b.screenshot(path.join(shots, 'glossary-360-vi.png'));
    await b.size(1280, 900);

    // Ghi lại phần chơi: đàn tranh, bấm phím số 1, 3, 5
    await js('localStorage.removeItem("asv-recordings")');
    await b.goto(url);
    await b.goto(iurl + '?choi=dan-tranh#choi-thu');
    await b.wait('document.querySelectorAll("#playPads [data-key]").length>0 && !!document.getElementById("recToggle")');
    await b.delay(200);
    ok('Ghi lại: lúc đầu chưa có bản ghi nên Nghe lại/Lưu/Chia sẻ bị khóa', await js('document.getElementById("recPlay").disabled && document.getElementById("recSave").disabled && document.getElementById("recShare").disabled && document.querySelector("#recSaved .rec-none")!==null'));
    await js('document.getElementById("recToggle").scrollIntoView({block:"center",behavior:"instant"})');
    await b.click('#recToggle');
    ok('Ghi lại: bấm "Ghi" → đang ghi, nút đổi thành "Dừng ghi"', await js('document.getElementById("recToggle").getAttribute("aria-pressed")==="true" && document.getElementById("recToggle").textContent.includes("Dừng ghi")'));
    for (const [k, c, v] of [['1', 'Digit1', 49], ['3', 'Digit3', 51], ['5', 'Digit5', 53]]) { await key(k, c, v); await b.delay(180); }
    await b.click('#recToggle');
    ok('Ghi lại: dừng ghi → báo "3 nốt", mở khóa các nút', await js('document.getElementById("recStatus").textContent.includes("3 nốt") && !document.getElementById("recPlay").disabled'));
    await b.click('#recPlay');
    await b.delay(450);
    ok('Ghi lại: "Nghe lại" phát lại đúng nhạc cụ và phím trên mô hình sáng lên', await js('ASV.Player.isActive("play:dan-tranh") && document.getElementById("recPlay").textContent.includes("Dừng nghe")'));
    await key('Escape', 'Escape', 27);
    ok('Ghi lại: Esc dừng cả phần nghe lại', await js('ASV.Player.current===null && document.getElementById("recPlay").textContent.includes("Nghe lại")'));
    await b.click('#recSave');
    ok('Ghi lại: "Lưu vào máy" → có 1 bản trong danh sách', await js('JSON.parse(localStorage.getItem("asv-recordings")).length===1 && document.querySelectorAll("#recSaved [data-rec-load]").length===1'));
    await b.click('#recShare');
    await b.delay(200);
    const shareUrl = await js('document.getElementById("recLink").value');
    ok('Ghi lại: "Tạo link chia sẻ" hiện link có mã bản ghi', !!shareUrl && shareUrl.includes('choi=dan-tranh&ban=d0.') && shareUrl.endsWith('#choi-thu'));
    await b.goto(url);
    await b.goto(shareUrl);
    await b.wait('!!document.getElementById("recStatus") && document.getElementById("recStatus").textContent.length>0');
    ok('Ghi lại: mở link chia sẻ → nạp bản ghi nhưng KHÔNG tự phát', await js('document.getElementById("recStatus").textContent.includes("được gửi cho bạn") && ASV.Player.current===null && !document.getElementById("recPlay").disabled'));
    await b.goto(url);
    await b.goto(iurl + '?choi=dan-tranh&ban=xx_hong#choi-thu');
    await b.wait('!!document.getElementById("recStatus") && document.getElementById("recStatus").textContent.length>0');
    ok('Ghi lại: link hỏng → báo không đọc được, không lỗi', await js('document.getElementById("recStatus").textContent.includes("không đọc được") && document.getElementById("recPlay").disabled'));
    // Đàn bầu: gảy và kéo cần đàn
    await js('document.querySelector("[data-play-pick=dan-bau]").click()');
    await js('document.getElementById("recToggle").click()');
    await js('document.getElementById("vbauPluck").click()');
    await b.delay(150);
    await js('const s=document.getElementById("vbauRod");s.value=60;s.dispatchEvent(new Event("input"))');
    await b.delay(100);
    await js('document.getElementById("recToggle").click()');
    ok('Ghi lại: đàn bầu ghi được lần gảy và lần kéo cần đàn', await js('document.getElementById("recStatus").textContent.includes("Đàn bầu, 1 nốt")'));
    await key('Escape', 'Escape', 27);
    await js('document.querySelector("#recSaved [data-rec-del]").click()');
    ok('Ghi lại: xóa bản đã lưu → danh sách trống, focus về nút Ghi', await js('JSON.parse(localStorage.getItem("asv-recordings")).length===0 && document.activeElement.id==="recToggle"'));
    await js('I18n.set("en")');
    ok('Nhạc cụ EN (phần mới): không còn dấu tiếng Việt', await js('!/[à-ỹÀ-ỸđĐăĂâÂêÊôÔơƠưƯ]/.test(document.body.innerText) && document.getElementById("recToggle").textContent.includes("Record")'));
    await js('I18n.set("vi")');
    await b.size(360, 740);
    await b.goto(url);
    await b.goto(iurl + '#thang-am');
    await b.wait('document.querySelectorAll(".scale-key").length===14');
    await b.delay(200);
    ok('Năm âm/bảy âm + ghi lại 360px: không cuộn ngang', await js('document.documentElement.scrollWidth<=innerWidth'));
    await b.screenshot(path.join(shots, 'instruments-scale-360-vi.png'));
    await b.size(1280, 900);

    /* --- Người dùng bật "giảm chuyển động" --- */
    await b.size(1280, 900);
    await b.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await skip();
    await js('scrollTo({top:1500,behavior:"instant"})');
    await b.delay(150);
    ok('Giảm chuyển động: vòng trống đứng yên, không parallax, không gợn sóng', await js('getComputedStyle(document.querySelector(".bg-drum")).animationName==="none" && getComputedStyle(document.getElementById("bgFar")).transform==="none" && getComputedStyle(document.getElementById("bgRipple")).display==="none"'));
    await b.send('Emulation.setEmulatedMedia', { features: [] });

    ok('Không có lỗi JavaScript', b.errors.length === 0);
    console.log(n + ' kiểm tra đạt.');
  } finally {
    if (b.errors.length) console.log(JSON.stringify(b.errors, null, 2));
    await b.close();
  }
})().catch((e) => { console.error(e); process.exitCode = 1; });
