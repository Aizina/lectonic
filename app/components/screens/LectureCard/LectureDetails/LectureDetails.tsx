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
    <div className="w-[94vw] py-16 px-6 text-white m-auto font-gotham">
      <div className="p-[40px] mx-auto">
        <div className="flex flex-col items-left justify-left md:flex-row md:justify-between md:items-center 
        pb-8 text-left border-b border-[#1F1F20]">
          <span className="text-xs lg:text-base font-normal text-[#565656]">Что вас ждёт?</span>
          <span className="text-lg lg:text-[32px] font-bold text-[#1F1F20] font-azoft">Основные детали лекции</span>
        </div>
        <div className="flex flex-col gap-6 2xl:gap-[2vw] p-12 my-8 mx-auto bg-[#4860EF] rounded-[32px] max-w-[820px]">
          <h3 className="font-bold text-2xl text-[#FCFCFC]">01. Целевая аудитория</h3>
          <p className="font-normal text-base text-[#CBD3FF]">Лекция подходит для предпринимателей и специалистов, которые хотят внедрять инновации, улучшать бизнес-процессы и повышать эффективность работы.</p>
          <h3 className="font-bold text-2xl text-[#FCFCFC]">02. Результат</h3>
          <p className="font-normal text-base text-[#CBD3FF]">Вы получите практические навыки и рекомендации, которые помогут внедрять современные инструменты и сразу применять знания в работе.</p>
        </div>
        <div className="flex flex-col items-left justify-left text-[#1F1F20]">
          <div className='border-b border-[#1F1F20] flex flex-row justify-between items-center p-8'>
            <span className='text-md lg:text-2xl font-medium'>Длительность</span>
            <span className='text-3xl lg:text-[42px] font-bold'>2 часа</span>
          </div>
          <div className='border-b border-[#1F1F20] flex flex-row justify-between items-center p-8'>
            <span className='text-md lg:text-2xl font-medium'>Формат</span>
            <span className='text-3xl lg:text-[42px] font-bold'>Офлайн</span>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetails;
