/* Vẽ 12 hình minh họa nhạc cụ cho Website-AmSacViet (phong cách tranh khắc gỗ: nét mực đậm, màu phẳng, nền giấy điệp).
   Chạy: node scripts/draw-instruments.cjs   → ghi ra Website-AmSacViet/images/nhac-cu/<id>.svg
   Chỉ dùng khi muốn vẽ lại; website chỉ đọc các file SVG đã sinh ra. */
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '../Website-AmSacViet/images/nhac-cu');
fs.mkdirSync(OUT, { recursive: true });

// Bảng màu (khớp với css/style.css và 3 bức tranh)
const C = {
  ink: '#2E2118', paper: '#F1E4C6', shadow: '#E0CFA9', wood: '#8A5A34', woodLight: '#B27A47',
  woodDark: '#4A3518', horn: '#D9BE84', gold: '#D2A94B', bronze: '#B98B3E', son: '#9E2A1C',
  bamboo: '#D6BB78', bambooDark: '#A8894A', skin: '#E6D3A8', cham: '#26405E'
};
const f = (n) => Number(n.toFixed(1));

// Khung chung: nền giấy điệp + bóng đổ + nội dung
function wrap(id, title, body, shadow) {
  const sh = shadow || { cx: 200, cy: 352, rx: 150, ry: 12 };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <!-- ${title}. Minh họa vẽ mới cho dự án, phỏng theo phong cách tranh khắc gỗ dân gian.
       Sinh bởi scripts/draw-instruments.cjs — sửa ở script rồi chạy lại. -->
  <style>
    .k { stroke: ${C.ink}; stroke-width: 2.4; stroke-linejoin: round; stroke-linecap: round; }
    .l { stroke: ${C.ink}; stroke-width: 1.4; stroke-linejoin: round; stroke-linecap: round; }
    .t { stroke: ${C.ink}; stroke-width: 1.2; fill: none; stroke-linecap: round; }
  </style>
  <defs>
    <pattern id="diep" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="7" r="1.3" fill="#FBF4E2"/><circle cx="22" cy="18" r="1" fill="#FBF4E2"/><circle cx="13" cy="29" r="0.8" fill="#E2CFA8"/>
    </pattern>
    <!-- Vân gỗ: các nét mảnh song song như vết khắc -->
    <pattern id="van" width="12" height="6" patternUnits="userSpaceOnUse">
      <path d="M0 3 Q3 1.5 6 3 T12 3" fill="none" stroke="${C.ink}" stroke-width="0.6" opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="400" height="400" fill="${C.paper}"/>
  <rect width="400" height="400" fill="url(#diep)"/>
  <ellipse cx="${sh.cx}" cy="${sh.cy}" rx="${sh.rx}" ry="${sh.ry}" fill="${C.shadow}"/>
${body}
</svg>
`;
}

const S = {};

/* 1. Đàn bầu: hộp đàn dài, cần đàn (vòi) bằng sừng, bầu cộng hưởng, một dây, trục lên dây */
S['dan-bau'] = ['Đàn bầu', `  <g transform="rotate(-16 200 230)">
    <path class="k" fill="${C.woodDark}" d="M28 228 L374 218 L374 242 Q374 252 364 252 L38 260 Q28 260 28 250 Z"/>
    <path class="l" fill="${C.wood}" d="M28 228 L374 218 L374 226 L28 237 Z"/>
    <path d="M28 228 L374 218 L374 226 L28 237 Z" fill="url(#van)"/>
    <path d="M52 252 L352 244" stroke="${C.gold}" stroke-width="2.6" stroke-dasharray="1 10" stroke-linecap="round"/>
    ${[2, 3, 4, 5, 6].map((n) => { const x = 362 - 300 / n; const y = 228 - (10 * (x - 28)) / 346 + 3.5; return `<path class="l" fill="${C.gold}" d="M${f(x)} ${f(y - 3.5)} l3.5 3.5 l-3.5 3.5 l-3.5 -3.5z"/>`; }).join('')}
    <path d="M72 230 C70 180 64 130 58 92" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/>
    <path d="M72 230 C70 180 64 130 58 92" fill="none" stroke="${C.horn}" stroke-width="5.5" stroke-linecap="round"/>
    <circle class="k" cx="58" cy="90" r="5" fill="${C.horn}"/>
    <ellipse class="k" cx="71" cy="208" rx="18" ry="16" fill="${C.gold}"/>
    <ellipse class="k" cx="68" cy="185" rx="10" ry="9" fill="${C.gold}"/>
    <path class="t" d="M60 205 q5 -8 14 -6"/>
    <rect class="k" x="356" y="204" width="14" height="22" rx="3" fill="${C.wood}"/>
    <path class="k" fill="none" d="M370 210 h16 v-9"/>
    <path d="M60 106 L360 212" stroke="${C.ink}" stroke-width="1.6"/>
  </g>`, { cx: 200, cy: 318, rx: 165, ry: 12 }];

/* 2. Đàn tranh: thân dài hình thang, 16 dây, con nhạn xếp chéo, đầu đàn có trục lên dây */
(() => {
  const n = 16, out = [];
  out.push(`  <g transform="rotate(-24 200 210)">`);
  out.push(`    <path class="k" fill="${C.woodDark}" d="M22 200 Q200 184 360 184 L378 190 L378 252 L360 258 Q200 252 22 238 Z"/>`);
  out.push(`    <path class="l" fill="${C.woodLight}" d="M30 202 Q200 188 356 188 L356 252 Q200 246 30 234 Z"/>`);
  out.push(`    <path d="M30 202 Q200 188 356 188 L356 252 Q200 246 30 234 Z" fill="url(#van)"/>`);
  // Cầu đàn hai đầu
  out.push(`    <path class="l" fill="${C.horn}" d="M44 204 L50 203 L50 233 L44 233 Z"/>`);
  out.push(`    <path class="l" fill="${C.horn}" d="M334 190 L340 190 L340 250 L334 250 Z"/>`);
  // Dây và con nhạn (mỗi dây một con nhạn, xếp thành đường chéo)
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const y1 = 206 + t * 25, y2 = 193 + t * 54;
    out.push(`    <path d="M47 ${f(y1)} L337 ${f(y2)}" stroke="${C.ink}" stroke-width="0.8" opacity="0.75"/>`);
    const bx = 150 + t * 120, by = y1 + (y2 - y1) * ((bx - 47) / 290);
    out.push(`    <path class="l" fill="${C.horn}" d="M${f(bx - 4)} ${f(by + 3)} L${f(bx)} ${f(by - 3)} L${f(bx + 4)} ${f(by + 3)} Z"/>`);
  }
  // Trục lên dây ở đầu đàn
  for (let i = 0; i < 8; i++) out.push(`    <circle class="l" cx="${f(350 + (i % 2) * 8)}" cy="${f(196 + i * 6.8)}" r="2.6" fill="${C.gold}"/>`);
  out.push(`    <path class="k" fill="${C.son}" d="M362 196 Q374 222 362 246 L372 248 Q384 222 372 194 Z"/>`);
  out.push(`  </g>`);
  S['dan-tranh'] = ['Đàn tranh', out.join('\n'), { cx: 200, cy: 322, rx: 165, ry: 12 }];
})();

/* 3. Đàn nguyệt: bầu tròn, cần dài, phím cao, 2 dây, đầu đàn cong có 2 trục */
(() => {
  const o = [`  <g transform="rotate(28 200 220)">`];
  o.push(`    <rect class="k" x="191" y="62" width="18" height="160" rx="3" fill="${C.woodDark}"/>`);
  o.push(`    <path class="k" fill="${C.woodDark}" d="M192 64 Q190 40 204 26 Q214 18 222 24 Q210 34 209 64 Z"/>`);
  o.push(`    <path class="k" fill="none" d="M186 44 h-12 M214 52 h12"/>`);
  o.push(`    <circle class="l" cx="172" cy="44" r="4" fill="${C.horn}"/><circle class="l" cx="228" cy="52" r="4" fill="${C.horn}"/>`);
  // Phím cao: càng xuống càng gần nhau
  let y = 80;
  for (let i = 0; i < 8; i++) { o.push(`    <rect class="l" x="187" y="${f(y)}" width="26" height="5" rx="1" fill="${C.horn}"/>`); y += 18 - i * 1.4; }
  o.push(`    <circle class="k" cx="200" cy="282" r="80" fill="${C.wood}"/>`);
  o.push(`    <circle cx="200" cy="282" r="80" fill="url(#van)"/>`);
  o.push(`    <circle class="t" cx="200" cy="282" r="70"/>`);
  o.push(`    <rect class="l" x="180" y="318" width="40" height="7" rx="2" fill="${C.horn}"/>`);
  o.push(`    <path d="M196 60 L196 320 M204 60 L204 320" stroke="#F4EAD2" stroke-width="1.1"/>`);
  o.push(`    <path class="t" d="M150 240 q10 -6 20 0 M230 240 q10 -6 20 0"/>`);
  o.push(`  </g>`);
  S['dan-nguyet'] = ['Đàn nguyệt', o.join('\n'), { cx: 210, cy: 362, rx: 120, ry: 11 }];
})();

/* 4. Đàn nhị: cần dài, 2 trục ở đỉnh, bát đàn nhỏ bịt da, cung vĩ kéo giữa hai dây */
S['dan-nhi'] = ['Đàn nhị', `  <g transform="rotate(-8 200 200)">
    <rect class="k" x="194" y="30" width="10" height="290" rx="3" fill="${C.woodDark}"/>
    <path class="k" fill="${C.woodDark}" d="M194 32 Q199 14 206 22 L204 32 Z"/>
    <path class="k" fill="none" d="M182 58 L216 52 M182 86 L216 80"/>
    <circle class="l" cx="180" cy="58" r="5" fill="${C.horn}"/><circle class="l" cx="180" cy="86" r="5" fill="${C.horn}"/>
    <path class="l" fill="${C.horn}" d="M193 188 h12 v6 h-12z"/>
    <rect class="k" x="168" y="300" width="64" height="44" rx="6" fill="${C.wood}"/>
    <rect x="168" y="300" width="64" height="44" rx="6" fill="url(#van)"/>
    <ellipse class="k" cx="232" cy="322" rx="9" ry="22" fill="${C.skin}"/>
    <path class="t" d="M228 310 l4 3 l4 -3 M228 320 l4 3 l4 -3 M228 330 l4 3 l4 -3"/>
    <path d="M197 60 L222 318 M201 88 L224 318" stroke="#F4EAD2" stroke-width="1.1"/>
    <path class="k" fill="none" d="M92 168 Q200 196 318 262" style="stroke-width:3.4"/>
    <path d="M96 172 L314 258" stroke="${C.paper}" stroke-width="2.2"/>
    <path d="M96 172 L314 258" stroke="${C.ink}" stroke-width="0.8"/>
    <circle class="l" cx="92" cy="168" r="4" fill="${C.horn}"/>
  </g>`, { cx: 210, cy: 362, rx: 110, ry: 10 }];

/* 5. Tỳ bà: thân hình quả lê, cần ngắn, đầu gập ra sau có 4 trục, phím trên cần và mặt đàn, 4 dây */
(() => {
  const o = [`  <g transform="rotate(22 200 220)">`];
  o.push(`    <path class="k" fill="${C.woodDark}" d="M188 120 L188 66 Q188 54 200 54 Q212 54 212 66 L212 120 Z"/>`);
  o.push(`    <path class="k" fill="${C.woodDark}" d="M190 58 Q186 34 198 18 Q206 10 214 16 Q204 30 210 58 Z"/>`);
  o.push(`    <path class="k" fill="none" d="M190 34 h-14 M190 46 h-14 M208 28 h14 M210 42 h14"/>`);
  ['176 34', '176 46', '222 28', '224 42'].forEach((p) => { const [x, y] = p.split(' '); o.push(`    <circle class="l" cx="${x}" cy="${y}" r="3.6" fill="${C.horn}"/>`); });
  o.push(`    <path class="k" fill="${C.wood}" d="M200 112 C150 124 108 208 114 272 C120 338 160 362 200 362 C240 362 280 338 286 272 C292 208 250 124 200 112 Z"/>`);
  o.push(`    <path d="M200 112 C150 124 108 208 114 272 C120 338 160 362 200 362 C240 362 280 338 286 272 C292 208 250 124 200 112 Z" fill="url(#van)"/>`);
  // 4 phím trên cần (hình nêm), 6 phím mảnh trên mặt đàn
  [70, 84, 98, 112].forEach((y) => o.push(`    <path class="l" fill="${C.horn}" d="M186 ${y} h28 l-3 6 h-22 z"/>`));
  for (let i = 0; i < 6; i++) { const y = 132 + i * 20, w = 24 + i * 7; o.push(`    <rect class="l" x="${f(200 - w / 2)}" y="${y}" width="${f(w)}" height="3.5" fill="${C.horn}"/>`); }
  o.push(`    <rect class="l" x="172" y="320" width="56" height="9" rx="2" fill="${C.horn}"/>`);
  [194, 198, 202, 206].forEach((x, i) => o.push(`    <path d="M${x} 60 L${178 + i * 15} 322" stroke="#F4EAD2" stroke-width="0.9"/>`));
  o.push(`  </g>`);
  S['ty-ba'] = ['Tỳ bà', o.join('\n'), { cx: 220, cy: 364, rx: 115, ry: 11 }];
})();

/* 6. Sáo trúc: ống trúc, đốt trúc, 1 lỗ thổi + 6 lỗ bấm, tua đỏ */
S['sao-truc'] = ['Sáo trúc', `  <g transform="rotate(-32 200 200)">
    <rect class="k" x="14" y="188" width="372" height="24" rx="12" fill="${C.bamboo}"/>
    <path class="t" d="M30 196 H370" opacity="0.4"/>
    <path class="t" d="M30 205 H370" opacity="0.25"/>
    <path class="l" fill="none" d="M44 189 v22 M356 189 v22"/>
    <path d="M44 189 v22 M356 189 v22" stroke="${C.bambooDark}" stroke-width="3"/>
    <ellipse class="l" cx="84" cy="200" rx="6" ry="4.5" fill="${C.ink}"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<circle class="l" cx="${190 + i * 26}" cy="200" r="4.6" fill="${C.ink}"/>`).join('')}
    <path class="t" d="M14 200 q-10 6 -6 22"/>
    <path class="k" fill="${C.son}" d="M2 220 L14 220 L18 252 L-2 252 Z"/>
    <path d="M2 236 h14" stroke="${C.gold}" stroke-width="2"/>
  </g>`, { cx: 200, cy: 330, rx: 160, ry: 11 }];

