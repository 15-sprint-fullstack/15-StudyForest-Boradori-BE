import { faker } from '@faker-js/faker';
import { PrismaPg } from '@prisma/adapter-pg';
import { assertSafeSeedTarget, resetMarketData } from './seed-safety.js';
import { PrismaClient } from '#generated/prisma/client.ts';

const NUM_STUDY_TO_CREATE = 30;

const makeStudyInput = () => ({
  nickname: faker.lorem.sentence({ min: 3, max: 8 }),
  name: faker.lorem.sentence({ min: 3, max: 8 }),
  description: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
  background: faker.color.human(),
  password: '1q2w3e4r!',
  point: faker.number.int({ min: 0, max: 50 }),
});

const makeHabitInput = (studyId) => ({
  name: faker.lorem.sentence({ min: 2, max: 3 }),
  studyId,
});

function getDateRange(start, end) {
  const dates = [];
  const current = new Date(start);
  const last = new Date(end);
  while (current <= last) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

const dateRange = getDateRange('2026-08-30', '2026-09-06');

const makeHabitRecordInput = (habitName, studyId, habitId, createdAt) => ({
  habitName,
  studyId,
  habitId,
  createdAt,
});

const makeEmojiInput = (studyId) => ({
  emojiType: faker.internet.emoji(),
  count: faker.number.int({ min: 0, max: 10 }),
  studyId,
});

async function seed(prisma) {
  const studyData = Array.from({ length: NUM_STUDY_TO_CREATE }, () =>
    makeStudyInput(),
  );

  await prisma.study.createMany({ data: studyData });

  const studys = await prisma.study.findMany({
    select: { id: true },
  });

  const habitData = [];
  for (const study of studys) {
    const count = faker.number.int({ min: 1, max: 6 });
    for (let index = 0; index < count; index += 1) {
      habitData.push(makeHabitInput(study.id));
    }
  }

    await prisma.habit.createMany({ data: habitData });

  const emojiData = [];
  for (const study of studys) {
    const count = faker.number.int({ min: 1, max: 5 });
    for (let index = 0; index < count; index += 1) {
      emojiData.push(makeEmojiInput(study.id));
    }
  }

  await prisma.emoji.createMany({ data: emojiData, skipDuplicates: true,});

  const habits = await prisma.habit.findMany({
    select: { name: true, id: true, studyId: true },
  });

  const habitRecordData = [];
for (const habit of habits) {
  const count = faker.number.int({ min: 0, max: 7 });
  const shuffledDates = faker.helpers.shuffle([...dateRange]);
  const selectedDates = shuffledDates.slice(0, count);

  for (const date of selectedDates) {
    habitRecordData.push(
      makeHabitRecordInput(habit.name, habit.studyId, habit.id, date)
    );
  }
}

  await prisma.habitRecord.createMany({ data: habitRecordData });

  return {
    stydyCount: studyData.length,
    habitCount: habitData.length,
    habitRecordCount: habitRecordData.length,
    emojiCount: emojiData.length,
  };
}

async function main(prisma) {
  assertSafeSeedTarget({
    databaseUrl: process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    args: process.argv,
  });

  await resetMarketData(prisma);
  const result = await seed(prisma);

  console.log(`${result.stydyCount}개의 Study가 생성되었습니다.`);
  console.log(`${result.habitCount}개의 Habit이 생성되었습니다.`);
  console.log(`${result.habitRecordCount}개의 Habit Record가 생성되었습니다.`);
  console.log(`${result.emojiCount}개의 Emoji가 생성되었습니다.`);
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

main(prisma)
  .catch((error) => {
    console.error('시딩 오류:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
