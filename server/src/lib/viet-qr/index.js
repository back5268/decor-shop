import { removeVietnameseTones } from '@utils';

export const generateVietQrLink = (amount, description, accountName = 'Decor Star') => {
  return `https://img.vietqr.io/image/VCB-1040358684-compact2.png?amount=${amount}&addInfo=${encodeURI(description)}&accountName=${encodeURI(removeVietnameseTones(accountName))}`;
};