/* 7. Khèn (khèn Mông): bầu hơi bằng gỗ, ống thổi, 6 ống trúc cong, đai buộc */
(() => {
  const o = [];
  const pipes = [[150, 70], [168, 96], [186, 60], [204, 110], [222, 84], [240, 124]];
  pipes.forEach(([x, top]) => {
    o.push(`  <path class="k" fill="none" d="M${x} 320 C${x - 6} 250 ${x + 10} 180 ${x + 40} ${top}" style="stroke-width:12"/>`);
    o.push(`  <path fill="none" stroke="${C.bamboo}" stroke-width="7" stroke-linecap="round" d="M${x} 320 C${x - 6} 250 ${x + 10} 180 ${x + 40} ${top}"/>`);
  });
  o.push(`  <path class="k" fill="none" d="M146 200 Q200 186 262 196 M150 150 Q205 136 268 148" style="stroke-width:2.6"/>`);
  o.push(`  <path d="M146 200 Q200 186 262 196 M150 150 Q205 136 268 148" stroke="${C.son}" stroke-width="1.4" fill="none"/>`);
  o.push(`  <path class="k" fill="${C.wood}" d="M70 262 Q70 250 84 250 L130 246 Q160 230 200 232 Q252 236 268 262 Q252 290 200 292 Q160 294 130 278 L84 274 Q70 274 70 262 Z"/>`);
  o.push(`  <path d="M130 246 Q160 230 200 232 Q252 236 268 262 Q252 290 200 292 Q160 294 130 278 Z" fill="url(#van)"/>`);
  o.push(`  <ellipse class="l" cx="72" cy="262" rx="4" ry="9" fill="${C.woodDark}"/>`);
  o.push(`  <path class="t" d="M132 252 V272 M262 252 V272"/>`);
  S['khen'] = ['Khèn', o.join('\n'), { cx: 190, cy: 340, rx: 140, ry: 11 }];
})();

