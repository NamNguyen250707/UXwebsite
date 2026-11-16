# Âm Sắc Việt (website)

**Cách mở:** bấm đúp `HomePage.html` (hoặc `index.html`). Không cần server, không cần mạng.

Lần đầu vào sẽ gặp màn hình chào (bấm "Vào thăm ngay" hoặc lăn chuột). Muốn xem lại: đóng tab rồi mở lại.

**Video:** video biểu diễn là video chính thức của UNESCO, của nhà hát hoặc báo chí nhà nước trên YouTube, cần Internet. Khi mở bằng file://, YouTube
không cho phát trong trang nên video mở ở tab mới; khi đưa lên web (GitHub Pages) thì xem được ngay trong trang.

## Ràng buộc kỹ thuật
- Chỉ dùng HTML5, CSS, JavaScript thuần và Bootstrap 5.3.3 (nằm sẵn trong `vendor/bootstrap/`).
- Không dùng fetch(), ES modules hay CDN. Dữ liệu là biến toàn cục trong `js/data.js`.
- Mọi đường dẫn đều tương đối.

## Cấu trúc
```
HomePage.html            Trang chủ: màn hình chào, 3 tranh ba miền, đàn bầu, video, nghe thử một nhạc cụ
genres.html              Loại hình: bản đồ 16 loại hình, lọc vùng và nhóm, ảnh thật, video
instruments.html         Nhạc cụ: 12 thẻ, lọc, tìm không dấu, hộp chi tiết, chơi thử 12 nhạc cụ,
                         ghi lại phần chơi, năm âm và bảy âm, bảng thuật ngữ
history.html             Lịch sử: 8 mốc, sự kiện có năm, nguồn tra cứu, điểm còn tranh luận
index.html               Chuyển tới HomePage.html
css/style.css            Một file CSS chung
js/i18n.js               Bản dịch VI/EN + I18n.set()/t()/pick()
js/data.js               12 nhạc cụ, 16 loại hình, 8 mốc lịch sử, 23 thuật ngữ
js/common.js             Navbar, footer, biểu tượng đàn bầu, trình phát âm thanh, thẻ video, thuật ngữ
js/home.js               Logic trang chủ
js/genres.js             Logic trang Loại hình
js/instruments.js        Logic trang Nhạc cụ (chơi thử, đàn bầu ảo, ghi lại phần chơi)
js/play-models.js        Mô hình SVG của 11 nhạc cụ để bấm trực tiếp
js/scales.js             Phần "Năm âm và bảy âm"
js/history.js            Logic trang Lịch sử
js/map-data.js           Đường biên Việt Nam (Natural Earth, public domain)
images/                  Hình SVG vẽ mới (tranh, nhạc cụ, loại hình, lịch sử, hoa văn); images/loai-hinh/anh/ là ảnh thật từ Wikimedia Commons
fonts/                   Be Vietnam Pro, Alegreya (giấy phép OFL)
vendor/bootstrap/        bootstrap.min.css, bootstrap.bundle.min.js
```

## Vẽ lại hình
Các hình SVG được sinh bởi script trong `../scripts/` (`draw-instruments.cjs`, `draw-genres.cjs`, `draw-history.cjs`,
`draw-background.cjs`). Sửa script rồi chạy `node scripts/<tên>.cjs` từ thư mục gốc repo.

## Nội dung cần kiểm chứng
Tìm chuỗi `[CẦN KIỂM CHỨNG]` trong `js/data.js`. Trên trang, các chỗ này được tô vàng.
Khi đã tra xong, xóa đánh dấu hoặc đặt `showVerifyMarks: false`.
