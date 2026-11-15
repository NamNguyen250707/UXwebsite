/* common.js: Phần dùng chung cho mọi trang
   1. Danh sách trang + đánh dấu trang nào đã làm xong
   2. Tiện ích nhỏ (escape, lưu trữ an toàn)
   3. Biểu tượng SVG + biểu tượng đàn bầu (logo, dải phân cách, cây đàn ở hero)
   4. Navbar, footer, khối "Xem tiếp"
   5. Thông báo "Sẽ có trong bản hoàn chỉnh"
   6. Âm thanh: thử file thật → thiếu file thì tổng hợp bằng Web Audio
   7. Ảnh có ô giữ chỗ khi chưa có file
   8. Thẻ video biểu diễn (YouTube của UNESCO)
   Thứ tự nạp: i18n.js → data.js → common.js → <trang>.js */

var ASV = window.ASV || {};

/* Danh sách trang
   ready: false → link tới trang đó hiện thông báo thay vì dẫn tới trang lỗi.
   Làm xong trang nào thì đổi ready thành true. */
ASV.PAGES = [
  { id: "home",        href: "HomePage.html",    icon: "home",     ready: true },
  { id: "genres",      href: "genres.html",      icon: "map",      ready: true },
  { id: "instruments", href: "instruments.html", icon: "lute",     ready: true },
  { id: "history",     href: "history.html",     icon: "timeline", ready: true }
];

/* Tiện ích */
ASV.escape = function (str) {
  return String(str === undefined || str === null ? "" : str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
};

// Hiện chữ từ data.js; tô vàng các chỗ [CẦN KIỂM CHỨNG] nếu bật showVerifyMarks
ASV.renderText = function (value) {
  var html = ASV.escape(I18n.pick(value));
  var show = window.ASV_DATA && ASV_DATA.showVerifyMarks;
  return html.replace(/\s*\[(CẦN KIỂM CHỨNG|CAN KIEM CHUNG)[^\]]*\]/g, function (m) {
    return show ? ' <mark class="verify">' + m.trim() + "</mark>" : "";
  });
};

// localStorage có thể bị chặn (chế độ riêng tư, file://) → luôn bọc try/catch
ASV.storage = {
  get: function (key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  },
  set: function (key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
  }
};

ASV.findPage = function (href) {
  if (!href) return null;
  var file = href.split("#")[0].split("?")[0].split("/").pop();
  for (var i = 0; i < ASV.PAGES.length; i++) {
    if (ASV.PAGES[i].href === file) return ASV.PAGES[i];
  }
  return null;
};

/* Biểu tượng SVG (không dùng emoji) */
ASV.ICONS = {
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="1" fill="currentColor" stroke="none"/>',
  map: '<path d="M3.5 6.5l5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/>',
  lute: '<circle cx="9" cy="15" r="5"/><path d="M12.6 11.4L19 5M17.5 3.5l3 3M8 15.5l2-2"/>',
  timeline: '<path d="M7 3v18"/><circle cx="7" cy="6" r="2" fill="currentColor"/><circle cx="7" cy="12" r="2" fill="currentColor"/><circle cx="7" cy="18" r="2" fill="currentColor"/><path d="M11 6h9M11 12h6M11 18h8"/>',
  ear: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  home: '<path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5M10 20v-5h4v5"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  shuffle: '<path d="M3 7h3.5c4 0 6 10 10 10H21M3 17h3.5c1.6 0 2.8-1.6 3.9-3.6M14 9.6C15 8 16 7 17.5 7H21M18 4l3 3-3 3M18 14l3 3-3 3"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  down: '<path d="M12 4v15M6 13l6 6 6-6"/>'
};

ASV.icon = function (name, extraClass) {
  return '<svg class="icon ' + (extraClass || "") + '" viewBox="0 0 24 24" width="24" height="24" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    (ASV.ICONS[name] || "") + "</svg>";
};

/* Biểu tượng đàn bầu
   Biểu tượng của site là cây đàn bầu (đàn một dây, đặc trưng của Việt Nam)
   đặt trong con dấu đỏ son, giống con dấu trên các bức tranh ở trang chủ.
   Dùng cho: logo, dải phân cách, biểu tượng tải, cây đàn lớn ở hero. */
ASV.Motif = (function () {
  var uid = 0;

  // Tọa độ dây đàn ở hero (viewBox 1000×180): S = điểm buộc trên cần đàn, P = trục lên dây
  var BAU = { sx: 64, sy: 34, px: 948, py: 108 };

  // Logo: con dấu đỏ son, bên trong là đàn bầu cách điệu (thân, cần, bầu, dây)
  function logo() {
    return '<svg class="mt-svg mt-logo" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
      '<rect class="mt-seal" x="2" y="2" width="60" height="60" rx="6"/>' +
      '<rect class="mt-seal-line" x="6.5" y="6.5" width="51" height="51" rx="3"/>' +
      '<path class="mt-paper" d="M11 45 L54 42 L54 47.5 L11 50.5 Z"/>' +
      '<path class="mt-paper-line" d="M18.5 45 C17.5 34 16.5 24 15.5 12.5"/>' +
      '<circle class="mt-paper" cx="18.2" cy="38.5" r="4.8"/>' +
      '<path class="mt-paper-thin" d="M16 18.5 L52 42.3"/>' +
      "</svg>";
  }

  // Biểu tượng tải: một sợi dây đang rung
  function loader() {
    return '<svg class="mt-svg mt-loader" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path class="mt-wave" d="M2 12 Q7 4 12 12 T22 12"/></svg>';
  }

  // Dải phân cách: dây đàn có các điểm nút, con dấu ở giữa
  function divider() {
    var id = "mtband" + (++uid);
    var band = '<svg class="mt-band" aria-hidden="true" focusable="false" preserveAspectRatio="none">' +
      '<defs><pattern id="' + id + '" width="26" height="14" patternUnits="userSpaceOnUse">' +
      '<line class="mt-line" x1="0" y1="7" x2="26" y2="7"/><circle class="mt-dot" cx="13" cy="7" r="2"/>' +
      '</pattern></defs><rect width="100%" height="14" fill="url(#' + id + ')"/></svg>';
    return band + '<span class="mt-divider-mark">' + logo() + "</span>" + band;
  }

  // Cây đàn bầu lớn nằm ngang dưới bình phong tranh (trang chủ)
  function danBau() {
    var nodes = "";
    // Đánh dấu các điểm nút bồi âm (1/2, 1/3 … 1/8 chiều dài dây, tính từ trục lên dây)
    for (var n = 2; n <= 8; n++) {
      var x = BAU.px - (BAU.px - BAU.sx) / n;
      var y = 121 - (10 * (x - 26)) / 950 + 3; // nằm trên mặt đàn
      nodes += '<path class="bau-node" d="M' + x.toFixed(1) + " " + (y - 3.5).toFixed(1) + " l3.5 3.5 l-3.5 3.5 l-3.5 -3.5z\"/>";
    }
    var line = "M" + BAU.sx + " " + BAU.sy + " L" + BAU.px + " " + BAU.py;
    return '<svg class="bau-svg" viewBox="0 0 1000 180" aria-hidden="true" focusable="false">' +
      // Thân đàn (hộp gỗ dài) và mặt đàn
      '<path class="bau-body" d="M26 121 L976 111 L976 133 Q976 142 966 142 L36 151 Q26 151 26 142 Z"/>' +
      '<path class="bau-top" d="M26 121 L976 111 L976 118 L26 129 Z"/>' +
      '<path class="bau-inlay" d="M70 140 L930 131.5"/>' +
      nodes +
      // Cần đàn (vòi) bằng sừng và bầu cộng hưởng
      '<path class="bau-rod-out" d="M80 122 C76 86 68 54 62 18"/>' +
      '<path class="bau-rod" d="M80 122 C76 86 68 54 62 18"/>' +
      '<circle class="bau-knob" cx="62" cy="17" r="4.5"/>' +
      '<ellipse class="bau-gourd" cx="78" cy="101" rx="17" ry="15"/>' +
      '<ellipse class="bau-gourd" cx="75" cy="80" rx="9" ry="8"/>' +
      // Trục lên dây ở đầu kia
      '<rect class="bau-peg" x="942" y="97" width="14" height="22" rx="3"/>' +
      '<path class="bau-crank" d="M956 103 h16 v-8"/>' +
      // Dây đàn: lớp viền sáng + dây; điểm chạm của bàn tay
      '<path class="bau-string-halo" d="' + line + '"/>' +
      '<path class="bau-string" d="' + line + '"/>' +
      '<circle class="bau-touch" r="10" cx="0" cy="0"/>' +
      "</svg>";
  }

  return { BAU: BAU, logo: logo, loader: loader, divider: divider, danBau: danBau };
})();

