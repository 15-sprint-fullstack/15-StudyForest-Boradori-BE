import express from 'express';
import { emojisRepository } from '../repositories/emojis.repository.js';
import { createEmojiSchema } from '#schemas';

export const emojisRouter = express.Router({ mergeParams: true });

//이모지 관련 API개발 공간
//아래는 예시코드 입니다.
emojisRouter.get('/', async (req, res, next) => {
  const { studyId } = req.params;
  try {
    const emoji = await emojisRepository.findByStudyId(studyId);
    res.status(200).json({
      successs: true,
      data: emoji,
      message: '이모지를 찾았습니다.',
    });
  } catch (error) {
    next(error);
  }
});

// 없으면 생성, 있으면 count 1 올리기
emojisRouter.post('/', async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const { emojiType } = createEmojiSchema.parse(req.body);
    const newEmojiType = await emojisRepository.createOrIncreaseCount({
      studyId,
      emojiType,
    });
    res.status(201).json({
      success: true,
      data: newEmojiType,
      message: '이모지 생성 / 카운트 추가 완료',
    });
  } catch (error) {
    next(error);
  }
});

emojisRouter.delete('/', async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const { emojiType } = createEmojiSchema.parse(req.body);

    const deleteEmoji = await emojisRepository.deleteOrDecreaseCount({
      studyId,
      emojiType,
    });
    res.status(200).json({
      success: true,
      data: deleteEmoji,
      message: '스터디 삭제 / 카운트 감소 완료',
    });
  } catch (error) {
    next(error);
  }
});
