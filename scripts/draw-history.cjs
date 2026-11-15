/* Vẽ 8 cảnh minh họa cho trang Lịch sử (Website-AmSacViet/history.html).
   Cùng phong cách và bộ nét vẽ với draw-genres.cjs (tranh khắc gỗ: nét mực đậm, màu phẳng, nền giấy điệp).
   Chạy: node scripts/draw-history.cjs → Website-AmSacViet/images/lich-su/<id>.svg
   Đây là hình vẽ mới gợi tả từng thời kỳ, KHÔNG phải hiện vật hay tư liệu lịch sử
   (ví dụ mặt trống đồng ở cảnh 1 là hình đơn giản hóa, không chép hoa văn của một chiếc trống cụ thể). */
const fs = require('fs');
const path = require('path');
const G = require('./draw-genres.cjs');
const { C, f, wrap, hills, water, ground, sun, cloud, birds, roof, stand, sit, fan, drumOnStand, stick } = G;
const OUT = path.resolve(__dirname, '../Website-AmSacViet/images/lich-su');
fs.mkdirSync(OUT, { recursive: true });

const BRONZE = '#B98B3E', BRONZE_D = '#8A6A2E', STONE = '#9C978A', STONE_D = '#7C776B';

/* Chim bay (kiểu chim mỏ dài trên trống đồng, vẽ đơn giản): đặt ở (x, y), xoay theo góc a */
function bird(x, y, a, s) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)}) scale(${s})">` +
    `<path class="l" fill="${C.ink}" d="M-12 0 Q-4 -3 4 -1 L14 -2 L5 1 Q-2 3 -12 0Z"/>` +
    `<path class="l" fill="${C.ink}" d="M-3 -1 L-8 -9 L1 -2Z M-3 1 L-7 8 L1 2Z"/></g>`;
}
// Đàn bầu nằm ngang: hộp đàn, cần đàn và bầu cộng hưởng ở đầu bên trái
function danBau(x1, x2, y) {
  return `  <path class="k" fill="${C.woodL}" d="M${x1} ${y - 7} H${x2} V${y + 7} H${x1}Z"/>
  <path class="t" d="M${x1 + 4} ${y - 7} H${x2 - 4}" style="stroke:${C.cream}"/>
  <path class="k" fill="none" style="stroke-width:3.5" d="M${x1 + 16} ${y - 7} Q${x1 + 10} ${y - 40} ${x1 + 24} ${y - 58}"/>
  <ellipse class="k" cx="${x1 + 17}" cy="${y - 32}" rx="9" ry="7" fill="${C.straw}"/>
  <path class="l" fill="none" d="M${x1 + 24} ${y - 58} L${x2 - 6} ${y - 6}"/>`;
}
// Đàn tranh nằm ngang (hình thang dài, có nhạn đàn)
function danTranh(x1, x2, y) {
  let s = `  <path class="k" fill="${C.woodL}" d="M${x1} ${y - 6} L${x2} ${y - 10} L${x2} ${y + 8} L${x1} ${y + 6}Z"/>`;
  for (let i = 0; i < 5; i++) {
    const bx = x1 + 20 + i * ((x2 - x1 - 40) / 4);
    s += `<path class="l" fill="${C.cream}" d="M${f(bx - 3)} ${y + 2} L${f(bx)} ${y - 5} L${f(bx + 3)} ${y + 2}Z"/>`;
  }
  return s;
}
// Đàn kìm (đàn nguyệt): bầu tròn, cần dài
function danKim(cx, cy, r, ang) {
  const rad = (ang * Math.PI) / 180, nx = cx + Math.cos(rad) * r * 3.4, ny = cy + Math.sin(rad) * r * 3.4;
  return `  <path class="k" fill="none" style="stroke-width:4" d="M${cx} ${cy} L${f(nx)} ${f(ny)}"/><circle class="k" cx="${cx}" cy="${cy}" r="${r}" fill="${C.gold}"/><circle class="l" cx="${cx}" cy="${cy}" r="${f(r * 0.3)}" fill="${C.drum}"/>`;
}

const S = {};

