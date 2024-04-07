import express from 'express';
import passport from 'passport';
import { confirmPassword, getInfo, sendOtpForgotPassword, sendOtpSignup, signIn, signUp } from '@controller';
import { authMiddleware } from '@middleware';
require('dotenv').config();

export const authRouter = express.Router();
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

authRouter.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenLogin}`);
  }
);

authRouter.get('/facebook', passport.authenticate('facebook', { session: false, scope: ['email'] }));

authRouter.get(
  '/facebook/callback',
  (req, res, next) => {
    passport.authenticate('facebook', (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenLogin}`);
  }
);

authRouter.get('/getInfo', authMiddleware, getInfo);
authRouter.post('/signin', signIn);
authRouter.post('/sendOtpSignup', sendOtpSignup);
authRouter.post('/signup', signUp);
authRouter.post('/sendOtpForgotPassword', sendOtpForgotPassword);
authRouter.post('/confirmPassword', confirmPassword);
