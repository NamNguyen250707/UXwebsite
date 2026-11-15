/* play-models.js: Mô hình nhạc cụ để bấm trực tiếp (trang Nhạc cụ, phần "Chơi thử")
   Mỗi hàm nhận danh sách phím (keys: [{ label, sub }]), tên nhạc cụ và opts ({ narrow: màn hình hẹp })
   rồi trả về một hình SVG.
   Chỗ bấm được là <g class="pm-hit" data-key="i">: dây đàn, phím đàn, lỗ sáo, ống tre, mặt trống…
   instruments.js lo phần âm thanh; file này chỉ vẽ hình.
   Nạp sau common.js, trước instruments.js. */

var ASV = window.ASV || {};

ASV.PlayModels = (function () {
  var f = function (n) { return Number(n.toFixed(1)); };
  var esc = function (s) { return ASV.escape(s); };

  // Một vùng bấm được: dùng được bằng chuột, chạm và bàn phím (Tab rồi Enter/Space)
  function hit(i, k, inner) {
    var label = (k.sub ? k.sub + " · " : "") + k.label;
    return '<g class="pm-hit" data-key="' + i + '" tabindex="0" role="button" aria-label="' + esc(label) + '">' + inner + "</g>";
  }
  function text(x, y, s, cls) { return '<text class="pm-label ' + (cls || "") + '" x="' + f(x) + '" y="' + f(y) + '">' + esc(s) + "</text>"; }
  function svg(vb, body, label) {
    return '<svg class="pm-svg" viewBox="' + vb + '" role="group" aria-label="' + esc(label) + '">' + body + "</svg>";
  }

  var M = {};

  /* Đàn tranh: dây căng dọc thân đàn, con nhạn xếp chéo; vuốt lên/xuống qua các dây để gảy liên tiếp */
  M["dan-tranh"] = function (keys, name, opts) {
    var n = keys.length, o = [], labels = [];
    // Màn hình hẹp: vẽ đàn ngắn lại (co theo chiều ngang) để các dây cách nhau đủ rộng cho ngón tay
    var narrow = opts && opts.narrow, sx = narrow ? 0.36 : 1, sy = narrow ? 1.35 : 1;
    o.push('<path class="pm-wood" d="M30 60 L840 22 Q856 22 856 38 L856 282 Q856 298 840 298 L30 262 Q16 260 16 246 L16 76 Q16 60 30 60 Z"/>');
    o.push('<path class="pm-face" d="M46 70 L826 34 L826 286 L46 252 Z"/>');
    o.push('<rect class="pm-horn" x="70" y="68" width="10" height="186" rx="3"/><rect class="pm-horn" x="790" y="38" width="10" height="246" rx="3"/>');
    for (var i = 0; i < n; i++) {
      // Dây trầm (i = 0) ở gần người chơi (phía dưới), dây cao ở xa
      var yl = 244 - i * (168 / (n - 1)), yr = 274 - i * (228 / (n - 1));
      var bx = 290 + i * 40, by = yl + (yr - yl) * ((bx - 75) / 720);
      o.push(hit(i, keys[i],
        '<line class="pm-hitline" x1="75" y1="' + f(yl) + '" x2="795" y2="' + f(yr) + '"/>' +
        '<line class="pm-string" style="stroke-width:' + f(2.8 - i * 0.16) + '" x1="75" y1="' + f(yl) + '" x2="795" y2="' + f(yr) + '"/>' +
        '<path class="pm-horn" d="M' + f(bx - 7) + " " + f(by + 6) + " L" + f(bx) + " " + f(by - 6) + " L" + f(bx + 7) + " " + f(by + 6) + 'Z"/>'));
      labels.push(text(866 * sx + (narrow ? 4 : 0), yr * sy + 4, keys[i].label, "pm-small"));
    }
    return svg(narrow ? "0 0 360 " + Math.round(310 * sy) : "0 0 930 310",
      '<g transform="scale(' + sx + " " + sy + ')">' + o.join("") + "</g>" + labels.join(""), name);
  };

  /* Đàn nguyệt: bầu tròn, cần dài với các phím cao; bấm vào từng phím */
  M["dan-nguyet"] = function (keys, name) {
    var o = [];
    o.push('<circle class="pm-wood" cx="150" cy="150" r="118"/><circle class="pm-line" cx="150" cy="150" r="100"/>');
    o.push('<rect class="pm-dark" x="248" y="132" width="600" height="36" rx="6"/>');
    o.push('<path class="pm-dark" d="M846 132 Q880 124 892 100 L880 96 Q868 118 846 118 Z M846 168 L846 132"/>');
    o.push('<rect class="pm-horn" x="110" y="128" width="12" height="44" rx="3"/>');
    o.push('<line class="pm-string" x1="116" y1="143" x2="860" y2="143"/><line class="pm-string" x1="116" y1="157" x2="860" y2="157"/>');
    keys.forEach(function (k, i) {
      var x = 300 + i * 78;
      o.push(hit(i, k,
        '<rect class="pm-hitarea" x="' + (x - 36) + '" y="96" width="72" height="104" rx="6"/>' +
        '<rect class="pm-fret" x="' + (x - 5) + '" y="120" width="10" height="60" rx="2"/>' +
        text(x, 90, k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Đàn nhị: cần dài, 2 trục, bát đàn bịt da, cung vĩ; bấm và giữ ở các vị trí ngón tay trên cần */
  M["dan-nhi"] = function (keys, name) {
    var o = [];
    o.push('<rect class="pm-dark" x="110" y="143" width="700" height="14" rx="4"/>');
    o.push('<path class="pm-dark" d="M110 143 Q90 150 110 157 Z"/>');
    o.push('<rect class="pm-horn" x="140" y="108" width="10" height="38" rx="3"/><rect class="pm-horn" x="180" y="154" width="10" height="38" rx="3"/>');
    o.push('<rect class="pm-wood" x="800" y="118" width="70" height="64" rx="8"/><ellipse class="pm-skin" cx="870" cy="150" rx="12" ry="32"/>');
    o.push('<line class="pm-string" x1="150" y1="146" x2="864" y2="146"/><line class="pm-string" x1="190" y1="154" x2="864" y2="154"/>');
    o.push('<path class="pm-bow" d="M420 232 Q640 200 890 214"/><line class="pm-line" x1="424" y1="226" x2="888" y2="208"/>');
    keys.forEach(function (k, i) {
      var x = 260 + i * 88;
      o.push(hit(i, k,
        '<rect class="pm-hitarea" x="' + (x - 40) + '" y="104" width="80" height="92" rx="6"/>' +
        '<circle class="pm-dot" cx="' + x + '" cy="150" r="7"/>' +
        text(x, 96, k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Tỳ bà: thân hình quả lê, cần ngắn có phím; bấm nhanh để gảy, giữ để vê */
  M["ty-ba"] = function (keys, name) {
    var o = [];
    o.push('<path class="pm-wood" d="M40 150 C40 50 200 40 340 92 C430 120 520 136 560 142 L560 158 C520 164 430 180 340 208 C200 260 40 250 40 150 Z"/>');
    o.push('<rect class="pm-dark" x="556" y="136" width="280" height="28" rx="5"/>');
    o.push('<path class="pm-dark" d="M832 136 Q868 120 880 96 L892 102 Q878 134 836 164 Z"/>');
    o.push('<rect class="pm-horn" x="92" y="118" width="12" height="64" rx="3"/>');
    [142, 147, 153, 158].forEach(function (y) { o.push('<line class="pm-string" x1="98" y1="' + y + '" x2="850" y2="' + y + '"/>'); });
    // Phím gần đầu đàn cho nốt trầm, phím xuống thân đàn cho nốt cao
    keys.forEach(function (k, i) {
      var x = 790 - i * 82;
      o.push(hit(i, k,
        '<rect class="pm-hitarea" x="' + (x - 38) + '" y="100" width="76" height="100" rx="6"/>' +
        '<rect class="pm-fret" x="' + (x - 4) + '" y="' + (i < 4 ? 130 : 120) + '" width="8" height="' + (i < 4 ? 40 : 60) + '" rx="2"/>' +
        text(x, 94, k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Sáo trúc: ống trúc, lỗ thổi bên trái, các lỗ bấm; giữ một lỗ để thổi */
  M["sao-truc"] = function (keys, name) {
    var o = [];
    o.push('<rect class="pm-bamboo" x="30" y="130" width="840" height="40" rx="20"/>');
    o.push('<line class="pm-node" x1="90" y1="130" x2="90" y2="170"/><line class="pm-node" x1="810" y1="130" x2="810" y2="170"/>');
    o.push('<ellipse class="pm-hole" cx="170" cy="150" rx="11" ry="8"/>'); // lỗ thổi
    keys.forEach(function (k, i) {
      var x = 400 + i * 70;
      o.push(hit(i, k,
        '<circle class="pm-hitarea" cx="' + x + '" cy="150" r="30"/>' +
        '<circle class="pm-hole" cx="' + x + '" cy="150" r="9"/>' +
        text(x, 112, k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Kèn bầu: dăm kèn, thân côn có lỗ bấm, loa kèn loe; giữ một lỗ để thổi */
  M["ken-bau"] = function (keys, name) {
    var o = [];
    o.push('<rect class="pm-horn" x="30" y="143" width="44" height="14" rx="3"/><ellipse class="pm-gold" cx="80" cy="150" rx="6" ry="24"/>');
    o.push('<path class="pm-dark" d="M84 140 L640 128 L640 172 L84 160 Z"/>');
    o.push('<path class="pm-gold" d="M636 126 Q720 120 880 46 L880 254 Q720 180 636 174 Z"/>');
    keys.forEach(function (k, i) {
      var x = 200 + i * 72;
      o.push(hit(i, k,
        '<circle class="pm-hitarea" cx="' + x + '" cy="150" r="30"/>' +
        '<circle class="pm-hole pm-hole-light" cx="' + x + '" cy="150" r="7"/>' +
        text(x, 108, k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Khèn: bầu hơi bằng gỗ, các ống trúc; mỗi ống một nốt, vang cùng ống trì âm (giữ để thổi) */
  M["khen"] = function (keys, name) {
    var o = [];
    // Ống trì âm (luôn vang cùng), không bấm
    o.push('<rect class="pm-bamboo pm-drone" x="270" y="30" width="22" height="250" rx="10"/>');
    keys.forEach(function (k, i) {
      var x = 340 + i * 74, top = 40 + i * 18;
      o.push(hit(i, k,
        '<rect class="pm-hitarea" x="' + (x - 30) + '" y="' + (top - 6) + '" width="60" height="' + (232 - top) + '" rx="8"/>' +
        '<rect class="pm-bamboo" x="' + (x - 11) + '" y="' + top + '" width="22" height="' + (280 - top) + '" rx="10"/>' +
        '<circle class="pm-hole" cx="' + x + '" cy="' + (top + 40) + '" r="6"/>' +
        text(x, top - 10, k.label, "pm-small pm-mid")));
    });
    o.push('<path class="pm-wood" d="M60 222 Q60 206 80 206 L230 204 Q300 186 450 188 Q650 192 700 222 Q650 254 450 256 Q300 258 230 240 L80 238 Q60 238 60 222 Z"/>');
    o.push('<line class="pm-node" x1="250" y1="160" x2="720" y2="140"/>');
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Trống (nhìn từ trên): giữa mặt trống = "Tùng", gần mép da = "Tùng nhỏ", tang trống (vành gỗ) = "Cắc" */
  M["trong"] = function (keys, name) {
    // keys theo thứ tự trong PLAY: 0 = tung, 1 = cac, 2 = tungNho
    var o = [];
    o.push(hit(1, keys[1], '<circle class="pm-rim" cx="450" cy="150" r="140"/>' + text(450, 28, keys[1].label, "pm-mid pm-on-rim")));
    o.push(hit(2, keys[2], '<circle class="pm-skin" cx="450" cy="150" r="112"/>' + text(450, 238, keys[2].label, "pm-small pm-mid")));
    o.push(hit(0, keys[0], '<circle class="pm-skin-center" cx="450" cy="150" r="56"/>' + text(450, 156, keys[0].label, "pm-mid")));
    for (var a = 0; a < 24; a++) {
      var r = a * Math.PI / 12;
      o.push('<circle class="pm-tack" cx="' + f(450 + Math.cos(r) * 126) + '" cy="' + f(150 + Math.sin(r) * 126) + '" r="3"/>');
    }
    o.push('<line class="pm-stick" x1="690" y1="40" x2="800" y2="250"/><line class="pm-stick" x1="760" y1="34" x2="840" y2="250"/>');
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Phách: bàn phách tre và hai dùi; gõ bên trái tiếng chắc, bên phải tiếng nhẹ */
  M["phach"] = function (keys, name) {
    var o = [];
    o.push('<line class="pm-stick" x1="260" y1="40" x2="420" y2="120"/><line class="pm-stick" x1="640" y1="40" x2="500" y2="120"/>');
    keys.forEach(function (k, i) {
      var x = i === 0 ? 180 : 450;
      o.push(hit(i, k,
        '<rect class="pm-bamboo pm-board" x="' + x + '" y="130" width="270" height="74" rx="' + (i === 0 ? "18 0" : "0 18") + '"/>' +
        text(x + 135, 240, k.label, "pm-mid")));
    });
    o.push('<line class="pm-node" x1="450" y1="130" x2="450" y2="204"/>');
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Đàn t'rưng: ống tre xâu trên hai sợi dây, ống dài tiếng trầm; bấm hoặc vuốt qua các ống */
  M["dan-trung"] = function (keys, name, opts) {
    var n = keys.length, o = [], labels = [];
    var narrow = opts && opts.narrow, sx = narrow ? 0.42 : 1, tx = narrow ? 40 : 0;
    o.push('<line class="pm-cord" x1="300" y1="20" x2="270" y2="290"/><line class="pm-cord" x1="600" y1="20" x2="630" y2="290"/>');
    for (var i = 0; i < n; i++) {
      var y = 258 - i * (220 / (n - 1)), len = 700 - i * 52, x = 450 - len / 2;
      o.push(hit(i, keys[i],
        '<rect class="pm-hitarea" x="' + f(x - 6) + '" y="' + f(y - 15) + '" width="' + f(len + 12) + '" height="30" rx="14"/>' +
        '<rect class="pm-bamboo" x="' + f(x) + '" y="' + f(y - 10) + '" width="' + f(len) + '" height="20" rx="10"/>' +
        '<line class="pm-node" x1="' + f(x + 30) + '" y1="' + f(y - 10) + '" x2="' + f(x + 30) + '" y2="' + f(y + 10) + '"/>'));
      labels.push(text(tx + (x - 14) * sx, y + 5, keys[i].label, "pm-small pm-end"));
    }
    return svg(narrow ? "0 0 400 300" : "0 0 900 300",
      '<g transform="translate(' + tx + ' 0) scale(' + sx + ' 1)">' + o.join("") + "</g>" + labels.join(""), name);
  };

  /* Cồng chiêng: treo trên xà gỗ, chiếc lớn tiếng trầm; cồng (chiếc đầu) có núm */
  M["cong-chieng"] = function (keys, name) {
    var o = ['<rect class="pm-dark" x="30" y="26" width="840" height="18" rx="6"/>'];
    keys.forEach(function (k, i) {
      var cx = 120 + i * 168, r = 78 - i * 8, cy = 70 + r + 14;
      o.push('<line class="pm-cord" x1="' + (cx - r * 0.4) + '" y1="44" x2="' + (cx - r * 0.25) + '" y2="' + (cy - r + 6) + '"/>' +
             '<line class="pm-cord" x1="' + (cx + r * 0.4) + '" y1="44" x2="' + (cx + r * 0.25) + '" y2="' + (cy - r + 6) + '"/>');
      o.push(hit(i, k,
        '<circle class="pm-bronze" cx="' + cx + '" cy="' + f(cy) + '" r="' + r + '"/>' +
        '<circle class="pm-gold" cx="' + cx + '" cy="' + f(cy) + '" r="' + f(r * 0.8) + '"/>' +
        (i === 0 ? '<circle class="pm-bronze" cx="' + cx + '" cy="' + f(cy) + '" r="' + f(r * 0.24) + '"/>' : "") +
        text(cx, cy + r + 24, (k.sub ? k.sub + " · " : "") + k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  return M;
})();