/* 8. Kèn bầu: dăm kèn, đĩa chặn môi, thân côn có lỗ bấm, loa kèn loe rộng */
S['ken-bau'] = ['Kèn bầu', `  <g transform="rotate(18 200 200)">
    <path class="k" fill="${C.horn}" d="M196 30 L204 30 L206 52 L194 52 Z"/>
    <ellipse class="k" cx="200" cy="58" rx="20" ry="5" fill="${C.gold}"/>
    <path class="k" fill="${C.woodDark}" d="M193 62 L207 62 L214 262 L186 262 Z"/>
    <path d="M193 62 L207 62 L214 262 L186 262 Z" fill="url(#van)"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle class="l" cx="200" cy="${92 + i * 22}" r="3.6" fill="${C.ink}"/>`).join('')}
    <path d="M192 80 h16 M190 160 h20 M188 240 h24" stroke="${C.gold}" stroke-width="2.4"/>
    <path class="k" fill="${C.gold}" d="M186 258 L214 258 Q232 300 270 338 Q200 356 130 338 Q168 300 186 258 Z"/>
    <path class="t" d="M150 330 Q200 344 250 330"/>
    <path class="t" d="M196 266 Q190 300 168 330 M204 266 Q210 300 232 330" opacity="0.5"/>
  </g>`, { cx: 225, cy: 368, rx: 105, ry: 10 }];

/* 9. Trống: trống sơn son, mặt da, đinh gỗ quanh mặt, hai dùi */
(() => {
  const o = [];
  o.push(`  <path class="k" fill="${C.son}" d="M78 168 C66 218 76 270 92 300 A108 34 0 0 0 308 300 C324 270 334 218 322 168 Z"/>`);
  o.push(`  <path class="t" d="M120 184 C112 230 118 270 128 316 M200 190 V334 M280 184 C288 230 282 270 272 316" style="stroke:#6E1D13"/>`);
  o.push(`  <path d="M84 230 C150 252 250 252 316 230" stroke="${C.gold}" stroke-width="3" fill="none"/>`);
  o.push(`  <ellipse class="k" cx="200" cy="168" rx="122" ry="40" fill="${C.skin}"/>`);
  o.push(`  <ellipse class="t" cx="200" cy="168" rx="96" ry="30" opacity="0.5"/>`);
  o.push(`  <ellipse class="t" cx="200" cy="168" rx="40" ry="12" opacity="0.5"/>`);
  for (let i = 0; i < 24; i++) {
    const a = (Math.PI * 2 * i) / 24, x = 200 + Math.cos(a) * 116, y = 168 + Math.sin(a) * 37;
    if (Math.sin(a) > -0.2) o.push(`  <circle cx="${f(x)}" cy="${f(y + 6)}" r="2.2" fill="${C.gold}" stroke="${C.ink}" stroke-width="0.8"/>`);
  }
  o.push(`  <path class="k" fill="none" d="M120 70 L230 150" style="stroke-width:7"/><path d="M120 70 L230 150" stroke="${C.horn}" stroke-width="3.5" stroke-linecap="round"/>`);
  o.push(`  <path class="k" fill="none" d="M300 64 L190 146" style="stroke-width:7"/><path d="M300 64 L190 146" stroke="${C.horn}" stroke-width="3.5" stroke-linecap="round"/>`);
  S['trong'] = ['Trống', o.join('\n'), { cx: 200, cy: 340, rx: 140, ry: 14 }];
})();

/* 10. Phách: bàn phách bằng ống tre chẻ đôi và hai dùi gõ */
S['phach'] = ['Phách', `  <g transform="rotate(-8 200 240)">
    <path class="k" fill="${C.bamboo}" d="M50 236 Q200 212 350 236 L350 262 Q200 282 50 262 Z"/>
    <path class="l" fill="#E4CC8E" d="M50 236 Q200 212 350 236 Q200 246 50 236 Z"/>
    <path d="M120 230 v34 M270 230 v34" stroke="${C.bambooDark}" stroke-width="3"/>
    <path class="t" d="M70 252 Q200 238 330 252" opacity="0.35"/>
    <rect class="k" x="50" y="262" width="300" height="8" rx="3" fill="${C.woodDark}"/>
  </g>
  <path class="k" fill="none" d="M96 108 L262 214" style="stroke-width:8"/><path d="M96 108 L262 214" stroke="${C.wood}" stroke-width="4" stroke-linecap="round"/>
  <path class="k" fill="none" d="M128 96 L294 202" style="stroke-width:8"/><path d="M128 96 L294 202" stroke="${C.wood}" stroke-width="4" stroke-linecap="round"/>
  <path class="k" fill="none" d="M318 92 L178 206" style="stroke-width:8"/><path d="M318 92 L178 206" stroke="${C.woodLight}" stroke-width="4" stroke-linecap="round"/>`, { cx: 200, cy: 302, rx: 165, ry: 12 }];

/* 11. Đàn t'rưng: các ống tre dài ngắn khác nhau xâu trên hai sợi dây, hai dùi tre */
(() => {
  const o = [`  <g transform="rotate(-12 200 200)">`];
  o.push(`  <path class="t" d="M150 40 L136 352 M250 40 L264 352" style="stroke-width:2"/>`);
  for (let i = 0; i < 11; i++) {
    const y = 330 - i * 27, len = 250 - i * 13, x = 200 - len / 2;
    o.push(`    <rect class="k" x="${f(x)}" y="${f(y)}" width="${f(len)}" height="15" rx="7" fill="${C.bamboo}"/>`);
    o.push(`    <path d="M${f(x + len - 22)} ${f(y + 2)} l14 11" stroke="${C.ink}" stroke-width="1.4"/>`);
    o.push(`    <path d="M${f(x + 18)} ${f(y + 1)} v13" stroke="${C.bambooDark}" stroke-width="2.2"/>`);
  }
  o.push(`  </g>`);
  o.push(`  <path class="k" fill="none" d="M300 360 L360 250" style="stroke-width:6"/><path d="M300 360 L360 250" stroke="${C.horn}" stroke-width="3" stroke-linecap="round"/>`);
  o.push(`  <circle class="k" cx="362" cy="246" r="7" fill="${C.wood}"/>`);
  S['dan-trung'] = ["Đàn t'rưng", o.join('\n'), { cx: 200, cy: 372, rx: 150, ry: 10 }];
})();

/* 12. Cồng chiêng: xà gỗ, một chiếc cồng có núm và hai chiếc chiêng mặt phẳng, dùi bọc vải */
(() => {
  const o = [];
  o.push(`  <rect class="k" x="24" y="52" width="352" height="16" rx="5" fill="${C.woodDark}"/>`);
  o.push(`  <rect x="24" y="52" width="352" height="16" rx="5" fill="url(#van)"/>`);
  const gongs = [[118, 208, 76, true], [262, 186, 58, false], [330, 300, 40, false]];
  gongs.forEach(([cx, cy, r, boss]) => {
    o.push(`  <path class="t" d="M${cx - r * 0.35} 66 L${cx - r * 0.2} ${cy - r + 4} M${cx + r * 0.35} 66 L${cx + r * 0.2} ${cy - r + 4}" style="stroke-width:1.6"/>`);
    o.push(`  <circle class="k" cx="${cx}" cy="${cy}" r="${r}" fill="${C.bronze}"/>`);
    o.push(`  <circle class="l" cx="${cx}" cy="${cy}" r="${f(r * 0.82)}" fill="${C.gold}"/>`);
    o.push(`  <circle class="t" cx="${cx}" cy="${cy}" r="${f(r * 0.6)}" opacity="0.5"/>`);
    if (boss) {
      o.push(`  <circle class="k" cx="${cx}" cy="${cy}" r="${f(r * 0.24)}" fill="${C.bronze}"/>`);
      o.push(`  <path d="M${cx - 6} ${cy - 8} q6 -5 12 0" stroke="#F4E3B4" stroke-width="2.4" fill="none" stroke-linecap="round"/>`);
    }
  });
  o.push(`  <path class="k" fill="none" d="M150 356 L250 330" style="stroke-width:6"/><path d="M150 356 L250 330" stroke="${C.horn}" stroke-width="3" stroke-linecap="round"/>`);
  o.push(`  <ellipse class="k" cx="258" cy="328" rx="12" ry="10" fill="${C.son}"/>`);
  S['cong-chieng'] = ['Cồng chiêng', o.join('\n'), { cx: 210, cy: 372, rx: 160, ry: 10 }];
})();

for (const id of Object.keys(S)) {
  const [title, body, shadow] = S[id];
  fs.writeFileSync(path.join(OUT, id + '.svg'), wrap(id, title, body, shadow));
}
console.log('Đã vẽ ' + Object.keys(S).length + ' nhạc cụ vào ' + OUT);