// Điền họa tiết vào các chỗ đánh dấu data-motif="logo|loader|danBau", data-divider, data-icon
ASV.fillMotifs = function (root) {
  root = root || document;
  root.querySelectorAll("[data-motif]").forEach(function (el) {
    var kind = el.getAttribute("data-motif");
    if (ASV.Motif[kind]) el.innerHTML = ASV.Motif[kind]();
  });
  root.querySelectorAll("[data-divider]").forEach(function (el) {
    el.classList.add("mt-divider");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = ASV.Motif.divider();
  });
  root.querySelectorAll("[data-icon]").forEach(function (el) {
    el.innerHTML = ASV.icon(el.getAttribute("data-icon"));
  });
};

/* Navbar, footer, "Xem tiếp" */
ASV.renderHeader = function () {
  var host = document.getElementById("site-header");
  if (!host) return;
  var current = document.body.getAttribute("data-page");

  var links = ASV.PAGES.map(function (p) {
    var active = p.id === current;
    return '<li class="nav-item"><a class="nav-link' + (active ? " active" : "") + '" href="' + p.href + '"' +
      (active ? ' aria-current="page"' : "") + ' data-i18n="nav.' + p.id + '">' + ASV.escape(I18n.t("nav." + p.id)) + "</a></li>";
  }).join("");

  host.innerHTML =
    '<a class="skip-link" href="#main" data-i18n="skip">' + I18n.t("skip") + "</a>" +
    '<header class="site-header">' +
      '<nav class="navbar navbar-expand-lg site-nav" data-i18n-aria-label="nav.label" aria-label="' + I18n.t("nav.label") + '">' +
        '<div class="container">' +
          '<a class="navbar-brand brand" href="HomePage.html">' + ASV.Motif.logo() +
            '<span class="brand-name" data-i18n="site.name">' + I18n.t("site.name") + "</span></a>" +
          '<div class="lang-switch order-lg-last" role="group" data-i18n-aria-label="lang.group" aria-label="' + I18n.t("lang.group") + '">' +
            '<button type="button" class="lang-btn" data-lang="vi" lang="vi" data-i18n-title="lang.vi" title="Tiếng Việt">VI</button>' +
            '<button type="button" class="lang-btn" data-lang="en" lang="en" data-i18n-title="lang.en" title="English">EN</button>' +
          "</div>" +
          '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#asvNav" aria-controls="asvNav" ' +
            'aria-expanded="false" data-i18n-aria-label="nav.toggle" aria-label="' + I18n.t("nav.toggle") + '">' +
            '<span class="navbar-toggler-icon"></span></button>' +
          '<div class="collapse navbar-collapse" id="asvNav"><ul class="navbar-nav ms-lg-auto me-lg-3">' + links + "</ul></div>" +
        "</div>" +
      "</nav>" +
    "</header>";

  ASV.syncLangButtons();

  // Dự phòng: nếu chưa có Bootstrap JS thì tự bật/tắt menu trên di động
  if (!window.bootstrap) {
    var toggler = host.querySelector(".navbar-toggler");
    var menu = host.querySelector("#asvNav");
    toggler.addEventListener("click", function () {
      var open = menu.classList.toggle("show");
      toggler.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
};

// Nút VI/EN ở bất kỳ đâu (navbar, màn hình chào) dùng chung một bộ lắng nghe
document.addEventListener("click", function (e) {
  var btn = e.target.closest(".lang-btn[data-lang]");
  if (btn) I18n.set(btn.getAttribute("data-lang"));
});

ASV.syncLangButtons = function () {
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    var on = btn.getAttribute("data-lang") === I18n.lang;
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.classList.toggle("is-active", on);
  });
};

ASV.renderFooter = function () {
  var host = document.getElementById("site-footer");
  if (!host) return;
  var links = ASV.PAGES.map(function (p) {
    return '<li><a href="' + p.href + '" data-i18n="nav.' + p.id + '">' + ASV.escape(I18n.t("nav." + p.id)) + "</a></li>";
  }).join("");

  host.innerHTML =
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="row g-4">' +
          '<div class="col-md-5">' +
            '<p class="footer-brand">' + ASV.Motif.logo() + '<span data-i18n="site.name">' + I18n.t("site.name") + "</span></p>" +
            '<p data-i18n="site.tagline">' + I18n.t("site.tagline") + "</p>" +
            '<p class="footer-small" data-i18n="footer.aboutText">' + I18n.t("footer.aboutText") + "</p>" +
          "</div>" +
          '<div class="col-6 col-md-3">' +
            '<h2 class="footer-title" data-i18n="footer.explore">' + I18n.t("footer.explore") + "</h2>" +
            '<ul class="footer-links">' + links + "</ul>" +
          "</div>" +
          '<div class="col-12 col-md-4">' +
            '<h2 class="footer-title" data-i18n="footer.about">' + I18n.t("footer.about") + "</h2>" +
            '<p class="footer-small" data-i18n="footer.synthNote">' + I18n.t("footer.synthNote") + "</p>" +
            '<p class="footer-small" data-i18n="footer.motif">' + I18n.t("footer.motif") + "</p>" +
            '<p class="footer-small" data-i18n="footer.videoNote">' + I18n.t("footer.videoNote") + "</p>" +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<span data-i18n="footer.copy">' + I18n.t("footer.copy") + "</span>" +
          '<a href="#top" data-i18n="footer.top">' + I18n.t("footer.top") + "</a>" +
        "</div>" +
      "</div>" +
    "</footer>";
};

// Khối "Xem tiếp": <section id="explore-next" data-next="genres,history">
ASV.renderNext = function () {
  var host = document.getElementById("explore-next");
  if (!host) return;
  var ids = (host.getAttribute("data-next") || "").split(",");
  var cards = ids.map(function (id) {
    var p = ASV.PAGES.filter(function (x) { return x.id === id.trim(); })[0];
    if (!p) return "";
    return '<div class="col-md-6"><a class="next-card" href="' + p.href + '">' +
      '<span class="next-text"><span class="next-title" data-i18n="page.' + p.id + '.title"></span>' +
      '<span class="next-desc" data-i18n="page.' + p.id + '.desc"></span></span>' +
      "</a></div>";
  }).join("");

  host.classList.add("explore-next");
  host.setAttribute("aria-labelledby", "explore-next-title");
  host.innerHTML = '<div class="container"><div data-divider></div>' +
    '<h2 class="section-title text-center" id="explore-next-title" data-i18n="next.title"></h2>' +
    '<div class="row g-3 justify-content-center">' + cards + "</div></div>";
};

/* Thông báo "sẽ có trong bản hoàn chỉnh" */
ASV.toast = (function () {
  var box, timer;
  function ensure() {
    if (box) return box;
    box = document.createElement("div");
    box.className = "asv-toast";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
    box.addEventListener("click", function () { box.classList.remove("is-visible"); });
    return box;
  }
  return function (message) {
    var el = ensure();
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(timer);
    timer = setTimeout(function () { el.classList.remove("is-visible"); }, 3500);
  };
})();

// Bắt mọi cú bấm vào link tới trang chưa làm hoặc phần tử có data-coming-soon
document.addEventListener("click", function (e) {
  var soon = e.target.closest("[data-coming-soon]");
  if (soon) {
    e.preventDefault();
    ASV.toast(I18n.t("comingSoon"));
    return;
  }
  var link = e.target.closest("a[href]");
  if (!link) return;
  var page = ASV.findPage(link.getAttribute("href"));
  if (page && !page.ready) {
    e.preventDefault();
    ASV.toast(I18n.t("comingSoon.page", { page: I18n.t("nav." + page.id) }));
  }
});

/* Âm thanh tổng hợp (Web Audio)
   Dùng khi chưa có file ghi âm. Mỗi preset là một câu nhạc ngắn gợi tả
   âm sắc nhạc cụ; trả về độ dài (giây). Chỉ là minh họa, không phải bản thu. */
ASV.Synth = (function () {
  var ctx = null, noiseBuf = null;

  function getCtx() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // Tên nốt → tần số (A4 = 440 Hz)
  function hz(name) {
    var m = /^([A-G])(#|b)?(-?\d)$/.exec(name);
    var base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]];
    var midi = (Number(m[3]) + 1) * 12 + base + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function noise() {
    if (!noiseBuf) {
      var len = ctx.sampleRate * 2;
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = noiseBuf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    var src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    return src;
  }

  function filter(type, freq, q, gain) {
    var f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    if (q !== undefined) f.Q.value = q;
    if (gain !== undefined) f.gain.value = gain;
    return f;
  }

  // Tiếng gảy (đàn tranh, nguyệt, tỳ bà…): tắt dần, có thể nhấn nhá (bend)
  function pluck(out, t, f, o) {
    o = o || {};
    var d = o.decay || 1;
    var osc = ctx.createOscillator();
    osc.type = o.type || "triangle";
    osc.frequency.setValueAtTime(f, t);
    if (o.bendTo) {
      var bt = t + (o.bendAt || 0.25);
      osc.frequency.setValueAtTime(f, bt);
      osc.frequency.exponentialRampToValueAtTime(o.bendTo, bt + 0.18);
    }
    var lp = filter("lowpass", o.cutoff || 3000, 0.7);
    lp.frequency.setValueAtTime(o.cutoff || 3000, t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(250, (o.cutoff || 3000) * 0.25), t + d);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(o.gain || 0.3, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    osc.connect(lp); lp.connect(g); g.connect(out);
    osc.start(t); osc.stop(t + d + 0.05);
  }

  // Lên xuống cao độ liền mạch theo chuỗi nốt [[tên nốt, thời điểm], …]
  function glideFreq(param, seq, t, glide, mult) {
    var prev = hz(seq[0][0]) * mult;
    param.setValueAtTime(prev, t);
    for (var i = 1; i < seq.length; i++) {
      var f = hz(seq[i][0]) * mult, at = t + seq[i][1];
      param.setValueAtTime(prev, at - glide);
      param.exponentialRampToValueAtTime(f, at);
      prev = f;
    }
  }

  // Âm ngân liên tục (đàn nhị, sáo, kèn, giọng hát…)
  function sustained(out, t, seq, end, o) {
    var glide = o.glide || 0.08, level = o.level || 0.3;
    var g = ctx.createGain();
    var nodes = [];

    // Bao âm: gảy (pluckAt) hoặc thổi/kéo (attack)
    g.gain.setValueAtTime(0, t);
    if (o.pluckAt) {
      o.pluckAt.forEach(function (p) {
        g.gain.setTargetAtTime(level, t + p, 0.004);
        g.gain.setTargetAtTime(level * (o.decayTo || 0.4), t + p + 0.03, 0.6);
      });
    } else {
      g.gain.setTargetAtTime(level, t, (o.attack || 0.08) / 3);
    }
    g.gain.setTargetAtTime(0, t + end - 0.35, 0.1);

    // Rung (vibrato) bắt đầu muộn một chút như người chơi thật
    var lfo = ctx.createOscillator(), lfoGain = ctx.createGain();
    var vib = o.vib || [5, 0.01];
    lfo.frequency.value = vib[0];
    lfoGain.gain.setValueAtTime(0, t);
    lfoGain.gain.linearRampToValueAtTime(hz(seq[0][0]) * vib[1], t + (o.vibDelay || 0.45));
    lfo.connect(lfoGain);
    nodes.push(lfo);

    // Dao động chính + bồi âm (harmonics)
    var partials = o.partials || [[1, 1]];
    var mix = ctx.createGain();
    partials.forEach(function (p) {
      var osc = ctx.createOscillator();
      osc.type = p[2] || o.type || "sawtooth";
      glideFreq(osc.frequency, seq, t, glide, p[0]);
      lfoGain.connect(osc.frequency);
      var pg = ctx.createGain();
      pg.gain.value = p[1];
      osc.connect(pg); pg.connect(mix);
      nodes.push(osc);
    });

    // Chuỗi lọc nối tiếp
    var last = mix;
    (o.filters || []).forEach(function (f) {
      var node = filter(f[0], f[1], f[2], f[3]);
      last.connect(node);
      last = node;
    });

    // Formant song song (giả giọng hát)
    if (o.formants) {
      var sum = ctx.createGain();
      o.formants.forEach(function (fm) {
        var bp = filter("bandpass", fm[0], fm[1]);
        var fg = ctx.createGain();
        fg.gain.value = fm[2];
        last.connect(bp); bp.connect(fg); fg.connect(sum);
      });
      last = sum;
    }
    last.connect(g);

    // Tiếng hơi thở (sáo)
    if (o.breath) {
      var n = noise(), bp2 = filter("bandpass", o.breathFreq || 2500, 1), ng = ctx.createGain();
      ng.gain.value = o.breath;
      n.connect(bp2); bp2.connect(ng); ng.connect(g);
      nodes.push(n);
    }

    g.connect(out);
    nodes.forEach(function (node) { node.start(t); node.stop(t + end + 0.1); });
    return end;
  }

  // Tiếng đánh (trống): cao độ tụt nhanh + tiếng "bụp" của nhiễu
  function hit(out, t, o) {
    var osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(o.f0, t);
    osc.frequency.exponentialRampToValueAtTime(o.f1, t + (o.drop || 0.12));
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(o.gain || 0.8, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (o.decay || 0.6));
    osc.connect(g); g.connect(out);
    osc.start(t); osc.stop(t + (o.decay || 0.6) + 0.05);
    if (o.noise) {
      var n = noise(), f = filter(o.noise[0], o.noise[1], o.noise[4] || 0.8), ng = ctx.createGain();
      ng.gain.setValueAtTime(o.noise[2], t);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + o.noise[3]);
      n.connect(f); f.connect(ng); ng.connect(out);
      n.start(t); n.stop(t + o.noise[3] + 0.05);
    }
  }

  // Tiếng kim loại (cồng chiêng): nhiều âm bồi không đều, ngân lâu
  function bell(out, t, f, o) {
    o = o || {};
    var parts = o.partials || [[1, 1, 1], [1.48, 0.45, 0.6], [2.02, 0.3, 0.5], [2.74, 0.18, 0.35], [3.3, 0.1, 0.25]];
    var decay = o.decay || 2.6, gain = o.gain || 0.25;
    parts.forEach(function (p, i) {
      [0, i === 0 ? 1.3 : 0].forEach(function (detune, k) {
        if (k === 1 && !detune) return;
        var osc = ctx.createOscillator(), g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = f * p[0] + detune;
        var d = decay * p[2];
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(gain * p[1] * (k ? 0.5 : 1), t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        osc.connect(g); g.connect(out);
        osc.start(t); osc.stop(t + d + 0.05);
      });
    });
    hit(out, t, { f0: f * 0.8, f1: f * 0.6, gain: 0.0002, decay: 0.05, noise: ["lowpass", 700, 0.12, 0.09] });
  }


  // Thư viện preset: tên trong data.js → hàm tạo âm
  var PRESETS = {
    "dan-bau": function (out, t) {
      var seq = [["A4", 0], ["C5", 0.75], ["D5", 1.35], ["C5", 2.35], ["A4", 2.75]];
      return sustained(out, t, seq, 3.9, {
        type: "sine", level: 0.45, glide: 0.24, vib: [5.2, 0.012], vibDelay: 0.3,
        pluckAt: [0, 1.35], decayTo: 0.55,
        partials: [[1, 1, "sine"], [2, 0.12, "sine"], [3, 0.04, "sine"]]
      });
    },
    "dan-tranh": function (out, t) {
      ["D4", "F4", "G4", "A4", "C5", "D5", "C5", "A4"].forEach(function (n, i) {
        pluck(out, t + i * 0.2, hz(n), { type: "triangle", decay: 1.6, gain: 0.28, cutoff: 4200 });
        pluck(out, t + i * 0.2, hz(n) * 2, { type: "sine", decay: 0.8, gain: 0.06 });
      });
      pluck(out, t + 1.75, hz("G4"), { type: "triangle", decay: 1.9, gain: 0.3, cutoff: 4200, bendTo: hz("A4"), bendAt: 0.35 });
      return 3.7;
    },
    "dan-nguyet": function (out, t) {
      ["G3", "C4", "D4", "F4", "G4", "F4", "D4", "C4"].forEach(function (n, i) {
        var o = { type: "sawtooth", decay: 0.8, gain: 0.2, cutoff: 1900 };
        if (i === 6) { o.bendTo = hz("F4"); o.bendAt = 0.12; o.decay = 1.1; }
        pluck(out, t + i * 0.26, hz(n), o);
      });
      return 3.1;
    },
    "ty-ba": function (out, t) {
      var k;
      for (k = 0; k < 12; k++) pluck(out, t + k * 0.06, hz("A4"), { type: "sawtooth", decay: 0.3, gain: k % 2 ? 0.12 : 0.18, cutoff: 2600 });
      pluck(out, t + 0.9, hz("G4"), { type: "sawtooth", decay: 0.9, gain: 0.25, cutoff: 2600 });
      for (k = 0; k < 10; k++) pluck(out, t + 1.3 + k * 0.06, hz("D4"), { type: "sawtooth", decay: 0.3, gain: k % 2 ? 0.12 : 0.18, cutoff: 2400 });
      pluck(out, t + 2.0, hz("A3"), { type: "sawtooth", decay: 1.0, gain: 0.25, cutoff: 2200 });
      return 3.0;
    },
    "dan-nhi": function (out, t) {
      var seq = [["D4", 0], ["F4", 0.5], ["G4", 0.9], ["A4", 1.5], ["G4", 2.1], ["F4", 2.5], ["D4", 2.9]];
      return sustained(out, t, seq, 3.8, {
        type: "sawtooth", level: 0.22, attack: 0.15, glide: 0.12, vib: [5.6, 0.013],
        filters: [["lowpass", 2400, 0.7], ["peaking", 1200, 1, 6]]
      });
    },
    "sao-truc": function (out, t) {
      var seq = [["D5", 0], ["F5", 0.35], ["G5", 0.6], ["A5", 0.9], ["C6", 1.4], ["A5", 1.9], ["G5", 2.2]];
      return sustained(out, t, seq, 3.2, {
        type: "sine", level: 0.32, attack: 0.06, glide: 0.07, vib: [5, 0.01],
        partials: [[1, 1, "sine"], [2, 0.08, "sine"]], breath: 0.05, breathFreq: 3200
      });
    },
    "khen": function (out, t) {
      var o = { type: "square", level: 0.07, attack: 0.18, glide: 0.06, vib: [4, 0.003], filters: [["lowpass", 1300, 0.7]] };
      sustained(out, t, [["D4", 0]], 3.3, o);
      sustained(out, t, [["A4", 0], ["G4", 1.1], ["A4", 2.1]], 3.3, o);
      sustained(out, t, [["D5", 0], ["C5", 1.1], ["D5", 2.1]], 3.3, o);
      return 3.3;
    },
    "ken-bau": function (out, t) {
      var seq = [["A4", 0], ["C5", 0.45], ["D5", 0.8], ["C5", 1.4], ["A4", 1.8], ["G4", 2.2], ["A4", 2.6]];
      return sustained(out, t, seq, 3.4, {
        type: "sawtooth", level: 0.2, attack: 0.04, glide: 0.1, vib: [6, 0.014],
        filters: [["highpass", 500, 0.7], ["peaking", 1400, 1, 8], ["lowpass", 4500, 0.7]]
      });
    },
    "trong": function (out, t) {
      function tung(at, g) { hit(out, t + at, { f0: 150, f1: 70, drop: 0.12, decay: 0.7, gain: g || 0.9, noise: ["lowpass", 400, 0.2, 0.05] }); }
      function cac(at) { hit(out, t + at, { f0: 800, f1: 650, drop: 0.03, decay: 0.05, gain: 0.08, noise: ["highpass", 2000, 0.35, 0.04] }); }
      tung(0); tung(0.5); tung(1.0); cac(1.25); cac(1.375); tung(1.5); cac(1.75); tung(2.0); tung(2.25, 0.5); tung(2.5, 1);
      return 3.3;
    },
    "phach": function (out, t) {
      [0, 0.28, 0.42, 0.84, 1.12, 1.26, 1.68, 1.96, 2.1, 2.52].forEach(function (at, i) {
        hit(out, t + at, { f0: i % 2 ? 1500 : 1700, f1: 1400, drop: 0.02, decay: 0.035, gain: 0.15, noise: ["bandpass", 2400, 0.55, 0.05, 3] });
      });
      return 2.9;
    },
    "dan-trung": function (out, t) {
      function tube(at, n) {
        var f = hz(n);
        pluck(out, t + at, f, { type: "sine", decay: 0.5, gain: 0.32, cutoff: 6000 });
        pluck(out, t + at, f * 3, { type: "sine", decay: 0.12, gain: 0.05, cutoff: 8000 });
      }
      ["D5", "F5", "G5", "A5", "C6", "D6", "C6", "A5", "G5", "F5", "D5"].forEach(function (n, i) { tube(i * 0.13, n); });
      tube(1.6, "D5"); tube(1.75, "A4"); tube(1.9, "D5");
      return 2.7;
    },
    "cong-chieng": function (out, t) {
      [["G3", 0], ["A3", 0.45], ["D4", 0.9], ["G3", 1.35], ["C4", 1.6], ["A3", 1.8], ["D4", 2.25], ["G3", 2.7]].forEach(function (s) {
        bell(out, t + s[1], hz(s[0]), { decay: 2.6, gain: 0.22 });
      });
      return 5.0;
    },
    // Bồi âm đàn bầu (dùng cho cây đàn ở hero): p.freq = tần số bồi âm
    "bau-harmonic": function (out, t, p) {
      var f = (p && p.freq) || 261.63;
      var osc = ctx.createOscillator(), osc2 = ctx.createOscillator();
      var g = ctx.createGain(), g2 = ctx.createGain();
      var lfo = ctx.createOscillator(), lg = ctx.createGain();
      osc.type = "sine"; osc2.type = "sine";
      osc.frequency.setValueAtTime(f, t);
      osc2.frequency.setValueAtTime(f * 2, t);
      // Rung nhẹ như khi tay trái lắc cần đàn
      lfo.frequency.value = 5.2;
      lg.gain.setValueAtTime(0, t);
      lg.gain.linearRampToValueAtTime(f * 0.008, t + 0.9);
      lfo.connect(lg); lg.connect(osc.frequency);
      g2.gain.value = 0.08;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.5, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      osc.connect(g); osc2.connect(g2); g2.connect(g); g.connect(out);
      [osc, osc2, lfo].forEach(function (o) { o.start(t); o.stop(t + 2.5); });
      return 2.5;
    },
  };

  // Phát một hay nhiều preset cùng lúc (params: tham số thêm, ví dụ tần số); trả về { duration, stop }
  function play(names, params) {
    var c = getCtx();
    if (!c) return null;
    var master = c.createGain();
    var comp = c.createDynamicsCompressor();
    comp.threshold.value = -10;
    comp.ratio.value = 4;
    master.gain.value = 0.8;
    master.connect(comp);
    comp.connect(c.destination);

    var t = c.currentTime + 0.05, duration = 0;
    if (typeof names === "function") {
      // Âm tự viết ở trang riêng (ví dụ đàn bầu ảo cần đổi cao độ liên tục)
      duration = names(c, master, t, params) || 0;
    } else {
      (names || []).forEach(function (n) {
        if (PRESETS[n]) duration = Math.max(duration, PRESETS[n](master, t, params));
      });
    }
    if (!duration) duration = PRESETS["trong"](master, t);

    return {
      duration: duration,
      stop: function () {
        // Giảm âm lượng thật nhanh rồi ngắt để không nghe tiếng "bụp"
        master.gain.setTargetAtTime(0, c.currentTime, 0.02);
        setTimeout(function () { master.disconnect(); comp.disconnect(); }, 200);
      }
    };
  }

  return { getCtx: getCtx, play: play, presets: Object.keys(PRESETS) };
})();

/* Trình phát chung
   item = { key, title ({vi,en} hoặc chuỗi) hoặc titleKey, src, synth: [...] hoặc hàm tự viết, params }
   Luôn chỉ phát MỘT âm thanh; bấm âm mới thì âm cũ dừng. */
ASV.Player = (function () {
  var token = 0;          // tăng mỗi lần phát → bỏ qua sự kiện của lần phát cũ
  var current = null;     // { item, status: 'loading'|'playing', source: 'file'|'synth', stop }
  var missing = {};       // nhớ file nào không tồn tại để lần sau tổng hợp ngay
  var listeners = [];

  function emit() { listeners.forEach(function (fn) { fn(current); }); }

  function titleOf(item) {
    return item.titleKey ? I18n.t(item.titleKey) : I18n.pick(item.title);
  }

  function finish(myToken) {
    if (myToken !== token || !current) return;
    current = null;
    emit();
  }

  function startSynth(item, myToken) {
    var s = ASV.Synth.play(item.synth, item.params);
    if (!s) {
      current = null;
      emit();
      ASV.toast(I18n.t("player.noAudio"));
      return;
    }
    var timer = setTimeout(function () { finish(myToken); }, s.duration * 1000 + 150);
    current = { item: item, status: "playing", source: "synth", stop: function () { clearTimeout(timer); s.stop(); } };
    emit();
    ASV.announce(I18n.t("player.nowPlaying", { title: titleOf(item) }));
  }

  function play(item) {
    stop(true);
    var myToken = ++token;
    if (ASV.closeVideos) ASV.closeVideos(); // đang xem video thì đóng lại
    ASV.Synth.getCtx(); // "mở khóa" Web Audio ngay trong cú bấm của người dùng

    if (!item.src || missing[item.src]) {
      startSynth(item, myToken);
      return;
    }

    // Thử phát file thật; lỗi (chưa có file) → chuyển sang âm tổng hợp
    var audio = new Audio();
    var fellBack = false;
    function fallback() {
      if (myToken !== token || fellBack) return;
      fellBack = true;
      missing[item.src] = true;
      startSynth(item, myToken);
    }
    current = {
      item: item, status: "loading", source: "file",
      stop: function () { audio.pause(); audio.removeAttribute("src"); }
    };
    emit();

    audio.addEventListener("error", fallback);
    audio.addEventListener("playing", function () {
      if (myToken !== token || fellBack) return;
      current.status = "playing";
      emit();
      ASV.announce(I18n.t("player.nowPlaying", { title: titleOf(item) }));
    });
    audio.addEventListener("ended", function () { finish(myToken); });
    audio.src = item.src;
    var p = audio.play();
    if (p && p.catch) p.catch(fallback);
  }

  function stop(silent) {
    if (!current) return;
    var c = current;
    current = null;
    token++;
    c.stop();
    emit();
    if (!silent) ASV.announce(I18n.t("player.stopped"));
  }

  return {
    play: play,
    stop: stop,
    titleOf: titleOf,
    get current() { return current; },
    isActive: function (key) { return !!(current && current.item.key === key); },
    onChange: function (fn) { listeners.push(fn); }
  };
})();

// Vùng đọc thông báo cho trình đọc màn hình
ASV.announce = function (msg) {
  var live = document.getElementById("asvLive");
  if (!live) return;
  live.textContent = "";
  // Chờ một chút rồi mới ghi để trình đọc màn hình đọc lại cả khi câu giống lần trước
  clearTimeout(ASV.announce.timer);
  ASV.announce.timer = setTimeout(function () { live.textContent = msg; }, 50);
};

/* Danh sách mọi thứ "nghe được": khóa → item cho trình phát.
   Khóa: "instrument:<id>". Loại hình KHÔNG có âm tổng hợp: nghe bản ghi thật qua ASV.openRecording(id). */
ASV.playables = {};
ASV.buildPlayables = function () {
  ASV_DATA.instruments.forEach(function (it) {
    ASV.playables["instrument:" + it.id] = { key: "instrument:" + it.id, title: it.name, src: it.audio, synth: it.synth };
  });
};

// HTML cho nút Nghe/Dừng; trang chỉ cần chèn chuỗi này
ASV.playButton = function (key, extraClass) {
  return '<button type="button" class="btn btn-son btn-play ' + (extraClass || "") + '" data-play="' + key + '">' +
    '<span class="btn-play-icon">' + ASV.icon("play") + '</span><span class="btn-play-label">' + I18n.t("btn.listen") + "</span></button>";
};

// Cập nhật mọi nút nghe theo trạng thái trình phát
ASV.syncPlayButtons = function () {
  document.querySelectorAll("[data-play]").forEach(function (btn) {
    var active = ASV.Player.isActive(btn.getAttribute("data-play"));
    btn.classList.toggle("is-playing", active);
    var label = btn.querySelector(".btn-play-label");
    var icon = btn.querySelector(".btn-play-icon");
    if (label) label.textContent = I18n.t(active ? "btn.stop" : "btn.listen");
    if (icon) icon.innerHTML = ASV.icon(active ? "stop" : "play");
  });
};

// Một bộ lắng nghe cho mọi nút data-play trên trang
document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-play]");
  if (!btn) return;
  var key = btn.getAttribute("data-play");
  if (ASV.Player.isActive(key)) ASV.Player.stop();
  else if (ASV.playables[key]) ASV.Player.play(ASV.playables[key]);
});

