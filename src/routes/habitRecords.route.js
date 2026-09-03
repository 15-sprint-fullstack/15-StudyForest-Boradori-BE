import express from 'express';

export const habitRecordsRouter = express.Router({ mergeParams: true });

//습관기록 관련 API개발 공간
//아래는 예시코드 입니다.

habitRecordsRouter.get('/:habitId', async (req, res) => {
  const { studiesId, habitId } = req.params;
  res.status(200).json({
    message: '습관기록의 studiesId와 habitId 체크입니다.',
    studiesId,
    habitId,
  });
});