/* 1. Đàn đá và trống đồng: mặt trống nhìn từ trên (sao giữa, vòng hoa văn, vòng chim bay) và bộ đàn đá */
(() => {
  const cx = 150, cy = 152;
  let star = '';
  const n = 12;
  for (let i = 0; i < n * 2; i++) {
    const a = (i * Math.PI) / n - Math.PI / 2, r = i % 2 ? 9 : 30;
    star += (i ? 'L' : 'M') + f(cx + Math.cos(a) * r) + ' ' + f(cy + Math.sin(a) * r) + ' ';
  }
  // Vòng tròn đồng tâm có chấm, gạch chéo
  const dots = [];
  for (let i = 0; i < 36; i++) { const a = (i / 36) * Math.PI * 2; dots.push(`<circle cx="${f(cx + Math.cos(a) * 46)}" cy="${f(cy + Math.sin(a) * 46)}" r="1.8" fill="${C.ink}"/>`); }
  const ticks = [];
  for (let i = 0; i < 48; i++) { const a = (i / 48) * Math.PI * 2; ticks.push(`M${f(cx + Math.cos(a) * 92)} ${f(cy + Math.sin(a) * 92)} L${f(cx + Math.cos(a + 0.05) * 100)} ${f(cy + Math.sin(a + 0.05) * 100)}`); }
  const flock = [];
  for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; flock.push(bird(cx + Math.cos(a) * 72, cy + Math.sin(a) * 72, (a * 180) / Math.PI + 90, 1)); }
  // Đàn đá: các thanh đá dài ngắn khác nhau, đặt trên hai thanh gỗ
  const bars = [];
  for (let i = 0; i < 7; i++) {
    const y = 64 + i * 28, w = 96 - i * 8, x = 334 - w / 2;
    bars.push(`  <path class="k" fill="${i % 2 ? STONE : STONE_D}" d="M${f(x)} ${y} L${f(x + w - 4)} ${y - 2} L${f(x + w)} ${y + 9} L${f(x + 6)} ${y + 13} Z"/><path d="M${f(x)} ${y} L${f(x + w - 4)} ${y - 2} L${f(x + w)} ${y + 9} L${f(x + 6)} ${y + 13} Z" fill="url(#gan)"/>`);
  }
  S['dong-son'] = ['Đàn đá và trống đồng', [
    `  <circle class="k" cx="${cx}" cy="${cy}" r="124" fill="${BRONZE_D}"/>`,
    `  <circle class="k" cx="${cx}" cy="${cy}" r="112" fill="${BRONZE}"/><circle cx="${cx}" cy="${cy}" r="112" fill="url(#gan)"/>`,
    `  <path class="t" d="${ticks.join(' ')}"/>`,
    `  <circle class="t" cx="${cx}" cy="${cy}" r="88"/><circle class="t" cx="${cx}" cy="${cy}" r="56"/><circle class="t" cx="${cx}" cy="${cy}" r="40"/>`,
    `  ${dots.join('')}`,
    `  ${flock.join('')}`,
    `  <path class="k" fill="${C.gold}" d="${star}Z"/>`,
    `  <path class="k" fill="none" style="stroke-width:6" d="M276 54 V258 M388 54 V258"/><path fill="none" stroke="${C.wood}" stroke-width="3" d="M276 54 V258 M388 54 V258"/>`,
    ...bars,
    stick(258, 262, 300, 226, C.straw)
  ].join('\n')];
})();