// Esc dừng âm thanh ở bất kỳ đâu
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && ASV.Player.current) ASV.Player.stop();
});

// Thanh trình phát cố định ở cuối màn hình, chỉ hiện khi đang phát
ASV.renderPlayerBar = function () {
  var bar = document.createElement("div");
  bar.className = "player-bar";
  bar.id = "asvPlayer";
  bar.hidden = true;
  bar.setAttribute("role", "region");
  bar.setAttribute("data-i18n-aria-label", "player.label");
  bar.setAttribute("aria-label", I18n.t("player.label"));
  bar.innerHTML =
    '<div class="container player-inner">' +
      '<span class="player-status" aria-hidden="true"></span>' +
      '<span class="player-text"><span class="player-title"></span><span class="player-source"></span></span>' +
      '<button type="button" class="btn btn-son btn-sm player-stop">' + ASV.icon("stop") +
        '<span data-i18n="player.stop">' + I18n.t("player.stop") + "</span></button>" +
    "</div>";
  document.body.appendChild(bar);

  var live = document.createElement("div");
  live.id = "asvLive";
  live.className = "visually-hidden";
  live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);

  bar.querySelector(".player-stop").addEventListener("click", function () { ASV.Player.stop(); });
  ASV.Player.onChange(ASV.updatePlayerBar);
  ASV.Player.onChange(ASV.syncPlayButtons);
};

