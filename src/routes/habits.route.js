import express from 'express';

export const habitRouter = express.Router({ mergeParams: true });

//습관 관련 API개발 공간
//아래는 예시코드 입니다.

habitRouter.get('/:habitId', async (req, res) => {
  const { studiesId, habitId } = req.params;
  console.log(req.params.studiesId, req.params.habitId);
  res.status(200).json({
    message: '습관의 studiesId와 habitId 체크입니다.',
    studiesId,
    habitId,
  });
});
