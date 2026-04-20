# Plan 6: Màn hình Intro "Xuyên không" & Hiệu ứng Chuyển cảnh

Mục tiêu là tạo ra một màn hình khởi đầu chuyên nghiệp, mang phong cách không gian trước khi vào Portfolio.

## Các bước thực hiện:

### 1. Tạo Component Intro mới

- File: `src/components/Intro.jsx`
- Một màn hình full-screen với nút "ENTER PORTFOLIO".
- Sử dụng hiệu ứng Neon cho nút bấm.

### 2. Hiệu ứng "Xuyên không" (Warp Speed)

- Khi nhấn nút Enter, gọi hàm tăng tốc `tsparticles`.
- Thời gian nhảy không gian dự kiến: **2 giây**.
- Kết thúc hiệu ứng bằng một màn "Fade out" mượt mà.

### 3. Hiệu ứng Xuất hiện Lần lượt (Sequential Reveal)

- Sau khi vào trang chính, các phần: **Header -> Hero -> Projects -> Footer** sẽ hiện ra cách nhau 0.3s.
- Sử dụng CSS để tạo hiệu ứng bay lên (slide-up) và mờ dần (fade-in).

### 4. Âm thanh (Tùy chọn)

- Thêm âm thanh "Whoosh" khi bắt đầu xuyên không .

---

**Bạn hãy duyệt qua kế hoạch này, nếu OK tôi sẽ bắt đầu viết code nhé!**