ASV.updatePlayerBar = function () {
  var bar = document.getElementById("asvPlayer");
  if (!bar) return;
  var c = ASV.Player.current;
  bar.hidden = !c;
  document.body.classList.toggle("has-player", !!c);
  if (!c) return;
  var status = bar.querySelector(".player-status");
  status.innerHTML = c.status === "loading" ? ASV.Motif.loader() : '<span class="eq"><i></i><i></i><i></i></span>';
  bar.querySelector(".player-title").textContent = ASV.Player.titleOf(c.item);
  bar.querySelector(".player-source").textContent =
    c.status === "loading" ? I18n.t("player.loading") :
    (c.source === "synth" ? I18n.t("player.synth") : I18n.t("player.recording")) + " · " + I18n.t("player.escHint");
};

/* Ảnh có ô giữ chỗ
   ASV.createMedia({ src, name, kind: "instrument"|"genre", className })
   Ảnh lỗi/chưa có → thay bằng ô giữ chỗ có con dấu đàn bầu và tên. */
ASV.createMedia = function (opts) {
  var wrap = document.createElement("div");
  wrap.className = "media-frame " + (opts.className || "");
  // Hình vẽ SVG: hiện trọn hình (không cắt như ảnh chụp)
  if (/\.svg$/i.test(opts.src || "")) wrap.classList.add("is-art");
  var altKey = opts.kind === "genre" ? "media.altGenre" : opts.kind === "history" ? "media.altHistory" : "media.altInstrument";

  function showPlaceholder() {
    wrap.classList.add("is-placeholder");
    wrap.innerHTML =
      '<div class="media-ph" role="img" aria-label="' + ASV.escape(I18n.t("media.placeholderAria", { name: opts.name })) + '">' +
        '<span class="media-ph-motif" aria-hidden="true">' + ASV.Motif.logo() + "</span>" +
        '<span class="media-ph-name" aria-hidden="true">' + ASV.escape(opts.name) + "</span>" +
        '<span class="media-ph-note" aria-hidden="true">' + ASV.escape(I18n.t("media.placeholder")) + "</span>" +
      "</div>";
  }

  if (!opts.src) { showPlaceholder(); return wrap; }
  var img = new Image();
  img.alt = opts.alt || I18n.t(altKey, { name: opts.name }); // opts.alt: mô tả riêng cho hình (nếu có)
  img.decoding = "async";
  img.addEventListener("error", showPlaceholder); // gắn trước khi đặt src để không lỡ sự kiện
  img.src = opts.src;
  wrap.appendChild(img);
  return wrap;
};

