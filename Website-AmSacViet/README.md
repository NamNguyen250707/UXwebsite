# Âm Sắc Việt (website)

**Cách mở:** bấm đúp `HomePage.html` (hoặc `index.html`). Không cần server, không cần mạng.

Lần đầu vào sẽ gặp màn hình chào (bấm "Vào thăm ngay" hoặc lăn chuột). Muốn xem lại: đóng tab rồi mở lại.

**Video:** video biểu diễn là video chính thức của UNESCO, của nhà hát hoặc báo chí nhà nước trên YouTube, cần Internet. Khi mở bằng file://, YouTube
không cho phát trong trang nên video mở ở tab mới; khi đưa lên web (GitHub Pages) thì xem được ngay trong trang.

## Ràng buộc kỹ thuật
- Chỉ dùng HTML5, CSS, JavaScript thuần và Bootstrap 5.3.3 (nằm sẵn trong `vendor/bootstrap/`).
- Không dùng fetch(), ES modules hay CDN. Dữ liệu là biến toàn cục trong `js/core.js` (phần 2: dữ liệu).
- Mọi đường dẫn đều tương đối.

## Cấu trúc
```
HomePage.html            Trang chủ: màn hình chào, 3 ảnh ba miền, đàn bầu, video, nghe thử một nhạc cụ
genres.html              Loại hình: bản đồ 16 loại hình, lọc vùng và nhóm, ảnh thật, video
instruments.html         Nhạc cụ: 12 thẻ, lọc, tìm không dấu, hộp chi tiết, chơi thử 12 nhạc cụ,
                         ghi lại phần chơi, năm âm và bảy âm
history.html             Lịch sử: 8 mốc, sự kiện có năm, nguồn tra cứu, điểm còn tranh luận
glossary.html            Thuật ngữ: 23 từ chia 4 nhóm, tìm không dấu, nghe thử, link chơi thử và video
index.html               Chuyển tới HomePage.html
css/style.css            Một file CSS chung
js/core.js               Code dùng chung, 4 phần: (1) bản dịch VI/EN, (2) dữ liệu 12 nhạc cụ, 16 loại hình,
                         8 mốc lịch sử, 23 thuật ngữ, (3) đường biên bản đồ, (4) menu, chân trang, âm thanh, thẻ video
js/home.js               Logic trang chủ
js/genres.js             Logic trang Loại hình
js/instruments.js        Trang Nhạc cụ, 3 phần: (1) mô hình SVG 11 nhạc cụ để bấm, (2) thẻ, lọc, chơi thử,
                         đàn bầu ảo, ghi lại phần chơi, (3) năm âm và bảy âm
js/history.js            Logic trang Lịch sử
js/glossary.js           Logic trang Thuật ngữ
images/                  Hình SVG vẽ mới (nhạc cụ, loại hình, lịch sử, hoa văn); images/loai-hinh/anh/ và
                         images/lich-su/anh/ là ảnh thật (nguồn ghi dưới mỗi ảnh)
fonts/                   Be Vietnam Pro, Alegreya (giấy phép OFL)
vendor/bootstrap/        bootstrap.min.css, bootstrap.bundle.min.js
```

## Thêm bản thu âm thật cho nhạc cụ (không bắt buộc)
Hiện chưa có bản thu nào: mọi âm nhạc cụ là âm tổng hợp bằng Web Audio và trang ghi rõ là âm mô phỏng.
Muốn dùng bản thu thật (có giấy phép), tạo thư mục `audio/` cạnh HomePage.html rồi thả file MP3 đúng tên
(5–20 giây, dưới 1 MB), trang tự dùng mà không cần sửa code:
dan-bau.mp3, dan-tranh.mp3, dan-nguyet.mp3, dan-nhi.mp3, ty-ba.mp3, sao-truc.mp3, khen.mp3, ken-bau.mp3,
trong.mp3, phach.mp3, dan-trung.mp3, cong-chieng.mp3.

## Vẽ lại hình
Các hình SVG được sinh bởi script trong `../scripts/` (`draw-instruments.cjs`, `draw-genres.cjs`, `draw-history.cjs`,
`draw-background.cjs`). Sửa script rồi chạy `node scripts/<tên>.cjs` từ thư mục gốc repo.

## Nội dung cần kiểm chứng
Tìm chuỗi `[CẦN KIỂM CHỨNG]` trong `js/core.js`. Trên trang, các chỗ này được tô vàng.
Khi đã tra xong, xóa đánh dấu hoặc đặt `showVerifyMarks: false`.
