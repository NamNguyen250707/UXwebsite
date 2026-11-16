/* genres.js: Logic riêng của genres.html (trang Loại hình)
   1. Vẽ bản đồ Việt Nam (từ js/map-data.js) và 16 nút đánh dấu
      (chấm đặc: được UNESCO ghi danh; chấm rỗng: loại hình tiêu biểu khác)
   2. Khung chi tiết: ảnh thật kèm nguồn, mô tả, danh hiệu, nhạc cụ, video
   3. Lọc theo vùng (Bắc Bộ / Trung Bộ / Tây Nguyên / Nam Bộ) và theo nhóm (UNESCO / loại hình khác)
   4. Danh sách thẻ cho người không dùng bản đồ
   5. Địa chỉ genres.html#ca-tru mở thẳng loại hình đó */

(function () {
  var current = null;     // loại hình đang chọn
  var region = "all";     // vùng đang lọc
  var group = "all";      // nhóm đang lọc: "all" | "unesco" | "other"

  /* Nhiều loại hình nằm rất gần nhau trên bản đồ (Bắc Bộ, Huế, Nam Bộ).
     Nút đánh dấu được dời ra cho khỏi chồng nhau, có đường kẻ nối về vị trí thật.
     label: chữ tên hiện bên trái hay bên phải nút. */
  var LAYOUT = {
    "then": { x: 196, y: 30, label: "right" },
    "hat-xoan": { x: 128, y: 62, label: "left" },
    "quan-ho": { x: 222, y: 80, label: "right" },
    "ca-tru": { x: 120, y: 120, label: "left" },
    "cheo": { x: 226, y: 132, label: "right" },
    "hat-van": { x: 128, y: 176, label: "left" },
    "vi-giam": { label: "left" },
    "ho": { label: "left" },
    "nha-nhac": { label: "right" },
    "ca-hue": { x: 190, y: 318, label: "left" },
    "tuong": { label: "right" },
    "bai-choi": { label: "right" },
    "cong-chieng": { label: "left" },
    "cai-luong": { x: 228, y: 504, label: "right" },
    "tai-tu": { x: 156, y: 554, label: "right" },
    "ngu-am": { x: 196, y: 606, label: "right" }
  };

  function project(lat, lon) {
    var p = ASV_MAP.proj;
    return { x: (lon - p.lon0) * p.kx, y: (p.lat1 - lat) * p.ky };
  }
  function byId(id) {
    return ASV_DATA.genres.filter(function (g) { return g.id === id; })[0];
  }
  // Nhóm của một loại hình: được UNESCO ghi danh hay loại hình khác
  function groupOf(g) { return g.unesco ? "unesco" : "other"; }
  function visibleGenres() {
    return ASV_DATA.genres.filter(function (g) {
      return (region === "all" || g.region === region) && (group === "all" || groupOf(g) === group);
    });
  }
  // Nhãn danh hiệu: "UNESCO 2009", "Di sản quốc gia 2021", "Di sản quốc gia" hoặc "Loại hình truyền thống"
  function badgeOf(g) {
    if (g.unesco) return I18n.t("genres.panel.unesco", { year: g.unesco.year });
    if (g.heritage && g.heritage.badge) return I18n.pick(g.heritage.badge); // danh hiệu chỉ thuộc một nơi / một làn điệu
    if (g.heritage) return g.heritage.year ? I18n.t("genres.badge.national", { year: g.heritage.year }) : I18n.t("genres.badge.nationalNoYear");
    return I18n.t("genres.badge.none");
  }
  // Ảnh thật kèm dòng nguồn (tác giả, giấy phép, nơi lấy ảnh, link trang gốc). Hình vẽ thì không cần dòng nguồn.
  // Ảnh Wikimedia Commons: giấy phép CC hoặc phạm vi công cộng. Ảnh Báo Điện tử Chính phủ: báo cho phép đăng lại khi ghi nguồn.
  function figureHtml(g) {
    if (!g.photo) return '<div class="genre-panel-media"></div>';
    var p = g.photo;
    var license = p.license === "Public domain" ? I18n.t("photo.pd") : I18n.pick(p.license);
    var credit = I18n.t("photo.credit", { author: p.author || I18n.t("photo.unknown"), license: license, source: p.source || "Wikimedia Commons" });
    return '<figure class="genre-panel-media genre-photo">' +
      '<figcaption><span class="photo-caption">' + ASV.escape(I18n.pick(p.caption)) + "</span> " +
        '<a class="photo-credit" href="' + p.page + '" target="_blank" rel="noopener">' + ASV.escape(credit) +
        '<span class="visually-hidden"> ' + I18n.t("video.newTab") + "</span></a></figcaption></figure>";
  }

  /* Bản đồ */
  function renderMap() {
    var wrap = document.getElementById("mapWrap");
    var W = ASV_MAP.width, H = ASV_MAP.height;
    var islands = function (list) {
      return list.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6"/>'; }).join("");
    };
    // Đường nối từ vị trí thật tới nút đã dời
    var leaders = ASV_DATA.genres.map(function (g) {
      var L = LAYOUT[g.id] || {};
      if (L.x === undefined) return "";
      var t = project(g.lat, g.lon);
      return '<g class="map-link" data-genre="' + g.id + '"><path class="map-leader" d="M' + t.x.toFixed(1) + " " + t.y.toFixed(1) + " L" + L.x + " " + L.y + '"/>' +
        '<circle class="map-true" cx="' + t.x.toFixed(1) + '" cy="' + t.y.toFixed(1) + '" r="3"/></g>';
    }).join("");

    var svg =
      '<svg class="map-svg" viewBox="0 0 ' + W + " " + H + '" aria-hidden="true" focusable="false">' +
        '<defs><pattern id="mapGan" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">' +
        '<path d="M0 3.5 H7" stroke="#2E2118" stroke-width="0.7" opacity="0.16"/></pattern>' +
        "</defs>" +
        // Biển: vài nét sóng rải rác ngoài khơi
        [[330, 170], [470, 150], [540, 230], [318, 360], [500, 360], [550, 470], [330, 560], [440, 630], [250, 640]]
          .map(function (p) { return '<path class="map-wave" d="M' + p[0] + " " + p[1] + ' q7.5 -7 15 0 t15 0 t15 0"/>'; }).join("") +
        '<path class="map-land" d="' + ASV_MAP.land + '"/>' +
        '<path d="' + ASV_MAP.land + '" fill="url(#mapGan)"/>' +
        '<g class="map-islands">' + islands(ASV_MAP.hoangSa) + islands(ASV_MAP.truongSa) + "</g>" +
        '<text class="map-label map-sea-label" x="440" y="404" data-i18n="genres.map.sea">' + ASV.escape(I18n.t("genres.map.sea")) + "</text>" +
        '<text class="map-label" x="372" y="252" data-i18n="genres.map.hoangSa">' + ASV.escape(I18n.t("genres.map.hoangSa")) + "</text>" +
        '<text class="map-label" x="386" y="470" data-i18n="genres.map.truongSa">' + ASV.escape(I18n.t("genres.map.truongSa")) + "</text>" +
        leaders +
      "</svg>";

    // Nút đánh dấu là <button> thật: bấm được bằng chuột, chạm và bàn phím
    var markers = ASV_DATA.genres.map(function (g) {
      var L = LAYOUT[g.id] || {};
      var p = L.x !== undefined ? { x: L.x, y: L.y } : project(g.lat, g.lon);
      return '<button type="button" class="map-marker label-' + (L.label || "right") + (g.unesco ? "" : " is-other") + '" data-genre="' + g.id + '" ' +
        'style="left:' + (p.x / W * 100).toFixed(2) + "%;top:" + (p.y / H * 100).toFixed(2) + '%" aria-pressed="false" ' +
        'aria-label="' + ASV.escape(I18n.t("genres.marker.aria", { name: I18n.pick(g.name), place: I18n.pick(g.place) })) + '">' +
        '<span class="map-dot" aria-hidden="true"></span>' +
        '<span class="map-name" aria-hidden="true">' + ASV.escape(I18n.pick(g.short)) + "</span></button>";
    }).join("");

    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", I18n.t("genres.map.aria"));
    wrap.innerHTML = '<div class="map-stage" id="mapStage">' + svg + markers + "</div>";
  }

  /* Khung chi tiết */
  function renderPanel() {
    var g = current;
    var panel = document.getElementById("genrePanel");
    var instruments = g.instruments.map(function (id) {
      var it = ASV_DATA.instruments.filter(function (x) { return x.id === id; })[0];
      return it ? '<li><a class="chip" href="instruments.html#' + it.id + '">' + ASV.escape(I18n.pick(it.name)) + "</a></li>" : "";
    }).join("");

    panel.innerHTML =
      figureHtml(g) +
        '<div class="genre-panel-body">' +
          '<p class="genre-tags"><span class="badge-family">' + ASV.escape(I18n.t("region." + g.region)) + "</span>" +
            '<span class="badge-unesco' + (g.unesco ? "" : " is-other") + '">' + ASV.escape(badgeOf(g)) + "</span></p>" +
          '<h2 class="genre-name" id="genreName">' + ASV.escape(I18n.pick(g.name)) + "</h2>" +
          '<p class="mb-3">' + ASV.renderText(g.desc) + "</p>" +
          '<dl class="genre-facts">' +
            "<dt>" + ASV.escape(I18n.t("genres.panel.place")) + "</dt><dd>" + ASV.renderText(g.place) + "</dd>" +
            ((g.unesco || g.heritage) ? "<dt>" + ASV.escape(I18n.t("genres.panel.list")) + "</dt><dd>" + ASV.renderText((g.unesco || g.heritage).note) + "</dd>" : "") +
            "<dt>" + ASV.escape(I18n.t("genres.panel.instruments")) + "</dt><dd>" +
              (instruments ? '<ul class="chip-list">' + instruments + "</ul>" : ASV.escape(I18n.t("genres.panel.noInstruments"))) +
            "</dd>" +
          "</dl>" +
          '<div class="genre-nav">' +
            '<button type="button" class="btn btn-sm btn-outline-cham" data-step="-1">' + ASV.icon("arrow", "icon-flip") +
              "<span>" + ASV.escape(I18n.t("genres.panel.prev")) + "</span></button>" +
            '<button type="button" class="btn btn-sm btn-outline-cham" data-step="1"><span>' + ASV.escape(I18n.t("genres.panel.next")) +
              "</span>" + ASV.icon("arrow") + "</button>" +
          "</div>" +
        "</div>";
    var holder = panel.querySelector(".genre-panel-media");
    // Ảnh riêng (photo.src) chỉ có trong bản nộp trên máy; bản online thiếu file thì tự quay về tranh vẽ (g.image)
    var media = ASV.createMedia({
      src: (g.photo && g.photo.src) || g.image, fallback: g.image, name: I18n.pick(g.name), kind: "genre",
      alt: g.photo ? I18n.pick(g.photo.caption) : null,
      onFallback: function () { var cap = holder.querySelector("figcaption"); if (cap) cap.remove(); }
    });
    holder.insertBefore(media, holder.firstChild);

    // Video biểu diễn ngay dưới khung chi tiết (chưa có video được phép dùng thì nói rõ)
    document.getElementById("genreMedia").innerHTML =
      '<h3 class="genre-media-title">' + ASV.escape(I18n.t("genres.panel.media")) + "</h3>" +
      (g.video ? ASV.videoCard(g, { compact: true }) : '<p class="genre-novideo">' + ASV.escape(I18n.t("genres.noVideo")) + "</p>");
    ASV.syncPlayButtons();
  }

  /* Chọn một loại hình */
  function select(id, opts) {
    var g = byId(id);
    if (!g) return;
    opts = opts || {};
    // Đổi sang loại hình khác thì dừng âm thanh/video của loại hình cũ
    if (current && current.id !== g.id) { ASV.Player.stop(true); ASV.closeVideos(); }
    current = g;
    document.querySelectorAll(".map-marker").forEach(function (m) {
      var on = m.getAttribute("data-genre") === id;
      m.classList.toggle("is-active", on);
      m.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll(".genre-card").forEach(function (c) {
      c.classList.toggle("is-active", c.getAttribute("data-genre") === id);
    });
    renderPanel();
    saveState();
    // Báo cho trình đọc màn hình biết khung chi tiết vừa đổi
    document.getElementById("genreLive").textContent = I18n.t("genres.live", { name: I18n.pick(g.name) });
    if (opts.focusPanel) {
      var panel = document.getElementById("genrePanel");
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
      panel.focus({ preventScroll: true });
    }
  }

  // Nút "Loại hình trước / sau": đi vòng trong các loại hình đang hiện theo bộ lọc
  function step(dir) {
    var list = visibleGenres();
    var i = list.indexOf(current);
    var next = list[(i + dir + list.length) % list.length];
    select(next.id);
    var btn = document.querySelector('#genrePanel [data-step="' + dir + '"]');
    if (btn) btn.focus();
  }

  /* Lọc theo vùng và theo nhóm */
  function applyFilter(r, gr) {
    region = r;
    if (gr) group = gr;
    document.querySelectorAll(".filter-btn[data-region]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-region") === region ? "true" : "false");
    });
    document.querySelectorAll(".filter-btn[data-group]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-group") === group ? "true" : "false");
    });
    var list = visibleGenres();
    var inList = function (el) { return list.some(function (g) { return g.id === el.getAttribute("data-genre"); }); };
    // hidden = không hiện, không bấm được, không nhận Tab → bộ lọc thật sự có tác dụng
    document.querySelectorAll(".map-marker").forEach(function (m) { m.hidden = !inList(m); });
    document.querySelectorAll(".map-link").forEach(function (l) { l.style.display = inList(l) ? "" : "none"; });
    zoomTo(list);
    saveState();
    document.querySelectorAll(".genre-card").forEach(function (c) {
      c.parentElement.hidden = !list.some(function (g) { return g.id === c.getAttribute("data-genre"); });
    });
    document.getElementById("filterCount").textContent = list.length ? I18n.t("genres.count", { n: list.length }) : I18n.t("genres.empty");
    // Loại hình đang chọn không còn trong danh sách lọc → chọn loại hình đầu tiên còn lại
    if (current && list.length && list.indexOf(current) === -1) select(list[0].id);
  }

  /* Phóng bản đồ tới khung bao quanh các điểm của vùng đang lọc ("Tất cả" = về như cũ) */
  function zoomTo(list) {
    var stage = document.getElementById("mapStage");
    if (!stage) return;
    var W = ASV_MAP.width, H = ASV_MAP.height;
    if (region === "all" || !list.length) {
      stage.style.transform = "";
      stage.style.setProperty("--inv", 1);
      return;
    }
    var xs = [], ys = [];
    list.forEach(function (g) {
      var L = LAYOUT[g.id] || {}, t = project(g.lat, g.lon);
      xs.push(t.x); ys.push(t.y);
      if (L.x !== undefined) { xs.push(L.x); ys.push(L.y); }
    });
    var pad = 90;
    var minX = Math.min.apply(null, xs) - pad, maxX = Math.max.apply(null, xs) + pad;
    var minY = Math.min.apply(null, ys) - pad, maxY = Math.max.apply(null, ys) + pad;
    var s = Math.max(1, Math.min(W / (maxX - minX), H / (maxY - minY), 2.4));
    // Đưa tâm vùng về giữa khung, nhưng không kéo lộ khoảng trống ngoài mép bản đồ
    var cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    var tx = Math.min(0, Math.max(W - W * s, W / 2 - cx * s));
    var ty = Math.min(0, Math.max(H - H * s, H / 2 - cy * s));
    stage.style.transform = "translate(" + (tx / W * 100).toFixed(2) + "%," + (ty / H * 100).toFixed(2) + "%) scale(" + s.toFixed(3) + ")";
    stage.style.setProperty("--inv", (1 / s).toFixed(3)); // giữ nút đánh dấu và chữ đúng cỡ khi phóng
  }

  // Ghi vùng đang lọc và loại hình đang xem lên địa chỉ trang (chia sẻ link vẫn giữ nguyên)
  function saveState() {
    try {
      var q = [];
      if (region !== "all") q.push("vung=" + region);
      if (group !== "all") q.push("nhom=" + group);
      history.replaceState(null, "", (q.length ? "?" + q.join("&") : location.pathname) + (current ? "#" + current.id : ""));
    } catch (e) { /* file:// có thể chặn, bỏ qua */ }
  }

  /* Danh sách thẻ */
  function renderList() {
    document.getElementById("genreList").innerHTML = ASV_DATA.genres.map(function (g) {
      return '<div class="col-sm-6 col-lg-3"><button type="button" class="genre-card asv-card" data-genre="' + g.id + '">' +
        '<span class="genre-card-media" data-src="' + g.image + '"></span>' +
        '<span class="genre-card-body">' +
          '<span class="genre-card-region">' + ASV.escape(I18n.t("region." + g.region)) + " · " + ASV.escape(badgeOf(g)) + "</span>" +
          '<span class="genre-card-name">' + ASV.escape(I18n.pick(g.name)) + "</span>" +
          '<span class="genre-card-open">' + ASV.escape(I18n.t("genres.card.open")) + "</span>" +
        "</span></button></div>";
    }).join("");
    document.querySelectorAll(".genre-card-media").forEach(function (box) {
      var card = box.closest(".genre-card");
      var g = byId(card.getAttribute("data-genre"));
      var media = ASV.createMedia({ src: (g.photo && g.photo.src) || g.image, fallback: g.image, name: I18n.pick(g.name), kind: "genre" });
      card.classList.toggle("is-other", !g.unesco);
      // Hình trong thẻ chỉ để trang trí (tên đã có ngay bên dưới)
      var img = media.querySelector("img");
      if (img) img.alt = "";
      box.appendChild(media);
    });
  }

  /* Vẽ toàn bộ (lần đầu và khi đổi ngôn ngữ) */
  function renderAll() {
    renderMap();
    renderList();
    applyFilter(region, group);
    if (current) select(current.id);
  }

  ASV.ready(function () {
    // Đọc địa chỉ trang TRƯỚC khi vẽ (vẽ xong sẽ ghi lại địa chỉ)
    var params = new URLSearchParams(location.search);
    var vung = params.get("vung"), nhom = params.get("nhom");
    if (["north", "central", "highlands", "south"].indexOf(vung) !== -1) region = vung;
    if (["unesco", "other"].indexOf(nhom) !== -1) group = nhom;
    var fromHash = location.hash.replace("#", "");
    renderAll();
    var shown = visibleGenres().length ? visibleGenres() : ASV_DATA.genres;
    var startId = byId(fromHash) && shown.indexOf(byId(fromHash)) !== -1 ? fromHash : shown[0].id;
    select(startId);

    // Một bộ lắng nghe cho cả bản đồ, danh sách, nút lọc và nút trước/sau
    document.addEventListener("click", function (e) {
      var marker = e.target.closest(".map-marker");
      if (marker) { select(marker.getAttribute("data-genre")); return; }
      var card = e.target.closest(".genre-card");
      if (card) { select(card.getAttribute("data-genre"), { focusPanel: true }); return; }
      var filter = e.target.closest(".filter-btn");
      if (filter && filter.hasAttribute("data-region")) { applyFilter(filter.getAttribute("data-region")); return; }
      if (filter && filter.hasAttribute("data-group")) { applyFilter(region, filter.getAttribute("data-group")); return; }
      var stepBtn = e.target.closest("#genrePanel [data-step]");
      if (stepBtn) step(Number(stepBtn.getAttribute("data-step")));
    });
    // Mở từ link có #id khi trang đã mở sẵn
    window.addEventListener("hashchange", function () {
      var id = location.hash.replace("#", "");
      if (byId(id) && (!current || current.id !== id)) select(id, { focusPanel: true });
    });
  });

  document.addEventListener("asv:langchange", renderAll);
})();