/* Video biểu diễn (YouTube của UNESCO)
   YouTube chặn phát nhúng khi trang mở bằng file:// (lỗi 153), nên:
   - Mở bằng file://  → nút "Mở trên YouTube" (tab mới).
   - Chạy trên web (http/https, ví dụ GitHub Pages) → có thêm "Xem tại đây":
     chỉ khi bấm mới tải trình phát (không tự phát, không tải trước).
   Video không bao giờ phát cùng lúc với âm thanh của site. */
ASV.canEmbedVideo = location.protocol === "http:" || location.protocol === "https:";

// Thẻ video cho một loại hình trong ASV_DATA.genres
// opts.compact = true: bỏ tiêu đề và dòng địa điểm (khi khung bên cạnh đã có sẵn)
ASV.videoCard = function (g, opts) {
  opts = opts || {};
  var v = g.video;
  var name = I18n.pick(g.name);
  var watchUrl = "https://www.youtube.com/watch?v=" + v.youtube;
  var poster =
    '<span class="video-poster-region">' + ASV.escape(I18n.t("region." + g.region)) + "</span>" +
    '<span class="video-poster-name">' + ASV.escape(I18n.pick(g.short)) + "</span>" +
    '<span class="video-poster-play">' + ASV.icon("play") + "</span>" +
    '<span class="video-poster-seal">' + ASV.Motif.logo() + "</span>";

  // Bấm vào ảnh bìa: phát tại chỗ (nếu được) hoặc mở YouTube
  var posterEl = ASV.canEmbedVideo
    ? '<button type="button" class="video-poster" data-video-play="' + v.youtube + '" aria-label="' +
        ASV.escape(I18n.t("video.watchAria", { name: name })) + '">' + poster + "</button>"
    : '<a class="video-poster" href="' + watchUrl + '" target="_blank" rel="noopener" aria-label="' +
        ASV.escape(I18n.t("video.openAria", { name: name })) + '">' + poster + "</a>";

  return '<article class="asv-card video-card' + (opts.compact ? " is-compact" : "") + '" data-video-card="' + g.id + '">' +
    '<div class="video-frame" data-video-id="' + v.youtube + '" data-video-title="' + ASV.escape(name) + '">' + posterEl + "</div>" +
    '<div class="video-body">' +
      (opts.compact ? "" :
        '<h3 class="video-title">' + ASV.escape(name) + "</h3>" +
        '<p class="video-meta">' + ASV.escape(I18n.pick(g.place)) + " · UNESCO " + g.unesco.year + "</p>") +
      '<div class="video-actions">' +
        (ASV.canEmbedVideo
          ? '<button type="button" class="btn btn-sm btn-outline-cham" data-video-play="' + v.youtube + '">' +
              ASV.icon("play") + "<span>" + I18n.t("video.watchHere") + "</span></button>"
          : "") +
        '<a class="btn btn-sm btn-outline-son" href="' + watchUrl + '" target="_blank" rel="noopener">' +
          "<span>" + I18n.t("video.youtube") + "</span>" + ASV.icon("external") +
          '<span class="visually-hidden">' + I18n.t("video.newTab") + "</span></a>" +
      "</div>" +
      '<p class="video-credit">' + I18n.t("video.source") + ' · <a href="' + v.unesco + '" target="_blank" rel="noopener">' +
        ASV.escape(v.credit) + '<span class="visually-hidden"> ' + I18n.t("video.newTab") + "</span></a></p>" +
    "</div></article>";
};

