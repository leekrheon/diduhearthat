import { Character } from '../types';

export const CHARACTERS: Character[] = [
  {
    id: 'sujin',
    name: '수진',
    age: 26,
    bio: '카페에서 그림을 그리는 것을 좋아하는 일러스트레이터입니다.',
    image: '/char.png',
    bgImage: '/back.png',
    dialogues: [
      { type: 'normal', text: '안녕! 오늘 여기 처음 왔어? 나는 여기 단골인데 😊' },
      { type: 'normal', text: '나 일러스트레이터야. 카페에서 그림 그리는 게 취미이자 일이거든.' },
      { type: 'normal', text: '근데 요즘 피부가 너무 건조해서 고민이야. 날씨 때문인가...' },
      {
        type: 'ad',
        text: '아 맞다! 친구한테 추천받은 세럼 써봤는데 진짜 달라졌어. 라운드랩 자작나무 수분크림이었나? 되게 가볍고 촉촉하더라고.',
        adBrand: 'ROUNDLAB',
      },
      {
        type: 'quiz',
        text: '근데 너는 피부 어떤 타입이야? 나랑 같은 건성인가?',
        quizOptions: ['지성 피부야', '건성 피부야', '복합성이야', '잘 모르겠어'],
        quizAnswer: 1,
      },
      { type: 'normal', text: '그렇구나! 다음에 또 얘기해요 😊 오늘 대화 즐거웠어.' },
    ],
  },
  {
    id: 'minho',
    name: '민호',
    age: 30,
    bio: '도시의 공간을 설계하는 건축가입니다.',
    image: '/char.png',
    bgImage: '/back.png',
    dialogues: [
      { type: 'normal', text: '반갑습니다. 새로 오신 분인가요?' },
      { type: 'normal', text: '저는 건물을 짓는 일을 하고 있습니다.' },
      { type: 'normal', text: '공간이 사람의 마음을 바꾼다고 믿거든요.' },
      { type: 'normal', text: '당신에게 가장 편안한 장소는 어디인가요?' },
      {
        type: 'quiz',
        text: '사람들이 가장 오래 머무는 공간은 어디일까요?',
        quizOptions: ['카페', '도서관', '집', '공원'],
        quizAnswer: 2,
      },
      { type: 'normal', text: '흥미로운 답변이네요. 다음에 더 들려주세요.' },
    ],
  },
  {
    id: 'yuna',
    name: '유나',
    age: 24,
    bio: '매일 아침 향긋한 커피를 내리는 바리스타입니다.',
    image: '/char.png',
    bgImage: '/back.png',
    dialogues: [
      { type: 'normal', text: '어서오세요! 오늘은 어떤 커피로 드릴까요?' },
      { type: 'normal', text: '저는 산미가 도는 원두를 특히 좋아해요.' },
      { type: 'normal', text: '커피 향을 맡으면 하루가 즐거워지거든요.' },
      {
        type: 'quiz',
        text: '당신은 어떤 커피를 좋아하세요?',
        quizOptions: ['아메리카노', '라떼', '콜드브루', '안 마셔요'],
        quizAnswer: 0,
      },
      { type: 'normal', text: '좋은 취향이시네요! 내일 또 놀러오세요.' },
    ],
  },
];