/* 2. Thời Lý – Trần: thủy đình giữa ao, rối múa trên mặt nước, người đánh trống trên bờ */
S['ly-tran'] = ['Múa rối nước thời Lý – Trần', [
  sun(330, 52, 20, C.son), cloud(60, 52), birds(150, 40),
  hills(96, 180),
  water(170),
  `  <path class="k" fill="${C.woodL}" d="M226 150 H352 V170 H226Z"/>`,
  `  <path class="k" fill="none" style="stroke-width:3" d="M236 170 V196 M342 170 V196 M289 170 V196"/>`,
  roof(289, 128, 130, '#7A2E22', C.drum),
  `  <path class="t" d="M240 150 V132 M338 150 V132"/>`,
  // Rèm tre trước thủy đình, nơi người điều khiển rối đứng sau
  `  <path class="k" fill="${C.bamboo}" d="M244 132 H334 V152 H244Z"/><path class="t" d="M256 132 V152 M268 132 V152 M280 132 V152 M292 132 V152 M304 132 V152 M316 132 V152"/>`,
  // Rối trên mặt nước
  stand({ x: 150, y: 232, s: 0.8, top: C.son, belt: C.gold, hat: 'khan-xep', arm: [8, 20, 10] }),
  stand({ x: 196, y: 238, s: 0.75, top: C.cham, belt: C.gold, hat: 'bui-toc', arm: [-8, -18, 10] }),
  `  <path class="t" d="M126 236 q24 8 48 0 M172 242 q24 8 48 0" style="stroke:${C.cream};stroke-width:2"/>`,
  fan(220, 196, 11, -30),
  // Bờ ao bên trái, người đánh trống
  `  <path class="k" fill="${C.green}" d="M0 210 Q50 200 96 214 L80 300 H0Z"/><path d="M0 210 Q50 200 96 214 L80 300 H0Z" fill="url(#gan)"/>`,
  drumOnStand(60, 246, 16),
  stick(34, 214, 56, 240),
  stand({ x: 28, y: 284, s: 0.9, top: C.brown, hat: 'khan-xep', arm: [6, 10, 0] })
].join('\n')];

/* 3. Thời Lê: khánh đá treo trước sân đình, đào nương gõ phách */
S['le'] = ['Khánh đá và hát cửa đình thời Lê', [
  cloud(300, 46), birds(220, 40),
  hills(110, 200),
  roof(250, 150, 190, C.wood, C.drum),
  ground(208, '#C9A15A'),
  `  <path d="M0 240 H400 M0 268 H400" stroke="${C.woodL}" stroke-width="1.2" opacity="0.5"/>`,
  // Giá khánh và khánh đá hình thước thợ
  `  <path class="k" fill="none" style="stroke-width:7" d="M34 270 V96 M150 270 V96 M26 96 H158"/><path fill="none" stroke="${C.wood}" stroke-width="4" d="M34 270 V96 M150 270 V96 M26 96 H158"/>`,
  `  <path class="t" d="M76 96 L84 128 M108 96 L100 128"/>`,
  `  <path class="k" fill="${STONE}" d="M46 152 L92 122 L138 152 L132 164 L92 138 L52 164Z"/><path d="M46 152 L92 122 L138 152 L132 164 L92 138 L52 164Z" fill="url(#gan)"/>`,
  // Đào nương gõ phách, kép đàn đáy
  sit({ x: 236, y: 272, s: 1.25, top: C.son, hat: 'bui-toc' }),
  `  <rect class="k" x="214" y="272" width="46" height="10" rx="3" fill="${C.bamboo}"/>`,
  stick(222, 258, 242, 272, C.wood), stick(260, 256, 248, 272, C.wood),
  sit({ x: 330, y: 272, s: 1.15, top: C.cham, hat: 'khan-xep' }),
  `  <path class="k" fill="${C.woodL}" d="M338 244 L366 244 L362 266 L342 266Z"/>`,
  `  <path class="k" fill="none" style="stroke-width:5" d="M352 244 L312 182"/><path fill="none" stroke="${C.woodL}" stroke-width="2.6" stroke-linecap="round" d="M352 244 L312 182"/>`
].join('\n')];