/* Nghe bản ghi thật của một loại hình (video UNESCO):
   - chạy trên web → khung nổi (modal) phát video ngay trong trang;
   - mở bằng file:// → YouTube chặn phát nhúng nên mở video ở tab mới. */
ASV.openRecording = function (gid) {
  var g = ASV_DATA.genres.filter(function (x) { return x.id === gid; })[0];
  if (!g) return;
  var url = "https://www.youtube.com/watch?v=" + g.video.youtube;
  ASV.Player.stop(true);
  ASV.closeVideos();
  if (!ASV.canEmbedVideo || !window.bootstrap) {
    window.open(url, "_blank", "noopener");
    return;
  }
  var el = document.getElementById("recModal");
  if (!el) {
    el = document.createElement("div");
    el.className = "modal fade";
    el.id = "recModal";
    el.tabIndex = -1;
    el.setAttribute("aria-labelledby", "recTitle");
    el.innerHTML = '<div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content asv-modal">' +
      '<div class="modal-header"><h2 class="modal-title" id="recTitle"></h2>' +
      '<button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>' +
      '<div class="modal-body p-0"><div class="rec-frame"></div></div>' +
      '<div class="modal-footer"><p class="video-credit m-0" id="recCredit"></p></div></div></div>';
    document.body.appendChild(el);
    // Đóng khung thì gỡ trình phát để video dừng hẳn
    el.addEventListener("hidden.bs.modal", function () { el.querySelector(".rec-frame").innerHTML = ""; });
  }
  el.querySelector(".btn-close").setAttribute("aria-label", I18n.t("rec.close"));
  el.querySelector("#recTitle").textContent = I18n.t("rec.title", { name: I18n.pick(g.name) });
  el.querySelector(".rec-frame").innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + g.video.youtube +
    '?autoplay=1&rel=0" title="' + ASV.escape(I18n.pick(g.name)) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" ' +
    'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  el.querySelector("#recCredit").innerHTML = I18n.t("video.source") + ' · <a href="' + g.video.unesco + '" target="_blank" rel="noopener">' +
    ASV.escape(g.video.credit) + "</a>";
  bootstrap.Modal.getOrCreateInstance(el).show();
};

