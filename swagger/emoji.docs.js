// 이모지 API 문서
/**
 * @swagger
 * /studies/{studyId}/emojis:
 *   parameters:
 *     - in: path
 *       name: studyId
 *       required: true
 *       description: 스터디 ID
 *       schema:
 *         type: string
 *         format: uuid
 *
 *   get:
 *     tags: [Emoji]
 *     summary: 스터디 이모지 목록 조회
 *
 *     responses:
 *       '200':
 *         description: 이모지 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Emoji'
 *                 message:
 *                   type: string
 *                   example: 이모지를 찾았습니다.
 *       '404':
 *         description: 해당 스터디가 존재하지 않습니다.
 *       '500':
 *         description: 서버 내부 오류
 *
 *   post:
 *     tags: [Emoji]
 *     summary: 이모지 추가 또는 카운트 증가
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [emojiType]
 *             properties:
 *               emojiType:
 *                 type: string
 *                 minLength: 1
 *                 description: 이모지 하나만 입력해야 합니다.
 *                 example: "😀"
 *     responses:
 *       '201':
 *         description: 이모지 생성 또는 카운트 증가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Emoji'
 *                 message:
 *                   type: string
 *                   example: 이모지 생성 / 카운트 추가 완료
 *       '400':
 *         description: 요청 데이터가 올바르지 않거나 해당 이모지의 count가 이미 99입니다.
 *         content:
 *           application/json:
 *             examples:
 *               invalidEmoji:
 *                 summary: 이모지 형식 오류
 *                 value:
 *                   success: false
 *                   message: 요청 데이터가 올바르지 않습니다
 *                   errors:
 *                     - field: emojiType
 *                       message: 이모지 하나만 입력해 주세요.
 *               countLimit:
 *                 summary: 이모지 최대 개수 초과
 *                 value:
 *                   success: false
 *                   message: 이모지는 최대 99개까지 추가할 수 있습니다.
 *       '404':
 *         description: 해당 스터디가 존재하지 않습니다.
 *       '409':
 *         description: 동시 요청 처리 중 중복 데이터 충돌이 발생했습니다.
 *       '500':
 *         description: 서버 내부 오류
 *
 *   delete:
 *     tags: [Emoji]
 *     summary: 이모지 카운트 감소 또는 삭제
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [emojiType]
 *             properties:
 *               emojiType:
 *                 type: string
 *                 minLength: 1
 *                 description: 감소 또는 삭제할 이모지 하나
 *                 example: "😀"
 *     responses:
 *       '200':
 *         description: 카운트 감소 또는 이모지 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   description: 감소 후 남은 이모지 정보. 삭제된 경우 null입니다.
 *                   allOf:
 *                     - $ref: '#/components/schemas/Emoji'
 *                 message:
 *                   type: string
 *                   example: 이모지 삭제 / 카운트 감소 완료
 *             examples:
 *               decreased:
 *                 summary: 카운트 감소
 *                 value:
 *                   success: true
 *                   data:
 *                     id: b2c3d4e5-f6a7-4901-bcde-f12345678901
 *                     emojiType: "😀"
 *                     count: 1
 *                     createdAt: "2026-09-17T00:00:00.000Z"
 *                     studyId: 1a561aee-9c6e-46df-80e1-7c39be75de08
 *                   message: 이모지 삭제 / 카운트 감소 완료
 *               deleted:
 *                 summary: 카운트가 0이 되어 삭제
 *                 value:
 *                   success: true
 *                   data: null
 *                   message: 이모지 삭제 / 카운트 감소 완료
 *       '400':
 *         description: emojiType이 누락되었거나 이모지 하나가 아닙니다.
 *       '404':
 *         description: 해당 스터디 또는 이모지가 존재하지 않습니다.
 *         content:
 *           application/json:
 *             examples:
 *               studyNotFound:
 *                 value:
 *                   success: false
 *                   message: 요청하신 스터디 id가 존재하지 않습니다.
 *               emojiNotFound:
 *                 value:
 *                   success: false
 *                   message: 해당 이모지가 존재하지 않습니다.
 *       '500':
 *         description: 서버 내부 오류
 */
