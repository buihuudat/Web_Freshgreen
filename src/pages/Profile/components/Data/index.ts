export interface ProfileDataProps {
  name: string;
  path: string;
}

export const profileData: ProfileDataProps[] = [
  {
    name: "Thông tin tài khoản",
    path: "/tai-khoan",
  },
  {
    name: "Quản lí đơn hàng",
    path: "/quan-li-don-hang",
  },
  {
    name: "Đơn hàng đã mua",
    path: "/san-pham-da-mua",
  },
  {
    name: "Sản phẩm yêu thích",
    path: "/san-pham-yeu-thich",
  },
];
