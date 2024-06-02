import express from 'express';
import { confirmPassword, getInfo, getToolByUser, sendOtpForgotPassword, sendOtpSignup, signIn, signUp } from '@controller';
import { authMiddleware, permissionMiddleware } from '@middleware';
require('dotenv').config();
import { OAuth2Client } from 'google-auth-library';
import { addUserMd, getDetailUserMd, updateUserMd } from '@models';
import jwt from 'jsonwebtoken';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

export const authRouter = express.Router();
authRouter.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    if (payload) {
      let user = await getDetailUserMd({ typeLogin: 'google', email: payload?.email });
      if (!user) {
        user = await addUserMd({
          email: payload?.email,
          username: payload?.email,
          typeLogin: 'google',
          name: payload?.name,
          avatar: payload?.picture
        });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_TOKEN);
      await updateUserMd({ _id: user._id }, { token });
      return res.status(200).json({ status: true, data: token });
    }
    res.status(401).json({ status: false, mess: 'User authentication failed' });
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: false, mess: 'User authentication failed' });
  }
});

authRouter.get('/getInfo', authMiddleware, getInfo);
authRouter.get('/getToolByUser', authMiddleware, permissionMiddleware, getToolByUser);
authRouter.post('/signin', signIn);
authRouter.post('/sendOtpSignup', sendOtpSignup);
authRouter.post('/signup', signUp);
authRouter.post('/sendOtpForgotPassword', sendOtpForgotPassword);
authRouter.post('/confirmPassword', confirmPassword);
