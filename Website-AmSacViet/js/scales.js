/* scales.js: phần "Năm âm và bảy âm" ở trang Nhạc cụ (instruments.html#thang-am)
   Hai hàng phím xếp thẳng cột theo cao độ: hàng trên là thang năm âm Đô Rê Fa Sol La,
   hàng dưới là thang bảy âm Đô Rê Mi Fa Sol La Si. Hàng năm âm để trống chỗ Mi và Si,
   nên nhìn thấy ngay hai nốt bị bỏ; hàng bảy âm tô hai chỗ chỉ cách nửa cung (Mi–Fa, Si–Đô).
   Âm thanh là âm mô phỏng (Web Audio), phát qua ASV.Player nên có thanh phát, nút Dừng, phím Esc. */
ASV.ready(function () {
  var host = document.getElementById("scaleTool");
  if (!host) return;

  var COLS = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  var PENTA = ["C4", "D4", "F4", "G4", "A4", "C5"];
  var NAMES = {
    vi: { C4: "Đô", D4: "Rê", E4: "Mi", F4: "Fa", G4: "Sol", A4: "La", B4: "Si", C5: "Đô" },
    en: { C4: "C", D4: "D", E4: "E", F4: "F", G4: "G", A4: "A", B4: "B", C5: "C" }
  };
  var timbre = "tranh";   // âm sắc đang chọn: "tranh" (gảy) hoặc "sao" (thổi)
  var timers = [];        // các hẹn giờ tô sáng phím khi đang phát cả thang

  function hz(n) {
    var semis = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[n[0]] + (Number(n[1]) - 4) * 12;
    return 261.63 * Math.pow(2, semis / 12);
  }
  function notesOf(which) { return which === "penta" ? PENTA : COLS; }

  /* Hai âm sắc, viết gọn: đàn tranh (gảy, tắt dần) và sáo (thổi, có rung và tiếng hơi) */
  function note(ctx, out, t, f) {
    var g = ctx.createGain(), osc = ctx.createOscillator();
    if (timbre === "tranh") {
      var lp = ctx.createBiquadFilter();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, t);
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(4000, t);
      lp.frequency.exponentialRampToValueAtTime(900, t + 1.2);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.3, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
      osc.connect(lp); lp.connect(g);
      osc.start(t); osc.stop(t + 1.35);
    } else {
      var lfo = ctx.createOscillator(), lg = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f * 2, t); // sáo nghe cao hơn một quãng tám
      lfo.frequency.value = 5; lg.gain.value = f * 0.02;
      lfo.connect(lg); lg.connect(osc.frequency);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.25, t + 0.05);
      g.gain.setValueAtTime(0.25, t + 0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.connect(g);
      [osc, lfo].forEach(function (o) { o.start(t); o.stop(t + 0.5); });
    }
    g.connect(out);
  }

  function timbreName(lang) {
    return ASV_TRANSLATIONS[lang]["scale.timbre." + timbre];
  }

  /* Phát cả thang: đi lên rồi đi xuống, tô sáng từng phím đang kêu */
  function run(which) {
    var key = "scale:" + which;
    if (ASV.Player.isActive(key)) { ASV.Player.stop(); return; }
    var seq = notesOf(which).slice();
    seq = seq.concat(seq.slice(0, -1).reverse());
    var gap = 0.42;
    ASV.Player.play({
      key: key,
      title: {
        vi: ASV_TRANSLATIONS.vi["scale." + which] + " · " + timbreName("vi"),
        en: ASV_TRANSLATIONS.en["scale." + which] + " · " + timbreName("en")
      },
      synth: function (ctx, out, t) {
        seq.forEach(function (n, i) { note(ctx, out, t + i * gap, hz(n)); });
        return seq.length * gap + 1;
      }
    });
    clearMarks();
    seq.forEach(function (n, i) {
      timers.push(setTimeout(function () { mark(which, n); }, i * gap * 1000));
    });
    timers.push(setTimeout(clearMarks, seq.length * gap * 1000 + 300));
  }

  // Bấm một phím: phát đúng một nốt
  function one(which, n) {
    ASV.Player.play({
      key: "scale-note",
      title: { vi: NAMES.vi[n] + " · " + timbreName("vi"), en: NAMES.en[n] + " · " + timbreName("en") },
      synth: function (ctx, out, t) { note(ctx, out, t, hz(n)); return 1.3; }
    });
    clearMarks();
    mark(which, n);
    timers.push(setTimeout(clearMarks, 450));
  }

  function mark(which, n) {
    host.querySelectorAll(".scale-key.is-on").forEach(function (k) { k.classList.remove("is-on"); });
    var k = host.querySelector('[data-scale="' + which + '"] [data-note="' + n + '"]');
    if (k) k.classList.add("is-on");
  }
  function clearMarks() {
    timers.forEach(clearTimeout);
    timers = [];
    host.querySelectorAll(".scale-key.is-on").forEach(function (k) { k.classList.remove("is-on"); });
  }

  function rowHtml(which) {
    var names = NAMES[I18n.lang] || NAMES.vi;
    var inScale = notesOf(which);
    var cells = COLS.map(function (n) {
      if (inScale.indexOf(n) === -1) {
        // Nốt thang năm âm không dùng: để ô trống có viền gạch
        return '<span class="scale-gap" title="' + ASV.escape(I18n.t("scale.missing", { note: names[n] })) + '">' +
          '<span class="visually-hidden">' + ASV.escape(I18n.t("scale.missing", { note: names[n] })) + "</span></span>";
      }
      var half = which === "hepta" && (n === "E4" || n === "B4") ? " is-half" : "";
      return '<button type="button" class="scale-key' + half + '" data-note="' + n + '">' + ASV.escape(names[n]) + "</button>";
    }).join("");
    return '<div class="scale-row" data-scale="' + which + '" role="group" aria-labelledby="scale-' + which + '-title">' +
      '<div class="scale-head">' +
        '<h3 class="scale-title" id="scale-' + which + '-title">' + I18n.t("scale." + which) + "</h3>" +
        '<button type="button" class="btn btn-sm btn-son btn-play" data-scale-run="' + which + '">' +
          '<span class="btn-play-icon">' + ASV.icon("play") + "</span><span>" + I18n.t("scale.run") + "</span></button>" +
      "</div>" +
      '<div class="scale-keys">' + cells + "</div>" +
      '<p class="scale-steps">' + I18n.t("scale.steps." + which) + "</p>" +
    "</div>";
  }

  function render() {
    host.innerHTML =
      '<div class="filter-bar scale-timbre" role="group" aria-label="' + ASV.escape(I18n.t("scale.timbre")) + '">' +
        ["tranh", "sao"].map(function (t) {
          return '<button type="button" class="filter-btn" data-timbre="' + t + '" aria-pressed="' + (t === timbre) + '">' +
            ASV.escape(I18n.t("scale.timbre." + t)) + "</button>";
        }).join("") +
      "</div>" + rowHtml("penta") + rowHtml("hepta");
    syncRun();
  }

  // Nút "Nghe cả thang" đổi thành "Dừng" khi đang phát
  function syncRun() {
    host.querySelectorAll("[data-scale-run]").forEach(function (b) {
      var on = ASV.Player.isActive("scale:" + b.getAttribute("data-scale-run"));
      b.classList.toggle("is-playing", on);
      b.querySelector(".btn-play-icon").innerHTML = ASV.icon(on ? "stop" : "play");
      b.lastChild.textContent = I18n.t(on ? "btn.stop" : "scale.run");
    });
  }

  host.addEventListener("click", function (e) {
    var t = e.target.closest("[data-timbre]");
    if (t) { timbre = t.getAttribute("data-timbre"); render(); host.querySelector('[data-timbre="' + timbre + '"]').focus(); return; }
    var r = e.target.closest("[data-scale-run]");
    if (r) { run(r.getAttribute("data-scale-run")); return; }
    var k = e.target.closest(".scale-key");
    if (k) one(k.closest("[data-scale]").getAttribute("data-scale"), k.getAttribute("data-note"));
  });
  ASV.Player.onChange(function (c) {
    if (!c || c.item.key.indexOf("scale") !== 0) clearMarks();
    syncRun();
  });
  document.addEventListener("asv:langchange", render);
  render();
});
