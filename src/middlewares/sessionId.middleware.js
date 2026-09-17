import session from 'express-session';
import { STUDY_IDLE_TIMEOUT } from '../constants/studyAccess.js';
import connectPgSimple from 'connect-pg-simple';

const PgSession = connectPgSimple(session);

const sessionStore = new PgSession({
  conString: process.env.DATABASE_URL,
  tableName: 'session',
  createTableIfMissing: true,
});

// 배포할 때 store 설정 넣어줌.
export const sessionId = session({
  store: sessionStore,
  name: 'study_sid',
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  rolling: true, // 기존 세션 있는 곳이 응답할 때에 다시 만료 기간 맞춤
  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: STUDY_IDLE_TIMEOUT,
  },
});
