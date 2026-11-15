# Hướng dẫn đưa Âm Sắc Việt lên mạng bằng GitHub

Dành cho người chưa dùng GitHub. Làm một lần theo 4 bước dưới đây; các lần sửa web sau chỉ cần làm lại Bước 1.

## Hiểu nhanh trong 30 giây

| Từ | Nghĩa |
|---|---|
| **Repo** | Thư mục dự án. Có một bản trên máy bạn (`Documents\GitHub\UXwebsite`) và một bản trên GitHub. |
| **Commit** | "Chụp" lại tình trạng các file lúc này, kèm một dòng ghi chú. Chỉ lưu trên máy bạn. |
| **Push** | Gửi các commit từ máy bạn lên GitHub. |
| **GitHub Pages** | Dịch vụ miễn phí của GitHub: biến repo thành một trang web có địa chỉ để ai cũng mở được. |

Máy bạn đã có sẵn ứng dụng **GitHub Desktop**, bạn sẽ dùng nó thay cho gõ lệnh.

## Bước 1. Commit và push (đưa thay đổi lên GitHub)

1. Mở **GitHub Desktop**. Ở góc trên bên trái, mục *Current repository*, chọn **UXwebsite**.
2. Bên trái là tab **Changes**, liệt kê các file đã thêm, sửa, xóa. Lần này danh sách sẽ rất dài vì các bản cũ
   bị xóa và thư mục được đổi tên. Đó là bình thường.
3. Ở ô **Summary** phía dưới bên trái, gõ một dòng ghi chú, ví dụ: `Chọn Âm Sắc Việt làm website chính thức`.
4. Bấm nút xanh **Commit to main**.
5. Bấm **Push origin** ở thanh trên cùng. Chờ đến khi nút đổi lại thành *Fetch origin*.


## Bước 2. Đặt repo ở chế độ công khai (public)

GitHub Pages miễn phí chỉ dùng được với repo công khai. Công khai nghĩa là ai cũng xem được mã nguồn của dự án.
Repo này không chứa thông tin cá nhân hay mật khẩu.

1. Mở trình duyệt, vào **https://github.com/NamNguyen250707/UXwebsite** (đăng nhập nếu được hỏi).
2. Bấm tab **Settings** (biểu tượng bánh răng, hàng tab phía trên).
3. Ở trang **General**, kéo xuống tận cuối tới khung đỏ **Danger Zone**.
4. Bấm **Change visibility** → **Change to public**. GitHub hỏi xác nhận vài lần, bấm đồng ý và gõ tên repo nếu được yêu cầu.

## Bước 3. Bật GitHub Pages

1. Vẫn trong **Settings**, ở cột bên trái bấm **Pages**.
2. Mục **Build and deployment** → **Source**: chọn **Deploy from a branch**.
3. Mục **Branch**: chọn **main**, thư mục **/ (root)**, rồi bấm **Save**.
4. Chờ 1 đến 3 phút rồi tải lại trang Settings → Pages. Khi xong, đầu trang hiện dòng
   *"Your site is live at https://namnguyen250707.github.io/UXwebsite/"*.

## Bước 4. Gửi link cho người dùng thử

**https://namnguyen250707.github.io/UXwebsite/**

Link này tự chuyển tới trang chủ Âm Sắc Việt. Mở trên điện thoại cũng được.
Trên web, video UNESCO phát ngay trong trang, và link chia sẻ bản ghi phần chơi thử mở được trên máy người khác.

## Sau này muốn sửa web

Sửa file trong `Website-AmSacViet\` → làm lại **Bước 1** → chờ 1 đến 2 phút → web tự cập nhật.
Không cần làm lại Bước 2 và 3.

## Gặp lỗi thì sao

| Hiện tượng | Cách xử lý |
|---|---|
| Mở link báo **404** | Pages chưa xong: chờ thêm vài phút. Kiểm tra lại Bước 3 (branch **main**, thư mục **/ (root)**). |
| Web vẫn hiện bản cũ sau khi push | Nhấn **Ctrl + F5** để tải lại không dùng bộ nhớ đệm. |
| GitHub Desktop báo cần đăng nhập | Vào **File → Options → Accounts → Sign in**, đăng nhập tài khoản NamNguyen250707. |
| Nút *Push origin* không có | Có thể đã push rồi. Nếu nút là *Pull origin*, bấm nó trước rồi push lại. |
