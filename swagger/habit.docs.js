//습관 API문서
/**
 * @swagger
 * /studies/{studyId}/habits:
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
 * /studies/{studyId}/habits:
 *   post:
 *     tags:
 *       - Habit
 *     summary: 습관 생성
 *     parameters:
 *       - in: path
 *         name: studyId
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
 *                 example: 6시에 미라클 모닝
 *     responses:
 *       201:
 *         description: 생성 성공
 *
 */

/**
 * @swagger
 * /studies/{studyId}/habits/{habitId}:
 *   patch:
 *     tags:
 *       - Habit
 *     summary: 습관 변경
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
 *       200:
 *         description: 변경 성공
 *
 */

/**
 * @swagger
 * /studies/{studyId}/habits/{habitId}:
 *   delete:
 *     tags:
 *       - Habit
 *     summary: 습관 삭제
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
 *         description: 삭제 성공
 *
 */