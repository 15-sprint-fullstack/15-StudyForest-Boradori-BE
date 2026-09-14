import express from 'express';
import { studiesRepository } from '#repositories';
import { comparePassword } from '#utils';
import { Forbidden } from '../exceptions/forbidden-exception.js';
import { NotFoundException } from '../exceptions/not-found-exception.js';

export const accessRouter = express.Router({ mergeParams: true });

// 인증 관련
accessRouter.post('/', async (req, res, next) => {
  // req.body 로 올 수 있는게 음 새 패스워드 ->

  try {
    const { studyId } = req.params;

    const { password } = req.body ?? {};

    const study = await studiesRepository.findByIdForAccess(studyId);
    console.log(study.password);
    if (!study) {
      throw new NotFoundException('찾으시는 스터디가 존재하지 않습니다.');
    }

    const isValid = await comparePassword(password, study.password);
    if (!isValid) {
      throw new Forbidden('비밀번호가 일치하지 않습니다');
    }

    res.status(200).json({
      success: true,
      message: '비밀번호 인증 성공',
    });
  } catch (error) {
    next(error);
  }
});
