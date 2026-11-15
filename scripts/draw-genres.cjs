/* Vẽ 8 cảnh minh họa loại hình cho trang Loại hình (Website-AmSacViet).
   Phong cách tranh khắc gỗ dân gian: nét mực đậm, màu phẳng, nền giấy điệp, nét khắc tô bóng.
   Chạy: node scripts/draw-genres.cjs → Website-AmSacViet/images/loai-hinh/<id>.svg
   Đây là hình gợi tả, không phải tư liệu lịch sử hay bản vẽ trang phục chính xác. */
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '../Website-AmSacViet/images/loai-hinh');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  ink: '#2E2118', paper: '#F1E4C6', son: '#9E2A1C', gold: '#D2A94B', cham: '#26405E', drum: '#4A3518',
  wood: '#6B4A2B', woodL: '#8A6A44', skin: '#E6C9A0', hill: '#8C9663', green: '#5B7247', dgreen: '#3F5434',
  water: '#33506F', straw: '#D9BE84', thatch: '#B8975A', brown: '#7A5A3A', cream: '#FBF4E2', bamboo: '#D6BB78'
};
const f = (n) => Number(n.toFixed(1));

function wrap(title, body, script) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <!-- ${title}. Minh họa vẽ mới cho dự án, phỏng theo phong cách tranh khắc gỗ dân gian.
       Sinh bởi scripts/${script || "draw-genres.cjs"} — sửa ở script rồi chạy lại. -->
  <style>
    .k { stroke: ${C.ink}; stroke-width: 2.2; stroke-linejoin: round; stroke-linecap: round; }
    .l { stroke: ${C.ink}; stroke-width: 1.3; stroke-linejoin: round; stroke-linecap: round; }
    .t { stroke: ${C.ink}; stroke-width: 1.3; fill: none; stroke-linecap: round; }
  </style>
  <defs>
    <pattern id="diep" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="7" r="1.3" fill="#FBF4E2"/><circle cx="22" cy="18" r="1" fill="#FBF4E2"/><circle cx="13" cy="29" r="0.8" fill="#E2CFA8"/>
    </pattern>
    <pattern id="song" width="36" height="16" patternUnits="userSpaceOnUse">
      <path d="M0 12 Q9 3 18 12 Q27 3 36 12" fill="none" stroke="#8FA6BD" stroke-width="1.5"/>
    </pattern>
    <pattern id="gan" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <path d="M0 3.5 H7" stroke="${C.ink}" stroke-width="0.7" opacity="0.2"/>
    </pattern>
  </defs>
  <rect width="400" height="300" fill="${C.paper}"/>
  <rect width="400" height="300" fill="url(#diep)"/>
