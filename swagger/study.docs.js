//스터디 API문서
/**
 * @swagger
 * /studies:
 *   get:
 *     tags:
 *       - Study
 *     summary: 스터디 조회
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 6
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: desc
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: point
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           example: test
 *     responses:
 *       200:
 *         description: 조회 성공
 *
 */

/**
 * @swagger
 * /studies/{studyId}
 *   get:
 *     tags:
 *       - Study
 *     summary: 스터디ID 조회
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
 * /studies:
 *   post:
 *     tags:
 *       - Study
 *     summary: 스터디 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: 보라도리
 *               name:
 *                 type: string
 *                 example: 보라도리의 병영생활
 *               description:
 *                 type: string
 *                 example: 보라도리의 기운찬 생활을 위한 스터디입니다!
 *               background:
 *                 type: string
 *                 example: puple
 *               password:
 *                 type: string
 *                 example: 1q2w3e4r!
 *               point:
 *                 type: integer
 *                 example: 30
 *      responses:
 *       201:
 *         description: 생성 성공
 *
 */

/**
 * @swagger
 * /studies/{studyId}
 *   patch:
 *     tags:
 *       - Study
 *     summary: 스터디 변경
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
 *               nickname:
 *                 type: string
 *                 example: 보라도리
 *               name:
 *                 type: string
 *                 example: 보라도리의 병영생활
 *               description:
 *                 type: string
 *                 example: 보라도리의 기운찬 생활을 위한 스터디입니다!
 *               background:
 *                 type: string
 *                 example: puple
 *               password:
 *                 type: string
 *                 example: 1q2w3e4r!
 *               point:
 *                 type: integer
 *                 example: 30
 *      responses:
 *       200:
 *         description: 변경 성공
 *
 */

/**
 * @swagger
 * /studies/{studyId}
 *   delete:
 *     tags:
 *       - Study
 *     summary: 스터디 삭제
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *       200:
 *         description: 삭제 성공
 *
 */