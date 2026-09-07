//습관 API문서
/**
 * @swagger
 * /studies/{studyId}/habit:
 *   get:
 *     tags:
 *       - Habit
 *     summary: 습관 조회
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 조회 성공
 *
 */

/**
 * @swagger
 * /studies/{studyId}/habit/{habitId}:
 *   post:
 *     tags:
 *       - HabitRecord
 *     summary: 습관 기록 생성
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: 생성 성공
 *
 */