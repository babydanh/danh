# Kế hoạch 3: Chế độ Sáng (Light Mode) và Nền Đám Mây Động

Bản tài liệu này mô tả cách chúng ta sẽ tích hợp tính năng gạt đổi giao diện (Dark/Light mode) lên Header, cũng như cách thiết kế một bức nền với bầu trời xanh và mây trôi bồng bềnh cho giao diện Sáng.

## 1. Thiết kế Giao diện (UI/UX)
- **Nút Chuyển Đổi (Theme Toggle):**
  - Đặt ở trên thanh ngang (Header Bar).
  - Sử dụng chung ngôn ngữ thiết kế kính mờ (Glassmorphism), click vào để xoay vòng icon Mặt trời (Sáng) và Mặt trăng (Tối).
- **Màu sắc Light Mode:**
  - Nền mây trời xanh nhạt dịu mắt.
  - Các ô Panel, Header, Footer sẽ chuyển sang dạng kính mờ màu sáng (`rgba(255, 255, 255, 0.4)` thay vì nền đen trong suốt).
  - Chữ màu trắng sẽ nghịch đảo thành đỏ sẫm hoặc xám đen (`#1a1a1a`).
- **Nền mây động (Clouds Background):**
  - Tạo bằng CSS animations mượt mà, nhiều tầng mây bay với tốc độ khác nhau để tạo cảm giác có chiều sâu 3D (Parallax).

## 2. Kỹ thuật Triển khai (Code Setup)

### Thay đổi ở App.jsx
- Thêm state `theme` (mặc định 'dark').
- Bơm state `theme` vào CSS class của thẻ `<body>`, giúp toàn bộ ngóc ngách của trang Web tự đồng bộ màu sắc.
- Gắn một nút Toggle lên thẻ `<header>`.
- Kẹp vòng lặp điều kiện vào Component Background:
  `{theme === 'dark' ? <ParticlesBackground /> : <CloudsBackground />}`

### Tính năng lưu trữ (Local Storage)
- Thêm cơ chế tự động ghi nhớ sở thích của bạn. Giả sử bạn bật nền Sáng, tắt Tab đi mai mở lại nó vẫn sẽ tự tải nền Sáng!

### Tạo Component mới
- **`CloudsBackground.jsx`**: Cấu trúc HTML cho bầu trời.
- **`CloudsBackground.css`**: Vẽ css mây (có thể dùng CSS Shape mây tĩnh hoặc base64 mây png) và thiết lập chuyển động `translate-x` tuần hoàn với `@keyframes`.

## 3. Câu hỏi mở cần bạn chốt:
1. **Các trái tim Undertale:** Ở chế độ Sáng (màu chữ tối, nền trời xanh), bạn có muốn giữ nguyên 7 trái tim đang bay lơ lửng không? Nếu giữ thì vẫn để chúng đa sắc màu phát sáng như hiện tại nhé?
2. Bức ảnh Avatar của bạn, viền ngoài nó phản quang màu xanh ở Dark mode, chuyển sang Light mode viền xanh dương vẫn là rất hợp nên tôi sẽ giữ tính năng đó nhé!

=> **Bạn đọc kỹ Plan này, nếu ưng bụng hãy ra lệnh "Triển khai Plan 3", tôi sẽ gõ code cập nhật cho bạn ngay lập tức!**
