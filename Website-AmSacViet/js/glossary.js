/* glossary.js: Logic riêng của glossary.html (trang Thuật ngữ)
   1. Vẽ 23 mục từ theo 4 nhóm, giữ thứ tự trong data.js (từ dễ trước, từ khó sau)
   2. Mỗi mục: định nghĩa, nút Nghe (âm mô phỏng), Xem biểu diễn (video thật), Chơi thử, link liên quan
   3. Lọc theo nhóm, tìm theo tên (có dấu hay không dấu đều được); nhóm không còn mục nào thì ẩn luôn tiêu đề
   Địa chỉ: glossary.html#am-boi cuộn tới mục đó; ?nhom=sound&q=ve giữ bộ lọc và từ tìm.
   Trong định nghĩa, các từ khác vẫn được đánh dấu (common.js), trừ chính từ đang giải thích. */

ASV.ready(function () {
  var DATA = ASV_DATA.glossary;
  var GROUPS = ["sound", "parts", "performance", "unesco"];
  var BAU_HZ = 130.81; // âm thực (dây buông) của cây đàn bầu, giống trang chủ: Đô 3
  var group = "all";   // nhóm đang lọc
  var query = "";      // từ đang tìm
  var pick = I18n.pick;

  function find(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
  function inst(id) { return find(ASV_DATA.instruments, id); }
  function genre(id) { return find(ASV_DATA.genres, id); }

  // Hai âm của đàn bầu để so sánh (âm MÔ PHỎNG, phát qua trình phát chung nên có nút Dừng và phím Esc)
  ASV.playables["term:am-thuc"] = { key: "term:am-thuc", titleKey: "glossary.sound.am-thuc.title", synth: ["bau-harmonic"], params: { freq: BAU_HZ } };
  ASV.playables["term:am-boi"] = { key: "term:am-boi", titleKey: "glossary.sound.am-boi.title", synth: ["bau-series"], params: { freq: BAU_HZ } };

  /* Lọc + tìm */
  // Bỏ dấu và viết thường để "am boi", "Âm bồi", "âm bồi" đều giống nhau
  function norm(text) { return I18n.plain(String(text || "")).toLowerCase().trim(); }

  // Chỉ tìm trong tên từ (cả hai ngôn ngữ), không tìm trong định nghĩa cho khỏi ra kết quả lạ
  function haystack(g) {
    return norm([g.term.vi, g.term.en, g.match.vi.join(" "), g.match.en.join(" ")].join(" "));
  }

  function visible() {
    var q = norm(query);
    return DATA.filter(function (g) {
      return (group === "all" || g.group === group) && (!q || haystack(g).indexOf(q) !== -1);
    });
  }

  /* Một mục từ */
  function entryHtml(g) {
    var see = g.see || {};
    var acts = [], chips = [];

    // Nghe: âm mô phỏng (âm thực / âm bồi đàn bầu, hoặc tiếng cả nhạc cụ)
    if (see.listen) {
      var what = see.listen.indexOf("term:") === 0
        ? I18n.t("glossary.sound." + see.listen.slice(5))
        : pick(inst(see.listen.replace("instrument:", "")).name);
      acts.push('<button type="button" class="btn btn-sm btn-son btn-play" data-play="' + see.listen + '">' +
        '<span class="btn-play-icon">' + ASV.icon("play") + '</span><span class="btn-play-label">' + I18n.t("btn.listen") + "</span>" +
        "<span>" + ASV.escape(what) + "</span></button>");
    }
    // Xem biểu diễn: video thật của loại hình (không bao giờ tổng hợp âm cho loại hình)
    if (see.recording) {
      var rg = genre(see.recording);
      acts.push('<button type="button" class="btn btn-sm btn-outline-son" data-recording="' + rg.id + '">' +
        ASV.icon("play") + "<span>" + ASV.escape(I18n.t("glossary.watch", { name: pick(rg.name) })) + "</span></button>");
      chips.push({ href: "genres.html#" + rg.id, text: pick(rg.name) });
    }
    // Chơi thử trên nhạc cụ ảo của trang Nhạc cụ
    if (see.try) {
      var href = see.try === "dan-bau" ? "instruments.html#dan-bau-ao" : "instruments.html?choi=" + see.try + "#choi-thu";
      acts.push('<a class="btn btn-sm btn-outline-cham" href="' + href + '">' +
        ASV.escape(I18n.t("hist.try", { name: pick(inst(see.try).name) })) + "</a>");
    }
    if (see.scales) {
      acts.push('<a class="btn btn-sm btn-outline-cham" href="instruments.html#thang-am">' + ASV.escape(I18n.t("glossary.scales")) + "</a>");
    }

    // Link liên quan (dạng chip nhỏ)
    (see.instruments || []).forEach(function (id) { chips.push({ href: "instruments.html#" + id, text: pick(inst(id).name) }); });
    (see.genres || []).forEach(function (id) { chips.push({ href: "genres.html#" + id, text: pick(genre(id).name) }); });
    if (see.unescoList) chips.push({ href: "genres.html?nhom=unesco", text: I18n.t("glossary.unescoList") });
    if (see.history) {
      var h = find(ASV_DATA.history, see.history);
      chips.push({ href: "history.html#" + h.id, text: I18n.t("glossary.history", { name: pick(h.short) }) });
    }

    var related = chips.length
      ? '<div class="gloss-entry-related"><span class="gloss-entry-label" id="rel-' + g.id + '">' + I18n.t("glossary.related") + "</span>" +
        '<ul class="chip-list" aria-labelledby="rel-' + g.id + '">' + chips.map(function (c) {
          return '<li><a class="chip" href="' + c.href + '">' + ASV.escape(c.text) + "</a></li>";
        }).join("") + "</ul></div>"
      : "";

    return '<div class="col-md-6" data-col="' + g.id + '">' +
      '<article class="asv-card gloss-entry" id="' + g.id + '" data-gloss-own="' + g.id + '" tabindex="-1" aria-labelledby="t-' + g.id + '">' +
        '<h3 class="gloss-entry-term" id="t-' + g.id + '">' + ASV.escape(pick(g.term)) + "</h3>" +
        '<p class="gloss-entry-def">' + ASV.renderText(g.def) + "</p>" +
        '<div class="gloss-entry-foot">' + related +
          (acts.length ? '<div class="gloss-entry-actions">' + acts.join("") + "</div>" : "") +
        "</div>" +
      "</article></div>";
  }

  /* Vẽ cả trang: mỗi nhóm một tiêu đề + lưới hai cột */
  function render() {
    document.getElementById("glossGroups").innerHTML = GROUPS.map(function (gr) {
      var items = DATA.filter(function (g) { return g.group === gr; });
      return '<section class="gloss-group" data-group-sec="' + gr + '" aria-labelledby="g-' + gr + '">' +
        '<h2 class="gloss-group-title" id="g-' + gr + '">' + ASV.escape(I18n.t("glossary.group." + gr)) + "</h2>" +
        '<div class="row g-3">' + items.map(entryHtml).join("") + "</div></section>";
    }).join("");
    applyFilter();
    ASV.syncPlayButtons();
  }

  // Mục không khớp thì ẩn hẳn (không bấm, không Tab tới được), không chỉ làm mờ
  function applyFilter() {
    var list = visible();
    document.querySelectorAll("#glossGroups [data-col]").forEach(function (col) {
      col.hidden = !list.some(function (g) { return g.id === col.getAttribute("data-col"); });
    });
    document.querySelectorAll("[data-group-sec]").forEach(function (sec) {
      sec.hidden = !sec.querySelector("[data-col]:not([hidden])");
    });
    document.querySelectorAll(".filter-btn[data-group]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-group") === group ? "true" : "false");
    });
    document.getElementById("glossCount").textContent = I18n.t(list.length === 1 ? "glossary.count1" : "glossary.count", { n: list.length });
    var empty = document.getElementById("glossEmpty");
    empty.hidden = list.length > 0;
    if (!list.length) document.getElementById("glossEmptyText").textContent = I18n.t("glossary.empty.text", { q: query });
    saveState();
  }

  // Ghi nhóm đang lọc và từ đang tìm lên địa chỉ trang (giữ nguyên #mục nếu có)
  function saveState() {
    var p = [];
    if (group !== "all") p.push("nhom=" + group);
    if (query) p.push("q=" + encodeURIComponent(query));
    try {
      history.replaceState(null, "", (p.length ? "?" + p.join("&") : location.pathname) + location.hash);
    } catch (e) { /* file:// có thể chặn, bỏ qua */ }
  }

  /* Đi tới một mục: glossary.html#am-boi hoặc bấm "Đến mục từ này" trong khung giải thích */
  function goTo(id) {
    var el = document.getElementById(id);
    if (!el || !el.classList.contains("gloss-entry")) return;
    // Mục đang bị bộ lọc ẩn → bỏ lọc để thấy được
    if (el.closest("[hidden]")) {
      group = "all"; query = "";
      document.getElementById("glossSearch").value = "";
      applyFilter();
    }
    document.querySelectorAll(".gloss-entry.is-target").forEach(function (x) { x.classList.remove("is-target"); });
    el.classList.add("is-target");
    el.scrollIntoView({ behavior: "instant", block: "start" });
    el.focus({ preventScroll: true });
  }

  /* Sự kiện */
  document.querySelectorAll(".filter-btn[data-group]").forEach(function (b) {
    b.addEventListener("click", function () {
      group = b.getAttribute("data-group");
      applyFilter();
    });
  });
  var input = document.getElementById("glossSearch");
  input.addEventListener("input", function () { query = input.value; applyFilter(); });
  document.getElementById("glossReset").addEventListener("click", function () {
    group = "all"; query = ""; input.value = "";
    applyFilter();
    input.focus();
  });
  window.addEventListener("hashchange", function () { goTo(location.hash.slice(1)); });
  document.addEventListener("asv:langchange", render);

  // Đọc bộ lọc từ địa chỉ: ?nhom=sound&q=ve
  var params = new URLSearchParams(location.search);
  if (GROUPS.indexOf(params.get("nhom")) !== -1) group = params.get("nhom");
  if (params.get("q")) { query = params.get("q"); input.value = query; }

  render();
  if (location.hash.length > 1) setTimeout(function () { goTo(location.hash.slice(1)); }, 0);
});
