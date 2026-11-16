# Âm Sắc Việt

Website giới thiệu âm nhạc truyền thống Việt Nam, song ngữ Việt – Anh. Đồ án môn Tương tác người – máy (HCI/UX).
Người dùng học bằng cách nghe và tự chơi, không chỉ đọc.

**Xem trực tuyến:** https://namnguyen250707.github.io/UXwebsite/

## Trang web có gì
- **Trang chủ:** ba bức tranh Bắc – Trung – Nam (bấm vào để nghe bản ghi của UNESCO) và một cây đàn bầu gảy thử được.
- **Loại hình:** bản đồ 16 loại hình (10 được UNESCO ghi danh, 6 loại hình tiêu biểu khác), lọc theo vùng và nhóm, có ảnh thật ghi nguồn và video biểu diễn chính thức.
- **Nhạc cụ:** 12 nhạc cụ chia theo dây, hơi, gõ; chơi thử cả 12 nhạc cụ trên mô hình; ghi lại phần mình chơi
  để nghe lại hoặc gửi link; so sánh thang năm âm với thang bảy âm; bảng thuật ngữ.
- **Lịch sử:** 8 mốc có năm tháng, nguồn tra cứu và mục riêng cho những điểm còn tranh luận.

## Mở trên máy
Bấm đúp `Website-AmSacViet/HomePage.html`. Không cần cài gì, không cần mạng
(riêng video YouTube của UNESCO cần Internet).

## Cấu trúc
```
index.html            chuyển tới Website-AmSacViet/HomePage.html (điểm vào của GitHub Pages)
Website-AmSacViet/    toàn bộ website: HTML, CSS, JS, hình, font, Bootstrap
scripts/              công cụ vẽ hình SVG và bài kiểm tra tự động (cần Node.js, không cần để mở web)
```

## Công nghệ
HTML5, CSS, JavaScript thuần và Bootstrap 5.3.3. Không framework, không build tool, không gọi máy chủ.

## Nguồn và giấy phép
- Hình minh họa, hoa văn, biểu tượng đàn bầu: vẽ mới cho dự án bằng SVG (tạo từ các script trong `scripts/`).
- Video biểu diễn: video chính thức của UNESCO, của các nhà hát và cơ quan báo chí nhà nước, phát trực tiếp từ YouTube; bản quyền thuộc đơn vị ghi hình.
- Ảnh chụp trang Loại hình: Wikimedia Commons (CC0, CC BY, CC BY-SA hoặc phạm vi công cộng), ghi tác giả và giấy phép dưới mỗi ảnh.
- Âm thanh nhạc cụ: âm mô phỏng tạo bằng Web Audio, trang có ghi rõ.
- Bản đồ: Natural Earth (public domain).
- Font Be Vietnam Pro và Alegreya: SIL Open Font License (kèm trong `Website-AmSacViet/fonts/`).
- Bootstrap: giấy phép MIT.

## Kiểm tra tự động (tùy chọn)
```
node scripts/check-browser.cjs
```
Mở trang bằng Chrome ẩn, tắt mạng, chạy hơn 150 kiểm tra và chụp ảnh vào `docs/screenshots/`.
