import express from 'express';
import { studiesRepository } from '#repositories';
import { comparePassword, generateSession, saveSession } from '#utils';
import { STUDY_ABSOLUTE_TIMEOUT } from '../constants/studyAccess.js';
import { Forbidden } from '../exceptions/forbidden-exception.js';
import { NotFoundException } from '../exceptions/not-found-exception.js';
import { requireStudyAccess } from '../middlewares/require-studyAccess.middleware.js';

export const accessRouter = express.Router({ mergeParams: true });

accessRouter.get('/', requireStudyAccess, (req, res) => {
  res.status(200).json({
    success: true,
    message: '접근 가능합니다.',
  });
});

accessRouter.post('/activity', requireStudyAccess, (_req, res) => {
  res.sendStatus(204);
});

// 인증 관련
accessRouter.post('/', async (req, res, next) => {
  // req.body 로 올 수 있는게 음 새 패스워드 ->

  try {
    const { studyId } = req.params;

    const { password } = req.body ?? {};

    const study = await studiesRepository.findByIdForAccess(studyId);

    if (!study) {
      throw new NotFoundException('찾으시는 스터디가 존재하지 않습니다.');
    }

    const isValid = await comparePassword(password, study.password);
    if (!isValid) {
      throw new Forbidden('비밀번호가 일치하지 않습니다');
    }

    const previousAccess = req.session.studyAccess ?? {};
    await generateSession(req);

    // ExpireAt 이거 다시 만들기
    req.session.studyAccess = {
      ...previousAccess,
      [studyId]: {
        lastActivityAt: Date.now(),
        absoluteExpireAt: Date.now() + STUDY_ABSOLUTE_TIMEOUT,
      },
    };

    // 저장
    await saveSession(req);

    res.status(200).json({
      success: true,
      message: '비밀번호 인증 성공',
    });
  } catch (error) {
    next(error);
  }
});
