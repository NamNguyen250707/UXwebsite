/* home.js: Logic riêng của HomePage.html
   1. Màn hình chào: vào trang bằng nút, lăn chuột, vuốt hoặc bàn phím
   2. Cây đàn bầu ở hero: bấm vào dây → bồi âm + dây rung theo dạng sóng đứng
   3. Thẻ video biểu diễn (UNESCO)
   4. "Nghe thử một nhạc cụ": chọn ngẫu nhiên một nhạc cụ */

(function () {
  var WELCOME_KEY = "asv-welcomed";    // sessionStorage: đã qua màn hình chào trong phiên này
  var current = null;                  // nhạc cụ đang hiện ở "Nghe thử một nhạc cụ"
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Màn hình chào */
  function setupWelcome() {
    var welcome = document.getElementById("welcome");
    if (!welcome) return;
    var behind = [document.getElementById("site-header"), document.getElementById("main"), document.getElementById("site-footer")];

    // Đã vào trong phiên này → bỏ hẳn màn hình chào
    if (document.documentElement.classList.contains("skip-welcome")) {
      welcome.remove();
      return;
    }

    // Trong lúc màn hình chào hiện: khóa cuộn và tạm "tắt" phần trang phía sau (inert)
    document.body.classList.add("welcome-open");
    behind.forEach(function (el) { if (el) el.inert = true; });
    var enterBtn = document.getElementById("welcomeEnter");
    enterBtn.focus();

    var leaving = false;
    function enter() {
      if (leaving) return;
      leaving = true;
      try { sessionStorage.setItem(WELCOME_KEY, "1"); } catch (e) { /* bỏ qua */ }
      welcome.classList.add("is-leaving"); // CSS trượt màn hình chào lên trên
      document.body.classList.remove("welcome-open");
      behind.forEach(function (el) { if (el) el.inert = false; });
      setTimeout(function () {
        welcome.remove();
        document.getElementById("main").focus({ preventScroll: true });
      }, reduceMotion ? 50 : 850);
      cleanup();
    }

    // Lăn chuột (bất kỳ chiều nào) → vào trang
    function onWheel(e) { if (Math.abs(e.deltaY) > 4) { e.preventDefault(); enter(); } }
    // Vuốt trên điện thoại: kéo đủ 40px theo chiều dọc
    var startY = null;
    function onTouchStart(e) { startY = e.touches[0].clientY; }
    function onTouchMove(e) {
      if (startY !== null && Math.abs(e.touches[0].clientY - startY) > 40) { e.preventDefault(); enter(); }
    }
    // Bàn phím: mũi tên xuống, Page Down, phím cách
    function onKey(e) {
      if (["ArrowDown", "PageDown", " "].indexOf(e.key) !== -1 && !e.target.closest(".lang-btn")) {
        e.preventDefault();
        enter();
      }
    }
    function cleanup() {
      welcome.removeEventListener("wheel", onWheel);
      welcome.removeEventListener("touchstart", onTouchStart);
      welcome.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("keydown", onKey);
    }

    enterBtn.addEventListener("click", enter);
    welcome.addEventListener("wheel", onWheel, { passive: false });
    welcome.addEventListener("touchstart", onTouchStart, { passive: true });
    welcome.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("keydown", onKey);
  }

  /* Cây đàn bầu ở hero
     Đàn bầu không bấm phím: người chơi đặt cạnh bàn tay lên các "điểm nút"
     (1/2, 1/3, 1/4… chiều dài dây) rồi gảy → ra bồi âm. Ở đây bấm vào đâu trên dây
     thì chọn điểm nút gần nhất. Dây gốc tính là nốt Đô (C3 ≈ 130.81 Hz). */
  var BASE_HZ = 130.81;
  var KEY_SEQUENCE = [1, 2, 3, 4, 5, 6, 8]; // thứ tự khi gảy bằng bàn phím (1 = âm thực, dây buông)
  var keyIndex = 0;
  var raf = null;

  function stringGeometry() {
    var G = ASV.Motif.BAU;
    var dx = G.px - G.sx, dy = G.py - G.sy, len = Math.hypot(dx, dy);
    return { G: G, dx: dx, dy: dy, nx: -dy / len, ny: dx / len };
  }

  // Đổi tọa độ chuột trên màn hình → tọa độ trong hình SVG
  function toSvgX(svg, clientX, clientY) {
    var pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse()).x;
  }

  // Vị trí bấm → bồi âm thứ n (điểm nút gần nhất, tính từ trục lên dây)
  // Chạm ở đoạn dây gần cần đàn (xa hơn điểm nút giữa dây) → âm thực: dây buông, không chạm điểm nút (n = 1)
  function harmonicAt(svgX) {
    var G = ASV.Motif.BAU;
    var f = Math.min(1, Math.max(0, (G.px - svgX) / (G.px - G.sx)));
    if (f > 0.72) return 1;
    var best = 2;
    for (var n = 2; n <= 8; n++) {
      if (Math.abs(f - 1 / n) < Math.abs(f - 1 / best)) best = n;
    }
    return best;
  }

  // Dây rung theo sóng đứng có n bụng sóng, tắt dần trong khoảng 1 giây
  function vibrate(svg, n) {
    var s = stringGeometry();
    var paths = svg.querySelectorAll(".bau-string, .bau-string-halo");
    var straight = "M" + s.G.sx + " " + s.G.sy + " L" + s.G.px + " " + s.G.py;
    cancelAnimationFrame(raf);
    if (reduceMotion) return;
    var t0 = performance.now();
    function frame(now) {
      var t = (now - t0) / 1000;
      var amp = 7 * Math.exp(-t / 0.8);
      if (amp < 0.25) { paths.forEach(function (p) { p.setAttribute("d", straight); }); return; }
      var d = "";
      for (var i = 0; i <= 64; i++) {
        var u = i / 64;
        var off = amp * Math.sin(n * Math.PI * u) * Math.sin(2 * Math.PI * 11 * t);
        d += (i ? "L" : "M") + (s.G.sx + s.dx * u + s.nx * off).toFixed(1) + " " + (s.G.sy + s.dy * u + s.ny * off).toFixed(1);
      }
      paths.forEach(function (p) { p.setAttribute("d", d); });
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }

  // Hiện vòng tròn nhỏ ở điểm nút (chỗ cạnh bàn tay chạm dây)
  function showTouch(svg, n) {
    var G = ASV.Motif.BAU;
    var u = 1 - 1 / n; // vị trí điểm nút tính từ đầu cần đàn
    var mark = svg.querySelector(".bau-touch");
    mark.setAttribute("cx", (G.sx + (G.px - G.sx) * u).toFixed(1));
    mark.setAttribute("cy", (G.sy + (G.py - G.sy) * u).toFixed(1));
    mark.classList.remove("is-on");
    void mark.getBoundingClientRect(); // chạy lại hiệu ứng
    mark.classList.add("is-on");
  }

  function pluck(n) {
    var btn = document.getElementById("heroBau");
    var svg = btn.querySelector("svg");
    ASV.Player.play({
      key: "hero-bau",
      // Tiêu đề có sẵn cả hai ngôn ngữ để thanh phát đổi theo khi bấm VI/EN
      title: n === 1
        ? { vi: ASV_TRANSLATIONS.vi["home.bau.titleOpen"], en: ASV_TRANSLATIONS.en["home.bau.titleOpen"] }
        : { vi: ASV_TRANSLATIONS.vi["home.bau.title"].replace("{n}", n), en: ASV_TRANSLATIONS.en["home.bau.title"].replace("{n}", n) },
      synth: ["bau-harmonic"],
      params: { freq: BASE_HZ * n }
    });
    vibrate(svg, n);
    if (n > 1) showTouch(svg, n); // âm thực không chạm điểm nút nào
    bgRipple();
    document.getElementById("bauStatus").textContent = "· " + (n === 1 ? I18n.t("home.bau.open") : I18n.t("home.bau.harmonic", { n: n }));
  }

  function setupBau() {
    var btn = document.getElementById("heroBau");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      var n;
      if (e.detail === 0) {
        // Bấm bằng bàn phím (Enter/Space): gảy lần lượt các bồi âm
        n = KEY_SEQUENCE[keyIndex++ % KEY_SEQUENCE.length];
      } else {
        n = harmonicAt(toSvgX(btn.querySelector("svg"), e.clientX, e.clientY));
      }
      pluck(n);
    });
  }

  /* Hoa văn nền của hero
     - Khoét "lỗ" trong mặt nạ đúng chỗ tiêu đề/mô tả/nút và cây đàn → hoa văn không nằm sau chúng.
     - Parallax: khi cuộn, lớp xa trôi 0.05, lớp gần 0.1 quãng cuộn, tối đa 30px.
     - Gợn sóng: chạm dây đàn → một vòng sóng nhạt lan ra từ cây đàn (chạy một lần). */
  function placeHoles() {
    var bg = document.getElementById("heroBg");
    if (!bg) return;
    var box = bg.getBoundingClientRect();
    function hole(el, prefix, kx, ky) {
      if (!el) return;
      var r = el.getBoundingClientRect();
      // Bán kính elip = nửa kích thước khối, nới rộng thêm để vùng mờ dần nằm ngoài chữ
      bg.style.setProperty("--" + prefix + "-x", (r.left + r.width / 2 - box.left).toFixed(0) + "px");
      bg.style.setProperty("--" + prefix + "-y", (r.top + r.height / 2 - box.top).toFixed(0) + "px");
      bg.style.setProperty("--" + prefix + "-w", (r.width * kx).toFixed(0) + "px");
      bg.style.setProperty("--" + prefix + "-h", (r.height * ky).toFixed(0) + "px");
    }
    // Khối chữ: đo bề rộng thật của phần CHỮ trong tiêu đề (thẻ h1 trải hết bề ngang nên không dùng được)
    var text = document.querySelector(".hero-text");
    var title = document.getElementById("hero-title");
    if (text && title) {
      var tr = text.getBoundingClientRect();
      var range = document.createRange();
      range.selectNodeContents(title);
      var w = Math.max(range.getBoundingClientRect().width, 320);
      bg.style.setProperty("--t-x", (tr.left + tr.width / 2 - box.left).toFixed(0) + "px");
      bg.style.setProperty("--t-y", (tr.top + tr.height / 2 - box.top).toFixed(0) + "px");
      bg.style.setProperty("--t-w", (w * 0.64).toFixed(0) + "px");
      bg.style.setProperty("--t-h", (tr.height * 0.66).toFixed(0) + "px");
    }
    hole(document.querySelector(".bau-stage"), "b", 0.64, 0.66);
  }

  function setupParallax() {
    if (reduceMotion) return;
    var far = document.getElementById("bgFar"), near = document.getElementById("bgNear");
    if (!far || !near) return;
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        far.style.transform = "translate3d(0," + Math.min(30, y * 0.05).toFixed(1) + "px,0)";
        near.style.transform = "translate3d(0," + Math.min(30, y * 0.1).toFixed(1) + "px,0)";
        ticking = false;
      });
    }, { passive: true });
  }

  function bgRipple() {
    if (reduceMotion) return;
    var bg = document.getElementById("heroBg"), ring = document.getElementById("bgRipple");
    var stage = document.querySelector(".bau-stage");
    if (!bg || !ring || !stage) return;
    var box = bg.getBoundingClientRect(), r = stage.getBoundingClientRect();
    ring.style.left = (r.left + r.width / 2 - box.left).toFixed(0) + "px";
    ring.style.top = (r.top + r.height * 0.4 - box.top).toFixed(0) + "px";
    ring.classList.remove("is-on");
    void ring.getBoundingClientRect(); // chạy lại hiệu ứng từ đầu
    ring.classList.add("is-on");
  }

  function setupHeroBg() {
    placeHoles();
    setupParallax();
    window.addEventListener("resize", placeHoles);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeHoles);
    // Ảnh tranh tải xong có thể làm hero cao hơn → tính lại
    document.querySelectorAll(".screen-panel img").forEach(function (img) { img.addEventListener("load", placeHoles); });
  }

  /* Ba bức tranh: nhãn cho trình đọc màn hình
     Bấm tranh mở bản ghi UNESCO (common.js: ASV.openRecording). Khi mở bằng file://,
     video mở ở tab mới nên nhãn và biểu tượng phải báo trước điều đó. */
  function labelPaintings() {
    document.querySelectorAll(".screen-play[data-recording]").forEach(function (btn) {
      var g = ASV_DATA.genres.filter(function (x) { return x.id === btn.getAttribute("data-recording"); })[0];
      btn.setAttribute("aria-label", I18n.t(ASV.canEmbedVideo ? "home.screen.rec" : "home.screen.recExternal", { name: I18n.pick(g.name) }));
      btn.querySelector(".rec-icon").innerHTML = ASV.icon(ASV.canEmbedVideo ? "play" : "external");
    });
  }

  /* Thẻ video */
  function renderVideos() {
    var grid = document.getElementById("videoGrid");
    if (!grid) return;
    var ids = grid.getAttribute("data-genres").split(",");
    grid.innerHTML = ids.map(function (id) {
      var g = ASV_DATA.genres.filter(function (x) { return x.id === id; })[0];
      return g ? '<div class="col-md-4">' + ASV.videoCard(g) + "</div>" : "";
    }).join("");
    ASV.syncPlayButtons();
  }

  /* Nghe thử một nhạc cụ */
  function pickRandom() {
    var list = ASV_DATA.instruments.filter(function (it) { return !current || it.id !== current.id; });
    return list[Math.floor(Math.random() * list.length)];
  }

  function renderToday() {
    if (!current) return;
    var it = current;

    var mediaBox = document.getElementById("todayMedia");
    mediaBox.innerHTML = "";
    var name = I18n.pick(it.name); // bản EN: bỏ dấu ("Dan bau")
    mediaBox.appendChild(ASV.createMedia({ src: it.image, name: name, kind: "instrument" }));

    document.getElementById("todayName").textContent = name;
    document.getElementById("todayGloss").textContent = I18n.pick(it.gloss);
    document.getElementById("todayFamily").textContent = I18n.t("family." + it.family);
    document.getElementById("todayDesc").innerHTML = ASV.renderText(it.desc);
    document.getElementById("todayMaterial").innerHTML = ASV.renderText(it.material);
    document.getElementById("todayPlay").innerHTML = ASV.renderText(it.play);
    document.getElementById("todayListen").innerHTML = ASV.playButton("instrument:" + it.id);
    // Link mở đúng nhạc cụ khi trang Nhạc cụ hoàn thành (instruments.html#dan-bau)
    document.getElementById("todayMore").setAttribute("href", "instruments.html#" + it.id);
    ASV.syncPlayButtons();
  }

  function setupToday() {
    current = pickRandom();
    renderToday();
    document.getElementById("todayAnother").addEventListener("click", function () {
      // Nếu đang phát nhạc cụ cũ thì dừng trước khi đổi
      if (ASV.Player.isActive("instrument:" + current.id)) ASV.Player.stop(true);
      current = pickRandom();
      renderToday();
    });
  }

  /* Khởi động */
  ASV.ready(function () {
    setupWelcome();
    setupBau();
    setupHeroBg();
    renderVideos();
    labelPaintings();
    setupToday();
  });

  // Đổi ngôn ngữ → vẽ lại phần chữ lấy từ data.js
  document.addEventListener("asv:langchange", function () {
    renderVideos();
    labelPaintings();
    renderToday();
    document.getElementById("bauStatus").textContent = "";
    placeHoles(); // chữ đổi độ dài → tính lại lỗ mặt nạ
  });
})();
