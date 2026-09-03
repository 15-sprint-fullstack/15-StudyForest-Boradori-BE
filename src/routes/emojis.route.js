import express from 'express';

export const emojiRouter = express.Router({ mergeParams: true });

//이모지 관련 API개발 공간
//아래는 예시코드 입니다.
emojiRouter.get('/', async (req, res) => {
  const { studiesId } = req.params;
res.status(200).json({
      message: '이모지의 studiesId 체크입니다.',
      studiesId,
    });
});