/* 4. Triều Nguyễn: cổng cung điện nhiều mái, dàn nhạc cung đình phía trước */
S['nguyen'] = ['Nhã nhạc triều Nguyễn', [
  cloud(24, 40), cloud(326, 34), birds(250, 54),
  // Nền cổng: tường đá xám hình chữ U nhìn chính diện, ba cửa vòm thấp
  `  <rect class="k" x="20" y="134" width="360" height="76" fill="#A39A86"/><path d="M20 134 H380 V210 H20Z" fill="url(#gan)"/>`,
  `  <path class="t" d="M20 152 H380 M20 172 H380 M20 192 H380" style="opacity:0.45"/>`,
  `  <path class="k" fill="${C.ink}" d="M184 210 V182 Q200 166 216 182 V210Z M120 210 V188 Q132 176 144 188 V210Z M256 210 V188 Q268 176 280 188 V210Z"/>`,
  // Lầu Ngũ Phụng: lầu giữa hai tầng mái, hai bên là lầu thấp
  `  <rect class="k" x="40" y="110" width="80" height="24" fill="${C.son}"/><rect class="k" x="280" y="110" width="80" height="24" fill="${C.son}"/>`,
  `  <path class="k" fill="${C.gold}" d="M28 112 Q40 98 54 96 H106 Q120 98 132 112Z M268 112 Q280 98 294 96 H346 Q360 98 372 112Z"/>`,
  `  <path class="t" d="M60 110 V134 M80 110 V134 M100 110 V134 M300 110 V134 M320 110 V134 M340 110 V134"/>`,
  `  <rect class="k" x="132" y="100" width="136" height="34" fill="${C.son}"/><path class="t" d="M154 100 V134 M178 100 V134 M222 100 V134 M246 100 V134"/>`,
  `  <path class="k" fill="${C.dgreen}" d="M118 104 Q132 90 150 86 H250 Q268 90 282 104 Z"/>`,
  `  <rect class="k" x="154" y="66" width="92" height="20" fill="${C.son}"/>`,
  `  <path class="k" fill="${C.gold}" d="M136 70 Q150 54 168 50 H232 Q250 54 264 70 Z"/>`,
  `  <path class="k" fill="${C.gold}" d="M196 50 L200 40 L204 50Z"/>`,
  ground(214, '#C9A15A'),
  `  <path d="M0 240 H400 M0 266 H400" stroke="${C.woodL}" stroke-width="1.2" opacity="0.5"/>`,
  drumOnStand(52, 232, 22), stick(78, 202, 58, 228),
  ...[120, 172, 224, 276, 328].map((x) => stand({ x, y: 288, s: 1.05, top: C.son, belt: C.gold, hat: 'mu-quan', arm: [8, 16, 24] })),
  ...[120, 172, 224, 276, 328].map((x) => `  <path class="l" fill="${C.drum}" d="M${x + 14} 228 L${x + 18} 228 L${x + 22} 254 L${x + 10} 254Z"/><path class="l" fill="${C.gold}" d="M${x + 10} 254 L${x + 22} 254 L${x + 28} 266 L${x + 4} 266Z"/>`)
].join('\n')];

/* 5. Đờn ca tài tử và cải lương: sân khấu màn đỏ, hai nghệ sĩ diễn, dàn đờn ngồi bên */
S['tai-tu-cai-luong'] = ['Sân khấu cải lương', [
  `  <rect x="0" y="0" width="400" height="300" fill="#3A2A1C"/>`,
  // Phông cảnh vẽ: trời, đồi, sông
  `  <rect class="k" x="56" y="34" width="288" height="170" fill="#E9D8B4"/>`,
  `  <path class="k" fill="${C.hill}" d="M56 150 Q120 100 180 140 Q250 96 344 136 V204 H56Z"/><path d="M56 150 Q120 100 180 140 Q250 96 344 136 V204 H56Z" fill="url(#gan)"/>`,
  `  <circle class="k" cx="276" cy="78" r="16" fill="${C.son}"/>`,
  // Màn đỏ kéo sang hai bên và diềm trên
  `  <path class="k" fill="${C.son}" d="M40 20 H118 Q96 110 112 212 H40Z"/><path class="t" d="M58 24 Q52 120 62 210 M78 24 Q72 120 84 210" style="stroke:#7F2116"/>`,
  `  <path class="k" fill="${C.son}" d="M360 20 H282 Q304 110 288 212 H360Z"/><path class="t" d="M342 24 Q348 120 338 210 M322 24 Q328 120 316 210" style="stroke:#7F2116"/>`,
  `  <path class="k" fill="#7F2116" d="M30 10 H370 V34 Q350 44 330 34 Q310 44 290 34 Q270 44 250 34 Q230 44 210 34 Q190 44 170 34 Q150 44 130 34 Q110 44 90 34 Q70 44 50 34 Q40 40 30 34Z"/>`,
  `  <path class="k" fill="${C.gold}" d="M30 6 H370 V14 H30Z"/>`,
  // Sàn sân khấu
  `  <path class="k" fill="${C.wood}" d="M20 204 H380 V232 H20Z"/><path class="t" d="M20 218 H380"/>`,
  // Hai nghệ sĩ
  stand({ x: 168, y: 204, s: 1.15, top: C.cham, belt: C.gold, hat: 'mu-quan', arm: [9, 30, 6] }),
  stand({ x: 234, y: 204, s: 1.1, top: C.son, yem: C.gold, hat: 'bui-toc', arm: [-9, -26, 14] }),
  // Dàn đờn ngồi dưới, bên trái sân khấu
  `  <rect x="0" y="232" width="400" height="68" fill="${C.drum}"/>`,
  sit({ x: 70, y: 290, s: 1.0, top: C.brown, hat: 'khan-ran' }),
  danKim(90, 272, 10, -50),
  sit({ x: 150, y: 292, s: 0.95, top: C.cham, hat: '' }),
  `  <path class="k" fill="${C.woodL}" d="M122 288 L182 278 L184 285 L124 295Z"/>`
].join('\n')];

