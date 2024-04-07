const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
import { getDetailUserMd } from '@models';
import passport from 'passport';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        if (profile?.id) {
          let user = getDetailUserMd({ syncId: profile.id, typeLogin: profile.provider });
          if (!user) {
            user = await addUserMd({
              syncId: profile.id,
              email: profile.emails[0]?.value,
              typeLogin: profile.provider,
              name: profile.displayName,
              avatarUrl: profile?.photos[0]?.value
            });
          }
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_TOKEN);
          await updateUserMd({ _id: user._id }, { token });
        }
      } catch (error) {
        console.log(error);
      }
      return cb(null, profile);
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['email', 'photos', 'id', 'displayName']
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        if (profile?.id) {
          let user = getDetailUserMd({ syncId: profile.id, typeLogin: profile.provider });
          if (!user) {
            user = await addUserMd({
              syncId: profile.id,
              email: profile.emails[0]?.value,
              typeLogin: profile.provider,
              name: profile.displayName,
              avatarUrl: profile?.photos[0]?.value
            });
          }
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_TOKEN);
          await updateUserMd({ _id: user._id }, { token });
        }
      } catch (error) {
        console.log(error);
      }
      return cb(null, profile);
    }
  )
);
