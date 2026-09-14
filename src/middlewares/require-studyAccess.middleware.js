export function requireStudyAccess(req, res, next) {
  const { studyId } = req.params;
  const access = req.session.studyAccess?.[studyId];

  if (!access || access.expireAt <= Date.now()) {
    return res.status(403).json({
      success: false,
      code: 'STUDY_ACCESS_REQUIRED',
      message: '비밀번호 인증이 필요합니다',
    });
  }

  next();
}