document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-recording]");
  if (btn) { e.preventDefault(); ASV.openRecording(btn.getAttribute("data-recording")); }
});

// Thay ảnh bìa bằng trình phát YouTube (chỉ khi chạy trên web)
ASV.openVideo = function (id) {
  var frame = document.querySelector('.video-frame[data-video-id="' + id + '"]');
  if (!frame || !ASV.canEmbedVideo) return;
  ASV.Player.stop(true);  // dừng âm thanh của site trước
  ASV.closeVideos(frame); // chỉ một video phát mỗi lúc
  frame.dataset.poster = frame.innerHTML;
  frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' +
    frame.getAttribute("data-video-title") + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" ' +
    'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  frame.querySelector("iframe").focus();
};

// Đóng mọi video đang mở (trả lại ảnh bìa), trừ khung "except"
ASV.closeVideos = function (except) {
  document.querySelectorAll(".video-frame").forEach(function (frame) {
    if (frame !== except && frame.dataset.poster) {
      frame.innerHTML = frame.dataset.poster;
      delete frame.dataset.poster;
    }
  });
};

document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-video-play]");
  if (btn) ASV.openVideo(btn.getAttribute("data-video-play"));
});

/* Thuật ngữ (ASV_DATA.glossary)
   Tìm thuật ngữ trong chữ của trang và biến chúng thành nút nhỏ có gạch chấm; bấm vào thì hiện khung giải thích.
   - Mỗi khối chữ (đoạn văn, mục danh sách…) chỉ đánh dấu lần xuất hiện ĐẦU TIÊN của mỗi từ cho đỡ rối mắt.
   - Không đánh dấu trong tiêu đề, nút, link, menu, ô nhập, vùng thông báo, mô hình nhạc cụ.
   - Chữ do JS vẽ lại (đổi ngôn ngữ, mở hộp chi tiết…) được đánh dấu lại nhờ MutationObserver.
   - Khung giải thích đóng bằng nút Đóng, phím Esc, hoặc bấm ra ngoài; focus quay về chữ vừa bấm. */
