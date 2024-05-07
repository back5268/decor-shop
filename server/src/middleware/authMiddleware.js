import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getDetailUserMd } from '@models';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.header('Bearer');
  if (!token) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userInfo = await getDetailUserMd({ _id: checkToken._id });

    if (!userInfo) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
    if (userInfo.token !== token) return res.status(401).json({ status: false, mess: 'Tài khoản đã được đăng nhập ở nơi khác!' });
    if (userInfo.status === 0)
      return res
        .status(401)
        .json({ status: false, mess: 'Tài khoản của bạn chưa được kích hoạt hoặc đã bị khóa, vui lòng liên hệ quản trị viên!' });
    req.userInfo = userInfo;
    next();
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const userMiddleware = async (req, res, next) => {
  try {
    if (!req.userInfo || req.userInfo.type !== "user")
      return res.status(400).json({ status: false, mess: 'Bạn không có quyền thực hiện tác vụ này!' });
    next();
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