${body}
</svg>
`;
}

/* ---------- Các phần dùng chung ---------- */
// Đồi xa + đồi gần, có nét khắc tô bóng
function hills(y, y2) {
  const a = `M0 ${y + 20} Q70 ${y - 30} 140 ${y + 10} Q210 ${y - 40} 290 ${y + 6} Q350 ${y - 18} 400 ${y + 4} V${y2} H0Z`;
  const b = `M0 ${y + 40} Q90 ${y + 14} 180 ${y + 34} Q280 ${y + 12} 400 ${y + 30} V${y2} H0Z`;
  return `  <path class="k" fill="${C.hill}" d="${a}"/><path d="${a}" fill="url(#gan)"/>
  <path class="k" fill="${C.green}" d="${b}"/><path d="${b}" fill="url(#gan)"/>`;
}
function water(y) {
  return `  <rect x="0" y="${y}" width="400" height="${300 - y}" fill="${C.water}"/>
  <rect x="0" y="${y}" width="400" height="${300 - y}" fill="url(#song)"/>
  <path class="k" fill="none" d="M0 ${y} H400"/>`;
}
function ground(y, color) {
  return `  <path class="k" fill="${color || C.green}" d="M0 ${y} Q200 ${y - 8} 400 ${y} V300 H0Z"/>
  <path d="M0 ${y} Q200 ${y - 8} 400 ${y} V300 H0Z" fill="url(#gan)"/>`;
}
function sun(x, y, r, color) { return `  <circle class="k" cx="${x}" cy="${y}" r="${r}" fill="${color || C.son}"/>`; }
function cloud(x, y) {
  return `  <path class="k" fill="${C.cream}" d="M${x} ${y} q4 -14 20 -9 q8 -12 22 -3 q14 -3 14 9 q-4 9 -16 5 q-9 8 -22 2 q-14 5 -18 -4z"/>`;
}
function birds(x, y) {
  return `  <path class="t" d="M${x} ${y} q4 -4 8 0 q4 -4 8 0 M${x + 22} ${y - 8} q3 -3 6 0 q3 -3 6 0 M${x + 10} ${y + 10} q3 -3 6 0 q3 -3 6 0"/>`;
}
// Mái đình / mái miếu cong
function roof(x, y, w, body, roofColor) {
  const h = w * 0.32;
  return `  <rect class="k" x="${f(x - w * 0.36)}" y="${y}" width="${f(w * 0.72)}" height="${f(h * 1.1)}" fill="${body || C.wood}"/>
  <path class="t" d="M${f(x - w * 0.14)} ${y} v${f(h * 1.1)} M${f(x + w * 0.14)} ${y} v${f(h * 1.1)}"/>
  <path class="k" fill="${roofColor || C.drum}" d="M${f(x - w * 0.6)} ${f(y - h * 0.3)} Q${f(x - w * 0.5)} ${y} ${f(x - w * 0.42)} ${y} L${f(x - w * 0.3)} ${f(y - h)} L${f(x + w * 0.3)} ${f(y - h)} L${f(x + w * 0.42)} ${y} Q${f(x + w * 0.5)} ${y} ${f(x + w * 0.6)} ${f(y - h * 0.3)} Q${f(x + w * 0.52)} ${f(y + h * 0.15)} ${f(x + w * 0.4)} ${f(y + h * 0.15)} L${f(x - w * 0.4)} ${f(y + h * 0.15)} Q${f(x - w * 0.52)} ${f(y + h * 0.15)} ${f(x - w * 0.6)} ${f(y - h * 0.3)}Z"/>`;
}
// Mũ / nón / khăn
function hat(type, x, top, s) {
  switch (type) {
    case 'non-la': return `<path class="k" fill="${C.straw}" d="M${f(x - 15 * s)} ${f(top + 3 * s)} L${x} ${f(top - 13 * s)} L${f(x + 15 * s)} ${f(top + 3 * s)}Z"/>`;
    case 'quai-thao': return `<ellipse class="k" cx="${x}" cy="${f(top - 2 * s)}" rx="${f(19 * s)}" ry="${f(4.5 * s)}" fill="${C.gold}"/><path class="t" d="M${f(x - 12 * s)} ${f(top)} Q${f(x - 9 * s)} ${f(top + 14 * s)} ${f(x - 5 * s)} ${f(top + 17 * s)} M${f(x + 12 * s)} ${f(top)} Q${f(x + 9 * s)} ${f(top + 14 * s)} ${f(x + 5 * s)} ${f(top + 17 * s)}"/>`;
    case 'khan-xep': return `<path class="k" fill="${C.ink}" d="M${f(x - 8 * s)} ${f(top + 5 * s)} Q${x} ${f(top - 4 * s)} ${f(x + 8 * s)} ${f(top + 5 * s)} L${f(x + 7.5 * s)} ${f(top + 7.5 * s)} Q${x} ${f(top + 2 * s)} ${f(x - 7.5 * s)} ${f(top + 7.5 * s)}Z"/>`;
    case 'mu-quan': return `<path class="k" fill="${C.ink}" d="M${f(x - 8 * s)} ${f(top + 6 * s)} L${f(x - 7 * s)} ${f(top - 4 * s)} L${f(x + 7 * s)} ${f(top - 4 * s)} L${f(x + 8 * s)} ${f(top + 6 * s)}Z"/><path class="k" fill="none" d="M${f(x - 7 * s)} ${f(top - 1 * s)} h${f(-6 * s)} M${f(x + 7 * s)} ${f(top - 1 * s)} h${f(6 * s)}"/>`;
    case 'bui-toc': return `<circle class="l" cx="${f(x + 5 * s)}" cy="${f(top + 3 * s)}" r="${f(3.6 * s)}" fill="${C.ink}"/>`;
    case 'khan-mo-qua': return `<path class="k" fill="${C.ink}" d="M${f(x - 8 * s)} ${f(top + 6 * s)} Q${x} ${f(top - 3 * s)} ${f(x + 8 * s)} ${f(top + 6 * s)} Q${x} ${f(top + 2 * s)} ${f(x - 8 * s)} ${f(top + 6 * s)}Z"/><path class="k" fill="${C.ink}" d="M${f(x - 4 * s)} ${f(top - 1 * s)} l-4 -7 l7 3z M${f(x + 4 * s)} ${f(top - 1 * s)} l4 -7 l-7 3z"/>`;
    case 'khan-ran': return `<path class="k" fill="${C.son}" d="M${f(x - 8 * s)} ${f(top + 4 * s)} Q${x} ${f(top - 4 * s)} ${f(x + 8 * s)} ${f(top + 4 * s)} L${f(x + 12 * s)} ${f(top + 8 * s)} L${f(x + 7 * s)} ${f(top + 7 * s)} Q${x} ${f(top + 2 * s)} ${f(x - 7 * s)} ${f(top + 7 * s)}Z"/>`;
    default: return '';
  }
}
// Người đứng: thân áo hình thang, đầu tròn, nón/khăn; tay (nếu có) là nét dày
function stand(o) {
  const s = o.s || 1, x = o.x, y = o.y, h = 58 * s;
  const top = y - h, headY = top - 8 * s;
  let g = `  <g>`;
  if (o.arm) g += `<path class="k" fill="none" style="stroke-width:${f(7 * s)}" d="M${f(x + o.arm[0] * s)} ${f(top + 8 * s)} L${f(x + o.arm[1] * s)} ${f(top + o.arm[2] * s)}"/><path fill="none" stroke="${o.top}" stroke-width="${f(4 * s)}" stroke-linecap="round" d="M${f(x + o.arm[0] * s)} ${f(top + 8 * s)} L${f(x + o.arm[1] * s)} ${f(top + o.arm[2] * s)}"/>`;
  g += `<path class="k" fill="${o.top}" d="M${f(x - 10 * s)} ${f(top)} L${f(x + 10 * s)} ${f(top)} L${f(x + (o.wide || 16) * s)} ${y} L${f(x - (o.wide || 16) * s)} ${y}Z"/>`;
  if (o.bottom) g += `<path class="k" fill="${o.bottom}" d="M${f(x - 13 * s)} ${f(y - 18 * s)} L${f(x + 13 * s)} ${f(y - 18 * s)} L${f(x + 14 * s)} ${y} L${f(x - 14 * s)} ${y}Z"/>`;
  if (o.yem) g += `<path class="l" fill="${o.yem}" d="M${f(x - 5 * s)} ${f(top)} L${f(x + 5 * s)} ${f(top)} L${f(x + 4 * s)} ${f(top + 22 * s)} L${f(x - 4 * s)} ${f(top + 22 * s)}Z"/>`;
  if (o.belt) g += `<path d="M${f(x - 12 * s)} ${f(top + 26 * s)} H${f(x + 12 * s)}" stroke="${o.belt}" stroke-width="${f(3 * s)}"/>`;
  g += `<circle class="k" cx="${x}" cy="${f(headY)}" r="${f(7.5 * s)}" fill="${C.skin}"/>`;
  g += hat(o.hat, x, headY - 7.5 * s, s);
  return g + `</g>`;
}
// Người ngồi xếp bằng
function sit(o) {
  const s = o.s || 1, x = o.x, y = o.y, h = 36 * s;
  const top = y - h, headY = top - 8 * s;
  let g = `  <g><ellipse class="k" cx="${x}" cy="${f(y - 3 * s)}" rx="${f(22 * s)}" ry="${f(6 * s)}" fill="${o.legs || C.ink}"/>`;
  g += `<path class="k" fill="${o.top}" d="M${f(x - 10 * s)} ${f(top)} L${f(x + 10 * s)} ${f(top)} L${f(x + 14 * s)} ${f(y - 4 * s)} L${f(x - 14 * s)} ${f(y - 4 * s)}Z"/>`;
  g += `<circle class="k" cx="${x}" cy="${f(headY)}" r="${f(7.5 * s)}" fill="${C.skin}"/>`;
  g += hat(o.hat, x, headY - 7.5 * s, s);
  return g + `</g>`;
}
// Quạt xòe (múa xoan)
function fan(x, y, r, rot) {
  return `  <g transform="translate(${x} ${y}) rotate(${rot})"><path class="k" fill="${C.son}" d="M0 0 L${-r} 0 A${r} ${r} 0 0 1 ${r} 0 Z"/><path class="t" d="M0 0 L${f(-r * 0.7)} ${f(-r * 0.7)} M0 0 L0 ${-r} M0 0 L${f(r * 0.7)} ${f(-r * 0.7)}" style="stroke:${C.gold}"/></g>`;
}
// Trống nhỏ trên giá
function drumOnStand(x, y, r) {
  return `  <path class="k" fill="none" d="M${x - r} ${y + r * 1.6} L${x - r * 0.4} ${y} M${x + r} ${y + r * 1.6} L${x + r * 0.4} ${y}" style="stroke-width:3"/>
  <ellipse class="k" cx="${x}" cy="${y}" rx="${r}" ry="${f(r * 0.75)}" fill="${C.son}"/>
  <ellipse class="l" cx="${f(x - r * 0.2)}" cy="${y}" rx="${f(r * 0.5)}" ry="${f(r * 0.6)}" fill="${C.skin}"/>`;
}
// Dùi gõ / que
function stick(x1, y1, x2, y2, color) {
  return `  <path class="k" fill="none" style="stroke-width:5" d="M${x1} ${y1} L${x2} ${y2}"/><path fill="none" stroke="${color || C.straw}" stroke-width="2.4" stroke-linecap="round" d="M${x1} ${y1} L${x2} ${y2}"/>`;
}

const S = {};

/* 1. Quan họ: liền anh, liền chị hát đối đáp trước sân đình, bên ao làng */
S['quan-ho'] = ['Dân ca quan họ Bắc Ninh', [
  sun(330, 60, 22), cloud(60, 64), birds(150, 48),
  hills(120, 230),
  roof(200, 150, 150, C.wood, C.drum),
  `  <path class="k" fill="#C9A15A" d="M0 214 Q200 204 400 214 V236 H0Z"/>`,
  water(236),
  stand({ x: 120, y: 226, s: 1.25, top: C.son, yem: C.gold, hat: 'quai-thao', arm: [9, 26, 22] }),
  stand({ x: 160, y: 226, s: 1.12, top: '#7A2E22', yem: C.gold, hat: 'quai-thao' }),
  stand({ x: 252, y: 226, s: 1.22, top: C.cham, hat: 'khan-xep', arm: [-9, -24, 22] }),
  stand({ x: 292, y: 226, s: 1.12, top: C.ink, hat: 'khan-xep' }),
  `  <path class="k" fill="none" d="M300 216 L314 166"/><path class="k" fill="${C.ink}" d="M310 176 L317 152 L319 179Z"/>`
].join('\n')];

/* 2. Ca trù: ca nương gõ phách, kép đàn chơi đàn đáy, quan viên cầm chầu */
S['ca-tru'] = ['Ca trù', [
  `  <rect x="0" y="0" width="400" height="200" fill="#E9D8B4"/>`,
  `  <path d="M0 0 H400 V200 H0Z" fill="url(#gan)"/>`,
  `  <rect class="k" x="26" y="0" width="16" height="210" fill="${C.wood}"/><rect class="k" x="358" y="0" width="16" height="210" fill="${C.wood}"/>`,
  `  <path class="k" fill="${C.son}" d="M42 0 H358 V26 Q200 46 42 26Z"/>`,
  `  <rect class="k" x="160" y="60" width="80" height="96" fill="${C.cream}"/><path class="t" d="M176 80 q24 -10 48 0 M176 100 q24 10 48 0 M200 120 v24"/>`,
  `  <path class="k" fill="#C9A15A" d="M0 200 H400 V300 H0Z"/>`,
  `  <path d="M30 224 H370 M20 252 H380 M10 280 H390" stroke="${C.son}" stroke-width="2"/>`,
  // Kép đàn với đàn đáy (cần rất dài, thân hình thang)
  sit({ x: 92, y: 262, s: 1.25, top: C.cham, hat: 'khan-xep' }),
  `  <path class="k" fill="${C.woodL}" d="M100 232 L132 232 L128 258 L104 258Z"/>`,
  `  <path class="k" fill="none" style="stroke-width:5" d="M116 232 L58 140"/><path fill="none" stroke="${C.woodL}" stroke-width="2.6" stroke-linecap="round" d="M116 232 L58 140"/>`,
  // Ca nương ngồi giữa, trước mặt là bàn phách
  sit({ x: 200, y: 262, s: 1.3, top: C.son, hat: 'bui-toc' }),
  `  <rect class="k" x="178" y="262" width="46" height="10" rx="3" fill="${C.bamboo}"/>`,
  stick(186, 248, 206, 262, C.wood), stick(224, 246, 212, 262, C.wood),
  // Quan viên với trống chầu
  sit({ x: 306, y: 262, s: 1.25, top: C.ink, hat: 'khan-xep' }),
  drumOnStand(346, 238, 16), stick(318, 222, 344, 232, C.straw)
].join('\n')];

/* 3. Hát xoan: đào xoan múa quạt trước miếu, kép xoan đánh trống */
S['hat-xoan'] = ['Hát xoan Phú Thọ', [
  sun(340, 56, 20, C.son), birds(70, 50),
  hills(110, 240),
  roof(210, 140, 170, '#7A2E22', C.drum),
  `  <path class="k" fill="none" d="M74 220 V120 M346 220 V120"/><path class="k" fill="${C.gold}" d="M74 120 l24 8 l-24 8z M346 120 l-24 8 l24 8z"/>`,
  ground(232, '#C9A15A'),
  drumOnStand(70, 238, 18), stick(92, 206, 76, 232),
  stand({ x: 102, y: 270, s: 1.1, top: C.cham, hat: 'khan-xep', arm: [-8, -22, 12] }),
  ...[170, 220, 270, 320].map((x, i) => stand({ x, y: 274, s: 1.15, top: i % 2 ? '#7A2E22' : C.son, yem: C.gold, hat: 'bui-toc', arm: [9, 20, 20] })),
  ...[170, 220, 270, 320].map((x) => fan(x + 22, 244, 14, -35))
].join('\n')];

/* 4. Nhã nhạc: dàn nhạc cung đình trước cổng thành */
S['nha-nhac'] = ['Nhã nhạc cung đình Huế', [
  cloud(40, 48), cloud(300, 40),
  `  <rect class="k" x="40" y="104" width="320" height="96" fill="#9E5A3C"/><path d="M40 104 H360 V200 H40Z" fill="url(#gan)"/>`,
  `  <path class="k" fill="${C.ink}" d="M130 200 V160 Q150 136 170 160 V200Z M230 200 V160 Q250 136 270 160 V200Z M186 200 V150 Q200 126 214 150 V200Z"/>`,
  `  <path class="k" fill="${C.gold}" d="M70 104 L90 80 H310 L330 104Z"/>`,
  `  <path class="k" fill="#C9A15A" d="M110 80 V60 H290 V80Z"/>`,
  `  <path class="k" fill="${C.gold}" d="M100 60 L120 40 H280 L300 60Z"/>`,
  `  <path class="k" fill="${C.son}" d="M186 40 V26 H214 V40Z"/>`,
  ground(212, '#C9A15A'),
  `  <path d="M0 236 H400 M0 262 H400" stroke="${C.woodL}" stroke-width="1.2" opacity="0.5"/>`,
  drumOnStand(60, 226, 22), stick(84, 196, 64, 222),
  ...[120, 170, 220, 270, 320].map((x) => stand({ x, y: 284, s: 1.1, top: C.son, belt: C.gold, hat: 'mu-quan', arm: [8, 16, 24] })),
  // Kèn bầu ở tay các nhạc công
  ...[120, 170, 220, 270, 320].map((x) => `  <path class="l" fill="${C.drum}" d="M${x + 14} ${222} L${x + 18} ${222} L${x + 22} ${250} L${x + 10} ${250}Z"/><path class="l" fill="${C.gold}" d="M${x + 10} 250 L${x + 22} 250 L${x + 28} 262 L${x + 4} 262Z"/>`)
].join('\n')];

/* 5. Ví, giặm: hát trên sông Lam, dưới chân núi Hồng Lĩnh */
S['vi-giam'] = ['Dân ca ví, giặm Nghệ Tĩnh', [
  sun(320, 70, 26, C.gold), birds(200, 52),
  `  <path class="k" fill="#A9AE84" d="M0 170 L40 120 L70 150 L110 96 L150 146 L190 110 L230 160 L260 130 L300 168 V200 H0Z"/><path d="M0 170 L40 120 L70 150 L110 96 L150 146 L190 110 L230 160 L260 130 L300 168 V200 H0Z" fill="url(#gan)"/>`,
  `  <path class="k" fill="${C.green}" d="M0 186 Q120 170 240 184 Q320 176 400 186 V206 H0Z"/>`,
  water(204),
  // Thuyền và cô gái chèo
  `  <path class="k" fill="${C.wood}" d="M110 250 Q190 270 280 248 L270 264 Q190 284 120 264Z"/>`,
  stand({ x: 238, y: 252, s: 1.05, top: C.son, bottom: C.ink, hat: 'non-la', arm: [8, 26, 26] }),
  `  <path class="k" fill="none" d="M270 214 L250 290"/>`,
  sit({ x: 160, y: 254, s: 0.95, top: C.cham, hat: 'non-la' }),
  // Bờ ruộng bên phải có người đáp lời
  `  <path class="k" fill="${C.green}" d="M300 214 Q350 208 400 212 V300 H320Z"/>`,
  `  <path class="t" d="M336 234 l3 -8 l3 8 M356 244 l3 -8 l3 8 M372 230 l3 -8 l3 8 M384 258 l3 -8 l3 8" style="stroke:${C.dgreen}"/>`,
  stand({ x: 352, y: 278, s: 1.0, top: C.brown, hat: 'non-la', arm: [-8, -22, 0] })
].join('\n')];

/* 6. Bài chòi: các chòi tre, anh hiệu hô thai giữa sân hội */
(() => {
  const choi = (x, y) => `  <path class="k" fill="none" style="stroke-width:3" d="M${x - 22} ${y + 60} V${y} M${x + 22} ${y + 60} V${y} M${x - 22} ${y + 34} L${x + 22} ${y + 10} M${x - 22} ${y + 10} L${x + 22} ${y + 34}"/>
  <rect class="k" x="${x - 26}" y="${y - 6}" width="52" height="8" fill="${C.bamboo}"/>
  <path class="k" fill="${C.thatch}" d="M${x - 34} ${y - 6} L${x} ${y - 44} L${x + 34} ${y - 6}Z"/>
  <path class="t" d="M${x - 20} ${y - 12} L${x} ${y - 36} M${x + 20} ${y - 12} L${x} ${y - 36} M${x} ${y - 10} V${y - 38}"/>`;
  S['bai-choi'] = ['Nghệ thuật Bài chòi Trung Bộ', [
    sun(200, 56, 20, C.son), cloud(40, 50), cloud(310, 42),
    hills(120, 220),
    ground(214, '#C9A15A'),
    choi(56, 170), choi(130, 160), choi(270, 160), choi(344, 170),
    `  <path class="k" fill="none" d="M200 210 V96"/><path class="k" fill="${C.son}" d="M200 98 L236 108 L200 120Z"/>`,
    drumOnStand(250, 244, 16), stick(272, 214, 254, 238),
    stand({ x: 200, y: 280, s: 1.25, top: C.cham, belt: C.gold, hat: 'khan-xep', arm: [9, 30, 4] }),
    `  <rect class="l" x="226" y="196" width="14" height="20" fill="${C.cream}" transform="rotate(-12 233 206)"/>`,
    stand({ x: 120, y: 290, s: 0.95, top: C.son, hat: 'non-la' }),
    stand({ x: 312, y: 292, s: 0.95, top: C.brown, hat: 'non-la' })
  ].join('\n')];
})();

/* 7. Cồng chiêng Tây Nguyên: vòng người đánh chiêng trước nhà rông, cây nêu */
S['cong-chieng'] = ['Không gian văn hóa Cồng chiêng Tây Nguyên', [
  sun(340, 54, 20, C.gold),
  hills(130, 230),
  `  <path class="k" fill="none" style="stroke-width:3" d="M170 214 V170 M230 214 V170"/>`,
  `  <path class="k" fill="${C.thatch}" d="M150 176 L200 26 L250 176Z"/><path d="M150 176 L200 26 L250 176Z" fill="url(#gan)"/>`,
  `  <path class="t" d="M170 150 L200 60 L230 150 M186 160 L200 100 L214 160"/>`,
  `  <path class="k" fill="none" d="M60 222 V70"/>`,
  `  <path class="k" fill="${C.son}" d="M60 76 q22 6 26 22 q-14 -6 -26 -4z M60 76 q-22 6 -26 22 q14 -6 26 -4z"/>`,
  `  <path class="t" d="M60 110 q14 8 0 16 q-14 8 0 16" style="stroke:${C.son};stroke-width:2"/>`,
  ground(216, '#B98B5A'),
  ...[[110, 282], [160, 290], [220, 292], [280, 288], [330, 280]].map(([x, y], i) =>
    stand({ x, y, s: 1.08, top: i % 2 ? C.ink : C.son, belt: C.gold, hat: '', arm: [8, 20, 18] }) +
    `\n  <circle class="k" cx="${x + 20}" cy="${y - 44}" r="13" fill="#B98B3E"/><circle class="l" cx="${x + 20}" cy="${y - 44}" r="9" fill="${C.gold}"/>${i % 2 ? '' : `<circle class="l" cx="${x + 20}" cy="${y - 44}" r="3.5" fill="#B98B3E"/>`}`)
].join('\n')];

/* 8. Đờn ca tài tử: đờn ca trên ghe giữa kênh rạch miền Tây */
S['tai-tu'] = ['Đờn ca tài tử Nam Bộ', [
  sun(80, 64, 26, C.gold), birds(140, 46),
  `  <path class="k" fill="${C.green}" d="M0 160 Q100 150 200 158 Q300 150 400 160 V190 H0Z"/>`,
  `  <path class="k" fill="none" style="stroke-width:6" d="M300 168 Q306 110 330 56"/><path fill="none" stroke="${C.brown}" stroke-width="3" d="M300 168 Q306 110 330 56"/>`,
  `  <g class="l" fill="${C.dgreen}" transform="translate(330 56)"><path d="M0 0 Q28 -18 60 4 Q30 -6 0 0Z" transform="rotate(10)"/><path d="M0 0 Q28 -18 60 4 Q30 -6 0 0Z" transform="rotate(50)"/><path d="M0 0 Q28 -18 60 4 Q30 -6 0 0Z" transform="scale(-1 1) rotate(10)"/><path d="M0 0 Q28 -18 60 4 Q30 -6 0 0Z" transform="scale(-1 1) rotate(50)"/><path d="M0 0 Q28 -18 60 4 Q30 -6 0 0Z" transform="rotate(-30)"/></g>`,
  water(184),
  `  <g class="l" fill="${C.green}"><ellipse cx="40" cy="214" rx="16" ry="5"/><ellipse cx="66" cy="222" rx="11" ry="4"/><ellipse cx="350" cy="290" rx="16" ry="5"/></g>`,
  // Ghe có mui
  `  <path class="k" fill="${C.wood}" d="M60 262 Q200 290 350 260 L338 278 Q200 304 74 280Z"/>`,
  `  <path class="k" fill="${C.woodL}" d="M240 266 Q244 214 282 212 Q318 214 322 262Z"/><path class="t" d="M254 264 Q258 228 282 226 Q306 228 310 262"/>`,
  // Người đờn đàn kìm
  sit({ x: 118, y: 270, s: 1.1, top: C.cham, hat: 'khan-ran' }),
  `  <path class="k" fill="none" style="stroke-width:4" d="M134 252 L168 214"/><circle class="k" cx="132" cy="256" r="11" fill="${C.gold}"/>`,
  // Người đờn tranh
  sit({ x: 176, y: 274, s: 1.05, top: C.brown, hat: '' }),
  `  <path class="k" fill="${C.woodL}" d="M150 270 L214 258 L216 266 L152 278Z"/>`,
  // Người ca
  stand({ x: 222, y: 276, s: 1.05, top: C.son, bottom: C.ink, hat: 'bui-toc' })
].join('\n')];

// Cho script khác (draw-history.cjs) dùng lại bộ nét vẽ
module.exports = { C, f, wrap, hills, water, ground, sun, cloud, birds, roof, hat, stand, sit, fan, drumOnStand, stick };
if (require.main === module) for (const id of Object.keys(S)) {
  const [title, body] = S[id];
  fs.writeFileSync(path.join(OUT, id + '.svg'), wrap(title, body));
}
if (require.main === module) console.log('Đã vẽ ' + Object.keys(S).length + ' cảnh vào ' + OUT);
