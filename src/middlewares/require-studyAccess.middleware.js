export function requireStudyAccess(req, res, next) {
  const { studyId } = req.params;
  const access = req.session.studyAccess?.[studyId];

  // 이거 나중에 middleware 사용해서 한 걸로 수정해야 함
  if (!access || access.expireAt <= Date.now()) {
    return res.status(403).json({
      success: false,
      code: 'STUDY_ACCESS_REQUIRED',
      message: '비밀번호 인증이 필요합니다',
    });
  }

  next();
}
