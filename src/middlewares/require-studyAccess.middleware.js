import { STUDY_IDLE_TIMEOUT } from '../constants/studyAccess.js';

export function requireStudyAccess(req, res, next) {
  const { studyId } = req.params;
  const access = req.session.studyAccess?.[studyId];
  const now = Date.now();

  // 활동 중 경우를 추가함.
  if (
    !access ||
    !Number.isFinite(access.lastActivityAt) ||
    !Number.isFinite(access.absoluteExpireAt) ||
    now - access.lastActivityAt >= STUDY_IDLE_TIMEOUT ||
    now >= access.absoluteExpireAt
  ) {
    return res.status(403).json({
      success: false,
      code: 'STUDY_ACCESS_REQUIRED',
      message: '비밀번호 인증이 필요합니다',
    });
  }

  access.lastActivityAt = now;
  next();
}
