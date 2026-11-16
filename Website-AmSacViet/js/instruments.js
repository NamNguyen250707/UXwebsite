/* instruments.js: Logic riêng của instruments.html (trang Nhạc cụ)
   1. Lưới 12 thẻ, lọc theo họ (dây/hơi/gõ), tìm theo tên (có dấu hay không dấu đều được)
   2. Trạng thái "không tìm thấy"
   3. Hộp chi tiết (modal Bootstrap): hình, nhánh, dân tộc, chất liệu, cách chơi, nghe, loại hình liên quan
   4. Chơi thử nhạc cụ ảo: mỗi nhạc cụ một cách chơi gần với thật
      (vuốt dây, giữ để kéo/thổi, giữ để vê, gõ tùng/cắc, gõ chiêng…), đàn bầu có giao diện riêng
   Địa chỉ: instruments.html#dan-bau mở hộp chi tiết; ?ho=wind&q=sao giữ bộ lọc và từ tìm;
            ?choi=khen#choi-thu mở sẵn khèn ở phần chơi thử; #dan-bau-ao mở sẵn đàn bầu.
   Âm thanh chơi thử là âm MÔ PHỎNG bằng Web Audio (trang có ghi rõ), không phải bản thu. */

(function () {
  var family = "all";   // họ đang lọc
  var query = "";       // từ đang tìm
  var openId = null;    // nhạc cụ đang mở trong hộp chi tiết
  var modal = null;     // đối tượng bootstrap.Modal
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function byId(id) { return ASV_DATA.instruments.filter(function (x) { return x.id === id; })[0]; }

  /* Lọc + tìm */
  // Bỏ dấu và viết thường để "dan bau", "Đàn Bầu", "đàn bầu" đều giống nhau
  function norm(text) { return I18n.plain(String(text || "")).toLowerCase().trim(); }

  function haystack(it) {
    return norm([it.name, it.id.replace(/-/g, " "), it.gloss.vi, it.gloss.en, it.branch.vi, it.branch.en, it.people.vi, it.people.en].join(" "));
  }

  function visible() {
    var q = norm(query);
    return ASV_DATA.instruments.filter(function (it) {
      return (family === "all" || it.family === family) && (!q || haystack(it).indexOf(q) !== -1);
    });
  }

  function renderGrid() {
    document.getElementById("instGrid").innerHTML = ASV_DATA.instruments.map(function (it) {
      var name = I18n.pick(it.name);
      return '<div class="col-6 col-md-4 col-lg-3" data-col="' + it.id + '">' +
        '<button type="button" class="inst-card asv-card" data-inst="' + it.id + '" aria-haspopup="dialog">' +
          '<span class="inst-card-media"></span>' +
          '<span class="inst-card-body">' +
            '<span class="inst-card-tags"><span class="badge-family">' + ASV.escape(I18n.t("family." + it.family)) + "</span></span>" +
            '<span class="inst-card-name">' + ASV.escape(name) + "</span>" +
            '<span class="inst-card-gloss">' + ASV.escape(I18n.pick(it.gloss)) + "</span>" +
          "</span></button></div>";
    }).join("");
    document.querySelectorAll(".inst-card").forEach(function (card) {
      var it = byId(card.getAttribute("data-inst"));
      var media = ASV.createMedia({ src: it.image, name: I18n.pick(it.name), kind: "instrument" });
      var img = media.querySelector("img");
      if (img) img.alt = ""; // tên đã có ngay dưới hình
      card.querySelector(".inst-card-media").appendChild(media);
    });
  }

  function applyFilter() {
    var list = visible();
    document.querySelectorAll("[data-col]").forEach(function (col) {
      col.hidden = !list.some(function (it) { return it.id === col.getAttribute("data-col"); });
    });
    document.querySelectorAll(".inst-tools .filter-btn").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-family") === family ? "true" : "false");
    });
    document.getElementById("familyHint").textContent = I18n.t("inst.hint." + family);
    document.getElementById("instCount").textContent = I18n.t("inst.count", { n: list.length });
    // 2. Không tìm thấy
    var empty = document.getElementById("instEmpty");
    empty.hidden = list.length > 0;
    if (!list.length) document.getElementById("instEmptyText").textContent = I18n.t("inst.empty.text", { q: query });
    saveState();
  }

  // Ghi bộ lọc, từ tìm, nhạc cụ đang chơi thử và nhạc cụ đang mở lên địa chỉ trang
  function saveState() {
    var p = [];
    if (family !== "all") p.push("ho=" + family);
    if (query) p.push("q=" + encodeURIComponent(query));
    if (playId && playId !== "dan-bau") p.push("choi=" + playId);
    try {
      var section = ["#choi-thu", "#thang-am", "#thuat-ngu"].indexOf(location.hash) !== -1 ? location.hash : "";
      history.replaceState(null, "", (p.length ? "?" + p.join("&") : location.pathname) + (openId ? "#" + openId : section));
    } catch (e) { /* file:// có thể chặn, bỏ qua */ }
  }

  /* Hộp chi tiết */
  function renderModal() {
    var it = byId(openId);
    var name = I18n.pick(it.name);
    document.getElementById("instModalTitle").textContent = name;
    var genres = it.genres.map(function (gid) {
      var g = ASV_DATA.genres.filter(function (x) { return x.id === gid; })[0];
      return g ? '<li><a class="chip" href="genres.html#' + g.id + '">' + ASV.escape(I18n.pick(g.name)) + "</a></li>" : "";
    }).join("");
    var body = document.getElementById("instModalBody");
    body.innerHTML =
      '<div class="row g-4">' +
        '<div class="col-md-5 inst-modal-media"></div>' +
        '<div class="col-md-7">' +
          '<p class="genre-tags"><span class="badge-family">' + ASV.escape(I18n.t("family." + it.family)) + "</span>" +
            '<span class="badge-unesco">' + ASV.escape(I18n.pick(it.branch)) + "</span></p>" +
          '<p class="inst-modal-gloss">' + ASV.escape(I18n.pick(it.gloss)) + "</p>" +
          "<p>" + ASV.renderText(it.desc) + "</p>" +
          '<dl class="genre-facts">' +
            "<dt>" + ASV.escape(I18n.t("inst.modal.people")) + "</dt><dd>" + ASV.renderText(it.people) + "</dd>" +
            "<dt>" + ASV.escape(I18n.t("inst.modal.material")) + "</dt><dd>" + ASV.renderText(it.material) + "</dd>" +
            "<dt>" + ASV.escape(I18n.t("inst.modal.play")) + "</dt><dd>" + ASV.renderText(it.play) + "</dd>" +
            "<dt>" + ASV.escape(I18n.t("inst.modal.genres")) + "</dt><dd>" +
              (genres ? '<ul class="chip-list">' + genres + "</ul>" : ASV.escape(I18n.t("inst.modal.noGenres"))) + "</dd>" +
          "</dl>" +
          '<div class="d-flex flex-wrap gap-2">' + ASV.playButton("instrument:" + it.id) +
            '<a class="btn btn-outline-son" href="#choi-thu" data-try="' + it.id + '">' +
              ASV.escape(I18n.t("inst.modal.try", { name: name })) + "</a>" +
          "</div>" +
        "</div>" +
      "</div>";
    body.querySelector(".inst-modal-media").appendChild(ASV.createMedia({ src: it.image, name: name, kind: "instrument" }));
    ASV.syncPlayButtons();
  }

  function openModal(id) {
    if (!byId(id)) return;
    // Đổi sang nhạc cụ khác thì dừng tiếng của nhạc cụ cũ
    if (openId && openId !== id && ASV.Player.isActive("instrument:" + openId)) ASV.Player.stop(true);
    openId = id;
    renderModal();
    saveState();
    if (modal) modal.show();
  }

  // Nhạc cụ trước / sau: đi vòng trong các nhạc cụ đang hiện theo bộ lọc
  function step(dir) {
    var list = visible();
    if (!list.length) list = ASV_DATA.instruments;
    var i = list.map(function (x) { return x.id; }).indexOf(openId);
    openModal(list[(i + dir + list.length) % list.length].id);
  }

  /* Chơi thử nhạc cụ ảo */

  // Tên nốt → tần số (A4 = 440 Hz)
  function hz(name) {
    var m = /^([A-G])(#|b)?(-?\d)$/.exec(name);
    var base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]];
    var midi = (Number(m[3]) + 1) * 12 + base + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    return 440 * Math.pow(2, (midi - 69) / 12);
  }
  var NOTES = {
    vi: ["Đô", "Đô thăng", "Rê", "Rê thăng", "Mi", "Fa", "Fa thăng", "Sol", "Sol thăng", "La", "La thăng", "Si"],
    en: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]
  };
  function noteName(f, withHz) {
    var midi = Math.round(69 + 12 * Math.log(f / 440) / Math.LN2);
    var names = NOTES[I18n.lang] || NOTES.vi;
    return names[((midi % 12) + 12) % 12] + " " + (Math.floor(midi / 12) - 1) + (withHz ? " · " + Math.round(f) + " Hz" : "");
  }

  /* Cách chơi của từng nhạc cụ (dùng thang ngũ cung cho các nhạc cụ có cao độ):
     mode: "strings" = bấm hoặc vuốt qua (đàn tranh, đàn t'rưng)
           "tap"     = bấm từng phím (đàn nguyệt, cồng chiêng)
           "hold"    = giữ để kéo/thổi, trượt sang phím khác để luyến (đàn nhị, sáo, kèn bầu)
           "tremolo" = bấm nhanh gảy một tiếng, giữ lâu để vê (tỳ bà)
           "chord"   = giữ để thổi hợp âm (khèn)
           "pads"    = các vùng gõ có tên riêng (trống, phách) */
  var PLAY = {
    "dan-tranh": { mode: "strings", sound: "tranh", notes: ["D4", "F4", "G4", "A4", "C5", "D5", "F5", "G5", "A5", "C6"] },
    "dan-nguyet": { mode: "tap", sound: "nguyet", notes: ["G3", "C4", "D4", "F4", "G4", "A4", "C5"] },
    "dan-nhi": { mode: "hold", sound: "nhi", notes: ["D4", "F4", "G4", "A4", "C5", "D5"] },
    "ty-ba": { mode: "tremolo", sound: "tyba", notes: ["D4", "G4", "A4", "C5", "D5", "G5"] },
    "sao-truc": { mode: "hold", sound: "sao", notes: ["D5", "F5", "G5", "A5", "C6", "D6"] },
    "khen": { mode: "chord", sound: "khen", chords: [["D4", "G4"], ["D4", "A4"], ["D4", "C5"], ["D4", "D5"], ["D4", "F5"]] }, // [ống trì âm, nốt của ống]
    "ken-bau": { mode: "hold", sound: "ken", notes: ["G4", "A4", "C5", "D5", "F5", "G5"] },
    "trong": { mode: "pads", sound: "trong", pads: ["tung", "cac", "tungNho"] },
    "phach": { mode: "pads", sound: "phach", pads: ["phachChac", "phachNhe"] },
    "dan-trung": { mode: "strings", sound: "trung", notes: ["D5", "F5", "G5", "A5", "C6", "D6", "F6", "G6"] },
    "cong-chieng": { mode: "tap", sound: "gong", notes: ["G3", "A3", "C4", "D4", "F4"] }
  };
  var playId = "dan-tranh"; // nhạc cụ đang chơi thử
  // Màn hình hẹp: một số mô hình vẽ lại cho chỗ bấm đủ lớn (vẽ lại khi xoay máy / đổi cỡ cửa sổ)
  var NARROW = window.matchMedia("(max-width: 575.98px)");

  /* Phiên âm thanh: một "đường tiếng" chung đăng ký với ASV.Player
     Nhờ đó vẫn có thanh phát ở cuối trang, nút Dừng và phím Esc như mọi âm thanh khác của site. */
  var sess = null;           // { ctx, out, key }
  var held = {};             // các tiếng đang giữ (hold/chord/tremolo), theo chỉ số phím
  var noiseBuf = null;

  function session() {
    var key = "play:" + playId;
    if (sess && ASV.Player.isActive(key)) return sess;
    var it = byId(playId);
    ASV.Player.play({
      key: key,
      title: {
        vi: ASV_TRANSLATIONS.vi["inst.play.playerTitle"].replace("{name}", it.name),
        en: ASV_TRANSLATIONS.en["inst.play.playerTitle"].replace("{name}", it.name)
      },
      // Hàm âm tự viết: chỉ mở đường tiếng, các nốt được thêm vào khi người dùng bấm
      synth: function (ctx, out) { sess = { ctx: ctx, out: out, key: key }; return 600; }
    });
    return sess && ASV.Player.isActive(key) ? sess : null;
  }

  function noise(ctx) {
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

  // Tiếng gảy / gõ có cao độ, tắt dần
  function pluck(s, f, o) {
    var ctx = s.ctx, t = ctx.currentTime + 0.005, d = o.decay || 1;
    var osc = ctx.createOscillator(), lp = ctx.createBiquadFilter(), g = ctx.createGain();
    osc.type = o.type || "triangle";
    osc.frequency.setValueAtTime(f, t);
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(o.cutoff || 3000, t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(250, (o.cutoff || 3000) * 0.25), t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(o.gain || 0.3, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    osc.connect(lp); lp.connect(g); g.connect(s.out);
    osc.start(t); osc.stop(t + d + 0.05);
    if (o.overtone) {
      var o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o2.type = "sine"; o2.frequency.value = f * o.overtone[0];
      g2.gain.setValueAtTime(0.0001, t);
      g2.gain.exponentialRampToValueAtTime(o.overtone[1], t + 0.006);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + d * o.overtone[2]);
      o2.connect(g2); g2.connect(s.out);
      o2.start(t); o2.stop(t + d + 0.05);
    }
  }

  // Tiếng kim loại ngân dài (cồng chiêng)
  function gong(s, f) {
    var ctx = s.ctx, t = ctx.currentTime + 0.005;
    [[1, 0.24, 2.6], [1.48, 0.1, 1.6], [2.02, 0.07, 1.3], [2.74, 0.04, 0.9], [1.003, 0.12, 2.6]].forEach(function (p) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f * p[0];
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(p[1], t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + p[2]);
      o.connect(g); g.connect(s.out);
      o.start(t); o.stop(t + p[2] + 0.05);
    });
  }

  // Tiếng đánh không rõ cao độ (trống, phách)
  function hit(s, o) {
    var ctx = s.ctx, t = ctx.currentTime + 0.005;
    if (o.f0) {
      var osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(o.f0, t);
      osc.frequency.exponentialRampToValueAtTime(o.f1, t + (o.drop || 0.1));
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(o.gain, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + o.decay);
      osc.connect(g); g.connect(s.out);
      osc.start(t); osc.stop(t + o.decay + 0.05);
    }
    if (o.noise) {
      var n = noise(ctx), fl = ctx.createBiquadFilter(), ng = ctx.createGain();
      fl.type = o.noise[0]; fl.frequency.value = o.noise[1]; fl.Q.value = o.noise[4] || 0.8;
      ng.gain.setValueAtTime(o.noise[2], t);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + o.noise[3]);
      n.connect(fl); fl.connect(ng); ng.connect(s.out);
      n.start(t); n.stop(t + o.noise[3] + 0.05);
    }
  }

  // Tiếng ngân khi giữ (kéo cung, thổi): trả về { setFreq, stop } để luyến và dừng
  function holdVoice(s, freqs, o) {
    var ctx = s.ctx, t = ctx.currentTime + 0.005;
    var g = ctx.createGain(), mix = ctx.createGain(), nodes = [], oscs = [];
    var lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.frequency.value = o.vib ? o.vib[0] : 5;
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(o.vib ? freqs[0] * o.vib[1] : 0, t + 0.5);
    lfo.connect(lg);
    nodes.push(lfo);
    freqs.forEach(function (f) {
      var osc = ctx.createOscillator();
      osc.type = o.type || "sawtooth";
      osc.frequency.setValueAtTime(f, t);
      lg.connect(osc.frequency);
      osc.connect(mix);
      oscs.push(osc); nodes.push(osc);
    });
    var last = mix;
    (o.filters || []).forEach(function (fd) {
      var fl = ctx.createBiquadFilter();
      fl.type = fd[0]; fl.frequency.value = fd[1]; fl.Q.value = fd[2] || 0.7;
      if (fd[3] !== undefined) fl.gain.value = fd[3];
      last.connect(fl); last = fl;
    });
    last.connect(g);
    if (o.breath) { // tiếng hơi thở (sáo)
      var n = noise(ctx), bp = ctx.createBiquadFilter(), ng = ctx.createGain();
      bp.type = "bandpass"; bp.frequency.value = 3000; ng.gain.value = o.breath;
      n.connect(bp); bp.connect(ng); ng.connect(g);
      nodes.push(n);
    }
    g.gain.setValueAtTime(0, t);
    g.gain.setTargetAtTime(o.level || 0.2, t, (o.attack || 0.06) / 3);
    g.connect(s.out);
    nodes.forEach(function (nd) { nd.start(t); });
    return {
      setFreq: function (list) {
        var now = ctx.currentTime;
        list.forEach(function (f, i) { if (oscs[i]) oscs[i].frequency.setTargetAtTime(f, now, 0.04); });
      },
      stop: function () {
        var now = ctx.currentTime;
        g.gain.cancelScheduledValues(now);
        g.gain.setTargetAtTime(0, now, 0.06);
        nodes.forEach(function (nd) { try { nd.stop(now + 0.4); } catch (e) { /* đã dừng */ } });
      }
    };
  }

  // Âm sắc từng nhạc cụ
  var SOUND = {
    tranh: function (s, f) { pluck(s, f, { type: "triangle", decay: 1.6, gain: 0.26, cutoff: 4200, overtone: [2, 0.05, 0.5] }); },
    nguyet: function (s, f) { pluck(s, f, { type: "sawtooth", decay: 0.9, gain: 0.2, cutoff: 1900 }); },
    tyba: function (s, f, soft) { pluck(s, f, { type: "sawtooth", decay: soft ? 0.3 : 0.9, gain: soft ? 0.14 : 0.24, cutoff: 2600 }); },
    trung: function (s, f) { pluck(s, f, { type: "sine", decay: 0.5, gain: 0.32, cutoff: 6000, overtone: [3, 0.05, 0.25] }); },
    gong: function (s, f) { gong(s, f); },
    nhi: function (s, fs) { return holdVoice(s, fs, { type: "sawtooth", level: 0.2, attack: 0.15, vib: [5.6, 0.013], filters: [["lowpass", 2400], ["peaking", 1200, 1, 6]] }); },
    sao: function (s, fs) { return holdVoice(s, fs, { type: "sine", level: 0.3, attack: 0.06, vib: [5, 0.01], breath: 0.04 }); },
    ken: function (s, fs) { return holdVoice(s, fs, { type: "sawtooth", level: 0.18, attack: 0.04, vib: [6, 0.014], filters: [["highpass", 500], ["peaking", 1400, 1, 8], ["lowpass", 4500]] }); },
    khen: function (s, fs) { return holdVoice(s, fs, { type: "square", level: 0.07, attack: 0.18, vib: [4, 0.003], filters: [["lowpass", 1300]] }); },
    trong: function (s, pad) {
      if (pad === "tung") hit(s, { f0: 150, f1: 70, drop: 0.12, decay: 0.8, gain: 0.9, noise: ["lowpass", 400, 0.2, 0.05] });
      if (pad === "tungNho") hit(s, { f0: 140, f1: 72, drop: 0.1, decay: 0.45, gain: 0.45, noise: ["lowpass", 400, 0.1, 0.04] });
      if (pad === "cac") hit(s, { f0: 800, f1: 650, drop: 0.03, decay: 0.06, gain: 0.1, noise: ["highpass", 2000, 0.4, 0.05] });
    },
    phach: function (s, pad) {
      if (pad === "phachChac") hit(s, { f0: 1700, f1: 1400, drop: 0.02, decay: 0.04, gain: 0.18, noise: ["bandpass", 2400, 0.6, 0.06, 3] });
      if (pad === "phachNhe") hit(s, { f0: 2100, f1: 1900, drop: 0.02, decay: 0.03, gain: 0.08, noise: ["bandpass", 3200, 0.3, 0.04, 3] });
    }
  };

  // Danh sách phím của nhạc cụ đang chọn: { label, freqs, pad }
  function keysOf(cfg) {
    if (cfg.mode === "chord") {
      // Tên phím là nốt của ống được bấm (nốt cuối); ống trì âm luôn vang cùng
      return cfg.chords.map(function (c) { return { label: noteName(hz(c[c.length - 1])), freqs: c.map(hz) }; });
    }
    if (cfg.mode === "pads") {
      return cfg.pads.map(function (p) { return { label: I18n.t("inst.pad." + p), pad: p }; });
    }
    return cfg.notes.map(function (n, i) {
      var label = noteName(hz(n));
      // Cồng chiêng: dòng trên là tên chiếc (cồng có núm / chiêng), dòng dưới là nốt
      var sub = playId === "cong-chieng" ? (i === 0 ? I18n.t("inst.pad.cong") : I18n.t("inst.pad.gong", { n: i + 1 })) : "";
      return { label: label, sub: sub, freqs: [hz(n)] };
    });
  }

  function flash(i) {
    var el = document.querySelector('#playPads [data-key="' + i + '"]');
    if (!el) return;
    el.classList.add("is-on");
    clearTimeout(el._t);
    el._t = setTimeout(function () { if (!held[i]) el.classList.remove("is-on"); }, 180);
  }

  function showNote(k) {
    document.getElementById("playNote").textContent = I18n.t("inst.play.now", { name: I18n.pick(byId(playId).name), note: (k.sub ? k.sub + " · " : "") + k.label });
  }

  // Bấm xuống một phím
  function press(i) {
    var cfg = PLAY[playId], k = keysOf(cfg)[i];
    if (!k) return;
    var s = session();
    if (!s) return;
    recNote("d", i);
    var snd = SOUND[cfg.sound];
    showNote(k);
    if (cfg.mode === "hold" || cfg.mode === "chord") {
      // Đang giữ một phím khác (luyến): đổi cao độ của tiếng đang ngân thay vì tạo tiếng mới
      var ids = Object.keys(held);
      if (cfg.mode === "hold" && ids.length) {
        var v = held[ids[0]];
        delete held[ids[0]];
        clearOn(ids[0]);
        v.setFreq(k.freqs);
        held[i] = v;
      } else if (!held[i]) {
        held[i] = snd(s, k.freqs);
      }
      setOn(i);
      return;
    }
    if (cfg.mode === "tremolo") {
      snd(s, k.freqs[0]);
      // Giữ quá 0.25 giây thì bắt đầu vê: gảy liên tục rất nhanh
      held[i] = { timer: setTimeout(function () {
        held[i].loop = setInterval(function () { if (sess) snd(sess, k.freqs[0], true); }, 70);
      }, 250) };
      setOn(i);
      return;
    }
    if (cfg.mode === "pads") snd(s, k.pad); else snd(s, k.freqs[0]);
    flash(i);
  }

  // Nhả phím
  function release(i) {
    var v = held[i];
    if (!v) return;
    recNote("u", i);
    if (v.stop) v.stop();
    if (v.timer) { clearTimeout(v.timer); clearInterval(v.loop); }
    delete held[i];
    clearOn(i);
  }
  function releaseAll() { Object.keys(held).forEach(release); }
  function setOn(i) { var el = document.querySelector('#playPads [data-key="' + i + '"]'); if (el) el.classList.add("is-on"); }
  function clearOn(i) { var el = document.querySelector('#playPads [data-key="' + i + '"]'); if (el) el.classList.remove("is-on"); }

  // Vẽ các phím của nhạc cụ đang chọn
  function renderPads() {
    var cfg = PLAY[playId];
    var keys = keysOf(cfg);
    var pads = document.getElementById("playPads");
    pads.className = "play-pads mode-" + cfg.mode + " inst-" + playId;
    // Mô hình nhạc cụ (play-models.js): bấm thẳng vào dây, phím, lỗ, ống, mặt trống…
    if (ASV.PlayModels && ASV.PlayModels[playId]) {
      pads.classList.add("has-model");
      pads.innerHTML = ASV.PlayModels[playId](keys, I18n.pick(byId(playId).name), { narrow: NARROW.matches });
      return;
    }
    pads.innerHTML = keys.map(function (k, i) {
      // Ống t'rưng / dây đàn tranh: dài ngắn theo cao độ để nhìn ra trầm bổng
      var style = "";
      if (playId === "dan-trung") style = ' style="--len:' + (100 - i * 8) + '"';
      if (playId === "dan-tranh") style = ' style="--w:' + (3.2 - i * 0.18).toFixed(2) + 'px"';
      if (playId === "cong-chieng") style = ' style="--size:' + (132 - i * 10) + 'px"';
      return '<button type="button" class="play-key" data-key="' + i + '"' + style + ">" +
        '<span class="play-key-num" aria-hidden="true">' + (i + 1) + "</span>" +
        (k.sub ? '<span class="play-key-sub">' + ASV.escape(k.sub) + "</span>" : "") +
        '<span class="play-key-label">' + ASV.escape(k.label) + "</span></button>";
    }).join("");
  }

  function selectPlay(id, opts) {
    if (!byId(id)) return;
    opts = opts || {};
    if (id !== playId) { stopReplay(); if (rec.on) recStop(); }
    releaseAll();
    if (sess && ASV.Player.current && ASV.Player.current.item.key.indexOf("play:") === 0) ASV.Player.stop(true);
    if (ASV.Player.isActive("vbau")) ASV.Player.stop(true);
    sess = null;
    playId = id;
    document.querySelectorAll("#playPicker .filter-btn").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-play-pick") === id ? "true" : "false");
    });
    var isBau = id === "dan-bau";
    document.getElementById("playGeneric").hidden = isBau;
    document.getElementById("vbauPanel").hidden = !isBau;
    if (!isBau) {
      var it = byId(id);
      document.getElementById("playName").textContent = I18n.pick(it.name);
      document.getElementById("playHow").textContent = I18n.t("inst.how." + id);
      renderPads();
      document.getElementById("playNote").textContent = "";
    }
    saveState();
    if (opts.scroll) document.getElementById("choi-thu").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  function renderPicker() {
    document.getElementById("playPicker").innerHTML = ASV_DATA.instruments.map(function (it) {
      return '<button type="button" class="filter-btn" data-play-pick="' + it.id + '" aria-pressed="' + (it.id === playId) + '">' +
        ASV.escape(I18n.pick(it.name)) + "</button>";
    }).join("");
  }

  function setupPlay() {
    var pads = document.getElementById("playPads");
    var down = false, lastKey = null;
    var cfgMode = function () { return PLAY[playId] ? PLAY[playId].mode : ""; };
    var keyAt = function (x, y) {
      var el = document.elementFromPoint(x, y);
      el = el && el.closest("#playPads [data-key]");
      return el ? Number(el.getAttribute("data-key")) : null;
    };
    // Chuột / ngón tay: bấm, giữ, vuốt
    pads.addEventListener("pointerdown", function (e) {
      var k = keyAt(e.clientX, e.clientY);
      if (k === null) return;
      e.preventDefault();
      down = true; lastKey = k;
      try { pads.setPointerCapture(e.pointerId); } catch (err) { /* bỏ qua */ }
      press(k);
    });
    pads.addEventListener("pointermove", function (e) {
      if (!down) return;
      var k = keyAt(e.clientX, e.clientY);
      if (k === null || k === lastKey) return;
      var mode = cfgMode();
      // Vuốt qua dây/ống: gảy từng cái đi qua. Giữ kéo/thổi: luyến sang nốt mới.
      if (mode === "strings" || mode === "hold") {
        if (mode === "strings") press(k);
        else press(k);
        lastKey = k;
      }
    });
    var up = function () {
      if (!down) return;
      down = false;
      releaseAll();
      lastKey = null;
    };
    pads.addEventListener("pointerup", up);
    pads.addEventListener("pointercancel", up);
    pads.addEventListener("lostpointercapture", up);

    // Bàn phím: Enter/Space trên phím đang focus, hoặc phím số 1–9 khi đang ở phần chơi thử
    pads.addEventListener("keydown", function (e) {
      var el = e.target.closest("[data-key]");
      if (!el || (e.key !== "Enter" && e.key !== " ") || e.repeat) return;
      e.preventDefault();
      press(Number(el.getAttribute("data-key")));
    });
    pads.addEventListener("keyup", function (e) {
      var el = e.target.closest("[data-key]");
      if (el && (e.key === "Enter" || e.key === " ")) release(Number(el.getAttribute("data-key")));
    });
    document.addEventListener("keydown", function (e) {
      if (e.repeat || !/^[1-9]$/.test(e.key) || playId === "dan-bau") return;
      if (!e.target.closest || !e.target.closest("#choi-thu") || e.target.matches("input, textarea")) return;
      var i = Number(e.key) - 1;
      if (i < keysOf(PLAY[playId]).length) { e.preventDefault(); press(i); }
    });
    document.addEventListener("keyup", function (e) {
      if (/^[1-9]$/.test(e.key)) release(Number(e.key) - 1);
    });
    var onNarrow = function () { if (playId !== "dan-bau") { releaseAll(); renderPads(); } };
    if (NARROW.addEventListener) NARROW.addEventListener("change", onNarrow); else NARROW.addListener(onNarrow);
    document.getElementById("playPicker").addEventListener("click", function (e) {
      var b = e.target.closest("[data-play-pick]");
      if (b) selectPlay(b.getAttribute("data-play-pick"));
    });
    // Người dùng bấm Dừng / Esc → nhả hết các tiếng đang giữ
    ASV.Player.onChange(function (c) {
      if (!c || c.item.key.indexOf("play:") !== 0) { releaseAll(); if (!c || c.item.key !== "play:" + playId) sess = null; }
    });
  }

  /* Đàn bầu ảo
     Dây buông là nốt Đô (C3 ≈ 130.81 Hz). n = 1 là âm thực (gảy dây buông, không chạm điểm nút);
     n = 2…6 là âm bồi = n × tần số dây buông (cạnh bàn tay chạm điểm nút 1/n chiều dài dây).
     Cần đàn: kéo phải tối đa +5 nửa cung (dây căng), kéo trái tối đa −3 nửa cung (dây chùng). */
  var BASE = 130.81;
  var harmonic = 2;
  var rod = 0;          // −100 … 100
  var live = null;      // các bộ dao động đang kêu, để đổi cao độ khi kéo cần đàn
  var raf = null;

  function semitones() { return rod >= 0 ? (rod / 100) * 5 : (rod / 100) * 3; }
  function freq() { return BASE * harmonic * Math.pow(2, semitones() / 12); }

  // Âm đàn bầu "sống": giữ lại dao động trong biến live để đổi cao độ khi kéo cần đàn
  function voice(ctx, out, t) {
    var f = freq();
    var osc = ctx.createOscillator(), osc2 = ctx.createOscillator();
    var g = ctx.createGain(), g2 = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
    osc.type = "sine"; osc2.type = "sine";
    osc.frequency.setValueAtTime(f, t);
    osc2.frequency.setValueAtTime(f * 2, t);
    g2.gain.value = 0.08;
    lfo.frequency.value = 5.2;
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(f * 0.004, t + 0.8);
    lfo.connect(lg); lg.connect(osc.frequency);
    // Gảy: vang mạnh rồi tắt dần chậm (đàn bầu ngân dài)
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.14, t + 1.2);
    g.gain.setTargetAtTime(0.0001, t + 1.2, 1.3);
    osc.connect(g); osc2.connect(g2); g2.connect(g); g.connect(out);
    [osc, osc2, lfo].forEach(function (o) { o.start(t); o.stop(t + 6.2); });
    live = { ctx: ctx, osc: osc, osc2: osc2 };
    return 6;
  }

  function bendLive() {
    if (!live || !ASV.Player.isActive("vbau")) return;
    var f = freq(), now = live.ctx.currentTime;
    live.osc.frequency.setTargetAtTime(f, now, 0.03);
    live.osc2.frequency.setTargetAtTime(f * 2, now, 0.03);
  }

  // Hình: cần đàn nghiêng theo thanh trượt, dây nối từ đầu cần đàn tới trục
  var PIVOT = { x: 80, y: 122 };
  function rodTip() {
    var G = ASV.Motif.BAU, a = (rod / 100) * 9 * Math.PI / 180;
    var dx = G.sx - PIVOT.x, dy = G.sy - PIVOT.y;
    return { x: PIVOT.x + dx * Math.cos(a) - dy * Math.sin(a), y: PIVOT.y + dx * Math.sin(a) + dy * Math.cos(a) };
  }
  function drawRod(offsetFn) {
    var svg = document.querySelector("#vbauArt svg");
    if (!svg) return;
    var deg = ((rod / 100) * 9).toFixed(2);
    svg.querySelectorAll(".bau-rod-out, .bau-rod, .bau-knob, .bau-gourd").forEach(function (el) {
      el.setAttribute("transform", "rotate(" + deg + " " + PIVOT.x + " " + PIVOT.y + ")");
    });
    var S = rodTip(), P = ASV.Motif.BAU, d = "";
    var dx = P.px - S.x, dy = P.py - S.y, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len;
    for (var i = 0; i <= 64; i++) {
      var u = i / 64, off = offsetFn ? offsetFn(u) : 0;
      d += (i ? "L" : "M") + (S.x + dx * u + nx * off).toFixed(1) + " " + (S.y + dy * u + ny * off).toFixed(1);
    }
    svg.querySelectorAll(".bau-string, .bau-string-halo").forEach(function (p) { p.setAttribute("d", d); });
  }
  // Dây rung theo sóng đứng có "harmonic" bụng sóng, tắt dần
  function vibrate() {
    cancelAnimationFrame(raf);
    if (reduceMotion) { drawRod(); return; }
    var t0 = performance.now();
    (function frame(now) {
      var t = (now - t0) / 1000, amp = 6 * Math.exp(-t / 1.1);
      if (amp < 0.25) { drawRod(); return; }
      drawRod(function (u) { return amp * Math.sin(harmonic * Math.PI * u) * Math.sin(2 * Math.PI * 11 * t); });
      raf = requestAnimationFrame(frame);
    })(t0);
  }

  function updateNote(playing) {
    document.getElementById("vbauNote").textContent = playing ? I18n.t("inst.bau.note", { note: noteName(freq(), true) }) : I18n.t("inst.bau.ready");
  }

  function pluckBau() {
    recNote("p", harmonic);
    ASV.Player.play({
      key: "vbau",
      title: { vi: ASV_TRANSLATIONS.vi["inst.bau.playerTitle"], en: ASV_TRANSLATIONS.en["inst.bau.playerTitle"] },
      synth: voice
    });
    vibrate();
    updateNote(true);
  }

  function renderHarmonics() {
    // 1 = âm thực (dây buông); 2…6 = âm bồi
    document.getElementById("vbauHarm").innerHTML = [1, 2, 3, 4, 5, 6].map(function (n) {
      var label = n === 1 ? I18n.t("inst.bau.open") : I18n.t("inst.bau.harmonic", { n: n });
      return '<button type="button" class="filter-btn" data-harm="' + n + '" aria-pressed="' + (n === harmonic) + '">' +
        ASV.escape(label) + "</button>";
    }).join("");
  }

  function setupBau() {
    renderHarmonics();
    drawRod();
    updateNote(false);
    document.getElementById("vbauPluck").addEventListener("click", pluckBau);
    document.getElementById("vbauArt").addEventListener("click", pluckBau); // bấm vào hình cũng gảy
    var slider = document.getElementById("vbauRod");
    slider.addEventListener("input", function () {
      rod = Number(slider.value);
      recNote("r", rod);
      bendLive();
      if (ASV.Player.isActive("vbau")) updateNote(true);
      drawRod(); // vẽ cần đàn nghiêng ngay; nếu dây đang rung, khung hình sau sẽ rung tiếp
    });
    // Nhấn đúp để đưa cần đàn về giữa
    slider.addEventListener("dblclick", function () { slider.value = 0; slider.dispatchEvent(new Event("input")); });
    document.getElementById("vbauHarm").addEventListener("click", function (e) {
      var b = e.target.closest("[data-harm]");
      if (!b) return;
      harmonic = Number(b.getAttribute("data-harm"));
      renderHarmonics();
      document.querySelector('#vbauHarm [data-harm="' + harmonic + '"]').focus();
      pluckBau(); // đổi âm thì gảy luôn cho nghe
    });
  }

  /* Ghi lại phần chơi thử
     Không thu âm: chỉ ghi các lần bấm, mỗi sự kiện là [thời điểm (ms), loại, giá trị]:
       "d" bấm phím i, "u" nhả phím i (nhạc cụ thường); "p" gảy đàn bầu ở âm h, "r" cần đàn ở vị trí v.
     Nghe lại = gọi lại press/release/pluckBau đúng thời điểm, nên phím trên mô hình cũng sáng lên như lúc chơi.
     Lưu tối đa 5 bản trong trình duyệt (khóa "asv-recordings"); chia sẻ bằng link ?choi=<id>&ban=<mã>#choi-thu. */
  var REC_MAX_MS = 60000, REC_MAX_EV = 600, REC_KEEP = 5;
  var rec = { on: false, inst: null, t0: 0, ev: [], timer: null };
  var take = null;                                   // bản ghi đang có: { inst, ev }
  var replay = { on: false, timers: [], internal: false };
  var recMsg = "";                                   // dòng trạng thái (tính lại khi đổi ngôn ngữ)
  var recMsgArgs = null;

  function recNote(type, val) {
    if (!rec.on || replay.on) return;
    var t = Math.round(performance.now() - rec.t0);
    if (t > REC_MAX_MS) { recStop("rec.full"); return; }
    var last = rec.ev[rec.ev.length - 1];
    // Kéo cần đàn bắn ra rất nhiều sự kiện: gộp các lần kéo sát nhau (dưới 40 ms)
    if (type === "r" && last && last[1] === "r" && t - last[0] < 40) { last[2] = val; return; }
    rec.ev.push([t, type, val]);
    if (rec.ev.length >= REC_MAX_EV) recStop("rec.full");
  }

  function notesIn(tk) { return tk.ev.filter(function (e) { return e[1] === "d" || e[1] === "p"; }).length; }
  function lengthOf(tk) { return tk.ev.length ? tk.ev[tk.ev.length - 1][0] : 0; }
  function clock(ms) { var s = Math.round(ms / 1000); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
  function describe(tk) {
    return { name: I18n.pick(byId(tk.inst).name), n: notesIn(tk), time: clock(lengthOf(tk)) };
  }
  function setMsg(key, args) { recMsg = key; recMsgArgs = args || null; renderRecStatus(); }

  function recStart() {
    stopReplay();
    rec = { on: true, inst: playId, t0: performance.now(), ev: [], timer: null };
    rec.timer = setInterval(function () {
      var t = performance.now() - rec.t0;
      if (t > REC_MAX_MS) recStop("rec.full"); else setMsg("rec.recording", { time: clock(t) });
    }, 250);
    setMsg("rec.recording", { time: "0:00" });
    updateRecUI();
  }

  function recStop(reason) {
    if (!rec.on) return;
    var t = Math.round(performance.now() - rec.t0);
    // Phím còn đang giữ lúc dừng ghi: thêm lần nhả ở cuối
    Object.keys(held).forEach(function (k) { rec.ev.push([Math.min(t, REC_MAX_MS), "u", Number(k)]); });
    rec.on = false;
    clearInterval(rec.timer);
    if (notesIn(rec) === 0) {
      setMsg("rec.empty");
    } else {
      take = { inst: rec.inst, ev: rec.ev };
      setMsg(reason === "rec.full" ? "rec.full" : "rec.ready", describe(take));
    }
    document.getElementById("recShareBox").hidden = true;
    updateRecUI();
  }

  /* Nghe lại */
  function playTake(tk) {
    stopReplay();
    if (rec.on) recStop();
    if (tk.inst !== playId) selectPlay(tk.inst);
    replay.on = true;
    tk.ev.forEach(function (e) {
      replay.timers.push(setTimeout(function () { replayEvent(tk.inst, e); }, e[0] + 60));
    });
    replay.timers.push(setTimeout(finishReplay, lengthOf(tk) + (tk.inst === "dan-bau" ? 2500 : 1200)));
    setMsg("rec.playing");
    updateRecUI();
  }

  function replayEvent(inst, e) {
    replay.internal = true; // các thay đổi của trình phát lúc này là do nghe lại, không phải người dùng bấm Dừng
    try {
      if (inst === "dan-bau") {
        if (e[1] === "p") { harmonic = e[2]; renderHarmonics(); pluckBau(); }
        if (e[1] === "r") {
          rod = e[2];
          document.getElementById("vbauRod").value = rod;
          bendLive();
          if (ASV.Player.isActive("vbau")) updateNote(true);
        }
      } else if (e[1] === "d") press(e[2]);
      else if (e[1] === "u") release(e[2]);
    } finally { replay.internal = false; }
  }

  function finishReplay() {
    replay.timers.forEach(clearTimeout);
    replay.timers = [];
    replay.on = false;
    releaseAll();
    if (take) setMsg("rec.ready", describe(take));
    updateRecUI();
  }
  function stopReplay() { if (replay.on) finishReplay(); }

  /* Mã chia sẻ: mỗi sự kiện viết thành <loại><giá trị>.<khoảng cách tính bằng 10 ms, hệ 36>, nối bằng "_" */
  function encodeTake(tk) {
    var prev = 0;
    return tk.ev.map(function (e) {
      var d = Math.max(0, Math.round((e[0] - prev) / 10));
      prev += d * 10;
      return e[1] + e[2] + "." + d.toString(36);
    }).join("_");
  }
  // Đọc mã từ link hoặc từ bộ nhớ; mã sai hay không hợp với nhạc cụ thì bỏ qua
  function decodeTake(inst, code) {
    if (!byId(inst) || typeof code !== "string" || code.length > 8000) return null;
    var bau = inst === "dan-bau", nKeys = bau ? 0 : keysOf(PLAY[inst]).length;
    var t = 0, ev = [];
    var ok = code.split("_").every(function (part) {
      var m = /^([dupr])(-?\d{1,3})\.([0-9a-z]{1,4})$/.exec(part);
      if (!m) return false;
      t += parseInt(m[3], 36) * 10;
      var v = Number(m[2]), type = m[1];
      if (t > REC_MAX_MS + 2000) return false;
      if (bau ? !((type === "p" && v >= 1 && v <= 6) || (type === "r" && v >= -100 && v <= 100))
              : !((type === "d" || type === "u") && v >= 0 && v < nKeys)) return false;
      ev.push([t, type, v]);
      return true;
    });
    return ok && ev.length && ev.length <= REC_MAX_EV + 20 ? { inst: inst, ev: ev } : null;
  }

  /* Lưu trong trình duyệt */
  function savedList() {
    var list = ASV.storage.get("asv-recordings", []);
    if (!Array.isArray(list)) return [];
    return list.filter(function (x) { return x && decodeTake(x.inst, x.code); }).slice(0, REC_KEEP);
  }
  function saveTake() {
    if (!take) return;
    var list = savedList();
    list.unshift({ inst: take.inst, code: encodeTake(take), at: Date.now() });
    ASV.storage.set("asv-recordings", list.slice(0, REC_KEEP));
    setMsg("rec.saved");
    renderSaved();
  }
  function stamp(ms) {
    var d = new Date(ms), p = function (n) { return ("0" + n).slice(-2); };
    return p(d.getDate()) + "/" + p(d.getMonth() + 1) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }
  function renderSaved() {
    var list = savedList();
    var box = document.getElementById("recSaved");
    box.innerHTML = list.length
      ? list.map(function (x, i) {
          var tk = decodeTake(x.inst, x.code), d = describe(tk);
          return '<li><span class="rec-item-text">' + ASV.escape(I18n.t("rec.item", { name: d.name, n: d.n, time: d.time, date: stamp(x.at) })) + "</span>" +
            '<span class="rec-item-actions"><button type="button" class="btn btn-sm btn-outline-son" data-rec-load="' + i + '">' + I18n.t("rec.listen") + "</button>" +
            '<button type="button" class="btn btn-sm btn-outline-cham" data-rec-del="' + i + '" aria-label="' +
              ASV.escape(I18n.t("rec.delAria", { name: d.name, date: stamp(x.at) })) + '">' + I18n.t("rec.del") + "</button></span></li>";
        }).join("")
      : '<li class="rec-none">' + I18n.t("rec.none") + "</li>";
  }

  /* Link chia sẻ */
  function shareTake() {
    if (!take) return;
    var url = location.href.split(/[?#]/)[0] + "?choi=" + take.inst + "&ban=" + encodeTake(take) + "#choi-thu";
    var box = document.getElementById("recShareBox"), input = document.getElementById("recLink");
    input.value = url;
    box.hidden = false;
    input.focus();
    input.select();
    var done = function () { setMsg("rec.copied"); };
    var fail = function () { setMsg("rec.copyFail"); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, fail);
      else fail();
    } catch (e) { fail(); }
  }

  function renderRecStatus() {
    var el = document.getElementById("recStatus");
    if (el) el.textContent = recMsg ? I18n.t(recMsg, recMsgArgs || {}) : "";
  }
  function updateRecUI() {
    var tg = document.getElementById("recToggle");
    tg.classList.toggle("is-recording", rec.on);
    tg.setAttribute("aria-pressed", rec.on ? "true" : "false");
    tg.querySelector(".rec-label").textContent = I18n.t(rec.on ? "rec.stop" : "rec.start");
    var pl = document.getElementById("recPlay");
    pl.disabled = !take || rec.on;
    pl.querySelector(".rec-label").textContent = I18n.t(replay.on ? "rec.playStop" : "rec.play");
    pl.querySelector(".btn-play-icon").innerHTML = ASV.icon(replay.on ? "stop" : "play");
    document.getElementById("recSave").disabled = !take || rec.on;
    document.getElementById("recShare").disabled = !take || rec.on;
  }

  function setupRec() {
    document.getElementById("recToggle").addEventListener("click", function () { if (rec.on) recStop(); else recStart(); });
    document.getElementById("recPlay").addEventListener("click", function () { if (replay.on) stopReplay(); else if (take) playTake(take); });
    document.getElementById("recSave").addEventListener("click", saveTake);
    document.getElementById("recShare").addEventListener("click", shareTake);
    document.getElementById("recSaved").addEventListener("click", function (e) {
      var l = e.target.closest("[data-rec-load]"), d = e.target.closest("[data-rec-del]");
      var list = savedList();
      if (l) {
        var x = list[Number(l.getAttribute("data-rec-load"))];
        take = decodeTake(x.inst, x.code);
        playTake(take);
      }
      if (d) {
        list.splice(Number(d.getAttribute("data-rec-del")), 1);
        ASV.storage.set("asv-recordings", list);
        renderSaved();
        setMsg("rec.deleted");
        document.getElementById("recToggle").focus(); // nút vừa bấm đã mất, đưa focus về chỗ hợp lý
      }
    });
    // Người dùng bấm Dừng / Esc, hoặc phát âm thanh khác của trang → ngừng nghe lại
    ASV.Player.onChange(function (c) {
      if (!replay.on || replay.internal) return;
      if (!c || (c.item.key !== "vbau" && c.item.key.indexOf("play:") !== 0)) stopReplay();
    });
    renderSaved();
    updateRecUI();
  }

  /* Khởi động */
  ASV.ready(function () {
    // Đọc địa chỉ trang trước khi vẽ (vẽ xong sẽ ghi lại địa chỉ)
    var params = new URLSearchParams(location.search);
    if (["string", "wind", "percussion"].indexOf(params.get("ho")) !== -1) family = params.get("ho");
    query = params.get("q") || "";
    var hash = location.hash.replace("#", "");
    if (byId(params.get("choi"))) playId = params.get("choi");
    if (hash === "dan-bau-ao") playId = "dan-bau"; // link cũ "Chơi thử đàn bầu"

    document.getElementById("instSearch").value = query;
    renderGrid();
    applyFilter();
    setupBau();
    renderPicker();
    setupPlay();
    selectPlay(playId);
    setupRec();
    // Mở từ link chia sẻ: nạp bản ghi nhưng KHÔNG tự phát (âm thanh chỉ phát khi người dùng bấm)
    if (params.get("ban")) {
      var shared = decodeTake(playId, params.get("ban"));
      if (shared) { take = shared; setMsg("rec.shared", describe(take)); updateRecUI(); }
      else setMsg("rec.badLink");
    }
    // Nội dung phía trên do JS vẽ nên làm lệch chỗ nhảy tới: cuộn lại đúng phần được nhắc trong địa chỉ
    if (["choi-thu", "thang-am", "thuat-ngu"].indexOf(hash) !== -1) {
      setTimeout(function () { document.getElementById(hash).scrollIntoView({ behavior: "instant" }); }, 0);
    }

    var el = document.getElementById("instModal");
    if (window.bootstrap) {
      modal = new bootstrap.Modal(el);
      el.addEventListener("hidden.bs.modal", function () {
        if (openId && ASV.Player.isActive("instrument:" + openId)) ASV.Player.stop(true);
        var card = document.querySelector('.inst-card[data-inst="' + openId + '"]');
        openId = null;
        saveState();
        if (card && !el._toPlay) card.focus(); // trả focus về thẻ vừa mở
        el._toPlay = false;
      });
    }
    if (byId(hash)) openModal(hash);
    // Esc luôn đóng hộp chi tiết, kể cả khi hộp còn đang mở dở (Bootstrap bỏ qua lệnh đóng lúc đó,
    // nên ghi nhớ lại và đóng ngay khi hộp mở xong)
    var closeWhenShown = false;
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !modal || !openId) return;
      closeWhenShown = true;
      modal.hide();
    });
    el.addEventListener("shown.bs.modal", function () { if (closeWhenShown) modal.hide(); });
    el.addEventListener("hidden.bs.modal", function () { closeWhenShown = false; });
    el.addEventListener("show.bs.modal", function () { closeWhenShown = false; });

    document.addEventListener("click", function (e) {
      var card = e.target.closest(".inst-card");
      if (card) { openModal(card.getAttribute("data-inst")); return; }
      var f = e.target.closest(".inst-tools .filter-btn");
      if (f) { family = f.getAttribute("data-family"); applyFilter(); return; }
      var s = e.target.closest("#instModal [data-step]");
      if (s) { step(Number(s.getAttribute("data-step"))); return; }
      // "Chơi thử …" trong hộp chi tiết: đóng hộp, chọn nhạc cụ đó ở phần chơi thử rồi cuộn tới
      var tryBtn = e.target.closest("[data-try]");
      if (tryBtn) {
        e.preventDefault();
        el._toPlay = true;
        if (modal) modal.hide();
        selectPlay(tryBtn.getAttribute("data-try"), { scroll: true });
      }
    });
    document.getElementById("instSearch").addEventListener("input", function (e) { query = e.target.value; applyFilter(); });
    document.getElementById("instReset").addEventListener("click", function () {
      family = "all"; query = "";
      document.getElementById("instSearch").value = "";
      applyFilter();
      document.getElementById("instSearch").focus();
    });
    // Link tới instruments.html#dan-tranh khi trang đã mở sẵn
    window.addEventListener("hashchange", function () {
      var id = location.hash.replace("#", "");
      if (id === "dan-bau-ao") selectPlay("dan-bau", { scroll: true });
      else if (byId(id) && id !== openId) openModal(id);
    });
  });

  document.addEventListener("asv:langchange", function () {
    renderGrid();
    applyFilter();
    renderHarmonics();
    renderPicker();
    selectPlay(playId);
    updateNote(ASV.Player.isActive("vbau"));
    if (openId) renderModal();
    renderRecStatus();
    renderSaved();
    updateRecUI();
  });
})();
