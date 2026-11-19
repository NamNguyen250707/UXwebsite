/* Dựng bản đồ Việt Nam cho trang Loại hình (Website-AmSacViet).
   Nguồn đường biên: Natural Earth (public domain), file ne_50m_admin_0_countries.geojson.
   Chạy: node scripts/build-map.cjs <đường-dẫn-tới-geojson>
   → ghi vào phần bản đồ của Website-AmSacViet/js/core.js (biến toàn cục ASV_MAP, không cần fetch khi mở bằng file://).
   Hoàng Sa và Trường Sa không có trong dữ liệu Natural Earth nên được vẽ thêm theo tọa độ gần đúng. */
const fs = require('fs');
const path = require('path');
const src = process.argv[2];
if (!src) { console.error('Cần đường dẫn tới ne_50m_admin_0_countries.geojson'); process.exit(1); }

// Phép chiếu đơn giản (equirectangular): co kinh độ theo cos(vĩ độ giữa) để hình không bị bè ngang
const P = { lon0: 101.8, lat1: 23.8, kx: 38.55, ky: 40 };
const W = 610, H = 664;
const px = (lon) => (lon - P.lon0) * P.kx;
const py = (lat) => (P.lat1 - lat) * P.ky;
const r1 = (n) => Math.round(n * 10) / 10;

// Bỏ bớt điểm quá sát nhau (< 1.2 đơn vị) để file nhẹ
function ringPath(ring) {
  const out = [];
  let last = null;
  ring.forEach(([lon, lat]) => {
    const p = [r1(px(lon)), r1(py(lat))];
    if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) > 1.2) { out.push(p); last = p; }
  });
  return 'M' + out.map((p) => p.join(' ')).join('L') + 'Z';
}

const geo = JSON.parse(fs.readFileSync(src, 'utf8'));
const vn = geo.features.find((f) => f.properties.ADM0_A3 === 'VNM');
const polys = vn.geometry.type === 'Polygon' ? [vn.geometry.coordinates] : vn.geometry.coordinates;
const land = polys.map((p) => ringPath(p[0])).join('');

// Hai quần đảo: các chấm đảo nhỏ quanh tọa độ gần đúng (chỉ để thể hiện chủ quyền, không phải bản đồ chi tiết)
const hoangSa = [[111.6, 16.5], [111.75, 16.55], [112.3, 16.85], [112.0, 16.95], [111.2, 16.45], [111.5, 16.0], [111.7, 16.25]];
const truongSa = [[111.92, 10.4], [112.8, 11.1], [114.3, 11.45], [114.1, 10.9], [113.85, 10.2], [114.3, 9.9], [115.0, 10.7],
  [112.9, 9.0], [113.6, 8.8], [114.5, 8.6], [112.3, 9.7], [115.5, 9.8], [111.92, 8.65]];
const dots = (list) => list.map(([lon, lat]) => [r1(px(lon)), r1(py(lat))]);

const out = `/* Đường biên Việt Nam cho bản đồ trang Loại hình.
   Sinh tự động bởi scripts/build-map.cjs từ dữ liệu Natural Earth (public domain).
   Không sửa tay; muốn đổi thì sửa script rồi chạy lại. */
var ASV_MAP = {
  width: ${W},
  height: ${H},
  // Phép chiếu: x = (kinh độ − lon0) × kx ; y = (lat1 − vĩ độ) × ky
  proj: { lon0: ${P.lon0}, lat1: ${P.lat1}, kx: ${P.kx}, ky: ${P.ky} },
  land: "${land}",
  hoangSa: ${JSON.stringify(dots(hoangSa))},
  truongSa: ${JSON.stringify(dots(truongSa))}
};
`;
// Đoạn bản đồ nằm trong app.js, giữa hai mốc <ban-do> … </ban-do>
const dest = path.resolve(__dirname, '../Website-AmSacViet/app.js');
const core = fs.readFileSync(dest, 'utf8');
const A = '/* <ban-do>', B = '/* </ban-do> */';
const i = core.indexOf(A), j = core.indexOf(B);
if (i < 0 || j < 0) throw Error('Không thấy mốc <ban-do> trong app.js');
const head = core.slice(i, core.indexOf('\n', i) + 1);
fs.writeFileSync(dest, core.slice(0, i) + head + out + core.slice(j));
console.log('Đã ghi ' + dest + ' (' + (out.length / 1024).toFixed(1) + ' KB)');
