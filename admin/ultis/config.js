export const ktsConfig = {
  navLinks: [
    { title: "trang chủ", path: "/" },
    { title: "giới thiệu", path: "/about" },
    { title: "sản phẩm", path: "/products" },
    { title: "tin tức", path: "/news" },
    { title: "liên hệ", path: "/contact" },
  ],
  footer: {
    address: " 20C/75/213 Thiên Lôi",
    wokingTime: " 8h-17h30",
    phone: " (+84) 788 300 894",
    email: " ktscropvn@gmail.com",
    copyRight: "Copyright 2022 © Thiết kế bởi Hoa Sen Đỏ",
  },
};
export const dashboard = {
  navLinks: [
    { title: "sản phẩm", path: "/admin/san-pham", role: ["admin", "shop"] },
    { title: "đơn hàng", path: "/admin/don-hang", role: ["admin", "shop"] },
    {
      title: "thông tin tài khoản",
      path: "/admin/thong-tin-tai-khoan",
      role: ["admin", "user"],
    },
    { title: "thông báo", path: "/admin/thong-bao", role: ["admin", "shop"] },
    { title: "tài khoản", path: "/admin/tai-khoan", role: ["admin"] },
    { title: "bài viết", path: "/admin/bai-viet", role: ["admin"] },
    { title: "báo cáo", path: "/admin/bao-cao", role: ["admin", "special"] },
    { title: "database", path: "/admin/database", role: ["admin"] },
  ],
};
//online
export const ktsSocket = "http://api.sale168.com:9100";
//offline
// export const ktsSocket = "http://localhost:9100";
