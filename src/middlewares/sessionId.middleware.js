import session from 'express-session';

export const sessionId = session({
  name: 'study_sid',
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    secure: false, // https 에서 true로 변환 필요
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 유효 시간 15분
  },
});
