//습관기록 API문서
/**
 * @swagger
 * /studies/{studyId}/habit-records:
 *   get:
 *     tags:
 *       - HabitRecord
 *     summary: 습관 기록 조회
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           example: 2026-08-30
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: 2026-09-05
 *     responses:
 *       200:
 *         description: 조회 성공
 *
 */

/**
 * @swagger
 * /studies/{studyId}/habit-records/{habitId}:
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

/**
 * @swagger
 * /studies/habit-records/{habitId}:
 *   patch:
 *     tags:
 *       - HabitRecord
 *     summary: 습관 이름 변경
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 고양이 밥주기
 *     responses:
 *       201:
 *         description: 변경 성공
 *
 */

/**
 * @swagger
 * /studies/habit-records/{habitRecordId}:
 *   delete:
 *     tags:
 *       - HabitRecord
 *     summary: 습관 기록 삭제
 *     parameters:
 *       - in: path
 *         name: habitRecordId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 삭제 성공
 *
 */
