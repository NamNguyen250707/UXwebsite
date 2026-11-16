/* history.js: Trang Lịch sử (history.html)
   - Vẽ thanh thời kỳ (#histNavList) và 8 mốc (#histList) từ ASV_DATA.history.
   - Thanh thời kỳ dính dưới menu; mốc đang xem được gạch chân (IntersectionObserver).
   - history.html#nguyen → cuộn thẳng tới mốc đó.
   - Đổi ngôn ngữ → vẽ lại, giữ nguyên mốc đang xem. */
ASV.ready(function () {
  var DATA = ASV_DATA.history;
  var navList = document.getElementById("histNavList");
  var list = document.getElementById("histList");
  var live = document.getElementById("histLive");
  var currentId = null;

  function byId(arr, id) { return arr.filter(function (x) { return x.id === id; })[0]; }
  function pick(o) { return I18n.pick(o); }

  /* Thanh thời kỳ */
  function renderNav() {
    navList.innerHTML = DATA.map(function (h) {
      return '<li><a class="hist-nav-link" href="#' + h.id + '" data-id="' + h.id + '">' +
        '<span class="hist-nav-period">' + ASV.escape(pick(h.period)) + "</span>" +
        '<span class="hist-nav-title">' + ASV.escape(pick(h.short)) + "</span></a></li>";
    }).join("");
  }

  /* Một mốc */
  // Sự kiện có năm: năm ở cột trái, nội dung bên phải
  function factsHtml(h) {
    if (!h.facts || !h.facts.length) return "";
    return '<h3 class="hist-sub">' + I18n.t("hist.facts") + "</h3>" +
      '<ol class="hist-facts">' + h.facts.map(function (fct) {
        var year = I18n.lang === "en" && fct.yearEn ? fct.yearEn : fct.year;
        return '<li><span class="hist-year">' + ASV.escape(I18n.pick({ vi: year, en: year })) + "</span>" +
          '<span class="hist-fact">' + ASV.renderText(pick(fct)) + "</span></li>";
      }).join("") + "</ol>";
  }

  // Điều còn tranh luận: nói rõ, tách riêng khỏi sự kiện đã chắc chắn
  function debateHtml(h) {
    if (!h.debate) return "";
    return '<aside class="hist-debate"><h3 class="hist-sub">' + I18n.t("hist.debate") + "</h3>" +
      "<p>" + ASV.renderText(pick(h.debate)) + "</p></aside>";
  }

  // Nghe bản ghi loại hình (video UNESCO thật), nghe âm mô phỏng nhạc cụ, link sang trang khác
  function listenHtml(h) {
    var items = [];
    (h.genres || []).forEach(function (gid) {
      var g = byId(ASV_DATA.genres, gid);
      if (!g) return;
      var name = pick(g.short || g.name);
      // Mốc UNESCO có 8 loại hình: chỉ đưa link đọc, không xếp 16 nút
      if (h.genres.length <= 2) {
        items.push('<button type="button" class="btn btn-sm btn-son" data-recording="' + g.id + '">' +
          ASV.icon(ASV.canEmbedVideo ? "play" : "external") + "<span>" + ASV.escape(I18n.t("hist.rec", { name: name })) + "</span></button>");
      }
      items.push('<a class="btn btn-sm btn-outline-cham" href="genres.html#' + g.id + '">' + ASV.escape(I18n.t("hist.read", { name: name })) + "</a>");
    });
    (h.instruments || []).forEach(function (iid) {
      var it = byId(ASV_DATA.instruments, iid);
      if (!it) return;
      var name = pick(it.name);
      // Nút nghe: nhãn "Nghe/Dừng" do common.js đổi theo trạng thái, tên nhạc cụ đứng riêng
      items.push('<button type="button" class="btn btn-sm btn-outline-son btn-play" data-play="instrument:' + it.id + '">' +
        '<span class="btn-play-icon">' + ASV.icon("play") + '</span><span class="btn-play-label">' + I18n.t("btn.listen") + "</span>" +
        "<span>" + ASV.escape(name) + "</span></button>");
      items.push('<a class="btn btn-sm btn-outline-cham" href="instruments.html?choi=' + it.id + '#choi-thu">' +
        ASV.escape(I18n.t("hist.try", { name: name })) + "</a>");
    });
    if (!items.length) return "";
    var hasSynth = (h.instruments || []).length > 0;
    return '<div class="hist-listen"><h3 class="hist-sub">' + I18n.t("hist.listen") + "</h3>" +
      '<div class="hist-actions">' + items.join("") + "</div>" +
      (hasSynth ? '<p class="hist-note">' + I18n.t("hist.synthNote") + "</p>" : "") + "</div>";
  }

  // Nguồn tra cứu: thu gọn trong <details> để không lấn nội dung chính
  function sourcesHtml(h) {
    if (!h.sources || !h.sources.length) return "";
    return '<details class="hist-sources"><summary>' + I18n.t("hist.sources", { n: h.sources.length }) + "</summary><ul>" +
      h.sources.map(function (s) {
        var label = ASV.escape(pick(s));
        return "<li>" + (s.url
          ? '<a href="' + s.url + '" target="_blank" rel="noopener">' + label + ASV.icon("external") +
            '<span class="visually-hidden"> ' + I18n.t("video.newTab") + "</span></a>"
          : label) + "</li>";
      }).join("") + "</ul></details>";
  }

  function itemHtml(h, i) {
    return '<li class="hist-item" id="' + h.id + '">' +
      '<article class="hist-card asv-card" aria-labelledby="t-' + h.id + '">' +
        '<div class="row g-4">' +
          '<div class="col-md-5">' +
            '<figure class="hist-figure" data-media="' + i + '"></figure>' +
          "</div>" +
          '<div class="col-md-7">' +
            '<p class="hist-period">' + ASV.escape(pick(h.period)) + "</p>" +
            '<h2 class="hist-title" id="t-' + h.id + '">' + ASV.escape(pick(h.title)) + "</h2>" +
            '<p class="hist-summary">' + ASV.renderText(pick(h.summary)) + "</p>" +
            factsHtml(h) + debateHtml(h) + listenHtml(h) + sourcesHtml(h) +
          "</div>" +
        "</div>" +
      "</article></li>";
  }

  function renderList() {
    list.innerHTML = DATA.map(itemHtml).join("");
    // Hình minh họa: thiếu file thì createMedia hiện ô giữ chỗ
    DATA.forEach(function (h, i) {
      var fig = list.querySelector('[data-media="' + i + '"]');
      fig.appendChild(ASV.createMedia({ src: h.image, name: pick(h.title), kind: "history", alt: pick(h.alt) }));
    });
    ASV.syncPlayButtons();
  }

  /* Mốc đang xem */
  function setCurrent(id, announce) {
    if (!id || id === currentId) return;
    currentId = id;
    navList.querySelectorAll(".hist-nav-link").forEach(function (a) {
      var on = a.getAttribute("data-id") === id;
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      // Trên màn hẹp thanh thời kỳ cuộn ngang: đưa mục đang xem vào giữa
      if (on) {
        var bar = navList;
        var left = a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2;
        bar.scrollTo({ left: Math.max(0, left), behavior: "instant" });
      }
    });
    if (announce) live.textContent = I18n.t("hist.live", { title: pick(byId(DATA, id).title) });
  }

  // Theo dõi mốc nào đang nằm ở dải giữa màn hình
  var observer = null;
  function observe() {
    if (observer) observer.disconnect();
    if (!("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setCurrent(en.target.id, false); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    list.querySelectorAll(".hist-item").forEach(function (el) { observer.observe(el); });
  }

  // Bấm một thời kỳ: cuộn tới, chuyển focus vào tiêu đề mốc (người dùng bàn phím đọc tiếp được ngay)
  navList.addEventListener("click", function (e) {
    var a = e.target.closest(".hist-nav-link");
    if (!a) return;
    e.preventDefault();
    goTo(a.getAttribute("data-id"), true);
  });

  function goTo(id, focus) {
    var item = document.getElementById(id);
    if (!item) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    item.scrollIntoView({ behavior: reduce || !focus ? "instant" : "smooth", block: "start" });
    history.replaceState(null, "", "#" + id);
    setCurrent(id, true);
    if (focus) {
      var title = item.querySelector(".hist-title");
      title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
    }
  }

  function renderAll() {
    live.textContent = ""; // thông báo cũ viết bằng ngôn ngữ trước, xóa đi
    renderNav();
    renderList();
    var keep = currentId;
    currentId = null;
    setCurrent(keep || DATA[0].id, false);
    observe();
  }

  // Thanh thời kỳ dính ngay dưới menu; nhảy tới một mốc thì chừa chỗ cho cả hai thanh
  function fitSticky() {
    var hdr = document.getElementById("site-header").offsetHeight;
    var nav = document.getElementById("histNav").offsetHeight;
    document.documentElement.style.setProperty("--hdr", hdr + "px");
    document.documentElement.style.scrollPaddingTop = (hdr + nav + 12) + "px";
  }
  window.addEventListener("resize", fitSticky);

  renderAll();
  fitSticky();

  // Mở thẳng một mốc: history.html#nguyen (đọc hash sau khi đã vẽ)
  var hash = decodeURIComponent(location.hash.slice(1));
  if (hash && byId(DATA, hash)) goTo(hash, false);

  window.addEventListener("hashchange", function () {
    var id = decodeURIComponent(location.hash.slice(1));
    if (byId(DATA, id)) goTo(id, true);
  });

  document.addEventListener("asv:langchange", function () { renderAll(); fitSticky(); });
});
