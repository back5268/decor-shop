export const initParams = { page: 1, limit: 10 };
export const statuses = [
  { label: 'Active', key: 1 },
  { label: 'Inactive', key: 0 }
];

export const genders = [
  { label: 'Nam', key: 1 },
  { label: 'Nữ', key: 2 },
  { label: 'Khác', key: 3 }
];

export const logType = [
  { label: 'Đăng ký tài khoản', key: 1 },
  { label: 'Quên mật khẩu', key: 2 },
  { label: 'Thanh toán thành công', key: 3 },
  { label: 'Hoàn thành khóa học', key: 4 }
];

export const logStatus = [
  { label: 'Đang gửi', key: 0, color: 'yellow' },
  { label: 'Đã gửi', key: 1, color: 'green' },
  { label: 'Có lỗi', key: 2, color: 'red' }
];

export const templateType = [
  { label: 'Đăng ký tài khoản', key: 1 },
  { label: 'Quên mật khẩu', key: 2 }
];

export const toolActions = [
  { label: 'Thêm mới', key: 'create' },
  { label: 'Xem', key: 'read' },
  { label: 'Cập nhật', key: 'update' },
  { label: 'Xóa', key: 'delete' }
];

export const productType = [
  { label: 'Đèn ngủ DIY', key: 'diy' },
  { label: 'Đèn ngủ 3D', key: '3d' },
  { label: 'Tranh DIY', key: 't-diy' }
];

export const policies = [
  { label: 'Chính sách bảo hành', key: 1 },
  { label: 'Chính sách đổi trả', key: 2 },
  { label: 'Chính sách vận chuyển', key: 3 }
];

export const amountType = [
  { label: 'VNĐ', key: 1 },
  { label: '%', key: 2 }
];

export const receiptType = [
  { label: 'Phiếu nhập', key: 'imp' },
  { label: 'Phiếu xuất', key: 'exp' }
];

export const orderBy = [
  { label: 'Lượt bán ra', key: 'saleNumber' },
  { label: 'Thời gian thêm', key: 'createdAt' }
];

export const orderType = [
  { label: 'Tăng dần', key: '1' },
  { label: 'Giảm dần', key: '-1' }
];

export const rates = [
  { label: 'Từ 5*', key: '1' },
  { label: 'Từ 4* trở lên', key: '2' },
  { label: 'Từ 3* trở lên', key: '3' },
  { label: 'Từ 2* trở lên', key: '4' },
  { label: 'Từ 1* trở lên', key: '5' }
];

export const paymentType = [
  { label: 'Chuyển khoản', key: 1 },
  { label: 'Thanh toán khi nhận hàng', key: 2 }
];

export const paymentStatus = [
  { label: 'Thanh toán khi nhận hàng', key: 0, color: 'gray' },
  { label: 'Chờ thanh toán', key: 1, color: 'orange' },
  { label: 'Đã thanh toán', key: 2, color: 'green' },
  { label: 'Đang giao hàng', key: 3, color: 'cyan' },
  { label: 'Đã nhận hàng', key: 4, color: 'green' },
  { label: 'Hủy đơn hàng', key: 5, color: 'red' }
];
