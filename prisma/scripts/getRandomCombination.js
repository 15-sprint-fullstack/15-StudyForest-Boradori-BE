import { faker } from '@faker-js/faker';

const RANDOM_WORDS = {
  adjectives: [
    '용감한',
    '졸린',
    '배고픈',
    '행복한',
    '수줍은',
    '엉뚱한',
    '고뇌에 찬',
    '게으른',
    '기발한',
    '멋진',
    '성실한',
  ],
  nicknames: [
    '호랑이',
    '고양이',
    '너구리',
    '펭귄',
    '토끼',
    '거북이',
    '곰돌이',
    '백조',
    '수달',
    '햄스터',
  ],
  names: [
    '공부방',
    '학습상자',
    '습관기록표',
    '갓생일기',
    '습관일기',
    '기록남기기',
  ],
  adverbs: ['열심히', '성실하게', '매일매일', '미래를 위해', '꾸준히'],
  verbs: ['공부하는', '기록하는', '흔적을 남기는', '습관을 관리하는'],
  habits: [
    '물 2L 마시기',
    '고양이 밥 주기',
    '강아지 산책시키기',
    '수영하기',
    '조깅하기',
    '요가하기',
    '독서하기',
    '아침 챙겨먹기',
    '청소하기',
    '공원 산책하기',
  ],
};

export function getRandomCombination() {
  let adj = faker.helpers.arrayElement(RANDOM_WORDS.adjectives);
  const nickname = faker.helpers.arrayElement(RANDOM_WORDS.nicknames);
  const randomNickname = `${adj} ${nickname}`;

  adj = faker.helpers.arrayElement(RANDOM_WORDS.adjectives);
  const name = faker.helpers.arrayElement(RANDOM_WORDS.names);
  const randomName = `${adj} ${name}`;

  const adverb = faker.helpers.arrayElement(RANDOM_WORDS.adverbs);
  const verb = faker.helpers.arrayElement(RANDOM_WORDS.verbs);
  const randomDescription = `${randomNickname}이(가) ${adverb} ${verb} 공간입니다.\n마음껏 둘러보세요!`;

  return { randomNickname, randomName, randomDescription };
}

export function getRandomHabits() {
  const randomHabits = faker.helpers.arrayElements(RANDOM_WORDS.habits, {
    min: 2,
    max: 6,
  });
  return randomHabits;
}