/* 6. Từ năm 1956: lớp học nhạc dân tộc, bảng có khuông nhạc */
S['hien-dai'] = ['Lớp học nhạc dân tộc', [
  `  <rect x="0" y="0" width="400" height="214" fill="#E9D8B4"/><path d="M0 0 H400 V214 H0Z" fill="url(#gan)"/>`,
  // Bảng đen có khuông nhạc
  `  <rect class="k" x="150" y="34" width="210" height="104" fill="#2F4A3A"/><rect class="k" x="144" y="28" width="222" height="116" fill="none" style="stroke:${C.wood};stroke-width:5"/>`,
  `  <path d="M166 62 H344 M166 72 H344 M166 82 H344 M166 92 H344 M166 102 H344" stroke="${C.cream}" stroke-width="1.2" opacity="0.8"/>`,
  ...[[190, 92], [214, 87], [238, 82], [262, 77], [290, 82], [318, 92]].map(([x, y]) => `  <ellipse cx="${x}" cy="${y}" rx="5" ry="3.6" fill="${C.cream}" transform="rotate(-20 ${x} ${y})"/><path d="M${x + 4.6} ${y - 1} V${y - 22}" stroke="${C.cream}" stroke-width="1.4"/>`),
  // Cửa sổ
  `  <rect class="k" x="24" y="40" width="88" height="98" fill="${C.cream}"/><path class="k" fill="none" d="M68 40 V138 M24 89 H112"/>`,
  `  <path class="k" fill="${C.green}" d="M26 136 Q46 104 66 118 Q86 96 110 120 V136Z"/>`,
  // Sàn
  `  <path class="k" fill="${C.woodL}" d="M0 214 H400 V300 H0Z"/><path class="t" d="M0 248 H400 M0 278 H400" style="opacity:0.5"/>`,
  // Thầy giáo đứng
  stand({ x: 120, y: 248, s: 1.15, top: C.cham, bottom: C.ink, hat: '', arm: [9, 34, -2] }),
  // Học trò với đàn bầu và đàn tranh
  sit({ x: 236, y: 286, s: 1.0, top: C.son, hat: 'bui-toc' }),
  danBau(190, 300, 262),
  sit({ x: 344, y: 290, s: 1.0, top: C.brown, hat: '' }),
  danTranh(300, 396, 270)
].join('\n')];

