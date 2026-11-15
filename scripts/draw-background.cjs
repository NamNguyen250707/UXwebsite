/* Vẽ các hình nền chạm nổi cho trang chủ Website-AmSacViet.
   Chạy: node scripts/draw-background.cjs → ghi ra Website-AmSacViet/images/motifs/
   - vong-trong-dong.svg : vòng hoa văn trống đồng rất lớn (góc trên phải)
   - hac.svg             : một con hạc bay (dùng nhiều lần, to nhỏ khác nhau)
   - dai-sen.svg         : dải sen ở chân hero
   - giay-do.svg         : vân giấy dó (feTurbulence), lát kín toàn trang
   Chạm nổi: mỗi hình vẽ 3 lớp cùng một khuôn (<use>):
     viền sáng #FFF8EA lệch (-1,-1) → viền tối #E2D1AE lệch (1,1) → mặt hình #F5ECD9 (trùng màu nền) ở trên cùng.
   Hình dùng currentColor nên chỉ cần đổi "color" ở từng lớp.
   Kiểu "rỗng trong": mọi hình chỉ có đường viền (fill none), không tô khối đặc. */
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '../Website-AmSacViet/images/motifs');
fs.mkdirSync(OUT, { recursive: true });

const LIGHT = '#FFF8EA', DARK = '#E2D1AE', BASE = '#F5ECD9';
const f = (n) => Number(n.toFixed(2));

// Ba lớp chạm nổi cho khuôn #m; d = độ lệch (đơn vị của viewBox ≈ 1px khi hiển thị)
function emboss(d) {
  return `  <use href="#m" x="${-d}" y="${-d}" style="color:${LIGHT}"/>
  <use href="#m" x="${d}" y="${d}" style="color:${DARK}"/>
  <use href="#m" style="color:${BASE}"/>`;
}
function svg(viewBox, comment, defs, d, extra) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${extra || ''}>
  <!-- ${comment} Sinh bởi scripts/draw-background.cjs -->
  <defs>
${defs}
  </defs>
