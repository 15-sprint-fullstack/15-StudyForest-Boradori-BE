//습관기록 API문서
/**
 * @swagger
 * /studies/{studyId}/habit-record:
 *   get:
 *     tags:
 *       - HabitRecord
 *     summary: 습관 기록 리스트 조회
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
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 조회 성공
 *
 */

/**
 * @swagger
 * /studies/habit-record/{habitId}:
 *   get:
 *     tags:
 *       - HabitRecord
 *     summary: 습관 기록 조회
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 조회 성공
 *
 */

/**
 * @swagger
 * /studies/{studyId}/habit-record/{habitId}:
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
 * /studies/habit-record/{habitRecordId}:
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
