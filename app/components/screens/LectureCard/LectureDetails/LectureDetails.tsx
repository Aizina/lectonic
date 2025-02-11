import { FC } from 'react';

const details = [
  {
    title: 'Длительность',
    value: '2 часа',
    description:
      'Этого времени достаточно, чтобы глубоко изучить тему и задать все вопросы',
    bgColor: 'bg-white',
    textColor: 'text-[#4860EF]'
  },
  {
    title: 'Формат',
    value: 'Офлайн',
    description:
      'Лекция пройдет в комфортной аудитории с возможностью общения с лектором.',
    bgColor: 'bg-[#6C80F6]',
    textColor: 'text-white'
  },
  {
    title: 'Результат',
    value: 'Практика',
    description:
      'Вы получите навыки и рекомендации, которые сможете сразу применять на практике.',
    bgColor: 'bg-white',
    textColor: 'text-[#4860EF]'
  },
  {
    title: 'Целевая аудитория',
    value: 'Руководители',
    description:
      'Лекция подходит для тех, кто хочет внедрить инновации и развивать бизнес.',
    bgColor: 'bg-[#6C80F6]',
    textColor: 'text-white'
  }
];

const LectureDetails: FC = () => {
  return (
    <div className="w-[94vw] bg-[#4860EF] py-16 px-6 text-white rounded-[32px] m-auto">
      <div className="p-[40px] mx-auto">
        <div className="flex flex-col items-left justify-left md:flex-row md:justify-between md:items-center pb-10 text-left border-b border-white">
          <span className="text-base font-normal">Что вас ждёт?</span>
          <span className="text-[32px] font-bold">Основные детали лекции</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-[2vw] pt-10">
          {details.map((detail, index) => (
            <div
              key={index}
              className={`p-6 rounded-[32px] ${detail.bgColor} flex flex-col items-start h-full text-left`}
            >
              <span className={`text-md 2xl:text-2xl font-bold mb-24 ${detail.textColor}`}>{detail.title}</span>
              <span className={`text-lg 2xl:text-4xl font-bold ${detail.textColor} pt-2`}>{detail.value}</span>
              <span className={`text-sm 2xl:text-base font-normal ${detail.textColor} pt-4`}>{detail.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LectureDetails;