ASV.Glossary = (function () {
  var SKIP = "a, button, h1, h2, h3, h4, h5, h6, label, input, textarea, select, svg, script, style, " +
    "[aria-live], .visually-hidden, .site-header, .site-footer, .player-bar, .welcome, .hist-nav, " +
    ".play-pads, .filter-bar, .gloss-list, .gloss-pop, .video-poster, .asv-toast, [data-no-gloss]";
  var BLOCK = "p, li, dd, td, small, figcaption, .hist-debate";
  var rules = [];   // [{ id, re }] cho ngôn ngữ đang dùng
  var pop = null, opener = null, observer = null, busy = false;

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // Lập các biểu thức tìm từ; từ dài xếp trước để "danh sách đại diện" không bị cắt bởi từ ngắn hơn
  function build() {
    var lang = I18n.lang;
    var list = [];
    ASV_DATA.glossary.forEach(function (g) {
      g.match[lang].forEach(function (m) {
        list.push({ id: g.id, text: lang === "en" ? I18n.plain(m) : m });
      });
    });
    list.sort(function (a, b) { return b.text.length - a.text.length; });
    // Ranh giới từ cho cả chữ có dấu: trước và sau không được là chữ cái
    rules = list.map(function (x) {
      return { id: x.id, re: new RegExp("(^|[^\\p{L}])(" + escapeRe(x.text) + ")(?![\\p{L}])", "iu") };
    });
  }

  function byId(id) { return ASV_DATA.glossary.filter(function (g) { return g.id === id; })[0]; }

  // Đánh dấu thuật ngữ bên trong root
  function scan(root) {
    if (!root || busy) return;
    busy = true;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || n.nodeValue.trim().length < 2) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p || p.closest(SKIP) || !p.closest(BLOCK)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var block = node.parentElement.closest(BLOCK);
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        if (block.querySelector('.gloss-term[data-gloss="' + rule.id + '"]')) continue; // khối này đã có từ đó
        var m = rule.re.exec(node.nodeValue);
        if (!m) continue;
        // Tách nút chữ: [trước][TỪ][sau], rồi quét tiếp phần "sau"
        var start = m.index + m[1].length;
        var word = node.splitText(start);
        var rest = word.splitText(m[2].length);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gloss-term";
        btn.setAttribute("data-gloss", rule.id);
        btn.setAttribute("aria-haspopup", "dialog");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = word.nodeValue;
        word.parentNode.replaceChild(btn, word);
        node = rest;
        r = -1; // quét lại phần còn lại với mọi từ
      }
    });
    busy = false;
  }

  /* Khung giải thích */
  function ensurePop() {
    if (pop) return pop;
    pop = document.createElement("div");
    pop.className = "gloss-pop";
    pop.id = "glossPop";
    pop.setAttribute("role", "dialog");
    pop.hidden = true;
    document.body.appendChild(pop);
    return pop;
  }

  function open(btn) {
    var g = byId(btn.getAttribute("data-gloss"));
    if (!g) return;
    if (opener === btn) { close(true); return; }
    close(false);
    opener = btn;
    var el = ensurePop();
    var onGlossPage = location.pathname.indexOf("instruments.html") !== -1;
    el.setAttribute("aria-labelledby", "glossPopTitle");
    el.innerHTML =
      '<p class="gloss-pop-title" id="glossPopTitle">' + ASV.escape(I18n.pick(g.term)) + "</p>" +
      '<p class="gloss-pop-def">' + ASV.escape(I18n.pick(g.def)) + "</p>" +
      '<div class="gloss-pop-actions">' +
        '<a href="' + (onGlossPage ? "" : "instruments.html") + "#thuat-ngu" + '">' + ASV.escape(I18n.t("gloss.all")) + "</a>" +
        '<button type="button" class="btn btn-sm btn-outline-cham gloss-pop-close">' + ASV.escape(I18n.t("gloss.close")) + "</button>" +
      "</div>";
    el.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-controls", "glossPop");
    place();
    el.querySelector(".gloss-pop-close").focus({ preventScroll: true });
  }

  // Đặt khung ngay dưới chữ (hoặc trên nếu sát đáy màn hình), không tràn ra hai bên
  function place() {
    if (!opener || !pop || pop.hidden) return;
    var r = opener.getBoundingClientRect();
    var w = Math.min(320, document.documentElement.clientWidth - 24);
    pop.style.width = w + "px";
    var left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), document.documentElement.clientWidth - w - 12);
    var top = r.bottom + 8;
    if (top + pop.offsetHeight > window.innerHeight - 8 && r.top - pop.offsetHeight - 8 > 0) top = r.top - pop.offsetHeight - 8;
    pop.style.left = (left + window.scrollX) + "px";
    pop.style.top = (top + window.scrollY) + "px";
  }

  function close(returnFocus) {
    if (!opener) return;
    var btn = opener;
    opener = null;
    btn.setAttribute("aria-expanded", "false");
    if (pop) pop.hidden = true;
    if (returnFocus && document.contains(btn)) btn.focus({ preventScroll: true });
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest(".gloss-term");
    if (t) { e.preventDefault(); open(t); return; }
    if (e.target.closest(".gloss-pop-close")) { close(true); return; }
    if (opener && !e.target.closest(".gloss-pop")) close(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && opener) close(true);
  });
  window.addEventListener("resize", place);

  // Danh sách đầy đủ (trang Nhạc cụ, #thuat-ngu): xếp theo thứ tự chữ cái của ngôn ngữ đang dùng
  function renderList() {
    var host = document.querySelector("[data-glossary-list]");
    if (!host) return;
    var items = ASV_DATA.glossary.slice().sort(function (a, b) {
      return I18n.pick(a.term).localeCompare(I18n.pick(b.term), I18n.lang);
    });
    host.innerHTML = items.map(function (g) {
      return '<div class="gloss-item" id="tn-' + g.id + '"><dt>' + ASV.escape(I18n.pick(g.term)) + "</dt>" +
        "<dd>" + ASV.escape(I18n.pick(g.def)) + "</dd></div>";
    }).join("");
  }

  function start() {
    build();
    renderList();
    scan(document.body);
    // Chữ mới do JS vẽ ra → đánh dấu lại (gộp nhiều thay đổi thành một lần quét)
    var timer = null;
    observer = new MutationObserver(function () {
      if (busy) return;
      clearTimeout(timer);
      timer = setTimeout(function () { scan(document.body); }, 60);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  document.addEventListener("asv:langchange", function () {
    close(false);
    build();
    renderList();
    scan(document.body);
  });

  return { start: start, scan: scan, close: close };
})();

/* Khởi động
   ASV.ready(fn): trang riêng đăng ký hàm chạy sau khi phần chung đã sẵn sàng */
(function () {
  var queue = [], done = false;
  ASV.ready = function (fn) { if (done) fn(); else queue.push(fn); };

  document.addEventListener("DOMContentLoaded", function () {
    ASV.renderHeader();
    ASV.renderFooter();
    ASV.renderNext();
    ASV.fillMotifs(document);
    ASV.buildPlayables();
    ASV.renderPlayerBar();
    I18n.apply(document);
    done = true;
    queue.forEach(function (fn) { fn(); });
    ASV.syncPlayButtons();
    if (ASV_DATA.glossary) ASV.Glossary.start(); // sau khi trang đã vẽ xong phần của mình
  });

  // Đổi ngôn ngữ → cập nhật phần chung (từng trang tự vẽ lại phần riêng)
  document.addEventListener("asv:langchange", function () {
    ASV.syncLangButtons();
    ASV.syncPlayButtons();
    ASV.updatePlayerBar();
    // Ẩn thông báo đang hiện (nó còn viết bằng ngôn ngữ cũ)
    var toast = document.querySelector(".asv-toast");
    if (toast) { toast.classList.remove("is-visible"); toast.textContent = ""; }
    // Bỏ cả thông báo đang chờ ghi (nó viết bằng ngôn ngữ cũ)
    clearTimeout(ASV.announce.timer);
    var live = document.getElementById("asvLive");
    if (live) live.textContent = "";
  });
})();
