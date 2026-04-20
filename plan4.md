# Kế hoạch 4: Hoàn thiện Light Mode & Hiệu ứng Chuyển đổi

Bản kế hoạch này tập trung vào việc tinh chỉnh giao diện Sáng (Light Mode) để đạt độ thẩm mỹ cao nhất và thêm các hiệu ứng chuyển động chuyên nghiệp cho nút chuyển đổi theme.

## 1. Tinh chỉnh Header & Footer (Light Mode)
- **Màu sắc:** Thay đổi nền từ đen mờ sang màu xanh trắng nhạt (`rgba(240, 248, 255, 0.8)`) để tạo cảm giác nhẹ nhàng, đồng bộ với bầu trời mây.
- **Blur:** Giữ nguyên hiệu ứng `backdrop-filter: blur` để duy trì sự cao cấp.
- **Border:** Điều chỉnh viền mờ thành màu sáng hơn để phân tách tinh tế với nội dung.

## 2. Nâng cấp Nút chuyển đổi (Theme Toggle)
- **Kích thước:** Phóng to icon để người dùng dễ thao tác và nhìn rõ hiệu ứng.
- **Animation:** 
  - Khi chuyển từ Tối sang Sáng: Icon mặt trời sẽ xoay tròn và phóng to nhẹ.
  - Hiệu ứng chuyển đổi mượt mà giữa hình tượng ☀️ và 🌙.
  - Thêm hiệu ứng hover bắt mắt (phát sáng nhẹ hoặc đổi màu).

## 3. Đồng bộ màu sắc toàn trang cho Light Mode
- Đảm bảo tất cả các thành phần (Hero text, Project cards, Music Player) đổi sang tông màu tối trên nền sáng để dễ đọc.

---

## Các bước thực hiện:
1. **Cập nhật App.css:** Định nghĩa các biến CSS hoặc các class override cho `.light-mode`.
2. **Cập nhật App.jsx:** Chỉnh sửa cấu trúc nút `theme-toggle` để hỗ trợ animation tốt hơn (có thể dùng CSS classes hoặc Framer Motion nếu cần, nhưng ưu tiên CSS thuần cho hiệu năng).
3. **Kiểm tra & Tối ưu:** Đảm bảo quá trình chuyển đổi không bị giật lag và màu sắc hài hòa.

=> **Gõ "Triển khai Plan 4" để bắt đầu nâng cấp!**
