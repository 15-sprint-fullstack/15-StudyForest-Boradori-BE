import { prisma } from '#db/prisma.js';
import { habitRecordsRepository } from '#repositories';
import { BadRequestException } from '../exceptions/bad-request-exception.js';
import { NotFoundException } from '../exceptions/not-found-exception.js';

export const validateHabitRecord = async (req, res, next) => {
  const isDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        `유효하지 않은 날짜 형식입니다: ${dateString}`,
      );
    }
  };

  const isIdExist = (Id) => {
    if (!Id) {
      throw new BadRequestException('studyId 또는 habitId는 필수 입니다.');
    }
  };

  const checkStudyId = async (studyId) => {
    const study = await prisma.study.findUnique({
      where: { id: studyId },
    });
    if (!study) {
      throw new NotFoundException('studyId가 존재하지 않습니다.');
    }
  };

  const checkHabitId = async (habitId) => {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (!habit) {
      throw new NotFoundException('habitId가 존재하지 않습니다.');
    }
    return (req.name = habit.name);
  };

  const checkHabitRecordId = (habitRecordId) => {
    const target = habitRecordsRepository.findById(habitRecordId);
    if (!target) {
      throw new NotFoundException('habitRecordId가 존재하지 않습니다.');
    }
  };

  const checkStudyAndHabitRelation = async (studyId, habitId) => {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (habit.studyId !== studyId) {
      throw new BadRequestException(
        '요청하신 스터디에 해당하는 습관이 아닙니다.',
      );
    }
  };

  const isAleadyCreate = async (studyId, habitId) => {
    const now = new Date();
    const start = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0,
      ),
    );

    const end = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        23,
        59,
        59,
        999,
      ),
    );
    const result = await prisma.habitRecord.findFirst({
      where: {
        studyId,
        habitId,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });
    if (result) {
      throw new BadRequestException(
        '습관기록은 하루에 하나만 생성 가능합니다.',
      );
    }
  };

  try {
    const { method } = req;
    const { studyId, habitId, habitRecordId } = req.params;
    const { startDate, endDate } = req.query;

    switch (method) {
      case 'GET':
        isIdExist(studyId);
        await checkStudyId(studyId);
        isDate(startDate);
        isDate(endDate);
        break;

      case 'POST':
        isIdExist(studyId);
        isIdExist(habitId);
        await checkStudyId(studyId);
        await checkHabitId(habitId);
        await checkStudyAndHabitRelation(studyId, habitId);
        await isAleadyCreate(studyId, habitId);
        break;

      case 'DELETE':
        isIdExist(habitRecordId);
        checkHabitRecordId(habitRecordId);
        break;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