${emboss(d)}
</svg>
`;
}

/* ---------- 1. Vòng hoa văn trống đồng (gợi theo bố cục mặt trống Đông Sơn) ---------- */
(() => {
  const o = [];
  const ring = (r, w) => o.push(`      <circle r="${r}" fill="none" stroke="currentColor" stroke-width="${w || 3}"/>`);
  [492, 470, 440, 330, 314, 244, 224, 182, 166, 136].forEach((r) => ring(r));
  // Ngôi sao 14 cánh ở tâm
  const pts = [];
  for (let i = 0; i < 28; i++) {
    const r = i % 2 ? 36 : 128, a = (Math.PI * i) / 14 - Math.PI / 2;
    pts.push(f(r * Math.cos(a)) + ',' + f(r * Math.sin(a)));
  }
  o.push(`      <polygon points="${pts.join(' ')}" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>`);
  const around = (r, n, shape, turn) => {
    for (let i = 0; i < n; i++) {
      o.push(`      <g transform="rotate(${f((360 * i) / n)}) translate(0 -${r})${turn ? ' rotate(' + turn + ')' : ''}">${shape}</g>`);
    }
  };
  // Vòng tròn có chấm, vạch răng lược, vòng tròn tiếp tuyến
  around(151, 22, '<circle r="9" fill="none" stroke="currentColor" stroke-width="3"/>');
  for (let i = 0; i < 120; i++) o.push(`      <line y1="-166" y2="-182" stroke="currentColor" stroke-width="2.4" transform="rotate(${f(i * 3)})"/>`);
  around(203, 26, '<circle r="12" fill="none" stroke="currentColor" stroke-width="3"/><circle r="4" fill="none" stroke="currentColor" stroke-width="2"/>');
  for (let i = 0; i < 140; i++) o.push(`      <line y1="-224" y2="-244" stroke="currentColor" stroke-width="2.4" transform="rotate(${f(i * (360 / 140))})"/>`);
  // Răng cưa
  const z = [];
  for (let i = 0; i < 88; i++) {
    const r = i % 2 ? 252 : 304, a = (Math.PI * i) / 44;
    z.push(f(r * Math.sin(a)) + ',' + f(-r * Math.cos(a)));
  }
  o.push(`      <polygon points="${z.join(' ')}" fill="none" stroke="currentColor" stroke-width="3"/>`);
  // Chim Lạc bay quanh mặt trống
  const bird = '<g transform="scale(-3.4 3.4)"><path d="M-24 3 L-13 -1 L-7 -11 L-2 -2 L8 -3 L12 -7 L15 -3 L27 -2 L15 0 L8 2 L-7 4 Z" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linejoin="round"/></g>';
  around(386, 10, bird);
  // Chấm tròn vòng ngoài
  around(455, 64, '<circle r="7" fill="none" stroke="currentColor" stroke-width="2.6"/>');
  const defs = `    <g id="m">\n${o.join('\n')}\n    </g>`;
  fs.writeFileSync(path.join(OUT, 'vong-trong-dong.svg'),
    svg('-500 -500 1000 1000', 'Vòng hoa văn trống đồng, chạm nổi.', defs, 1.6));
})();

/* ---------- 2. Hạc bay (đầu quay sang trái) ---------- */
(() => {
  const defs = `    <g id="m" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
      <path d="M-8 -6 C-2 -40 20 -58 44 -62 C34 -44 26 -24 14 -6Z"/>
      <path d="M-4 -4 C-20 -26 -14 -44 2 -54 C4 -34 6 -18 6 -4Z"/>
      <ellipse cx="0" cy="0" rx="22" ry="8"/>
      <path d="M18 -3 L34 -7 L31 5Z"/>
      <path fill="none" stroke-width="3.5" stroke-linecap="round" d="M-18 -3 Q-36 -14 -50 -8"/>
      <circle cx="-52" cy="-9" r="4"/>
      <path d="M-55 -11 L-70 -5 L-55 -6Z"/>
      <path fill="none" stroke-width="2" stroke-linecap="round" d="M18 2 L52 9 M18 4 L50 12"/>
    </g>`;
  fs.writeFileSync(path.join(OUT, 'hac.svg'), svg('-74 -66 130 82', 'Hạc bay, chạm nổi.', defs, 0.8));
})();

/* ---------- 3. Dải sen ở chân hero ---------- */
(() => {
  const o = [];
  // Một khóm sen: lá (nhìn nghiêng), hoa, nụ, cuống
  function khom(x, s, flip) {
    const k = flip ? -1 : 1;
    o.push(`      <g transform="translate(${x} 200) scale(${f(s * k)} ${f(s)})">
        <path d="M-70 -18 Q-40 -46 0 -40 Q38 -36 60 -16 Q20 -10 -70 -18Z"/>
        <path d="M-20 -40 L-30 -24 M10 -38 L4 -22" fill="none" stroke-width="2"/>
        <path d="M40 -150 C44 -110 38 -70 42 -36" fill="none" stroke-width="4" stroke-linecap="round"/>
        <g transform="translate(40 -150)">
          <path d="M0 0 C-18 -2 -34 -12 -40 -26 C-26 -22 -12 -14 0 0Z"/>
          <path d="M0 0 C18 -2 34 -12 40 -26 C26 -22 12 -14 0 0Z"/>
          <path d="M0 0 C-18 -10 -26 -30 -21 -46 C-11 -36 -4 -20 0 0Z"/>
          <path d="M0 0 C18 -10 26 -30 21 -46 C11 -36 4 -20 0 0Z"/>
          <path d="M0 0 C-10 -18 -8 -38 0 -54 C8 -38 10 -18 0 0Z"/>
        </g>
        <path d="M-40 -100 C-38 -76 -44 -56 -40 -34" fill="none" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M-40 -100 C-52 -114 -48 -132 -40 -140 C-32 -132 -28 -114 -40 -100Z"/>
        <path d="M-100 -6 Q-70 -30 -30 -24 Q0 -20 14 -4 Q-30 2 -100 -6Z"/>
      </g>`);
  }
  [[70, 0.9, false], [300, 1.15, true], [560, 0.8, false], [820, 1.05, true], [1080, 0.85, false], [1330, 1.2, true], [1560, 0.9, false]]
    .forEach(([x, s, fl]) => khom(x, s, fl));
  // Mặt nước: vài nét sóng ngang
  o.push(`      <path d="M0 196 Q60 188 120 196 T240 196 T360 196 T480 196 T600 196 T720 196 T840 196 T960 196 T1080 196 T1200 196 T1320 196 T1440 196 T1560 196 T1680 196" fill="none" stroke-width="2.4"/>`);
  const defs = `    <g id="m" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round">\n${o.join('\n')}\n    </g>`;
  fs.writeFileSync(path.join(OUT, 'dai-sen.svg'),
    svg('0 0 1640 204', 'Dải sen ở chân hero, chạm nổi.', defs, 1.4, ' preserveAspectRatio="xMidYMax slice"'));
})();

/* ---------- 4. Vân giấy dó ---------- */
fs.writeFileSync(path.join(OUT, 'giay-do.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" viewBox="0 0 360 360">
  <!-- Vân giấy dó: nhiễu feTurbulence chuyển thành lốm đốm màu nâu rất nhạt (độ mờ rất thấp).
       Lát kín nền trang (background-repeat), nên chỉ tính một lần. Sinh bởi scripts/draw-background.cjs -->
  <filter id="soi" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85 0.55" numOctaves="3" seed="11" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.36  0 0 0 0 0.27  0 0 0 0 0.15  0.11 0 0 0 -0.04"/>
  </filter>
  <filter id="xo" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="2" seed="4" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.36  0 0 0 0 0.27  0 0 0 0 0.15  0.05 0 0 0 -0.02"/>
  </filter>
  <rect width="360" height="360" filter="url(#soi)"/>
  <rect width="360" height="360" filter="url(#xo)"/>
</svg>
`);

console.log('Đã vẽ 4 hình nền vào ' + OUT);