/* 7. Các mốc UNESCO: tám vật gợi tám loại hình quanh một tấm bằng có dấu đỏ */
S['unesco'] = ['Các mốc UNESCO', [
  // Tấm bằng (giấy cuộn)
  `  <rect class="k" x="130" y="80" width="140" height="150" fill="${C.cream}"/>`,
  `  <path class="k" fill="${C.straw}" d="M122 74 H278 V88 H122Z M122 222 H278 V236 H122Z"/>`,
  `  <path class="t" d="M150 108 H250 M150 124 H250 M150 140 H232 M150 156 H250 M150 172 H220"/>`,
  `  <rect class="k" x="216" y="182" width="32" height="32" fill="${C.son}"/><path d="M224 190 H240 V206 H224Z M232 190 V206" fill="none" stroke="${C.cream}" stroke-width="1.6"/>`,
  // 1. Chiêng có núm
  `  <circle class="k" cx="60" cy="58" r="30" fill="${BRONZE}"/><circle class="l" cx="60" cy="58" r="20" fill="${C.gold}"/><circle class="l" cx="60" cy="58" r="7" fill="${BRONZE}"/>`,
  // 2. Nón quai thao
  `  <ellipse class="k" cx="200" cy="40" rx="40" ry="10" fill="${C.gold}"/><ellipse class="l" cx="200" cy="38" rx="18" ry="4" fill="${C.straw}"/><path class="t" d="M176 44 Q180 64 190 70 M224 44 Q220 64 210 70"/>`,
  // 3. Phách và dùi
  `  <rect class="k" x="306" y="54" width="70" height="12" rx="3" fill="${C.bamboo}"/>`,
  stick(316, 38, 336, 54, C.wood), stick(368, 34, 352, 54, C.wood),
  // 4. Quạt xòe
  fan(60, 168, 30, 0),
  // 5. Kèn bầu
  `  <path class="k" fill="${C.drum}" d="M330 130 L338 130 L346 178 L322 178Z"/><path class="k" fill="${C.gold}" d="M322 178 L346 178 L358 200 L310 200Z"/><path class="k" fill="${C.ink}" d="M332 122 h4 v8 h-4z"/>`,
  // 6. Đàn kìm
  danKim(70, 262, 18, -60),
  // 7. Nón lá
  `  <path class="k" fill="${C.straw}" d="M160 278 L200 244 L240 278Z"/><path class="t" d="M174 266 H226 M186 256 H214"/>`,
  // 8. Thẻ bài chòi
  `  <g transform="rotate(10 330 260)"><rect class="k" x="310" y="226" width="40" height="62" fill="${C.cream}"/><path class="t" d="M318 240 H342 M318 252 H342 M318 264 H336" style="stroke:${C.son}"/></g>`
].join('\n')];

/* 8. Hôm nay: nghệ nhân dạy bạn trẻ chơi đàn bầu, bên cạnh có loa và điện thoại */
S['hom-nay'] = ['Âm nhạc truyền thống hôm nay', [
  `  <rect x="0" y="0" width="400" height="206" fill="#E9D8B4"/><path d="M0 0 H400 V206 H0Z" fill="url(#gan)"/>`,
  // Cửa sổ nhìn ra phố
  `  <rect class="k" x="140" y="30" width="200" height="120" fill="#C9D6DE"/>`,
  `  <path class="k" fill="${C.cham}" d="M140 150 V100 H166 V80 H190 V112 H214 V70 H244 V104 H270 V90 H300 V120 H340 V150Z"/>`,
  `  <path class="t" d="M150 108 h6 M150 122 h6 M222 82 h8 M222 96 h8 M222 110 h8 M280 100 h6" style="stroke:${C.gold}"/>`,
  `  <path class="k" fill="none" d="M240 30 V150 M140 90 H340"/>`,
  // Chiếu
  `  <path class="k" fill="${C.straw}" d="M0 206 H400 V300 H0Z"/><path d="M0 206 H400 V300 H0Z" fill="url(#gan)"/>`,
  // Nghệ nhân (trái) và bạn trẻ (phải)
  sit({ x: 76, y: 270, s: 1.2, top: C.cream, hat: 'khan-xep' }),
  `  <path class="t" d="M70 222 q6 10 12 0" style="stroke:${C.cream};stroke-width:2"/>`,
  sit({ x: 300, y: 274, s: 1.15, top: C.cham, hat: 'bui-toc' }),
  danBau(120, 276, 262),
  // Loa và điện thoại
  `  <rect class="k" x="350" y="196" width="34" height="52" rx="4" fill="${C.ink}"/><circle class="l" cx="367" cy="212" r="7" fill="${C.drum}"/><circle class="l" cx="367" cy="234" r="10" fill="${C.drum}"/>`,
  `  <rect class="k" x="40" y="280" width="22" height="14" rx="2" fill="${C.ink}" transform="rotate(-8 51 287)"/>`
].join('\n')];

for (const id of Object.keys(S)) {
  const [title, body] = S[id];
  fs.writeFileSync(path.join(OUT, id + '.svg'), wrap(title, body, 'draw-history.cjs'));
}
console.log('Đã vẽ ' + Object.keys(S).length + ' cảnh vào ' + OUT);
