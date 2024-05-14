export const initParams = { page: 1, limit: 10 };
export const statuses = [
  { label: 'Active', key: 1 },
  { label: 'Inactive', key: 0 }
];

export const genders = [
  { label: 'Nam', key: 1 },
  { label: 'Nữ', key: 2 },
  { label: 'Khác', key: 3 },
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
  { label: 'Quên mật khẩu', key: 2 },
];

export const toolActions = [
  { label: 'Thêm mới', key: 'create' },
  { label: 'Xem', key: 'read' },
  { label: 'Cập nhật', key: 'update' },
  { label: 'Xóa', key: 'delete' },
];

export const productType = [
  { label: 'Đèn ngủ DIY', key: 'diy' },
  { label: 'Đèn ngủ 3D', key: '3d' },
  { label: 'Tranh DIY', key: 't-diy' },
];

export const policies = [
  { label: 'Chính sách bảo hành', key: 1 },
  { label: 'Chính sách đổi trả', key: 2 },
  { label: 'Chính sách vận chuyển', key: 3 },
];


export const promotionType = [
  { label: 'Trừ trực tiếp', key: 1, color: 'yellow' },
  { label: 'Voucher', key: 2, color: 'green' },
];

export const amountType = [
  { label: 'VNĐ', key: 1 },
  { label: '%', key: 2 },
];

export const receiptType = [
  { label: 'Phiếu nhập', key: 'imp' },
  { label: 'Phiếu xuất', key: 'exp' },
];
